const express = require('express');
const cors = require('cors');
const { nanoid } = require('nanoid');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const URLS_FILE = path.join(__dirname, 'urls.json');
const BASE_URL = process.env.BASE_URL || `http://localhost:${process.env.PORT || 3002}`;

// Load URLs from JSON file
const loadUrls = () => {
  if (fs.existsSync(URLS_FILE)) {
    const data = fs.readFileSync(URLS_FILE, 'utf8');
    return JSON.parse(data);
  }
  return {};
};

// Save URLs to JSON file
const saveUrls = (urls) => {
  fs.writeFileSync(URLS_FILE, JSON.stringify(urls, null, 2));
};

// GET all URLs (returns array)
app.get('/api/urls', (req, res) => {
  try {
    const urls = loadUrls();
    const urlsArray = Object.values(urls).reverse();
    
    // ✅ Make sure we always return an array
    res.json(Array.isArray(urlsArray) ? urlsArray : []);
  } catch (error) {
    console.error('Error fetching URLs:', error);
    res.json([]); // Return empty array on error
  }
});

// POST - Shorten URL
app.post('/api/shorten', (req, res) => {
  try {
    const { originalUrl } = req.body;

    if (!originalUrl) {
      return res.status(400).json({ error: 'URL is required' });
    }

    // Validate URL format
    try {
      const parsedUrl = new URL(originalUrl);
      if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
        return res.status(400).json({ error: 'Only http/https URLs are allowed' });
      }
    } catch {
      return res.status(400).json({ error: 'Invalid URL format. Include http:// or https://' });
    }

    const urls = loadUrls();
    
    // Check if URL already exists
    let existingShortCode = null;
    for (const [code, data] of Object.entries(urls)) {
      if (data.originalUrl === originalUrl) {
        existingShortCode = code;
        break;
      }
    }

    if (existingShortCode) {
      return res.json({
        success: true,
        shortUrl: urls[existingShortCode].shortUrl,
        shortCode: existingShortCode,
        originalUrl,
        message: 'URL already shortened'
      });
    }

    // Create new short URL
    const shortCode = nanoid(6);
    const shortUrl = `${BASE_URL}/${shortCode}`;

    urls[shortCode] = {
      originalUrl,
      shortUrl,
      createdAt: new Date().toISOString(),
      clicks: 0
    };

    saveUrls(urls);

    res.json({
      success: true,
      shortUrl,
      shortCode,
      originalUrl
    });
  } catch (error) {
    console.error('Shorten error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Redirect to original URL
app.get('/:shortCode', (req, res) => {
  const { shortCode } = req.params;
  const urls = loadUrls();

  if (urls[shortCode]) {
    // Increment click count
    urls[shortCode].clicks++;
    saveUrls(urls);
    return res.redirect(urls[shortCode].originalUrl);
  }

  // 404 page
  res.status(404).send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>URL Not Found</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          margin: 0;
          color: white;
        }
        .container { text-align: center; }
        h1 { font-size: 6rem; margin: 0; animation: bounce 1s ease; }
        p { font-size: 1.2rem; margin-top: 20px; }
        a { color: white; text-decoration: none; background: rgba(255,255,255,0.2); padding: 10px 20px; border-radius: 25px; display: inline-block; margin-top: 20px; }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>404</h1>
        <p>🔗 Short URL not found 😢</p>
        <a href="/">Go to Home</a>
      </div>
    </body>
    </html>
  `);
});

// Root endpoint for testing
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>URL Shortener API</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          margin: 0;
          color: white;
        }
        .container { text-align: center; }
        h1 { font-size: 3rem; }
        .endpoint { background: rgba(0,0,0,0.3); padding: 20px; border-radius: 10px; margin-top: 20px; }
        code { background: rgba(0,0,0,0.5); padding: 5px 10px; border-radius: 5px; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🚀 URL Shortener API</h1>
        <p>Your URL shortener backend is running!</p>
        <div class="endpoint">
          <h3>Endpoints:</h3>
          <p><code>POST /api/shorten</code> - Shorten a URL</p>
          <p><code>GET /api/urls</code> - Get all URLs</p>
          <p><code>GET /:shortCode</code> - Redirect to original URL</p>
        </div>
      </div>
    </body>
    </html>
  `);
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`
  ═══════════════════════════════════════════════════
  🚀 URL Shortener Server is running!
  📡 URL: http://localhost:${PORT}
  📝 API Endpoint: http://localhost:${PORT}/api/urls
  ═══════════════════════════════════════════════════
  `);
});