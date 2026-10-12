import mongoose from "mongoose";
import Property from "../models/property.js";

// Add Property
export const addProperty = async (req, res) => {
    try {
        const uploadedImages = req.files?.map((file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`) || [];

        let images = uploadedImages;
        if (uploadedImages.length === 0 && req.body.images) {
            try {
                images = Array.isArray(req.body.images)
                    ? req.body.images
                    : JSON.parse(req.body.images);
            } catch {
                images = String(req.body.images)
                    .split(",")
                    .map((image) => image.trim())
                    .filter(Boolean);
            }
        }

        const property = await Property.create({
            ...req.body,
            price: Number(req.body.price),
            bedrooms: Number(req.body.bedrooms),
            bathrooms: Number(req.body.bathrooms),
            area: req.body.area ? Number(req.body.area) : 0,
            images,
            userId: req.user.id
        });

        res.status(201).json({
            message: "Property added successfully",
            property
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to add property",
            error: error.message
        });
    }
};

// Get All / Search / Filter Properties (public)
export const getProperties = async (req, res) => {
    try {
        const { location, propertyType, listingType, minPrice, maxPrice } = req.query;
        const filter = {};

        if (location) {
            filter.location = { $regex: location, $options: "i" };
        }

        if (propertyType) {
            filter.propertyType = propertyType;
        }

        if (listingType) {
            filter.listingType = listingType;
        }

        if (minPrice || maxPrice) {
            filter.price = {};

            if (minPrice) {
                filter.price.$gte = Number(minPrice);
            }

            if (maxPrice) {
                filter.price.$lte = Number(maxPrice);
            }
        }

        const properties = await Property.find(filter).sort({ createdAt: -1 });
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({
            message: "Failed to get properties",
            error: error.message
        });
    }
};

// Get only the logged-in user's properties
export const getMyProperties = async (req, res) => {
    try {
        const properties = await Property.find({ userId: req.user.id })
            .sort({ createdAt: -1 });

        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({
            message: "Failed to get your properties",
            error: error.message
        });
    }
};

// Get Single Property (public)
export const getProperty = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid property ID" });
        }

        const property = await Property.findById(req.params.id).populate("userId", "name email");

        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }

        res.status(200).json(property);
    } catch (error) {
        res.status(500).json({
            message: "Failed to get property",
            error: error.message
        });
    }
};

// Update only the logged-in user's property
export const updateProperty = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid property ID" });
        }

        // Prevent the client from changing ownership.
        const { userId, ...updates } = req.body;

        if (req.files?.length) {
            updates.images = req.files.map((file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`);
        } else if (typeof updates.images === "string") {
            try {
                updates.images = JSON.parse(updates.images);
            } catch {
                updates.images = updates.images
                    .split(",")
                    .map((image) => image.trim())
                    .filter(Boolean);
            }
        }

        if (updates.price !== undefined) updates.price = Number(updates.price);
        if (updates.bedrooms !== undefined) updates.bedrooms = Number(updates.bedrooms);
        if (updates.bathrooms !== undefined) updates.bathrooms = Number(updates.bathrooms);
        if (updates.area !== undefined) updates.area = updates.area ? Number(updates.area) : 0;

        const property = await Property.findOneAndUpdate(
            {
                _id: req.params.id,
                userId: req.user.id
            },
            updates,
            {
                new: true,
                runValidators: true
            }
        );

        if (!property) {
            return res.status(404).json({
                message: "Property not found or you are not its owner"
            });
        }

        res.status(200).json({
            message: "Property updated successfully",
            property
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to update property",
            error: error.message
        });
    }
};

// Delete only the logged-in user's property
export const deleteProperty = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid property ID" });
        }

        const property = await Property.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id
        });

        if (!property) {
            return res.status(404).json({
                message: "Property not found or you are not its owner"
            });
        }

        res.status(200).json({
            message: "Property deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete property",
            error: error.message
        });
    }
};
