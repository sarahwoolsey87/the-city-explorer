// Map.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Map = ({ lat, lon }) => {
  const [mapImage, setMapImage] = useState('');

  useEffect(() => {
    
    const apiKey = 'pk.6fd2cdca134aa83d54f53fa5d7a93088';
    const apiUrl = `https://maps.locationiq.com/v3/staticmap?key=${apiKey}&center=${lat},${lon}&zoom=13&size=400x400&format=png`;

    // Fetch the static map image from LocationIQ API
    const fetchMapImage = async () => {
      try {
        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
        const base64 = btoa(
          new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
        setMapImage(`data:image/png;base64,${base64}`);
      } catch (error) {
        console.error('Error fetching map image:', error);
      }
    };

    fetchMapImage();
  }, [lat, lon]);

  return <img src={mapImage} alt="City Map" />;
};

export default Map;
