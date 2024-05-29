import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useState } from "react";
import ListCar from "./components/ListCar/ListCar";
import { Outlet } from "react-router-dom";
import Map from "./components/Map/Map";
import "./App.css"
const App = () => {
  
 return(
  <>
    <Map />
    <ListCar />
  </>
 );
};

export default App;
