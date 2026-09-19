import mongoose from "mongoose";

const contactMessageSchema = new mongoose.Schema({
    kind: { type: String, enum: ["general", "property"], required: true, default: "general" },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    propertyId: { type: mongoose.Schema.Types.ObjectId, ref: "Property", default: null },
    propertyTitle: { type: String, default: "" },
    propertyOwnerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    propertyOwnerName: { type: String, default: "" },
    propertyOwnerEmail: { type: String, default: "" },
    contactMethod: { type: String, enum: ["website", "call", "email"], default: "website" },
    status: { type: String, enum: ["New", "Read"], default: "New" }
}, { timestamps: true });

export default mongoose.models.ContactMessage ||
    mongoose.model("ContactMessage", contactMessageSchema);
