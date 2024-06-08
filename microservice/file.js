const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch'); 
const fs = require('fs').promises;
const path = require('path');

// Creates the express app and port
const app = express();
const port = 3001;

//Utility function to get a random item from a list
function getRandomItem(list) {
    const randomIndex = Math.floor(Math.random() * list.length);
    return list[randomIndex];
}

// Reads and parses a JSON file
async function readJsonFile(filePath) {
    try {
        const fullPath = path.join(__dirname, filePath);
        const rawData = await fs.readFile(fullPath, 'utf8');
        return JSON.parse(rawData);
    } catch (error) {
        console.error('Error reading JSON file:', error);
        throw error;
    }
}

app.use(express.json());
app.use(cors()); 

app.get('/', (req, res) => {
    res.send('Hello, this is your microservice!');
});

// the endpoint to get a random item from a list
app.get('/api/getRandomItem', async (req, res) => {
    try {
        const cities = await readJsonFile('data.json');
        const randomCity = getRandomItem(cities);

        res.json(randomCity);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
});

// the endpoint to fetch weather data for a random city
app.get('/api/getRandomWeather', async (req, res) => {
    try {
        
        const randomCityResponse = await fetch('http://localhost:3001/api/getRandomItem');
        const cityData = await randomCityResponse.json();

        console.log(cityData); 

        
        const apiKey = '744a98d1acdb71500e05085bf742898d';

        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityData.name}&appid=${apiKey}&units=metric`;

        const weatherResponse = await fetch(weatherUrl);

        if (!weatherResponse.ok) {
            throw new Error('Failed to fetch weather data');
        }

        const weatherData = await weatherResponse.json();

        const response = {
            city: cityData.name,
            temperature: weatherData.main.temp,
            description: weatherData.weather[0].description
        };

        res.json(response);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});