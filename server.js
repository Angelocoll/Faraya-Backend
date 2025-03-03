// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const deleteImageRoute = require("./api/deleteImage"); // Importera din deleteImage-router

dotenv.config(); // Ladda miljövariabler från .env

const app = express();
const port = process.env.PORT || 3001;

// Aktivera CORS
app.use(cors());

// Middleware för att kunna läsa JSON-data från kroppen
app.use(express.json());

// Använd deleteImageRoute för API:et som hanterar borttagning av bilder
app.use("/api", deleteImageRoute); // Prefixa alla rutter i deleteImageRoute med "/api"

// Starta servern
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
