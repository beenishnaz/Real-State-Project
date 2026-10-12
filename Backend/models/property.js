import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        price: {
            type: Number,
            required: true,
            min: 0
        },

        location: {
            type: String,
            required: true,
            trim: true
        },

        propertyType: {
            type: String,
            required: true,
            trim: true
        },

        listingType: {
            type: String,
            required: true,
            trim: true
        },

        bedrooms: {
            type: Number,
            required: true,
            min: 0
        },

        bathrooms: {
            type: Number,
            required: true,
            min: 0
        },

        area: {
            type: Number,
            min: 0
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        images: {
            type: [String],
            default: []
        },

        status: {
            type: String,
            default: "Available",
            trim: true
        },

        contactPhone: {
            type: String,
            trim: true,
            default: ""
        },

        // Owner of this property. Set by the backend from the JWT;
        // never trust a user-supplied owner id from the frontend.
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        }
    },
    {
        timestamps: true
    }
);

const Property = mongoose.model("Property", propertySchema);

export default Property;
