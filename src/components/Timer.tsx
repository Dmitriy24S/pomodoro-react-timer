import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useSelector } from "react-redux";

import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";

// Colors for timer progress circle
const red = "#f54e4e";
const green = "#4aec8c";

interface TimerPropsType {
  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
}
interface TimerReduxTypes {
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

const Timer = ({ volume, setVolume }: TimerPropsType) => {
  const { secondsLeft, sessionTime, breakTime, timerMode } = useSelector(
    (state: TimerReduxTypes) => state.timer
  );
  // console.log(volume);

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
      {/* Volume */}
      {/* <div className="slidecontainer border-2"> */}
      <div className="slidecontainer">
        {/* <input type="range" min="0" max="1" className="slider" id="myRange" /> */}
        <Box
          sx={{ width: 200 }}
          // className="border-4 border-red-500 mx-auto mb-4"
          className="mx-auto mb-4"
        >
          <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
            <VolumeDown
              onClick={() => setVolume(0)}
              className="cursor-pointer"
            />
            <Slider
              min={0}
              max={100}
              step={25}
              value={volume}
              aria-label="Volume"
              onChange={(e: any) => setVolume(e.target.value)}
            />
            <VolumeUp
              onClick={() => {
                if (volume < 100) {
                  setVolume((prevVolume: number) => prevVolume + 25);
                }
              }}
              className="cursor-pointer"
            />
          </Stack>
        </Box>
      </div>

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
