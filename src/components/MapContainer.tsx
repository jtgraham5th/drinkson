import React, { useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const MapContainer: React.FC<{ searchTerm: string }> = ({ searchTerm }) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [currentSearchTerm, setCurrentSearchTerm] = useState(searchTerm);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDpNK-55cC1ZxVpHWjjSRWnuFZQ-DUVKJY",
    libraries: ["places"],
  });

  const handleMapLoad = (map: google.maps.Map) => {
    setMap(map);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Perform search logic with the search term
    console.log("Search term:", currentSearchTerm);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          if (map) {
            // Update map center to user's current location
            map.setCenter({ lat: latitude, lng: longitude });

            // Perform search using the map service provider's API
            const service = new google.maps.places.PlacesService(map);
            const request = {
              location: { lat: latitude, lng: longitude },
              radius: 1000, // Search radius in meters
              keyword: currentSearchTerm,
            };

            service.nearbySearch(request, (results: any, status: any) => {
              if (status === google.maps.places.PlacesServiceStatus.OK) {
                // Extract relevant data from the API response
                const locations = results.map((result: any) => result.name);

                // Update search results state
                setSearchResults(locations);
              }
            });
          }
        },
        (error) => {
          console.error(error);
        }
      );
    }
  };

  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  return (
    <div>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          onLoad={handleMapLoad}
        ></GoogleMap>
      ) : (
        <div>Loading...</div>
      )}
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={currentSearchTerm}
          onChange={(e) => setCurrentSearchTerm(e.target.value)}
          placeholder="Search for a bar..."
        />
        <button type="submit">Search</button>
      </form>
      <div>
        {searchResults.map((result, index) => (
          <div key={index}>{result}</div>
        ))}
      </div>
    </div>
  );
};

export default MapContainer;
