import React, { useEffect, useState } from "react";
import { Marker } from "@react-google-maps/api";
import icon_car from "../../assets/golf.png"
const MovingMarker = () => {
  const [positions, setPositions] = useState([
    {
      id: 1,
      lat: 13.727212196123071,
      lng: 100.77400330345057,
    },
    {
      id: 2, // Changed id to 2 to avoid duplication
      lat: 13.726212196123071,
      lng: 100.77400330345057,
    },
    {
      id: 3, // Changed id to 2 to avoid duplication
      lat: 13.728212196123071,
      lng: 100.77400330345057,
    },
    {
      id: 4, // Changed id to 2 to avoid duplication
      lat: 13.725212196123071,
      lng: 100.77400330345057,
    },
    {
      id: 5, // Changed id to 2 to avoid duplication
      lat: 13.724212196123071,
      lng: 100.77400330345057,
    },
  ]);
  const iconStyle = {
    url: icon_car,
    scaledSize: new window.google.maps.Size(50, 50), // Change size as needed
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setPositions((prevPositions) =>
        prevPositions.map((position) => {
          const t = performance.now();
          const newLat = position.lat + Math.sin(t / 2000) * 0.0001;
          const newLng = position.lng + Math.cos(t / 3000) * 0.0001;
          return { ...position, lat: newLat, lng: newLng };
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {positions.map((position) => (
        <Marker
          key={position.id}
          position={{ lat: position.lat, lng: position.lng }   
        }
        icon={iconStyle}
        />
      ))}
    </>
  );
};

export default MovingMarker;
