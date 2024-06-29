import React, {useState,useEffect} from "react";
import StationCard from "./StationCard";
import "./DetailCar.css";
import arrowForward from "../../Icon/arrowForward.png";
import arrowBack from "../../Icon/arrowBack.png";
import axios from "axios";

const getTimeFromIsoDate = (isoDate) => {
  const date = new Date(isoDate);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours-7}:${minutes}`;
};

// const stations = [
//   {
//     date: "2024-05-31T05:30:00.000Z",
//     station: "E12-อาคารเรียนรวม 12 ชั้น",
//     lat: "13.8475",
//     lng: "100.5693",
//   },
//   {
//     date: "2024-05-31T06:00:00.000Z",
//     station: "ภาควิชาวิศวเครื่องกล",
//     lat: "13.7372",
//     lng: "100.5327",
//   },
//   {
//     date: "2024-05-31T07:00:00.000Z",
//     station: "ตึก A คณบดี",
//     lat: "13.7450",
//     lng: "100.5345",
//   },
//   {
//     date: "2024-05-31T08:00:00.000Z",
//     station: "ตึก ECC",
//     lat: "13.7413",
//     lng: "100.5328",
//   },
//   {
//     date: "2024-05-31T09:00:00.000Z",
//     station: "ตึกพระเทพ",
//     lat: "13.7436",
//     lng: "100.5332",
//   },
// ];

const DetailCar = ({ show, setShowSideNav, selectedCar }) => {

  const [stations, setStations] = useState([])
  
  const fetchData = async () => {
    try{
        const response = await axios.get(`http://161.246.160.72:3000/route/${selectedCar}`)
        setStations(response.data.stations)
    } catch(error) {
        console.log('error', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [selectedCar]) 
  
  if (!selectedCar) {
    return null;
  }
  
  

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
          <div className="headDetail">{selectedCar}</div>
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
