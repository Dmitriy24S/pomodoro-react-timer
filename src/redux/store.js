import { configureStore } from "@reduxjs/toolkit";
import timerReducer from "./timerSlice";

export default configureStore({
  reducer: {
    timer: timerReducer,
  },
});
