import React, { useState } from 'react';
import axios from 'axios';
import './CitySearch.css';

const CitySearch = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const handleCitySearch = async () => {
    try {
      const response = await axios.get(`/http://localhost:3002/weather?searchQuery=${city}`);
      setWeatherData(response.data.cityWeatherData);
      setError('');
    } catch (error) {
      setWeatherData(null);
      setError('City not found.');
    }
  };

  return (
    <div className="city-search">
      <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
      <button onClick={handleCitySearch}>Search</button>

      {error && <p>{error}</p>}

      {weatherData && (
        <div className="weather-container">
          <h2>Weather Forecast</h2>
          {weatherData.map((forecast, index) => (
            <div key={index} className="forecast-item">
              <p>Date: {forecast.date}</p>
              <p>Description: {forecast.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CitySearch;
