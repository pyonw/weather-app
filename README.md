Weather Microservice

**Overview**

This project is a web-based microservice designed to fetch and display weather data. It utilizes a React frontend and an Express backend to handle weather data requests. Users can either enter a specific city to get the current weather or request random weather data.

**Features**

Current Weather Search: Users can search for the current weather by entering a city name.
Random Weather Data: Users can request random weather data, showcasing different cities' weather.
Responsive Web Design: The service is accessible via a web interface that is both functional and user-friendly.
How to Run

**Prerequisites**
Node.js
npm or yarn

**Installation**
Clone the repository to your local machine.
Navigate to the project directory and install the dependencies:
npm install

**Running the Application**
To start the backend server:
node index.js

To run the frontend:
cd client   // If your frontend is in a 'client' directory
npm start

**Usage**
The web interface can be accessed at http://localhost:3000 by default.
Enter a city name and click the search button to retrieve and display the weather.
Click the "Fetch Random Item" button to receive random weather data.
API Endpoints

GET /api/getRandomItem: Returns random city weather data.
GET /api/getRandomWeather: Fetches weather data for a random city using the internal API.
Technologies Used

Frontend: React.js
Backend: Express.js
API: OpenWeatherMap for fetching real-time weather data.
License
