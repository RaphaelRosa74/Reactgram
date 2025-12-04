import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import serverless from "serverless-http";
import "./config/db.js"; // DB connection

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({
  credentials: true,
  origin: "*", // must be * for vercel unless you add domain
}));

// uploads (must be moved to storage; Vercel FS is read-only)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// routes
import router from "./routes/router.js";
app.use("/api", router);

// export serverless handler
export const handler = serverless(app);
