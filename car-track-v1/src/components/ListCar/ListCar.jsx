import React, { useState } from "react";
import "./ListCar.css";

const ListCar = () => {
  const [listCar, setListCar] = useState([
    { id: 1, name: "Unicon 1" },
    { id: 2, name: "Unicon 2" },
    { id: 3, name: "Unicon 3" },
    { id: 4, name: "Unicon 4" },
    { id: 5, name: "Unicon 5" },
  ]);

  const handleClick = (car) => {
    alert(`Car clicked: ${car.name}`);
  };

  return (
    <>
      <div className="footer">
        {listCar.map((car) => (
          <div className="box-car" key={car.id} onClick={() => handleClick(car)}>
            {car.name}
          </div>
        ))}
      </div>
    </>
  );
};

export default ListCar;
