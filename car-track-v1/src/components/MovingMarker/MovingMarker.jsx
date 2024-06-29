import React, { useEffect, useState } from "react";
import { Marker } from "@react-google-maps/api";
import icon_car from "../../assets/golf.png"
const MovingMarker = ({position}) => {
  // console.log(position)

  const iconStyle = {
    url: icon_car,
    scaledSize: new window.google.maps.Size(50, 50), // Change size as needed
  };

  return (
    <>
      {position.map((position) => (
        <Marker
          key={position.unicon_id}
          position={{ lat: position.position.lat, lng: position.position.lng }   
        }
        icon={iconStyle}
        />
      ))}
    </>
  );
};

export default MovingMarker;
