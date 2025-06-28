import { useState, useEffect } from "react";

const CountDown = (props) => {
  const { onTimeUp } = props;
  const [duration, setDuration] = useState(300);

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
    if (duration === 0) {
      onTimeUp();
      return;
    }
    const timer = setInterval(() => {
      setDuration(duration - 1);
    }, 1000);

    // setTimeout(() => {

    // }, 5000);
    return () => {
      clearInterval(timer);
    };
  }, [duration]);
  return <div className="countdown-container">{toHHMMSS(duration)}</div>;
};

export default CountDown;
