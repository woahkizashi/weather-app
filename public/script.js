document.getElementById('fetchWeather').addEventListener('click', async () => {
  const city = document.getElementById('city').value;
  if (!city) {
    alert('Please enter a city');
    return;
  }

  try {
    // Add better error logging
    console.log('Fetching data for city:', city);

    // Make sure we're using the correct API endpoint
    const response = await axios.get('/api/weather', {
      params: {
        city: city,
      },
    });

    console.log('Response:', response.data); // Debug log

    const { weather, news } = response.data;

    document.getElementById('weatherInfo').innerHTML = `
            <h2>Weather in ${city}</h2>
            <p>Temperature: ${weather.main.temp.toFixed(1)}°C</p>
            <p>Weather: ${weather.weather[0].description}</p>
            <p>Humidity: ${weather.main.humidity}%</p>
            <p>Wind Speed: ${weather.wind.speed} m/s</p>
        `;

    if (news && news.length > 0) {
      const newsHTML = news
        .map(
          (article) => `
                    <li class="news-item">
                        <h3><a href="${article.url}" target="_blank">${
            article.title
          }</a></h3>
                        <p>${article.description || ''}</p>
                    </li>
                `
        )
        .join('');

      document.getElementById('news').innerHTML = `
                <h2>Related News</h2>
                <ul class="news-list">${newsHTML}</ul>
            `;
    } else {
      document.getElementById('news').innerHTML =
        '<p>No related news available</p>';
    }
  } catch (error) {
    // Better error logging
    console.error('Detailed error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    alert('Error fetching data. Please try again later.');
  }
});
