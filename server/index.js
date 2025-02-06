import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { OpenAI } from "openai";

import connectDB from "./mongodb/connect.js";
import { postRoutes } from "./routes/postRoutes.js";
import { aieRoutes } from "./routes/aieRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/post", postRoutes);
app.use("/api/v1/aie", aieRoutes);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ✅ OpenAI Image Generation Route
app.post("/api/v1/generate-image", async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await openai.images.generate({
      model: "dall-e-3", // Use "dall-e-2" if preferred
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });

    res.json({ imageUrl: response.data[0].url });
  } catch (error) {
    console.error("Image generation error:", error);
    res.status(500).json({ error: "Failed to generate image" });
  }
});

app.get("/", async (req, res) => {
  res.send("Hello AI-E");
});

const startServer = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    app.listen(8080, () =>
      console.log("✅ Server running at http://localhost:8080")
    );
  } catch (error) {
    console.error("❌ Server error:", error);
  }
};

startServer();
