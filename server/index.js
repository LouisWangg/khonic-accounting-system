const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./db');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Basic health check
app.get('/', (req, res) => {
    res.send('Khonic Accounting Server is running');
});

// Routes placeholders
app.get('/api/accounts', async (req, res) => {
    try {
        // Mock data or db call
        res.json({ message: "Accounts endpoint" });
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
