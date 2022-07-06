import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseBreakTime,
  decreaseSessionTime,
  handleResetClick,
  handleStartStopClick,
  increaseBreakTime,
  increaseSessionTime,
  updateBreakTime,
  updateSessionTime,
} from "../redux/timerSlice";

interface TimerControlsTypes {
  timer: {
    handleResetClick: () => void;
    isPaused: boolean;
    isRunning: boolean;
    sessionTime: number;
    breakTime: number;
    increaseSessionTime: () => void;
    decreaseSessionTime: () => void;
    increaseBreakTime: () => void;
    decreaseBreakTime: () => void;
  };
}

const TimerControls = ({ stop }: any) => {
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const { sessionTime, breakTime, isPaused, isRunning } = useSelector(
    (state: TimerControlsTypes) => state.timer
  );
  const dispatch = useDispatch();

  return (
    <>
      <section className="button-container flex gap-4 justify-center mt-8">
        <button
          data-testid="startPauseTimerButton"
          className="border rounded-md py-2 px-4 w-24 hover:bg-white hover:bg-opacity-20"
          onClick={() => {
            // handleStartStopClick();
            dispatch(handleStartStopClick());
            setIsStarted(true); // ? isRunning redux replace?
            stop(); // stop audio on pause
          }}
        >
          {
            // isPaused && isRunning // ? isRunning redux replace?
            isPaused && isStarted
              ? "Resume " // if paused after ticking down - show 'resume'
              : isPaused
              ? "Start" // if new not started timer - show 'start'
              : "Pause" // if active ticking timer - show 'pause'
          }
        </button>
        <button
          className="border rounded-md py-2 px-4 w-24 hover:bg-white hover:bg-opacity-20"
          onClick={() => {
            // handleResetClick();
            dispatch(handleResetClick());
            setIsStarted(false); // ? isRunning redux replace?
            stop(); // stop audio on reset
          }}
        >
          Restart
        </button>
      </section>
      <section className="button-container flex gap-4 justify-center mt-8">
        {/* Session time controls */}
        <div className="session-button-container flex flex-col gap-1">
          <h5 className="opacity-80 font-light">Session</h5>
          <div className="flex items-center">
            <button
              // onClick={incrementWorkTime}
              onClick={() => dispatch(increaseSessionTime())}
              className="px-2 text-xl min-w-[2rem] hover:font-bold"
            >
              +
            </button>
            <input
              aria-label="set session duration"
              type="number"
              // value={workMinutes}
              value={sessionTime}
              onChange={(e) => {
                if (
                  Number(e.target.value) >= 1 &&
                  Number(e.target.value) < 99
                ) {
                  // setWorkMinutes(Number(e.target.value));
                  dispatch(updateSessionTime(Number(e.target.value)));
                }
              }}
              id=""
              min={1}
              max={99}
              className="bg-transparent w-[2rem] text-center"
            />
            <button
              // onClick={decrementWorkTime}
              onClick={() => dispatch(decreaseSessionTime())}
              className="px-2 text-xl min-w-[2rem] hover:font-bold"
            >
              -
            </button>
          </div>
        </div>
        {/* Break time controls */}
        <div className="break--button-container flex flex-col gap-1">
          <h5 className="opacity-80 font-light">Break</h5>
          <div className="flex items-center">
            <button
              onClick={() => dispatch(increaseBreakTime())}
              data-testid="incrementBreakBtn"
              className="px-2 text-xl min-w-[2rem] hover:font-bold"
            >
              +
            </button>
            <input
              data-testid="counterBreakInput"
              aria-label="set break duration"
              type="number"
              // value={breakMinutes}
              value={breakTime}
              onChange={(e) => {
                if (
                  Number(e.target.value) >= 1 &&
                  Number(e.target.value) < 99
                ) {
                  // setBreakMinutes(Number(e.target.value));
                  dispatch(updateBreakTime(Number(e.target.value)));
                }
              }}
              id=""
              min={1}
              max={99}
              className="bg-transparent w-[2rem] text-center"
            />
            <button
              // onClick={decrementBreakTime}
              onClick={() => dispatch(decreaseBreakTime())}
              className="px-2 text-xl min-w-[2rem] hover:font-bold"
            >
              -
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default TimerControls;
