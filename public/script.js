// public/script.js

document.getElementById('fetchWeather').addEventListener('click', async () => {
    const city = document.getElementById('city').value;
    if (!city) {
        alert('Please enter a city');
        return;
    }

    try {
        const response = await axios.get(`/api/weather?city=${city}`);
        const { weather, news, image } = response.data;

        document.getElementById('weatherInfo').innerHTML = `
            <h2>Weather in ${city}</h2>
            <p>Temperature: ${(weather.main.temp - 273.15).toFixed(2)}°C</p>
            <p>Weather: ${weather.weather[0].description}</p>
        `;

        const newsHTML = news.map(article => `<li><a href="${article.url}" target="_blank">${article.title}</a></li>`).join('');
        document.getElementById('news').innerHTML = `
            <h2>Related News</h2>
            <ul>${newsHTML}</ul>
        `;

        document.getElementById('image').innerHTML = `<img src="${image}" alt="Weather Image" style="max-width: 100%;">`;

    } catch (error) {
        console.error(error);
        alert('Error fetching data. Please try again later.');
    }
});
