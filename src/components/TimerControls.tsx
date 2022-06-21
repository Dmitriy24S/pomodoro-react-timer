interface TimerControlsProps {
  handleStartStopClick: () => void;
  handleResetClick: () => void;
  isPaused: boolean;
  secondsLeft: number;
  totalSeconds: number;
}

const TimerControls = ({
  handleStartStopClick,
  handleResetClick,
  isPaused,
  secondsLeft,
  totalSeconds,
}: TimerControlsProps) => {
  return (
    <div className="button-container flex gap-4 justify-center mt-8">
      <button
        className="border rounded-md py-2 px-4 w-24 hover:bg-white hover:bg-opacity-20"
        onClick={handleStartStopClick}
      >
        {isPaused && secondsLeft === totalSeconds // if new timer - show 'start'
          ? "Start"
          : isPaused && secondsLeft < totalSeconds // if paused after ticking down - show 'resume / if active ticking timer - show 'pause'
          ? "Resume"
          : "Pause"}
      </button>
      <button
        className="border rounded-md py-2 px-4 w-24 hover:bg-white hover:bg-opacity-20"
        onClick={handleResetClick}
      >
        Restart
      </button>
    </div>
  );
};

export default TimerControls;
