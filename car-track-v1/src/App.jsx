import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useState , useEffect } from "react";
import ListCar from "./components/ListCar/ListCar";
import { Outlet } from "react-router-dom";
import Map from "./components/Map/Map";
import DetailCar from "./components/DetailCar/DetailCar";
import TimeNow from "./components/TimeNow/TimeNow";
import Schedule from "./components/Schedule/Schedule";
import "./App.css"
import "./Theme.css"
import axios from "axios";

const App = () => {
  const [list, setList] = useState([])
  const [position, setPosition] = useState([])

  const fetchData = async () => {
    try{
        const response = await axios.get("http://161.246.160.72:3000/unicons")
        setList(response.data.uniconIds)
    } catch(error) {
        console.log('error', error)
    }
  }

  const fetchPosition = async () => {
    try{
        const response = await axios.get("http://161.246.160.72:3000/positions")
        setPosition(response.data)
    } catch(error) {
        console.log('error', error)
    }
  }

  useEffect(() => {
      fetchData()
      
      const interval = setInterval(() => {
        fetchPosition()
      }, 1000);
  
      return () => clearInterval(interval);
  }, []) 

 return(
  <>
    <Schedule />
    <Map position={position}/>
    <ListCar list={list}/>
    {/* <DetailCar /> */}
    <TimeNow />
  </>
 );
};

export default App;
