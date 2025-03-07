# Weather App

A modern, responsive weather application built with HTML, JavaScript, and Tailwind CSS. This app allows users to check current weather conditions and 5-day forecasts for any city worldwide.

## Features

- Current weather conditions including:
  - Temperature
  - Weather description
  - Feels like temperature
  - Wind speed
  - Humidity
  - Pressure
- 5-day weather forecast
- Responsive design that works on all devices
- Modern UI with smooth animations
- Error handling and loading states

## Setup

1. Get an API Key:
   - Sign up for a free account at [OpenWeatherMap](https://openweathermap.org/api)
   - Navigate to your account's "API Keys" section
   - Copy your API key

2. Configure the API Key:
   - Open `js/script.js`
   - Replace `'YOUR_API_KEY'` with your actual OpenWeatherMap API key:
     ```javascript
     const API_KEY = 'your-api-key-here';
     ```

3. Run the application:
   - Start a local server (e.g., using Python):
     ```bash
     python3 -m http.server 8000
     ```
   - Open your browser and navigate to `http://localhost:8000`

## Usage

1. Enter a city name in the search box
2. Press Enter or click the search button
3. View the current weather conditions and 5-day forecast

## Technologies Used

- HTML5
- JavaScript (ES6+)
- Tailwind CSS
- OpenWeatherMap API
- Google Fonts
- Font Awesome icons

## Error Handling

The app includes comprehensive error handling for:
- Invalid API keys
- City not found
- Network errors
- Empty search queries

## License

This project is open source and available under the MIT License.
