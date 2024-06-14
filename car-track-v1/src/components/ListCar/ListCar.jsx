import React, { useState } from "react";
import DetailCar from "../../components/DetailCar/DetailCar";
import "./ListCar.css";

const ListCar = () => {
  const [listCar] = useState([
    { id: 1, name: "Unicon 1" },
    { id: 2, name: "Unicon 2" },
    { id: 3, name: "Unicon 3" },
    { id: 4, name: "Unicon 4" },
    { id: 5, name: "Unicon 5" },
  ]);

  const [showSideNav, setShowSideNav] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  const handleCarClick = (car) => {
    if (selectedCar && selectedCar.id === car.id) {
      // If the same car is clicked, hide the side navigation and deselect the car
      setShowSideNav(false);
      setSelectedCar(null);
    } else {
      // If a different car is clicked, update the selected car and show the side navigation
      setSelectedCar(car);
      setShowSideNav(true);
    }
  };

  return (
    <div className="big-container">
      <DetailCar
        show={showSideNav}
        setShowSideNav={setShowSideNav}
        selectedCar={selectedCar}
      />
      <div className="footer">
        <div className="openbtn">
          <img src="../../src/Icon/arrowForward.png" alt="" />
        </div>
        {listCar.map((car) => (
          <>
            <div
              className={`box-car ${selectedCar && selectedCar.id === car.id ? "active" : ""}`}
              key={car.id}
              onClick={() => handleCarClick(car)}
            >
              {car.name}
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default ListCar;
