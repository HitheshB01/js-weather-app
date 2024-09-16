const container = document.querySelector('.container');
const searchButton = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');

// Fetch weather data
searchButton.addEventListener('click', () => {
    const APIKey = '535b2903d84b90419468912940cb3006';
    const city = document.querySelector('.search-box input').value.trim();

    if (!city) return;

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === '404') {
                container.style.height = '400px';
                error404.classList.add('active');
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                return;
            }

            // Update weather details
            const { main, weather, wind } = data;
            const temp = Math.round(main.temp);
            const description = weather[0].description;
            const humidity = `${main.humidity}%`;
            const windSpeed = `${Math.round(wind.speed)} km/h`;

            document.querySelector('.weather-box img').src = getWeatherIcon(weather[0].main);
            document.querySelector('.weather-box .temperature').innerHTML = `${temp}<span>°C</span>`;
            document.querySelector('.weather-box .description').textContent = description;
            document.querySelector('.humidity span').textContent = humidity;
            document.querySelector('.wind span').textContent = windSpeed;

            // cityHide.textContent = city;
            container.style.height = '555px';
            error404.classList.remove('active');
            weatherBox.classList.add('active');
            weatherDetails.classList.add('active');
        })
        .catch(console.error);
});

// Get weather icon based on conditions
function getWeatherIcon(condition) {
    const icons = {
        Clear: 'image/clear.png',
        Rain: 'image/rain.png',
        Snow: 'image/snow.png',
        Clouds: 'image/cloud.png',
        Mist: 'image/mist.png',
        Haze: 'image/mist.png',
        Drizzle: 'image/drizzle.png'
    };
    return icons[condition] || 'image/cloud.png';
}
