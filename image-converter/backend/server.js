const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple GET endpoints for testing
app.get("/", (req, res) => {
  res.json({
    message: "🎯 Image Converter API is running!",
    endpoints: {
      "POST /api/convert": "Convert image to specific size",
      "GET /api/health": "Check server status"
    }
  });
});

app.get("/api/health", (req, res) => {
  res.json({ 
    status: "OK", 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Ensure folders exist
const uploadDir = path.join(__dirname, "uploads");
const outputDir = path.join(__dirname, "output");

if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

const upload = multer({ dest: uploadDir });

// Main conversion endpoint
app.post("/api/convert", upload.single("image"), async (req, res) => {
  console.log("📥 POST request received to /api/convert");
  
  try {
    const targetKB = parseInt(req.body.size);
    
    if (!targetKB || targetKB < 1 || targetKB > 1024) {
      return res.status(400).send("Invalid size. Must be 1-1024 KB");
    }
    
    if (!req.file) {
      console.log("❌ No file in request");
      return res.status(400).send("No image uploaded");
    }
    
    console.log("✅ File received:", req.file.originalname);
    console.log("📁 Temp path:", req.file.path);
    
    const targetBytes = targetKB * 1024;
    const inputPath = req.file.path;
    
    const originalBuffer = await sharp(inputPath).toBuffer();
    console.log(`📊 Original size: ${(originalBuffer.length / 1024).toFixed(2)} KB`);
    
    if (originalBuffer.length <= targetBytes) {
      console.log("✨ Original file already within target size");
      res.setHeader('Content-Disposition', 'attachment; filename=image.jpg');
      res.send(originalBuffer);
      fs.unlinkSync(inputPath);
      return;
    }
    
    let quality = 90;
    let buffer = await sharp(inputPath).jpeg({ quality }).toBuffer();
    
    while (buffer.length > targetBytes && quality > 5) {
      quality -= 5;
      buffer = await sharp(inputPath).jpeg({ quality }).toBuffer();
    }
    
    console.log(`✅ Converted with quality: ${quality}%`);
    console.log(`📊 Converted size: ${(buffer.length / 1024).toFixed(2)} KB`);
    
    res.setHeader('Content-Disposition', 'attachment; filename=converted.jpg');
    res.send(buffer);
    fs.unlinkSync(inputPath);
    console.log("🗑️ Temp file deleted");
    
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).send("Image conversion failed");
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📌 Test API: http://localhost:${PORT}/api/health`);
  console.log(`🎯 Main endpoint: POST http://localhost:${PORT}/api/convert`);
});