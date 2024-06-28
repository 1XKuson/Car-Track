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

  const handleDropdownChange = (event) => {
    const selectedCarId = parseInt(event.target.value, 10);
    const car = listCar.find((car) => car.id === selectedCarId);
    if (car) {
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
      <div className="footerDesktop">
        {listCar.map((car) => (
          <div
            className={`box-car ${selectedCar && selectedCar.id === car.id ? "active" : ""}`}
            key={car.id}
            onClick={() => handleCarClick(car)}
          >
            {car.name}
          </div>
        ))}
      </div>

      <div className="footerMobile">
        <select className="selectCar" onChange={handleDropdownChange} value={selectedCar ? selectedCar.id : ""}>
          <option value="" disabled>Select a car</option>
          {listCar.map((car) => (
            <option key={car.id} value={car.id}>
              {car.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ListCar;
