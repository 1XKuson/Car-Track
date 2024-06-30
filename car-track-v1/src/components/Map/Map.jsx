import React, { useState, useCallback } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Polyline,
  Marker,
} from "@react-google-maps/api";

import pathCoordinates from "../route";
import icon from "../../Icon/arrowForward.png";
import mapTheme from "../../components/mapTheme";
import MovingMarker from "../MovingMarker/MovingMarker";
const Map = ({position}) => {

  // console.log(position)

  const containerStyle = {
    width: "100vw",
    height: "100vh",
    position: "relative",
  };

  const center = {
    lat: 13.72649077839198,
    lng: 100.77435998380524,
  };

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyC2Va7mDBcmuCee_Y3thK4TrDq-RVPbNDI", // Replace with your actual API key
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  if (!isLoaded || loadError) {
    return null;
  }

  const arrow = {
    path: "M18.2929 15.2893C18.6834 14.8988 18.6834 14.2656 18.2929 13.8751L13.4007 8.98766C12.6195 8.20726 11.3537 8.20757 10.5729 8.98835L5.68257 13.8787C5.29205 14.2692 5.29205 14.9024 5.68257 15.2929C6.0731 15.6835 6.70626 15.6835 7.09679 15.2929L11.2824 11.1073C11.673 10.7168 12.3061 10.7168 12.6966 11.1073L16.8787 15.2893C17.2692 15.6798 17.9024 15.6798 18.2929 15.2893Z",
    fillColor: "#E41717",
    fillOpacity: 1,
    scale: 1,
    strokeColor: "gray",
    strokeWeight: 0.3,
    anchor: new window.google.maps.Point(12, 0), // Make sure window.google.maps is loaded before this line
  };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={18}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        styles: mapTheme,
      }}
    >
      <Polyline
        path={pathCoordinates}
        options={{
          strokeColor: "#F59C43",
          strokeOpacity: 1.0,
          strokeWeight: 4,
          offsetY: 2,
          icons: [
            {
              icon: arrow,
              offset: "10%", // Start position of the first icon
              repeat: "50px", // Distance between each icon
            },
          ],
        }}
      />

      <Marker
        position={{ lat: 13.727440788132853, lng: 100.7743592727686 }}
        title={"AdvancedMarker with custom html content."}
      ></Marker>
      <MovingMarker position={position}/>
    </GoogleMap>
  );
};

export default Map;
