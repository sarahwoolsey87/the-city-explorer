import { useState } from "react";

import "./App.css";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState({});
  const [map, setMap] = useState("");

  function handleSearch(event) {
    setSearchQuery(event.target.value);
  }

  async function getLocation(event) {

    //console.log("API Key:", process.env.REACT_APP_LOCATIONIQ_API_KEY);
    try {
      event.preventDefault();
      //setSearchQuery("");
  
      const API = `https://eu1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${searchQuery}&format=json`;
      const res = await fetch(API);
  
      if (!res.ok) {
        throw new Error("API request failed.");
      }
  
      const data = await res.json();
  
      if (data && data.length > 0) {
        setLocation(data[0]);
        handleMap(data[0]);
      } else {
        console.log("No location data found.");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  }

  function handleMap(data) {
    const mapURL = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_API_KEY}&center=${data.lat},${data.lon}&zoom=12`;
    setMap(mapURL);
  }

  return (
    <div className="App">
      <form onSubmit={getLocation}>
        <input
          type="text"
          placeholder="search for a city"
          name="input"
          onChange={handleSearch}
        />
        <button type="submit">Explore!</button>
      </form>
      <div className="map-container">
        {map && <img src={map} alt="map" />}
      </div>
      <div className="location-info">
        <p>{location.display_name}</p>
        <p>Latitude: {location.lat}</p>
        <p>Longitude: {location.lon}</p>
      </div>
    </div>
  );
}

export default App;
