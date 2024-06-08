import React, { useState } from 'react';
import { fetchWeather, fetchRandomWeather } from './WeatherService';
import './Weather.css';

// Weather component definition
function Weather() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [unit, setUnit] = useState('metric'); 
  const [isLoading, setIsLoading] = useState(false); 

  // Handle search operation
  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true); 
    try {
      const data = await fetchWeather(city, unit);
      setWeather(data);
      setError('');
    } catch (error) {
      setError(error.message);
      setWeather(null);
    } finally {
      setIsLoading(false); 
    }
  };
  // Function to clear the city input
  const clearInput = () => {
    // Prompt user for confirmation before clearing input field
    const confirmClear = window.confirm('Are you sure you want to clear the city input?');
    if (confirmClear) {
      setCity(''); 
      setWeather(null); 
    }
  };
  // Function to reset the unit to metric
  const clearUnitSelection = () => {
    setUnit('metric'); // Reset temperature unit to default (metric)
  };

  // Function to toggle the unit between metric and imperial
  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };

  // The conversion for Celsius to Fahrenheit
  const convertToFahrenheit = (celsius) => {
    return (celsius * 9/5) + 32;
  };

  // Handles fetching weather for a random city
  const handleRandomize = async () => {
    setIsLoading(true); 
    try {
        const randomData = await fetchRandomWeather();
        
        const formattedData = {
            name: randomData.city,
            weather: [{
                
                description: randomData.description,
                icon: "01d" 
            }],
            main: {
                temp: randomData.temperature,
            },
        };
        setWeather(formattedData);
        setError('');
    } catch (error) {
        console.error(error);
        setError(error.message);
        setWeather(null);
    } finally {
        setIsLoading(false); 
    }
};


// Render function for the weather component 
return (
  <div className="container">
    <h1>Weather App</h1>
    <p className="description">Enter a city name below to get the current weather conditions:</p>
    <form onSubmit={handleSearch} className="form">
      <div className="input-container">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          className="city-input"
        />
        {city && <button type="button" onClick={clearInput} className="clear-button">X</button>}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}> 
        <button type="submit" className="button">Get Weather</button>
        <button type="button" onClick={handleRandomize} className="button randomize-button" style={{ marginLeft: '10px' }}>Random City</button>
      </div>
      {isLoading && <p className="loading-message">Fetching weather data... This may take a moment.</p>}
    </form>
    <button onClick={toggleUnit} className="button">{unit === 'metric' ? 'Show Fahrenheit' : 'Show Celsius'}</button>
    {unit !== 'metric' && <button onClick={clearUnitSelection} className="clear-button">X</button>}
    {isLoading && <p className="loading-message">Fetching weather data...</p>}
    {error && <p className="error">{error}</p>}
    {weather && weather.weather && weather.weather[0] && (
  <div className="weather-info">
    <h2>{weather.name}</h2>
    <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt="Weather Icon" />
    <p>{unit === 'metric' ? weather.main.temp : convertToFahrenheit(weather.main.temp)}°{unit === 'metric' ? 'C' : 'F'}</p>
    <p>{weather.weather[0].description}</p>
  </div>
)}
  </div>
);
}

export default Weather;