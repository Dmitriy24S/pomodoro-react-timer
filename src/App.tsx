import { useEffect, useState } from "react";

import Timer from "./components/Timer";
import TimerControls from "./components/TimerControls";
import TimerStatus from "./components/TimerStatus";

import useSound from "use-sound";
let audioFx = require("./audio/tick.wav");

function App() {
  // const audioElement = useRef<HTMLAudioElement>(null);
  const [play, { stop }] = useSound(audioFx);

  let presetWorkMinutes = 25;
  let presetBreakMinutes = 5;
  const [timerMode, setTimerMode] = useState<string>("active");
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const [workMinutes, setWorkMinutes] = useState<number>(15); // 15 minutes work/study session
  const [breakMinutes, setBreakMinutes] = useState<number>(5); // 5 minutes break
  const [intervalId, setIntervalId] = useState<NodeJS.Timer | null>(null);

  // Timer time minutes into seconds
  const [secondsLeft, setSecondsLeft] = useState<number>(workMinutes * 60);
  // Convert to minutes - to display on timer
  let minutes: number = Math.floor(secondsLeft / 60);
  // Convert to seconds - to display on timer
  let seconds: number | string = secondsLeft % 60;
  if (seconds < 10) seconds = "0" + seconds; // to show two digits e.g: 09 08 05 00 instead of: 9 8 5 0
  // Total seconds in current timer mode
  let totalSeconds: number =
    timerMode === "active" ? workMinutes * 60 : breakMinutes * 60;
  // Relative % left - to display on timer
  // let percentage: number = Math.round((secondsLeft / totalSeconds) * 100);
  let percentage: number = (secondsLeft / totalSeconds) * 100;

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
    stop(); // stop audio
    // set timer to paused
    // remove interval/ stop countdown
    setIsPaused(true);
    if (intervalId) {
      clearInterval(intervalId);
    }
    setTimerMode("active");
    // set to initial work time
    // setSecondsLeft(workMinutes * 60);
    setWorkMinutes(presetWorkMinutes);
    setBreakMinutes(presetBreakMinutes);
  };

  // Switch timer mode(work/break) when timer reaches 0 and update time
  useEffect(() => {
    if (secondsLeft === 0) {
      // audioElement?.current?.play(); // play the audio
      play(); // play the audio
      setTimeout(() => {
        stop();
      }, 4000); // stop audio after 4sec
      if (timerMode === "active") {
        setTimerMode("break");
        setSecondsLeft(breakMinutes * 60);
      } else if (timerMode === "break") {
        setTimerMode("active");
        setSecondsLeft(workMinutes * 60);
      }
    }
  }, [secondsLeft, timerMode]);

  // Session time adjustment
  const incrementWorkTime = () => {
    if (workMinutes >= 1) {
      setWorkMinutes((prevTime) => prevTime + 1);
    }
  };
  const decrementWorkTime = () => {
    if (workMinutes > 1) {
      setWorkMinutes((prevTime) => prevTime - 1);
    }
  };

  // Break time adjustment
  const incrementBreakTime = () => {
    if (breakMinutes >= 1) {
      setBreakMinutes((prevTime) => prevTime + 1);
    }
  };
  const decrementBreakTime = () => {
    if (breakMinutes > 1) {
      setBreakMinutes((prevTime) => prevTime - 1);
    }
  };

  // Update timer if change break time amount
  useEffect(() => {
    if (timerMode === "break") {
      setSecondsLeft(breakMinutes * 60);
    }
  }, [breakMinutes]);

  // Update timer if change session time amount
  useEffect(() => {
    if (timerMode === "active") {
      setSecondsLeft(workMinutes * 60);
    }
  }, [workMinutes]);

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
          workMinutes={workMinutes}
          breakMinutes={breakMinutes}
          incrementWorkTime={incrementWorkTime}
          decrementWorkTime={decrementWorkTime}
          incrementBreakTime={incrementBreakTime}
          decrementBreakTime={decrementBreakTime}
          setBreakMinutes={setBreakMinutes}
          setWorkMinutes={setWorkMinutes}
        />
      </section>
      {/* <audio id="beep" ref={audioElement}>
        <source src="./audio/tick.wav" type="audio/mpeg" />
      </audio> */}
    </div>
  );
}

export default App;
