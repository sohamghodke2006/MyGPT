import dns from "dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";

// Load .env from the same folder as server.js
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, ".env");

console.log("Looking for .env at:", envPath);
console.log("File exists:", fs.existsSync(envPath));

const result = dotenv.config({ path: envPath });
console.log("dotenv error:", result.error ? result.error.message : "none");
console.log("Keys loaded:", Object.keys(result.parsed || {}));

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.use("/api", chatRoutes);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 8000,
    });
    console.log("Connected with Database");
  } catch (err) {
    console.error("Failed to connect with database");
    console.error(err.message);
    process.exit(1);
  }
};

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});