import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { io } from 'socket.io-client';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-routing-machine';


// const userIcon = new L.Icon({
//     iconUrl: 'https://cdn-icons-png.flaticon.com/512/616/616408.png',
//     iconSize: [25, 25],
//     iconAnchor: [12, 12],
//   });

  
  const Direction = () => {
    const [currentPosition, setCurrentPosition] = useState(null);
  
    useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setCurrentPosition([latitude, longitude]);
          },
          (error) => console.error('Error fetching geolocation', error),
        );
      } else {
        alert('Geolocation is not supported by your browser');
      }
    }, []);

  const divStyle = {
    height: '30rem', // Set your desired height
    width: '75rem',  // Set your desired width
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '20px auto', // Center the div horizontally
  };

  return (
    <div style={divStyle}>
      {currentPosition ? (
        <MapContainer
          style={{ height: '100%', width: '100%' }}
          center={currentPosition} // Center the map at the user's current location
          zoom={13}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={currentPosition}  />
        </MapContainer>
      ) : (
        <p>Loading map...</p>
      )}
    </div>
  );
};

export default Direction;
