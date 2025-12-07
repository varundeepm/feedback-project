import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors({
    origin: [
        "https://feedback-project-blush.vercel.app",
        "http://localhost:3000"
    ],
    methods: ["GET", "POST"],
}));

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const Feedback = mongoose.model("Feedback", {
  name: String,
  message: String,
  date: { type: Date, default: Date.now }
});

app.post("/feedback", async (req, res) => {
  const fb = new Feedback(req.body);
  await fb.save();
  res.json({ status: "saved" });
});

app.get("/", (req, res) => {
  res.send("Feedback API is running");
});

const port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", () => {
  console.log("Server running on port " + port);
});
