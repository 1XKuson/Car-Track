import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useState } from "react";

const Map = () => {
  const containerStyle = {
    width: "100vw",
    height: "100vh",
    position:"absolute",
  };

  const center = {
    lat: 13.727179082209606, 
    lng: 100.77650495414039,
  };
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyC2Va7mDBcmuCee_Y3thK4TrDq-RVPbNDI",
  });

  const [map, setMap] = useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <>

          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={17}
            onLoad={onLoad}
            onUnmount={onUnmount}
          ></GoogleMap>
    </>
  ) : (
    <></>
  );
};

export default Map;