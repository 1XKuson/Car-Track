import React from "react";
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
    detail: "ภาควิชาวิศวกรรมระบบไอโอทีและสารสนเทศ",
  },
];

const Time = [
  {
    id: 1,
    startStation: "ตึก A",
    startTime: "12:00",
    endStation: "ตึกโหล",
    endTime: "13:00",
  }, {
    id: 2,
    startStation: "ตึก A",
    startTime: "13:00",
    endStation: "ตึกโหล",
    endTime: "14:00",
  }, {
    id: 3,
    startStation: "ตึก A",
    startTime: "14:00",
    endStation: "ตึกโหล",
    endTime: "15:00",
  }, {
    id: 4,
    startStation: "ตึก A",
    startTime: "15:00",
    endStation: "ตึกโหล",
    endTime: "16:00",
  }, {
    id: 5,
    startStation: "ตึก A",
    startTime: "16:00",
    endStation: "ตึกโหล",
    endTime: "17:00",
  },
];

const DetailCar = ({ show, setShowSideNav, selectedCar }) => {
  if (!selectedCar) {
    return null;
  }

  const carDetails = Time.find(car => car.id === selectedCar.id);

  return (
    <div className={`detailNav ${show ? "visible" : ""}`}>
      <input
        type="checkbox"
        id="check"
        checked={show}
        onChange={() => setShowSideNav(!show)}
      />
      <label htmlFor="check" className="sideBarbtn">
        <img src="../../src/Icon/arrowForward.png" alt="" id="forwardIcon" />
        <img src="../../src/Icon/arrowBack.png" alt="" id="backIcon" />
      </label>

      <div className="sideNav">
        <div className="insideNav">
          <div className="headDetail">{selectedCar.name}</div>
          <table className="startEnd">
            <tbody>
              <tr>
                <th>เริ่มต้น</th>
                <td className="collon">:</td>
                <td>{carDetails.startStation}</td>
                <td>-</td>
                <td>{carDetails.startTime}</td>
              </tr>
              <tr>
                <th>สิ้นสุด</th>
                <td className="collon">:</td>
                <td>{carDetails.endStation}</td>
                <td>-</td>
                <td>{carDetails.endTime}</td>
              </tr>
            </tbody>
          </table>
          <div className="timeStation">
            {Station.map((station, index) => (
              <StationCard
                key={index}
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
};

export default DetailCar;
