import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// Colors for timer progress circle
const red = "#f54e4e";
const green = "#4aec8c";

interface TimerProps {
  percentage: number;
  minutes: number;
  seconds: number | string;
  timerMode: string;
}

const Timer = ({ percentage, minutes, seconds, timerMode }: TimerProps) => {
  return (
    <div className="circle w-72 mx-auto mt-8">
      {/* Timer progress circle */}
      <CircularProgressbar
        value={percentage}
        text={minutes + ":" + seconds}
        styles={buildStyles({
          strokeLinecap: "butt",
          textColor: "#fff",
          pathColor: timerMode === "active" ? red : green,
          trailColor: "rgba(255,255,255, 0.2)",
          pathTransitionDuration: 0.3,
        })}
      />
    </div>
  );
};

export default Timer;
