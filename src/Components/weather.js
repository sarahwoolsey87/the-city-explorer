// Weather.js
import React from 'react';

const Weather = ({ forecastData }) => {
  return (
    <div className="weather-container">
      <h2>Weather Forecast</h2>
      {forecastData.map((forecast, index) => (
        <div key={index} className="forecast-item">
          <p>Date: {forecast.date}</p>
          <p>Description: {forecast.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Weather;
