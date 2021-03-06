import { useEffect, useState } from "react";

import Timer from "./components/Timer";
import TimerControls from "./components/TimerControls";
import TimerStatus from "./components/TimerStatus";

import { useDispatch, useSelector } from "react-redux";
import useSound from "use-sound";
import {
  decrementSecondsLeft,
  updateSecondsLeft,
  updateTimerMode,
} from "./redux/timerSlice";
let audioFx = require("./audio/tick.wav");

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
    isRunning: boolean;
  };
}

function App() {
  // Audio
  // const audioElement = useRef<HTMLAudioElement>(null);
  // const [volume, setVolume] = useState(75); // 0=muted, 1=max volume
  const [volume, setVolume] = useState(
    JSON.parse(localStorage.getItem("timer") as string) || 75
  ); // 0=muted, 1=max volume,  // Get volume from local storage
  // Save volume to local storage
  useEffect(() => {
    localStorage.setItem("timer", JSON.stringify(volume));
  }, [volume]);
  // Get volume from local storage // ? get overwriten on state initializon on refresh
  // useEffect(() => {
  // const volume = localStorage.getItem("timer");
  // if (volume) {
  // setVolume(JSON.parse(volume));
  // }
  // }, []);
  const [play, { stop }] = useSound(audioFx, { volume: volume / 100 }); // 0=muted, 1=max volume
  // State countdown interval
  const [intervalId, setIntervalId] = useState<NodeJS.Timer | null>(null);
  // Redux
  const { secondsLeft, sessionTime, breakTime, timerMode, isRunning } =
    useSelector((state: TimerProps) => state.timer);
  const dispatch = useDispatch();

  // Switch timer mode(work/break) when timer reaches 0 and update time
  useEffect(() => {
    if (secondsLeft === 0) {
      // audioElement?.current?.play(); // play the audio
      play(); // play the audio
      setTimeout(() => {
        stop();
      }, 3700); // stop audio after 4sec
      if (timerMode === "active") {
        //? setTimerMode("break");
        //? setSecondsLeft(breakMinutes * 60);
        dispatch(updateTimerMode("break"));
        dispatch(updateSecondsLeft(breakTime * 60));
      } else if (timerMode === "break") {
        //? setTimerMode("active");
        //? setSecondsLeft(workMinutes * 60);
        dispatch(updateTimerMode("active"));
        dispatch(updateSecondsLeft(sessionTime * 60));
      }
    }
  }, [secondsLeft, timerMode]);

  // Start countdown when timer is running
  useEffect(() => {
    if (isRunning) {
      const newIntervalId = setInterval(() => {
        dispatch(decrementSecondsLeft());
        // }, 1000); // 1s
      }, 100); // TODO: increase final ms time
      setIntervalId(newIntervalId);
    } else {
      if (intervalId) {
        clearInterval(intervalId);
      }
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning]);

  // Update timer if change break time amount
  useEffect(() => {
    if (timerMode === "break") {
      //? setSecondsLeft(breakMinutes * 60);
      dispatch(updateSecondsLeft(breakTime * 60));
    }
  }, [breakTime]);

  // Update timer if change session time amount
  useEffect(() => {
    if (timerMode === "active") {
      //? setSecondsLeft(workMinutes * 60);
      dispatch(updateSecondsLeft(sessionTime * 60));
    }
  }, [sessionTime]);

  return (
    <div className="App text-center">
      <h1 className="font-bold text-2xl uppercase tracking-widest mt-10">
        Pomodoro Timer
      </h1>
      <section className="mb-14">
        <Timer volume={volume} setVolume={setVolume} />
        <TimerStatus />
        <TimerControls stop={stop} />
      </section>
      {/* <audio id="beep" ref={audioElement}>
        <source src="./audio/tick.wav" type="audio/mpeg" />
      </audio> */}
    </div>
  );
}

export default App;
