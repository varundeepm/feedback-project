import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

dotenv.config();

const app = express();

// ----------------------
// SECURITY & BASIC SETUP
// ----------------------

// Disable "X-Powered-By: Express"
app.disable("x-powered-by");

// CORS – only allow your frontend
app.use(cors({
    origin: "https://feedback-project-blush.vercel.app"
}));

// Rate Limiting – prevent spam (10 requests per minute)
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 10,
    message: "Too many requests, please try again later."
});
app.use(limiter);

// Parse JSON
app.use(express.json());

// ----------------------
// DATABASE CONNECTION
// ----------------------
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

// ----------------------
// FEEDBACK MODEL
// ----------------------
const Feedback = mongoose.model("Feedback", {
    name: String,
    message: String,
    date: { type: Date, default: Date.now }
});

// ----------------------
// API ENDPOINTS
// ----------------------

// POST /feedback – save user feedback
app.post("/feedback", async (req, res) => {

    // Validate inputs
    const { name, message } = req.body;

    if (!name || !message) {
        return res.status(400).json({ error: "Name and message are required" });
    }

    try {
        const fb = new Feedback({ name, message });
        await fb.save();
        res.json({ status: "saved" });
    } catch (err) {
        res.status(500).json({ error: "Database error" });
    }
});

// Test endpoint
app.get("/", (req, res) => {
    res.send("Feedback API is running (secure mode)");
});

// ----------------------
// GLOBAL ERROR HANDLER
// ----------------------
app.use((err, req, res, next) => {
    console.error("SERVER ERROR:", err.stack);
    res.status(500).json({ error: "Internal server error" });
});

// ----------------------
// START SERVER
// ----------------------
const port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", () => {
    console.log("Server running on port " + port);
});
