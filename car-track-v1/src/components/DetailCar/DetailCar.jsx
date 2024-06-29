import React from "react";
import StationCard from "./StationCard";
import "./DetailCar.css";
import arrowForward from "../../Icon/arrowForward.png";
import arrowBack from "../../Icon/arrowBack.png";

/* const Station = [
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
    station: "E12-อาคารเรียนรวม 12 ชั้น",
    detail: "ภาควิชาวิศวกรรมระบบ",
  },
]; */

const getTimeFromIsoDate = (isoDate) => {
  const date = new Date(isoDate);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${hours-7}:${minutes}`;
};

const stations = [
  {
    date: "2024-05-31T05:30:00.000Z",
    station: "E12-อาคารเรียนรวม 12 ชั้น",
    lat: "13.8475",
    lng: "100.5693",
  },
  {
    date: "2024-05-31T06:00:00.000Z",
    station: "ภาควิชาวิศวเครื่องกล",
    lat: "13.7372",
    lng: "100.5327",
  },
  {
    date: "2024-05-31T07:00:00.000Z",
    station: "ตึก A คณบดี",
    lat: "13.7450",
    lng: "100.5345",
  },
  {
    date: "2024-05-31T08:00:00.000Z",
    station: "ตึก ECC",
    lat: "13.7413",
    lng: "100.5328",
  },
  {
    date: "2024-05-31T09:00:00.000Z",
    station: "ตึกพระเทพ",
    lat: "13.7436",
    lng: "100.5332",
  },
];

const Time = [
  {
    id: 1,
    startStation: "ตึก A",
    startTime: "12:00",
    endStation: "ตึกโหล",
    endTime: "13:00",
  },
  {
    id: 2,
    startStation: "ตึก A",
    startTime: "13:00",
    endStation: "ตึกโหล",
    endTime: "14:00",
  },
  {
    id: 3,
    startStation: "ตึก A",
    startTime: "14:00",
    endStation: "ตึกโหล",
    endTime: "15:00",
  },
  {
    id: 4,
    startStation: "ตึก A",
    startTime: "15:00",
    endStation: "ตึกโหล",
    endTime: "16:00",
  },
  {
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

  const carDetails = Time.find((car) => car.id === selectedCar.id);

  return (
    <div className={`detailNav ${show ? "visible" : ""}`}>
      <input
        type="checkbox"
        id="check"
        checked={show}
        onChange={() => setShowSideNav(!show)}
      />
      <label htmlFor="check" className="sideBarbtn">
        <img src={arrowForward} alt="" id="forwardIcon" />
        <img src={arrowBack} alt="" id="backIcon" />
      </label>

      <div className="sideNav">
        <div className="insideNav">
          <div className="headDetail">{selectedCar.name}</div>
          <table className="startEnd">
            <tbody>
              <tr>
                <th>เริ่มต้น</th>
                <td className="collon">:</td>
                <td>{stations[0].station}</td>
                <td>-</td>
                <td>{getTimeFromIsoDate(stations[0].date)}</td>
              </tr>
              <tr>
                <th>สิ้นสุด</th>
                <td className="collon">:</td>
                <td>{stations[stations.length - 1].station}</td>
                <td>-</td>
                <td>{getTimeFromIsoDate(stations[stations.length - 1].date)}</td>
              </tr>
            </tbody>
          </table>
          <div className="timeStation">
            <div className="inTimeStation">
              {stations.map((station, index) => (
                <StationCard
                  key={index}
                  time={getTimeFromIsoDate(station.date)}
                  station={station.station}
                  /* detail={station.detail} */
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailCar;
