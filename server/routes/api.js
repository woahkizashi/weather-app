// server/routes/api.js

require('dotenv').config();
const express = require('express');
const axios = require('axios');
const router = express.Router();

const OPENWEATHERMAP_API_KEY = process.env.OPENWEATHERMAP_API_KEY;
const NEWSAPI_API_KEY = process.env.NEWSAPI_API_KEY;

// const UNSPLASH_API_KEY = process.env.UNSPLASH_API_KEY;

router.get('/weather', async (req, res) => {
  const { city } = req.query;
  try {
    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHERMAP_API_KEY}`
    );
    const newsResponse = await axios.get(
      `https://newsapi.org/v2/everything?q=weather&apiKey=${NEWSAPI_API_KEY}&pageSize=5`
    );
    // const imageResponse = await axios.get(`https://api.unsplash.com/photos/random?query=weather&client_id=${UNSPLASH_API_KEY}`);

    res.json({
      weather: weatherResponse.data,
      news: newsResponse.data.articles,
      // image: imageResponse.data.urls.regular,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
