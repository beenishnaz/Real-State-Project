import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import propertyRoutes from "./routes/propertyRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

connectDB();

// Auth Routes
app.use("/api/auth", authRoutes);

// Property Routes
app.use("/api/properties", propertyRoutes);

// Contact and inquiry routes
app.use("/api/contact", contactRoutes);

app.get("/", (req, res) => {
    res.send("Real Estate API is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});