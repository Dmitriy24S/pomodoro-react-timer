import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useSelector } from "react-redux";

// Colors for timer progress circle
const red = "#f54e4e";
const green = "#4aec8c";

interface TimerProps {
  timer: {
    secondsLeft: number;
    percentage: number;
    minutes: number;
    seconds: number | string;
    timerMode: string;
    isPaused: boolean;
    sessionTime: number;
    breakTime: number;
  };
}

const Timer = () => {
  const { secondsLeft, sessionTime, breakTime, timerMode } = useSelector(
    (state: TimerProps) => state.timer
  );

  // Convert to minutes - to display on timer
  let minutes: number = Math.floor(secondsLeft / 60);
  // Convert to seconds - to display on timer
  let seconds: number | string = secondsLeft % 60;
  if (seconds < 10) seconds = "0" + seconds; // to show two digits e.g: 09 08 05 00 instead of: 9 8 5 0
  // Total seconds in current timer mode
  let totalSeconds: number =
    timerMode === "active" ? sessionTime * 60 : breakTime * 60;
  // Relative % left - to display on timer
  let percentage: number = (secondsLeft / totalSeconds) * 100;

  return (
    <div className="circle w-72 mx-auto mt-8" data-testid="progressCircle">
      {/* Timer progress circle */}
      <CircularProgressbar
        // data-testid="progressCircle"
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
