import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useState } from "react";
import ListCar from "./components/ListCar/ListCar";
import { Outlet } from "react-router-dom";
import Map from "./components/Map/Map";
import DetailCar from "./components/DetailCar/DetailCar";
import TimeNow from "./components/TimeNow/TimeNow";
import Schedule from "./components/Schedule/Schedule";
import "./App.css"
import "./Theme.css"
const App = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  
 return(
  <>
    <Schedule />
    <Map />
    <ListCar />
    <TimeNow />
  </>
 );
};

export default App;
