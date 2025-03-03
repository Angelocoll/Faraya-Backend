// api/deleteImage.js
const express = require("express");
const { v2: cloudinary } = require("cloudinary");

const router = express.Router();

// Konfigurera Cloudinary med dina API-nycklar
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.post("/delete-Image", async (req, res) => {
  const { public_id } = req.body;

  if (!public_id) {
    return res.status(400).json({ error: "public_id is required" });
  }

  try {
    // Försök att ta bort bilden från Cloudinary
    const result = await cloudinary.uploader.destroy(public_id);

    if (result.result === "ok") {
      return res.status(200).json({ message: "Image deleted successfully" });
    } else {
      return res.status(500).json({ error: "Failed to delete image" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
