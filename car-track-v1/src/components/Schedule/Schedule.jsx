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
        <h2>Schedule Modal</h2>
        <p>This is the modal content for the schedule.</p>
      </Modal>
    </div>
  );
};

export default Schedule;
