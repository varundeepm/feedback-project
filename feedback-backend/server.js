import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// FIX CORS
app.use(cors({
    origin: "https://feedback-project-blush.vercel.app"
}));

app.use(express.json());

// CONNECT MONGODB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("DB Error:", err));

// MODEL
const Feedback = mongoose.model("Feedback", {
  name: String,
  message: String,
  date: { type: Date, default: Date.now }
});

// POST FEEDBACK
app.post("/feedback", async (req, res) => {
  try {
    const { name, message } = req.body;

    const fb = new Feedback({ name, message });
    await fb.save();

    res.json({ success: true, message: "Feedback saved!" });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// ROOT ROUTE
app.get("/", (req, res) => {
  res.send("Feedback API is running");
});

// RENDER USES ITS OWN PORT
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Backend running on port " + PORT);
});

