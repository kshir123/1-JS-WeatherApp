// Whole-script strict mode syntax
"use strict";

const API_KEY = '1bf9340c42be212dbad705254cc3a66a';
const API_URL = `https://api.openweathermap.org/data/2.5/weather?&appid=${API_KEY}&units=metric&q=`;

const SEARCH_BOX = document.querySelector('.search input');
const SEARCH_BUTTON = document.querySelector('.search button');
const WEATHER_ICON = document.querySelector('.weather-icon');
const ERROR_ELEMENT = document.querySelector('.error');
const WEATHER_ELEMENT = document.querySelector('.weather');
const CITY_ELEMENT = document.querySelector('.city');
const TEMP_ELEMENT = document.querySelector('.temp');
const HUMIDITY_ELEMENT = document.querySelector('.humidity');
const WIND_ELEMENT = document.querySelector('.wind');

// Onclick of SEARCH_BUTTON it calls checkWeather()
function clickEventHandler() {
  SEARCH_BUTTON.addEventListener('click', ()=>{
    const city = SEARCH_BOX.value;
    checkWeather(city);
  })
}

/**
 * Fetches and displays weather information for a given city.
 * @async
 * @function checkWeather
 * @param {string} city - The name of the city to fetch weather information for.
 * @returns {Promise<void>} - A promise that resolves when the weather information is fetched and displayed.
 */
async function checkWeather(city) {
  try {
    const response = await fetch(`${API_URL}${city}`);

    if (!response.ok) {
      handleWeatherError();
      return;
    }

    const data = await response.json();
    updateWeatherUI(data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    handleWeatherError();
  }
}

/**
 * Handles errors in fetching weather data.
 */
function handleWeatherError() {
  ERROR_ELEMENT.style.display = 'block';
  WEATHER_ELEMENT.style.display = 'none';
}

/**
 * Updates the weather UI with the fetched data.
 *
 * @param {Object} data - The weather data object.
 */
function updateWeatherUI(data) {
  CITY_ELEMENT.textContent = data.name;
  TEMP_ELEMENT.textContent = `${Math.round(data.main.temp)} °C`;
  HUMIDITY_ELEMENT.textContent = `${data.main.humidity} %`;
  WIND_ELEMENT.textContent = `${data.wind.speed} km/h`;

  const WEATHER_ICON_MAP = {
    Clear: 'images/clear.png',
    Clouds: 'images/clouds.png',
    Drizzle: 'images/drizzle.png',
    Humidity: 'images/humidity.png',
    Mist: 'images/mist.png',
    Rain: 'images/rain.png',
    Snow: 'images/snow.png',
    Wind: 'images/wind.png'
  };

   // Update the weather icon based on the main weather condition
  WEATHER_ICON.src = WEATHER_ICON_MAP[data.weather[0].main] || 'images/default.png';
  WEATHER_ICON.alt = WEATHER_ICON_MAP[data.weather[0].main] || 'images/default.png';

  ERROR_ELEMENT.style.display = 'none';
  WEATHER_ELEMENT.style.display = 'block';
}

clickEventHandler();
