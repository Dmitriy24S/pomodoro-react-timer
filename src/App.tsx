import { useEffect, useState } from "react";

import Timer from "./components/Timer";
import TimerControls from "./components/TimerControls";
import TimerStatus from "./components/TimerStatus";

function App() {
  const [timerMode, setTimerMode] = useState<string>("active");
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const [workMinutes, setWorkMinutes] = useState<number>(1); // 1 minute
  const [breakMinutes, setBreakMinutes] = useState<number>(2); // 2 minute
  const [intervalId, setIntervalId] = useState<NodeJS.Timer | null>(null);

  // Timer time minutes into seconds
  const [secondsLeft, setSecondsLeft] = useState<number>(workMinutes * 60);
  // Convert to minutes - to display on timer
  let minutes: number = Math.floor(secondsLeft / 60);
  // Convert to seconds - to display on timer
  let seconds: number | string = secondsLeft % 60;
  if (seconds < 10) seconds = "0" + seconds; // to show two digits e.g: 09 08 05 00 instead of: 9 8 5 0
  // Total seconds in current timer mode
  const totalSeconds: number =
    timerMode === "active" ? workMinutes * 60 : breakMinutes * 60;
  // Relative % left - to display on timer
  const percentage: number = Math.round((secondsLeft / totalSeconds) * 100);

  const handleStartStopClick = () => {
    if (isPaused) {
      // if timer is paused - want to start the timer/countdown/interval
      const newIntervalId = setInterval(() => {
        setSecondsLeft((prevLeft) => prevLeft - 1);
      }, 100); // TODO: increase final ms time
      setIntervalId(newIntervalId);
      setIsPaused(false);
    } else {
      // if timer not paused - want to stop the countdown/interval
      if (intervalId) {
        clearInterval(intervalId);
      }
      setIsPaused(true);
    }
  };

  const handleResetClick = () => {
    // set timer to paused
    // remove interval/ stop countdown
    setIsPaused(true);
    if (intervalId) {
      clearInterval(intervalId);
    }
    setTimerMode("active");
    // set to initial work time
    setSecondsLeft(workMinutes * 60);
  };

  // Switch timer mode(work/break) when timer reaches 0 and update time
  useEffect(() => {
    if (secondsLeft === 0) {
      if (timerMode === "active") {
        setTimerMode("break");
        setSecondsLeft(breakMinutes * 60);
      } else if (timerMode === "break") {
        setTimerMode("active");
        setSecondsLeft(workMinutes * 60);
      }
    }
  }, [secondsLeft, timerMode]);

  return (
    <div className="App text-center">
      <h1 className="font-bold text-2xl uppercase tracking-widest mt-10">
        Pomodoro Timer
      </h1>
      <section>
        <Timer
          percentage={percentage}
          minutes={minutes}
          seconds={seconds}
          timerMode={timerMode}
        />
        <TimerStatus isPaused={isPaused} timerMode={timerMode} />
        <TimerControls
          handleStartStopClick={handleStartStopClick}
          handleResetClick={handleResetClick}
          isPaused={isPaused}
          secondsLeft={secondsLeft}
          totalSeconds={totalSeconds}
        />
      </section>
    </div>
  );
}

export default App;
