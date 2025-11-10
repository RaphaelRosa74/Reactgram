require("dotenv").config();

const express = require("express");
const path = require("path");
import { fileURLToPath } from "url";
const cors = require("cors");
//DB connection
require("./config/db.js");

const port = process.env.PORT;
const __filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

const app = express();

//config JSON and from fata response
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Solve CORS
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

//Upload directory
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

//routes
const router = require("./routes/router.js");

app.use(router);

// Make sure to put this after all api routes are being handled (e.g. app.use('/api/authorize', authRoutes);)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    return res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

app.listen(port, () => {
  console.log(`A aplicação está rodando na porta ${port}`);
});
