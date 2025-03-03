require("dotenv").config();
const cors = require("cors");
const express = require("express");
const cloudinary = require("cloudinary").v2;

const app = express();
app.use(cors());
app.use(express.json());

// Konfigurera Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Endpoint för att radera alla bilder
app.delete("/radera-alla-bilder", async (req, res) => {
  try {
    const { resources } = await cloudinary.search
      .expression("resource_type:image")
      .execute();

    const publicIds = resources.map((resource) => resource.public_id);

    if (publicIds.length > 0) {
      await cloudinary.api.delete_resources(publicIds, { type: "upload" });
    }

    res.json({ message: "Alla bilder raderade." });
  } catch (error) {
    console.error("Fel vid radering:", error);
    res.status(500).json({ message: error.message });
  }
});

// 🚀 Exportera Express-appen som en Vercel-serverless funktion
const server = require("serverless-http");
module.exports = server(app);
