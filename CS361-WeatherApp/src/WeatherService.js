// API key accessing the weather data
const apiKey = 'apikey';

// Contstructs the URL for the API request
export const fetchWeather = async (city, state) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${state}&appid=${apiKey}&units=metric`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Weather data for ${city}, ${state} not found.`);
  }
  const data = await response.json();
  return data;
};

// Local server enpoint that returns random weather data
export const fetchRandomWeather = async () => {
  const baseUrl = 'http://localhost:3001/api/getRandomWeather';

  try {
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch random weather data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch Error:", error);
    throw error;
  }
};