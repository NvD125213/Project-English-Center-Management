import React, { useEffect, useState, useRef } from 'react';

const CountDown = ({ minutes, onTimeUp }) => {
    const [count, setCount] = useState(minutes * 60);
    const isTimeUpCalled = useRef(false);

    useEffect(() => {
        if (count <= 0 && !isTimeUpCalled.current) {
            isTimeUpCalled.current = true;
            alert("Hết thời gian làm bài!");
            onTimeUp();
            return;
        }

        const timer = count > 0 && setInterval(() => {
            setCount((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [count, onTimeUp]);

    const formatTime = (time) => {
        const mins = Math.floor(time / 60);
        const secs = time % 60;
        return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    };

    return (
        <div className='countdown-component'>
            <button type="button" className="btn btn-primary">
                {formatTime(count)}
            </button>
        </div>
    );
};

export default CountDown;
