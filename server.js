require("dotenv").config(); // Ladda miljövariablerna
const cors = require("cors");

const express = require("express");
const cloudinary = require("cloudinary").v2;

const app = express();
const port = process.env.PORT || 5001; // Använd port från .env eller 5000 som standard
app.use(
  cors({
    origin: "http://localhost:5173", // Ersätt med din React-apps port om den är annorlunda
  })
);

// Konfigurera Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Middleware för att hantera JSON-data i förfrågningar
app.use(express.json());

// Endpoint för att radera alla bilder
app.delete("/radera-alla-bilder", async (req, res) => {
  try {
    const { resources } = await cloudinary.search
      .expression("resource_type:image") // Hämta alla bilder
      .execute();

    const publicIds = resources.map((resource) => resource.public_id);

    if (publicIds.length > 0) {
      await cloudinary.api.delete_resources(publicIds, {
        type: "upload", // Viktigt: Ange typen av resurs
      });
    }

    res.json({ message: "Alla bilder raderade." });
  } catch (error) {
    console.error("Fel vid radering:", error);
    res.status(500).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Servern lyssnar på port ${port}`);
});
