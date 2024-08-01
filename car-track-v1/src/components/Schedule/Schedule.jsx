// Schedule.jsx
import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import './Schedule.css';
import scheduleIcon from '../../Icon/schedule.png'

const Schedule = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className="schedule">
      <button onClick={openModal}><img src={scheduleIcon} alt="" /></button>
      <Modal show={showModal} onClose={closeModal}>
        <h2 style={{textAlign:"center"}}>Tram Cars Schedule</h2>
        <div className='time' style={{textAlign:"center"}}>เวลาเดินรถ 8:30 - 16:30 น.</div>
        <div className='time' style={{textAlign:"center", fontWeight:"bold", color:"#ff7a00"}}>เส้นทางเฉพาะช่วงวันที่ 02 ส.ค. - 04 ส.ค. 2567</div>
        <div className='timeSchedule'>
            <div className='leftSchedule'>
                <div className="headSchedule">PEAK TIME</div>
                <table>
                    <tr>
                        <td>8:30</td>
                        <td>-</td>
                        <td>9:30</td>
                        <td>น.</td>
                    </tr>
                    <tr>
                        <td>11:30</td>
                        <td>-</td>
                        <td>13:30</td>
                        <td>น.</td>
                    </tr>
                    <tr>
                        <td>15:30</td>
                        <td>-</td>
                        <td>16:30</td>
                        <td>น.</td>
                    </tr>
                </table>
                <div>เดินรถทุก 5 นาที/คัน</div>
            </div>
            <div className='rigitSchedule'>
                <div className="headSchedule">ช่วงเวลาอื่น</div>
                <div>เดินรถทุก 10 นาที/คัน</div>
            </div>
        </div>
      </Modal>
    </div>
  );
};

export default Schedule;
