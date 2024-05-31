import React, { useState } from "react";
import StationCard from "./StationCard";
import "./DetailCar.css";

const Station = [
  {
    time: "12:00",
    station: "ตึก A",
    detail: "สำนักงานคณบดีวิศวกรรมศาสตร์",
  },
  {
    time: "12:10",
    station: "ตึก B",
    detail: "ภาควิชาวิศวกรรมอิเล็กทรอนิกส์",
  },
  {
    time: "12:10",
    station: "ตึก B",
    detail: "ภาควิชาวิศวกรรมอิเล็กทรอนิกส์",
  },
  {
    time: "12:10",
    station: "ตึก B",
    detail: "ภาควิชาวิศวกรรมอิเล็กทรอนิกส์",
  },
  {
    time: "12:10",
    station: "ตึก B",
    detail: "ภาควิชาวิศวกรรมอิเล็กทรอนิกส์",
  },
  {
    time: "12:10",
    station: "ตึก B",
    detail: "ภาควิชาวิศวกรรมอิเล็กทรอนิกส์",
  },
  {
    time: "12:10",
    station: "ตึก B",
    detail: "ภาควิชาวิศวกรรมอิเล็กทรอนิกส์",
  },
];

const Time = {
  startStation: "ตึก A",
  startTime: "12:00",
  endStation: "ตึกโหล",
  endTime: "13:00",
};

function DetailCar() {
  const [showSideNav, setShowSideNav] = useState(false);
  const handleLinkClick = () => {
    setShowSideNav(false);
  };

  return (
    <div className="detailNav">
      <input
        type="checkbox"
        id="check"
        checked={showSideNav}
        onChange={() => setShowSideNav(!showSideNav)}
      />
      <label for="check" className="sideBarbtn">
        <img src="../../src/Icon/arrowForward.png" alt="" id="forwardIcon" />
        <img src="../../src/Icon/arrowBack.png" alt="" id="backIcon" />
      </label>

      <div className="sideNav">
        <div className="insideNav">
          <div className="headDetail">Car 1</div>
          <table className="startEnd">
            <tr>
              <th>เริ่มต้น</th>
              <td className="collon">:</td>
              <td>{Time.startStation}</td>
              <td>-</td>
              <td>{Time.startTime}</td>
            </tr>
            <tr>
              <th>สิ้นสุด</th>
              <td className="collon">:</td>
              <td>{Time.endStation}</td>
              <td>-</td>
              <td>{Time.endTime}</td>
            </tr>
          </table>
          <div className="timeStation">
            {Station.map((station) => (
              <StationCard
                time={station.time}
                station={station.station}
                detail={station.detail}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailCar;
