import { useState, useEffect, useRef } from "react";

const CountDown = (props) => {
  const { onTimeUp, isFinished } = props;
  const [duration, setDuration] = useState(300);
  const timerRef = useRef(null);
  const toHHMMSS = (secs) => {
    const sec_num = parseInt(secs, 10);
    const hours = Math.floor(sec_num / 3600);
    const minutes = Math.floor(sec_num / 60) % 60;
    const seconds = sec_num % 60;

    return [hours, minutes, seconds]
      .map((v) => (v < 10 ? "0" + v : v))
      .filter((v, i) => v !== "00" || i > 0)
      .join(":");
  };

  useEffect(() => {
    if (isFinished) {
      clearInterval(timerRef.current);
      setDuration(0);
    }
  }, [isFinished]);

  // Đếm ngược
  useEffect(() => {
    if (duration === 0 || isFinished) return;

    timerRef.current = setInterval(() => {
      setDuration((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timerRef.current);
    };
  }, [duration, isFinished]);
  return <div className="countdown-container">{toHHMMSS(duration)}</div>;
};

export default CountDown;
