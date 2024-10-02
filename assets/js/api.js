/**
 * @license MIT
 * @fileoverview All api related stuff like api_key, api request etc.
 * @copyright codewithsadee 2023 All rights reserved
 * @author codewithsadee <mohammadsadee24@gmail.com>
 */


// api.js
export async function fetchWeatherData() {
    const apiURL = 'https://api.openweathermap.org/data/2.5/weather?lat=6.9271&lon=79.8612&appid=530f6ff3ac15f6eb4d0aa9d044783684'; 
    
    try {
        const response = await fetch(apiURL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;  // Return the JSON data to be used in main.js
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;  // Return null if there's an error
    }
}

export async function futureForecast() {
    const apiURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=6.9271&lon=79.8612&appid=530f6ff3ac15f6eb4d0aa9d044783684'; 
    
    try {
        const response = await fetch(apiURL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;  // Return the JSON data to be used in main.js
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;  // Return null if there's an error
    }
}

// export async function fetchWeatherName() {
//     const apiURL = 'https://api.openweathermap.org/data/2.5/weather?q='+{cityName}+'&appid=530f6ff3ac15f6eb4d0aa9d044783684'; 
    
//     try {
//         const response = await fetch(apiURL);
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }

//         const data = await response.json();
//         return data;  // Return the JSON data to be used in main.js
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         return null;  // Return null if there's an error
//     }
// }



// https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=530f6ff3ac15f6eb4d0aa9d044783684


// 5 days forecast

// https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=530f6ff3ac15f6eb4d0aa9d044783684

// api.openweathermap.org/data/2.5/forecast?q={city name}&appid=530f6ff3ac15f6eb4d0aa9d044783684

// Search by city name
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=530f6ff3ac15f6eb4d0aa9d044783684

// 16 days forecast

// https://api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}

// city
// https://api.openweathermap.org/data/2.5/forecast/daily?q={city name}&cnt={cnt}&appid={API key}

// hourly forecast

// https://pro.openweathermap.org/data/2.5/forecast/hourly?lat={lat}&lon={lon}&appid={API key}

// https://pro.openweathermap.org/data/2.5/forecast/hourly?q={city name}&appid={API key}