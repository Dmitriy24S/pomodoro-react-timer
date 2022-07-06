import { createSlice } from "@reduxjs/toolkit";

const presetSessionMinutes = 25;
const presetBreakMinutes = 5;

const initialState = {
  isRunning: false,
  isPaused: true,
  sessionTime: presetSessionMinutes,
  breakTime: presetBreakMinutes,
  secondsLeft: 25 * 60,
  timerMode: "active",
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    increaseSessionTime: (state) => {
      if (state.sessionTime >= 1) {
        state.sessionTime += 1;
      }
    },
    decreaseSessionTime: (state) => {
      // cant reduce session time to less than 1minute
      if (state.sessionTime > 1) {
        state.sessionTime -= 1;
      }
    },
    increaseBreakTime: (state) => {
      if (state.breakTime >= 1) {
        state.breakTime += 1;
      }
    },
    decreaseBreakTime: (state) => {
      // cant reduce break time to less than 1minute
      if (state.breakTime > 1) {
        state.breakTime -= 1;
      }
    },
    updateSessionTime: (state, action) => {
      const newSessionTime = action.payload;
      state.sessionTime = newSessionTime;
    },
    updateBreakTime: (state, action) => {
      const newBreakTime = action.payload;
      state.breakTime = newBreakTime;
    },
    updateSecondsLeft: (state, action) => {
      const newSecondsLeft = action.payload;
      state.secondsLeft = newSecondsLeft;
    },
    decrementSecondsLeft: (state) => {
      state.secondsLeft = state.secondsLeft - 1;
    },
    updateTimerMode: (state, action) => {
      const newTimerMode = action.payload;
      state.timerMode = newTimerMode;
    },
    updateIsRunningState: (state, action) => {
      const newIsRunningState = action.payload;
      state.isRunning = newIsRunningState;
    },
    handleStartStopClick: (state) => {
      if (state.isPaused) {
        // if timer is paused - want to start the timer/countdown/interval
        state.isRunning = true;
        state.isPaused = false;
      } else {
        // if timer not paused - want to stop the countdown/interval
        state.isRunning = false;
        state.isPaused = true;
      }
    },
    handleResetClick: (state) => {
      // stop() // audio stop
      state.sessionTime = presetSessionMinutes;
      state.breakTime = presetBreakMinutes;
      state.secondsLeft = presetSessionMinutes * 60;
      state.isPaused = true;
      state.isRunning = false;
      state.timerMode = "active";
    },
  },
});

export const {
  increaseSessionTime,
  decreaseSessionTime,
  increaseBreakTime,
  decreaseBreakTime,
  updateSessionTime,
  updateTimerMode,
  updateBreakTime,
  updateSecondsLeft,
  updateIsRunningState,
  handleStartStopClick,
  handleResetClick,
  decrementSecondsLeft,
} = timerSlice.actions;

export default timerSlice.reducer;
