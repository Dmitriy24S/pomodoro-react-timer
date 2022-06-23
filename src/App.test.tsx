import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

test("page load test", () => {
  render(<App />);
  const title = screen.getByText(/POMODORO TIMER/i);
  expect(title).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Start" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Restart" })).toBeInTheDocument();
  // expect(screen.getByTestId("CircularProgressbar")).toBeInTheDocument();
  expect(screen.getByTestId("progressCircle")).toBeInTheDocument();
  expect(screen.getByTestId("timerStatus")).toBeInTheDocument();
  expect(screen.getByTestId("counterBreakInput")).toBeInTheDocument();
  expect(screen.getByTestId("incrementBreakBtn")).toBeInTheDocument();
});

test("increment break amount", () => {
  render(<App />);
  const breakCounter = screen.getByTestId(
    "counterBreakInput"
  ) as HTMLInputElement;
  const incrementBreakBtn = screen.getByTestId("incrementBreakBtn");
  expect(breakCounter.value).toBe("5");
  fireEvent.click(incrementBreakBtn);
  expect(breakCounter.value).toBe("6");
});

test("start / pause timer", () => {
  render(<App />);
  const progressCircleText = screen.getByTestId("progressCircle")
    .textContent as string;
  const startPauseTimerButton = screen.getByTestId("startPauseTimerButton");
  expect(progressCircleText).toBe("15:00");
  expect(startPauseTimerButton.textContent).toBe("Start");
  fireEvent.click(startPauseTimerButton);
  expect(startPauseTimerButton.textContent).toBe("Pause");
});
