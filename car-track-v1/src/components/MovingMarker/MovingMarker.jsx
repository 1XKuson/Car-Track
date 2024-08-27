import React, { useEffect, useState } from "react";
import { Marker } from "@react-google-maps/api";
import icon_car from "../../assets/golf.png"
import icon_boat from "../../assets/boat.png"
const MovingMarker = ({position,name}) => {
  const iconStyle = {
    url: name === "Tram" ? icon_car : name === "Boat" ? icon_boat : icon_car,
    scaledSize: new window.google.maps.Size(50, 50), // Change size as needed
    labelOrigin: new google.maps.Point(30, 60)
  };

  return (
    <>
      {position.filter(p => p.unicon_id.match(/^unicon_\d{2}$/)).map((position) => (
      
        <Marker
          key={position.unicon_id}
          position={{ lat: position.position.lat, lng: position.position.lng }   
        }
        // label={position.unicon_id}
        label={{
          text: name+" "+position.unicon_id.slice(7),
          color: "black", 
          fontWeight:"bold",
          fontSize:"20px"
        }}
        
        icon={iconStyle}
        />
      ))}
    </>
  );
};

export default MovingMarker;
