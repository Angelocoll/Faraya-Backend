const express = require("express");
const cloudinary = require("cloudinary").v2;
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;

// Aktivera CORS
app.use(cors());

// Konfigurera Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Ta bort bild från Cloudinary
app.post("/api/delete-image", async (req, res) => {
  const { public_id } = req.body; // Vi förväntar oss att få public_id från frontend

  if (!public_id) {
    return res.status(400).json({ error: "public_id is required" });
  }

  try {
    // Försök att ta bort bilden från Cloudinary
    const result = await cloudinary.uploader.destroy(public_id);
    return res.json(result); // Skicka tillbaka resultatet från Cloudinary
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Starta servern
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
