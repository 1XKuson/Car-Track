// import React, { useState, useEffect } from "react";
// import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
// import ListCar from "./components/ListCar/ListCar";
// import { Outlet } from "react-router-dom";
// import Map from "./components/Map/BaseMap";
// import DetailCar from "./components/DetailCar/DetailCar";
// import TimeNow from "./components/TimeNow/TimeNow";
// import Schedule from "./components/Schedule/Schedule";
// import Logo from "./components/Logo/Logo";
// import EditPage from "./components/EditPage/EditPage";
// import "./App.css";
// import "./Theme.css";
// import axios from "axios";

// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import gpage from './components/Map/Map';

// const App = () => {
//   const [list, setList] = useState([]);
//   const [position, setPosition] = useState([]);
//   const [center, setCenter] = useState();
//   const [clientLocation, setClientLocation] = useState(null);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get("http://161.246.160.72:3000/unicons");
//       setList(response.data.uniconIds);
//     } catch (error) {
//       // console.log("error", error);
//     }
//   };

//   const fetchPosition = async () => {
//     try {
//       const response = await axios.get("http://161.246.160.72:3000/positions");
//       setPosition(response.data);
//       // console.log("success", response.data);
//     } catch (error) {
//       // console.log("error", error);
//     }
//   };

//   function success(position) {
//     const latitude = position.coords.latitude;
//     const longitude = position.coords.longitude;
//     setClientLocation({ lat: latitude, lng: longitude });
//   }

//   useEffect(() => {
//     fetchData();
//     setCenter({
//       lat: 13.726639,
//       lng: 100.774754
//     })

//     const interval = setInterval(() => {
//       fetchPosition();
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(success);
//       }
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     const script = document.createElement("script");
//     script.async = true;
//     script.src = "https://www.googletagmanager.com/gtag/js?id=G-5J4D7XWX6T";
//     document.head.appendChild(script);

//     script.onload = () => {
//       window.dataLayer = window.dataLayer || [];
//       function gtag() { window.dataLayer.push(arguments); }
//       gtag('js', new Date());
//       gtag('config', 'G-5J4D7XWX6T');
//     };
//   }, []);

//   return (
//     <>
//       {/* <EditPage /> */}
//       <Logo />
//       <div className="test">* อยู่ในช่วงระหว่างการพัฒนาระบบ *</div>
//       <Schedule />
//       <Map positions={position} center={center} clientLocation={clientLocation} />
//       <ListCar list={list} position={position} setCenter={setCenter} />
//       {/* <DetailCar /> */}
//       <TimeNow />
//     </>
//   );
// };

// export default App;

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListCar from "./components/ListCar/ListCar";
import Map from "./components/Map/BaseMap";
import Gpage from './components/Map/Map';
import FloodMap from './components/Map/FloodMap';
import Schedule from "./components/Schedule/Schedule";
import Logo from "./components/Logo/Logo";
import TimeNow from "./components/TimeNow/TimeNow";
import axios from "axios";
import "./App.css";
import "./Theme.css";

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
      lat: 13.726639,
      lng: 100.774754
    });
    if (location.pathname.toLowerCase() === '/floodmap') {
      setCenter({
        lat: 0,
        lng: 0
      });
    }

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
    <Router>
      <Logo />
      {(location.pathname.toLowerCase() === '/' || location.pathname.toLowerCase() === '/gmap') && <div className="test">* อยู่ในช่วงระหว่างการพัฒนาระบบ *</div>}
      {(location.pathname.toLowerCase() === '/' || location.pathname.toLowerCase() === '/gmap') && <Schedule />}
      <Routes>
        <Route path="/" element={<Map positions={position} center={center} clientLocation={clientLocation} />} />
        <Route path="/gmap" element={<Gpage position={position} center={center} setCenter={setCenter} />} />
        <Route path="/floodmap" element={<FloodMap position={position} center={center} setCenter={setCenter} />} />
      </Routes>
      {(location.pathname.toLowerCase() === '/' || location.pathname.toLowerCase() === '/gmap') && <ListCar list={list} position={position} setCenter={setCenter} />}
      <TimeNow />
    </Router>
  );
};

export default App;
