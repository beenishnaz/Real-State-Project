import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

import {
    addProperty,
    getProperties,
    getMyProperties,
    getProperty,
    updateProperty,
    deleteProperty
} from "../controllers/propertyController.js";

const router = express.Router();

// Public routes
router.get("/", getProperties);

// Protected route for the logged-in user
router.get("/my/listings", authMiddleware, getMyProperties);

// Public single-property route
router.get("/:id", getProperty);

// Protected routes
router.post("/", authMiddleware, upload.array("images", 10), addProperty);
router.put("/:id", authMiddleware, upload.array("images", 10), updateProperty);
router.delete("/:id", authMiddleware, deleteProperty);

export default router;
