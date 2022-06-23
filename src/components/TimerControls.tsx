import { useState } from "react";

interface TimerControlsProps {
  handleStartStopClick: () => void;
  handleResetClick: () => void;
  isPaused: boolean;
  workMinutes: number;
  breakMinutes: number;
  incrementWorkTime: () => void;
  decrementWorkTime: () => void;
  incrementBreakTime: () => void;
  decrementBreakTime: () => void;
  setBreakMinutes: React.Dispatch<React.SetStateAction<number>>;
  setWorkMinutes: React.Dispatch<React.SetStateAction<number>>;
}

const TimerControls = ({
  handleStartStopClick,
  handleResetClick,
  isPaused,
  workMinutes,
  breakMinutes,
  incrementWorkTime,
  decrementWorkTime,
  incrementBreakTime,
  decrementBreakTime,
  setBreakMinutes,
  setWorkMinutes,
}: TimerControlsProps) => {
  const [isStarted, setIsStarted] = useState<boolean>(false);

  return (
    <>
      <section className="button-container flex gap-4 justify-center mt-8">
        <button
          data-testid="startPauseTimerButton"
          className="border rounded-md py-2 px-4 w-24 hover:bg-white hover:bg-opacity-20"
          onClick={() => {
            handleStartStopClick();
            setIsStarted(true);
          }}
        >
          {
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
            handleResetClick();
            setIsStarted(false);
          }}
        >
          Restart
        </button>
      </section>
      <section className="button-container flex gap-4 justify-center mt-8">
        <div className="session-button-container flex flex-col gap-1">
          <h5 className="opacity-80 font-light">Session</h5>
          <div className="flex items-center">
            <button
              onClick={incrementWorkTime}
              className="px-2 text-xl min-w-[2rem] hover:font-bold"
            >
              +
            </button>
            <input
              aria-label="set session duration"
              type="number"
              value={workMinutes}
              onChange={(e) => {
                if (
                  Number(e.target.value) >= 1 &&
                  Number(e.target.value) < 99
                ) {
                  setWorkMinutes(Number(e.target.value));
                }
              }}
              id=""
              min={1}
              max={99}
              className="bg-transparent w-[2rem] text-center"
            />
            <button
              onClick={decrementWorkTime}
              className="px-2 text-xl min-w-[2rem] hover:font-bold"
            >
              -
            </button>
          </div>
        </div>
        <div className="break--button-container flex flex-col gap-1">
          <h5 className="opacity-80 font-light">Break</h5>
          <div className="flex items-center">
            <button
              onClick={incrementBreakTime}
              data-testid="incrementBreakBtn"
              className="px-2 text-xl min-w-[2rem] hover:font-bold"
            >
              +
            </button>
            <input
              data-testid="counterBreakInput"
              aria-label="set break duration"
              type="number"
              value={breakMinutes}
              onChange={(e) => {
                if (
                  Number(e.target.value) >= 1 &&
                  Number(e.target.value) < 99
                ) {
                  setBreakMinutes(Number(e.target.value));
                }
              }}
              id=""
              min={1}
              max={99}
              className="bg-transparent w-[2rem] text-center"
            />
            <button
              onClick={decrementBreakTime}
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
