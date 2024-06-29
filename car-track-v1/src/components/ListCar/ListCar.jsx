import React, { useState } from "react";
import DetailCar from "../../components/DetailCar/DetailCar";
import "./ListCar.css";

const ListCar = ({list}) => {
  const [showSideNav, setShowSideNav] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleCarClick = (car) => {
    if (selectedCar === car) {
      // If the same car is clicked, hide the side navigation and deselect the car
      setShowSideNav(false);
      setSelectedCar(null);
    } else {
      // If a different car is clicked, update the selected car and show the side navigation
      setSelectedCar(car);
      setShowSideNav(true);
    }
  };

  const handleDropdownChange = (car) => {
    setSelectedCar(car);
    setShowSideNav(true);
    setDropdownOpen(false);
  };
  
  return (
    <div className="big-container">
      <DetailCar
        show={showSideNav}
        setShowSideNav={setShowSideNav}
        selectedCar={selectedCar}
      />
      <div className="footerDesktop">
        {list.map((car,index) => (
          <div
            className={`box-car ${selectedCar && selectedCar === car ? "active" : ""}`}
            key={index}
            onClick={() => handleCarClick(car)}
          >
            {car}
          </div>
        ))}
      </div>

      <div className="footerMobile">
        <div className="dropdown" onClick={() => setDropdownOpen(!dropdownOpen)}>
          <div className="dropdown-selected">
            {selectedCar ? selectedCar : "Select a car"}
          </div>
          <ul className={`dropdown-menu ${dropdownOpen ? "open" : ""}`}>
            {list.map((car,index) => (
              <li
                key={index}
                onClick={() => handleDropdownChange(car)}
                className={`dropdown-item ${selectedCar && selectedCar === car ? "active" : ""}`}
              >
                {car}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ListCar;
