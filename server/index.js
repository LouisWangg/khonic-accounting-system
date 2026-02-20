const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const db = require('./db');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === 'production';

// CORS only in development (production serves everything from same origin)
if (!isProduction) {
    app.use(cors());
}

app.use(express.json());

// Health check endpoint (Railway uses this)
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes placeholders
app.get('/api/accounts', async (req, res) => {
    try {
        // Mock data or db call
        res.json({ message: "Accounts endpoint" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Production: serve React static files
if (isProduction) {
    const clientDistPath = path.join(__dirname, '..', 'client', 'dist');
    app.use(express.static(clientDistPath));

    // SPA catch-all: serve index.html for non-API routes
    app.get('{*splat}', (req, res) => {
        res.sendFile(path.join(clientDistPath, 'index.html'));
    });
}

app.listen(port, () => {
    console.log(`Server is running on port ${port} (${isProduction ? 'production' : 'development'})`);
});
