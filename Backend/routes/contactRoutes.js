import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
    createContactMessage,
    createPropertyInquiry,
    getContactMessages,
    getMyPropertyInquiries,
    markMessageAsRead,
    getPlatformOverview
} from "../controllers/contactController.js";

const router = express.Router();

router.post("/", createContactMessage);
router.post("/property/:id", createPropertyInquiry);
router.get("/", authMiddleware, getContactMessages);
router.get("/my-property-inquiries", authMiddleware, getMyPropertyInquiries);
router.get("/platform-overview", authMiddleware, getPlatformOverview);
router.put("/:id/read", authMiddleware, markMessageAsRead);

export default router;
