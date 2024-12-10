import React, { useEffect, useState,useRef} from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useLocation } from 'react-router-dom';
import 'leaflet-routing-machine';
import 'leaflet-control-geocoder';


const Direction = ({}) => {
  const location= useLocation();
  const { lat, lon } = location.state || {};
  const [currentPosition, setCurrentPosition] = useState(null);
  const [error, setError] = useState(null);
  const [route, setRoute] = useState([]);
  const [isNavigating, setIsNavigating] = useState(false);
  const mapRef = useRef();
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = [position.coords.latitude, position.coords.longitude];
          setCurrentPosition(coords);
        },
        (err) => {
          console.error('Error getting geolocation:', err);
          setError(err.message);
        }
      );
    } else {
      alert('Geolocation is not supported by your browser');
    }
  }, []);


  useEffect(() => {
    if (currentPosition && lat && lon && isNavigating) {
        // Create a routing control
        const map = mapRef.current;
        const control = L.Routing.control({
            waypoints: [
                L.latLng(currentPosition[0], currentPosition[1]),
                L.latLng(lat, lon)
            ],
            routeWhileDragging: true,
            geocoder: L.Control.Geocoder.nominatim(),
            createMarker: () => null,
            show: false
        }).addTo(map);


        control.on('routesfound', (e) => {
          const routes = e.routes;
          setRoute(routes[0].coordinates); 
      });

        // Clean up on component unmount
        return () => {
            map.removeControl(control);
        };
    }
}, [currentPosition, lat, lon, isNavigating]);

const handleStartNavigation = () => {
  setIsNavigating(true); // Start navigation
};

if (typeof lat !== 'number' || typeof lon !== 'number' || lat < -90 || lat > 90 || lon < -180 || lon > 180) {
  return <div>Error: Invalid coordinates</div>;
}

const complaintLatLon = L.latLng(lat, lon);
const currentLatLon = currentPosition ? L.latLng(currentPosition[0], currentPosition[1]) : null;

const centerLat = currentPosition ? (currentPosition[0] + lat) / 2 : lat;
const centerLon = currentPosition ? (currentPosition[1] + lon) / 2 : lon;

return ( 
  <div style={{ position: 'relative'}}>
      <MapContainer center={[centerLat, centerLon]} zoom={13} style={{ height: '30rem', width: '77rem',margin: '1rem',marginLeft:'1rem' }} ref={mapRef}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {currentPosition && <Marker position={currentLatLon} />}
          <Marker position={complaintLatLon} />
          {route.length > 0 && <Polyline positions={route} color="blue" />}
          {error && <div>Error: {error}</div>}
      </MapContainer>
      <button onClick={handleStartNavigation} style={{position: 'absolute', bottom: '10px',left: '10px', padding: '10px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px' ,zIndex: 1000}}>
          Start Navigation
      </button>
  </div>
  );
};

export default Direction;
