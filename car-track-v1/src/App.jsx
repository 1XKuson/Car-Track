import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useState } from "react";
import ListCar from "./components/ListCar/ListCar";
import { Outlet } from "react-router-dom";
import Map from "./components/Map/Map";
import DetailCar from "./components/DetailCar/DetailCar";
import "./App.css"
const App = () => {
  
 return(
  <>
    <Map />
    <ListCar />
    <DetailCar />
  </>
 );
};

export default App;
