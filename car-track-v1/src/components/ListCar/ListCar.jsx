import React, { useState } from "react";
import DetailCar from "../../components/DetailCar/DetailCar";
import "./ListCar.css";

const ListCar = ({ list, position, setCenter }) => {
  const [showSideNav, setShowSideNav] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleCarClick = (car) => {

    setCenter(car.position);
    if (selectedCar === car.unicon_id) {
      setShowSideNav(false);
      setSelectedCar(null);
    } else {
      // If a different car is clicked, update the selected car and show the side navigation
      setSelectedCar(car.unicon_id);
      setShowSideNav(true);
    }
  };

  const handleDropdownChange = (car) => {
    setCenter(car.position);
    setSelectedCar(car.unicon_id);
    setShowSideNav(true);
    setDropdownOpen(false);
  };

  return (
    <div className="big-container">
      {/* <DetailCar
        show={showSideNav}
        setShowSideNav={setShowSideNav}
        selectedCar={selectedCar}
      /> */}
      <div className="footerDesktop">
        {position.map((car, index) => (
          <div
            className={`box-car ${
              selectedCar && selectedCar === car.unicon_id ? "active" : ""
            }`}
            key={index}
            onClick={() => handleCarClick(car)}
          >
            {car.unicon_id}
          </div>
        ))}
      </div>

      <div className="footerMobile">
        <div
          className="dropdown"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <div className="dropdown-selected">
            {selectedCar ? selectedCar : "Select a car"}
          </div>
          <ul className={`dropdown-menu ${dropdownOpen ? "open" : ""}`}>
            {position.map((car, index) => (
              <li
                key={index}
                onClick={() => handleDropdownChange(car)}
                className={`dropdown-item ${
                  selectedCar && selectedCar === car.unicon_id ? "active" : ""
                }`}
              >
                {car.unicon_id}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ListCar;
