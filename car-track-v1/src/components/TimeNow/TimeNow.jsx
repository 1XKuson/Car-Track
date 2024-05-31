import React, { useEffect, useState } from 'react';
import './TimeNow.css';

function TimeNow() {
    const getFormattedTime = () => {
        let time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return time.replace(/ AM| PM/, ''); // Remove AM/PM if present
    };

    const [currentTime, setCurrentTime] = useState(getFormattedTime());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(getFormattedTime());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className='showTime'>{currentTime}</div>
    );
}

export default TimeNow;
