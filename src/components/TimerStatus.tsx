interface TimerStatusProps {
  isPaused: boolean;
  timerMode: string;
}

const TimerStatus = ({ isPaused, timerMode }: TimerStatusProps) => {
  return (
    <section className="timer-mode p-6 capitalize">
      Status: {isPaused ? "Paused" : timerMode}
    </section>
  );
};

export default TimerStatus;
