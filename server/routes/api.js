// server/routes/api.js

const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/define', async (req, res) => {
    const { word } = req.query;
    try {
        const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/books', async (req, res) => {
    const { title } = req.query;
    try {
        const response = await axios.get(`https://openlibrary.org/search.json?title=${title}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/spaceflight-news', async (req, res) => {
    try {
        const response = await axios.get('https://api.spaceflightnewsapi.net/v3/articles');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

