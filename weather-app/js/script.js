// DOM Elements
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const loadingState = document.getElementById('loadingState');
const errorMessage = document.getElementById('errorMessage');
const errorText = document.getElementById('errorText');
const currentWeather = document.getElementById('currentWeather');
const forecast = document.getElementById('forecast');
const forecastContainer = document.getElementById('forecastContainer');

// OpenWeatherMap API configuration
const API_KEY = 'YOUR_API_KEY'; // TODO: Replace with your OpenWeatherMap API key from https://openweathermap.org/api
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Check if API key is not set
if (API_KEY === 'YOUR_API_KEY') {
    console.error('Please set your OpenWeatherMap API key in script.js');
    showError('⚠️ This app requires an OpenWeatherMap API key to function. Please set your API key in script.js');
}

// Event Listeners
searchBtn.addEventListener('click', handleSearch);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

// Main search handler
async function handleSearch() {
    const city = cityInput.value.trim();
    if (!city) {
        showError('Please enter a city name');
        return;
    }

    showLoading();
    hideError();
    
    try {
        const weatherData = await fetchWeatherData(city);
        const forecastData = await fetchForecastData(city);
        
        updateCurrentWeather(weatherData);
        updateForecast(forecastData);
        
        currentWeather.classList.remove('hidden');
        forecast.classList.remove('hidden');
    } catch (error) {
        showError('Failed to fetch weather data. Please try again.');
        console.error('Error:', error);
    } finally {
        hideLoading();
    }
}

// Fetch current weather data
async function fetchWeatherData(city) {
    const response = await fetch(
        `${BASE_URL}/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
    );
    
    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Invalid API key. Please check your OpenWeatherMap API key.');
        } else if (response.status === 404) {
            throw new Error('City not found. Please check the city name and try again.');
        } else {
            throw new Error('Failed to fetch weather data. Please try again later.');
        }
    }
    
    return response.json();
}

// Fetch 5-day forecast data
async function fetchForecastData(city) {
    const response = await fetch(
        `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
    );
    
    if (!response.ok) {
        throw new Error('Forecast data not available');
    }
    
    return response.json();
}

// Update current weather UI
function updateCurrentWeather(data) {
    document.getElementById('cityName').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('currentDate').textContent = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById('weatherDescription').textContent = data.weather[0].description;
    document.getElementById('feelsLike').textContent = `${Math.round(data.main.feels_like)}°C`;
    document.getElementById('windSpeed').textContent = `${data.wind.speed} m/s`;
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;
    document.getElementById('pressure').textContent = `${data.main.pressure} hPa`;
    
    const iconCode = data.weather[0].icon;
    document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

// Update forecast UI
function updateForecast(data) {
    forecastContainer.innerHTML = '';
    
    // Group forecast by day and get mid-day forecast
    const dailyForecasts = data.list.reduce((acc, forecast) => {
        const date = new Date(forecast.dt * 1000).toLocaleDateString();
        if (!acc[date] && Object.keys(acc).length < 5) {
            acc[date] = forecast;
        }
        return acc;
    }, {});

    // Create forecast cards
    Object.values(dailyForecasts).forEach(forecast => {
        const date = new Date(forecast.dt * 1000);
        const card = document.createElement('div');
        card.className = 'bg-white rounded-lg shadow-md p-4 text-center';
        
        card.innerHTML = `
            <p class="font-semibold text-gray-700">${date.toLocaleDateString('en-US', { weekday: 'short' })}</p>
            <p class="text-gray-500 text-sm">${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
            <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" 
                 alt="${forecast.weather[0].description}"
                 class="w-16 h-16 mx-auto">
            <p class="text-2xl font-bold text-gray-800">${Math.round(forecast.main.temp)}°C</p>
            <p class="text-gray-600 text-sm capitalize">${forecast.weather[0].description}</p>
        `;
        
        forecastContainer.appendChild(card);
    });
}

// UI Helper functions
function showLoading() {
    loadingState.classList.remove('hidden');
}

function hideLoading() {
    loadingState.classList.add('hidden');
}

function showError(message) {
    errorText.textContent = message;
    errorMessage.classList.remove('hidden');
}

function hideError() {
    errorMessage.classList.add('hidden');
}
