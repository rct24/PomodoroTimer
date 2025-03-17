export const initialData = {
  _seconds: 0,
  _minutes: 0,
  timer: null,
  isRunning: false,
};

export let data = { ...initialData };

export function formatTime(value) {
  const { _seconds, _minutes } = value;
  const formattedSeconds = _seconds.toString().padStart(2, "0");
  const formattedMinutes = _minutes.toString().padStart(2, "0");
  return `${formattedMinutes}:${formattedSeconds}`;
}

function updateTimer() {
  if (data._minutes > 0 && data._seconds === 0) {
    data._minutes--;
    data._seconds = 59;
  } else if (data._minutes === 0 && data._seconds === 0) {
    clearInterval(data.timer);
    data.isRunning = false;
  } else {
    data._seconds--;
  }
  document.dispatchEvent(new CustomEvent("timerUpdated", { detail: data }));
}

export function startTimer() {
  if (data.isRunning) return;
  data.isRunning = true;
  data.timer = setInterval(updateTimer, 1000);
}

export function pauseTimer() {
  data.isRunning = false;
  if (data.timer) clearInterval(data.timer);
}

export function resetTimer() {
  pauseTimer();
  data = { ...initialData };
  document.dispatchEvent(new CustomEvent("timerUpdated", { detail: data }));
}

export function setTimer(minutes, seconds) {
  pauseTimer();
  initialData._minutes = minutes;
  initialData._seconds = seconds;
  data = { ...initialData };
  document.dispatchEvent(new CustomEvent("timerUpdated", { detail: data }));
}
