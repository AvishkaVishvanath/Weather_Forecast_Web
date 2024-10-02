import { fetchWeatherData, futureForecast } from './api.js';  // Import the fetch function

// Example: Update a variable or DOM element based on the API data
let temperature, city, weatherDescription, windSpeed, weatherIcon, pressure, humidity, visibility, feels_like, sunRiseTimestamp, sunSetTimestamp;

// Create a new Date object for the current date
const currentDate = new Date();

// Format the date as "Wednesday 1 March"
const formattedDate = currentDate.toLocaleDateString('en-US', {
  weekday: 'long',   // Full name of the weekday
  day: 'numeric',    // Day of the month
  month: 'long'      // Full name of the month
});

// Update the content of the <p> element with id="dateNow"
document.getElementById('dateNow').textContent = formattedDate;



document.getElementById('searchBtn').onclick = async function() {
    const city = document.getElementById('searchTextField').value.trim();

    if (city) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=530f6ff3ac15f6eb4d0aa9d044783684`;

        try {
            const response = await fetch(apiUrl);  // Wait for the fetch response
            if (!response.ok) {
                throw new Error('City not found');
            }

            const data = await response.json();  // Wait for the data to be parsed
            console.log(data);
            displayWeather(data);  // Display the weather data after the API call succeeds
        } catch (error) {
            console.error('Error fetching weather data:', error);
            alert(error.message);  // Alert the user in case of an error
        }
    } else {
        alert('Please enter a city name');
    }
};


function displayWeather(data) {
    temperature = weatherData.main.temp - 273.15;  // Convert Kelvin to Celsius

    
    document.getElementById('tempNow').innerHTML = `${temperature.toFixed(2)}°C`;

}


// Function to update variables with API data
async function updateWeatherInfo() {
    const weatherData = await fetchWeatherData();
    
    if (weatherData) {
        // Extract values from the API response
        city = weatherData.name;
        temperature = weatherData.main.temp - 273.15;  // Convert Kelvin to Celsius
        weatherDescription = weatherData.weather[0].description;
        windSpeed = weatherData.wind.speed;
        weatherIcon = weatherData.weather[0].icon;
        pressure = weatherData.main.pressure;
        humidity = weatherData.main.humidity;
        visibility = weatherData.visibility / 1000;  // Convert meters to kilometers
        feels_like = weatherData.main.feels_like - 273.15;
        sunRiseTimestamp = weatherData.sys.sunrise;
        sunSetTimestamp = weatherData.sys.sunset;

        const sunrise = new Date(sunRiseTimestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const sunset = new Date(sunSetTimestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        // Update DOM with data
        document.getElementById('tempNow').innerHTML = `${temperature.toFixed(2)}°C`;
        document.getElementById('location').innerHTML = `${city}`;
        document.getElementById('iconNow').src = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;  // Update with OpenWeatherMap icons
        document.getElementById('pressure').innerHTML = `${pressure} hPa`;  
        document.getElementById('humidity').innerHTML = `${humidity}%`;  
        document.getElementById('visibility').innerHTML = `${visibility.toFixed(2)} km`;  
        document.getElementById('feels_like').innerHTML = `${feels_like.toFixed(2)}°C`;
        document.getElementById('sunrise').innerHTML = `${sunrise}`;
        document.getElementById('sunset').innerHTML = `${sunset}`;
    } else {
        // If error, display message
        document.getElementById('tempNow').innerHTML = 'Error fetching weather data';
    }
}

// Function to update variables with forecast API data
async function displayForecast() {
    const forecastData = await futureForecast();
  
    if (forecastData) {
      const tbody = document.querySelector('.forecastTemperature tbody');
      tbody.innerHTML = ""; // Clear existing content
  
      // Loop through the first five days of forecast
      for (let i = 0; i < 5; i++) {
        const dayData = forecastData.list[i * 8];  // Get the forecast at 9 AM (every 8th entry)
        const temperature = dayData.main.temp - 273.15;  // Convert from Kelvin to Celsius
        const weatherIcon = dayData.weather[0].icon;  // Get the weather icon
        const date = new Date(dayData.dt * 1000);  // Convert UNIX timestamp to Date object
        const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });  // Format the date
        const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' });  // Get the weekday
  
        // Create a new table row
        const row = document.createElement('tr');
  
        // Create cells for Day, Date, Temp, and Icon
        const dayCell = document.createElement('td');
        dayCell.textContent = dayOfWeek;
        const dateCell = document.createElement('td');
        dateCell.textContent = formattedDate;
        const tempCell = document.createElement('td');
        tempCell.textContent = `${temperature.toFixed(2)}°C`;
        const iconCell = document.createElement('td');
        const iconImage = document.createElement('img');
        iconImage.src = `http://openweathermap.org/img/wn/${weatherIcon}.png`;
        iconCell.appendChild(iconImage);
  
        // Append cells to the row
        row.appendChild(dayCell);
        row.appendChild(dateCell);
        row.appendChild(tempCell);
        row.appendChild(iconCell);
  
        // Append the row to the table body
        tbody.appendChild(row);
      }
    } else {
      console.error('Error fetching forecast data');
    }
  }


// Call the function on page load to display the forecast
window.onload = displayForecast;

// Call the function to update the UI with weather API data
updateWeatherInfo();
