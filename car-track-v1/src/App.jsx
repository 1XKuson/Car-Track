import React, { useState, useEffect } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import ListCar from "./components/ListCar/ListCar";
import { Outlet } from "react-router-dom";
import Map from "./components/Map/BaseMap";
import DetailCar from "./components/DetailCar/DetailCar";
import TimeNow from "./components/TimeNow/TimeNow";
import Schedule from "./components/Schedule/Schedule";
import Logo from "./components/Logo/Logo";
import EditPage from "./components/EditPage/EditPage";
import "./App.css";
import "./Theme.css";
import axios from "axios";

const App = () => {
  const [list, setList] = useState([]);
  const [position, setPosition] = useState([]);
  const [center, setCenter] = useState();
  const [clientLocation, setClientLocation] = useState(null);

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
      // console.log("error", error);
    }
  };

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setClientLocation({ lat: latitude, lng: longitude });
  }

  useEffect(() => {
    fetchData();
    setCenter({
      lat: 13.7265090,
      lng: 100.775554
    });
    // setCenter({
    //   lat: 13.726639, 
    //   lng: 100.774854
    // })

    const interval = setInterval(() => {
      fetchPosition();
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-5J4D7XWX6T";
    document.head.appendChild(script);

    script.onload = () => {
      window.dataLayer = window.dataLayer || [];
      function gtag() { window.dataLayer.push(arguments); }
      gtag('js', new Date());
      gtag('config', 'G-5J4D7XWX6T');
    };
  }, []);

  return (
    <>
      {/* <EditPage /> */}
      <Logo />
      <div className="test">* อยู่ในช่วงระหว่างการพัฒนาระบบ *</div>
      <Schedule />
      <Map positions={position} center={center} clientLocation={clientLocation} />
      <ListCar list={list} position={position} setCenter={setCenter} />
      {/* <DetailCar /> */}
      <TimeNow />
    </>
  );
};

export default App;
