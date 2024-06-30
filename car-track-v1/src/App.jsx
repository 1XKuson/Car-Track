import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useState, useEffect } from "react";
import ListCar from "./components/ListCar/ListCar";
import { Outlet } from "react-router-dom";
import Map from "./components/Map/Map";
import DetailCar from "./components/DetailCar/DetailCar";
import TimeNow from "./components/TimeNow/TimeNow";
import Schedule from "./components/Schedule/Schedule";
import "./App.css";
import "./Theme.css";
import axios from "axios";

const App = () => {
  const [list, setList] = useState([]);
  const [position, setPosition] = useState([]);
  const [center, setCenter] = useState();

  const fetchData = async () => {
    try {
      const response = await axios.get("http://161.246.160.72:3000/unicons");
      setList(response.data.uniconIds);
    } catch (error) {
      // console.log("error", error);
    }
  };

  const fetchPosition = async () => {
    try {
      const response = await axios.get("http://161.246.160.72:3000/positions");
      setPosition(response.data);
      // console.log("success", response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchData();
    setCenter({
      lat: 13.72649077839198,
      lng: 100.77435998380524,
    })
    const interval = setInterval(() => {
      fetchPosition();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  console.log("center", center);

  return (
    <>
      <Schedule />
      <Map position={position} center={center} setCenter={setCenter} />
      <ListCar list={list} position={position} setCenter={setCenter} />
      {/* <DetailCar /> */}
      <TimeNow />
    </>
  );
};

export default App;
