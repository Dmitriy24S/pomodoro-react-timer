interface TimerStatusProps {
  isPaused: boolean;
  timerMode: string;
}

const TimerStatus = ({ isPaused, timerMode }: TimerStatusProps) => {
  return (
    <section className="timer-mode p-6 capitalize">
      <p>
        <span className="opacity-80 font-light">Status: </span>
        {isPaused ? "Paused" : timerMode}
      </p>
    </section>
  );
};

export default TimerStatus;
