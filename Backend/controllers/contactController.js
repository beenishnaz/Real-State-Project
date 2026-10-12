import mongoose from "mongoose";
import ContactMessage from "../models/contactMessage.js";
import Property from "../models/property.js";
import User from "../models/user.js";

const getLoggedInUser = async (req) => User.findById(req.user.id).select("name email role");

export const createContactMessage = async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        if (![name, email, phone, message].every((v) => String(v || "").trim())) {
            return res.status(400).json({ message: "Please fill all fields" });
        }
        const saved = await ContactMessage.create({
            kind: "general", name, email, phone, message, contactMethod: "website"
        });
        res.status(201).json({ message: "Your message has been sent to the agency inbox.", contactMessage: saved });
    } catch (error) {
        console.error("General contact error:", error.message);
        res.status(500).json({ message: "Failed to send message" });
    }
};

// Record a customer's click to contact a specific property's owner.
// This tracks contact intent; mailto/tel opens the visitor's own mail/phone app.
export const createPropertyInquiry = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid property ID" });

        const { name, email, phone, message = "", contactMethod } = req.body;
        if (![name, email, phone].every((v) => String(v || "").trim())) {
            return res.status(400).json({ message: "Name, email and phone are required to record an inquiry." });
        }
        if (!["call", "email"].includes(contactMethod)) {
            return res.status(400).json({ message: "Choose call or email." });
        }

        const property = await Property.findById(id).populate("userId", "name email");
        if (!property) return res.status(404).json({ message: "Property not found" });

        const owner = property.userId;
        if (!owner) return res.status(400).json({ message: "Property owner details are unavailable." });

        const inquiry = await ContactMessage.create({
            kind: "property", name, email, phone, message,
            propertyId: property._id,
            propertyTitle: property.title,
            propertyOwnerId: owner._id,
            propertyOwnerName: owner.name,
            propertyOwnerEmail: owner.email,
            contactMethod
        });
        res.status(201).json({
            message: "Inquiry recorded",
            inquiry,
            owner: { name: owner.name, email: owner.email }
        });
    } catch (error) {
        console.error("Property inquiry error:", error.message);
        res.status(500).json({ message: "Failed to record property inquiry" });
    }
};

// Only the platform owner configured in BACKEND .env can access the central inbox.
export const getContactMessages = async (req, res) => {
    try {
        const user = await getLoggedInUser(req);
        const ownerEmail = (process.env.PLATFORM_OWNER_EMAIL || "").trim().toLowerCase();
        if (!ownerEmail || !user || user.email.toLowerCase() !== ownerEmail) {
            return res.status(403).json({ message: "Only the platform owner can view the central inbox." });
        }
        const messages = await ContactMessage.find().sort({ createdAt: -1 });
        res.status(200).json({ messages });
    } catch (error) {
        console.error("Get messages error:", error.message);
        res.status(500).json({ message: "Failed to get messages" });
    }
};

export const getMyPropertyInquiries = async (req, res) => {
    try {
        const messages = await ContactMessage.find({
            kind: "property",
            propertyOwnerId: req.user.id
        }).sort({ createdAt: -1 });
        res.status(200).json({ messages });
    } catch (error) {
        console.error("Get owner inquiries error:", error.message);
        res.status(500).json({ message: "Failed to get property inquiries" });
    }
};

export const markMessageAsRead = async (req, res) => {
    try {
        const user = await getLoggedInUser(req);
        const ownerEmail = (process.env.PLATFORM_OWNER_EMAIL || "").trim().toLowerCase();
        if (!ownerEmail || !user || user.email.toLowerCase() !== ownerEmail) {
            return res.status(403).json({ message: "Only the platform owner can update central messages." });
        }
        const message = await ContactMessage.findByIdAndUpdate(req.params.id, { status: "Read" }, { new: true });
        if (!message) return res.status(404).json({ message: "Message not found" });
        res.status(200).json({ message: "Message marked as read", contactMessage: message });
    } catch (error) {
        console.error("Mark message error:", error.message);
        res.status(500).json({ message: "Failed to update message" });
    }
};


// Platform-owner overview: registered sellers/customers and all active listings.
export const getPlatformOverview = async (req, res) => {
    try {
        const user = await getLoggedInUser(req);
        const ownerEmail = (process.env.PLATFORM_OWNER_EMAIL || "").trim().toLowerCase();
        if (!ownerEmail || !user || user.email.toLowerCase() !== ownerEmail) {
            return res.status(403).json({ message: "Only the platform owner can view platform activity." });
        }
        const [users, properties] = await Promise.all([
            User.find().select("name email role createdAt").sort({ createdAt: -1 }),
            Property.find().populate("userId", "name email").sort({ createdAt: -1 })
        ]);
        res.status(200).json({ users, properties });
    } catch (error) {
        console.error("Platform overview error:", error.message);
        res.status(500).json({ message: "Failed to load platform overview." });
    }
};
