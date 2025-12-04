require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");

// DB connection
require("./config/db.js");

const app = express();

// Config JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS (allow all on Vercel)
app.use(cors({ credentials: true, origin: true }));

// Uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
const router = require("./routes/router");
app.use("/api", router);

// Serve React frontend (Vercel needs this)
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});
