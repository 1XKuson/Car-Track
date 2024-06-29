import React from "react";

const StationCard = ({ time, station, detail }) => {
  return (
    <div className="stationCard">
      <div className="timeA">{time}</div>
      <div className="line">
        <div className="circle"></div>
        <div className="dash">
          <div className="sq"></div>
          <div className="sq"></div>
          <div className="sq"></div>
          {/* <div className="sq"></div>
          <div className="sq"></div> */}
        </div>
      </div>
      <div className="station">
        <div className="headStation">{station}</div>
        {/* <div className="stationDetail">{detail}</div> */}
      </div>
    </div>
  );
};

export default StationCard;
