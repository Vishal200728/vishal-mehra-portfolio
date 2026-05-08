const express = require('express');
const cors = require('cors');
const { nanoid } = require('nanoid');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const URLS_FILE = path.join(__dirname, 'urls.json');

// Load URLs from file
const loadUrls = () => {
  if (fs.existsSync(URLS_FILE)) {
    const data = fs.readFileSync(URLS_FILE, 'utf8');
    return JSON.parse(data);
  }
  return {};
};

// Save URLs to file
const saveUrls = (urls) => {
  fs.writeFileSync(URLS_FILE, JSON.stringify(urls, null, 2));
};

// Create short URL
app.post('/api/shorten', (req, res) => {
  try {
    const { originalUrl } = req.body;
    
    if (!originalUrl) {
      return res.status(400).json({ error: 'URL is required' });
    }
    
    // Validate URL
    try {
      new URL(originalUrl);
    } catch {
      return res.status(400).json({ error: 'Invalid URL format. Include http:// or https://' });
    }
    
    const urls = loadUrls();
    const shortCode = nanoid(6);
    const shortUrl = `http://localhost:3002/${shortCode}`;
    
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
    res.status(500).json({ error: 'Server error' });
  }
});

// Redirect to original URL
app.get('/:shortCode', (req, res) => {
  const { shortCode } = req.params;
  const urls = loadUrls();
  
  if (urls[shortCode]) {
    urls[shortCode].clicks++;
    saveUrls(urls);
    return res.redirect(urls[shortCode].originalUrl);
  }
  
  res.status(404).send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>URL Not Found</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          margin: 0;
          color: white;
        }
        .container { text-align: center; }
        h1 { font-size: 4rem; margin: 0; }
        p { font-size: 1.2rem; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>404</h1>
        <p>Short URL not found 😢</p>
      </div>
    </body>
    </html>
  `);
});

// Get all URLs
app.get('/api/urls', (req, res) => {
  const urls = loadUrls();
  res.json(Object.values(urls).reverse());
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`🚀 URL Shortener Server running on http://localhost:${PORT}`);
});