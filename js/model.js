export const initialData = {
  _seconds: 9,
  _minutes: 0,
  timer: null,
};

export let data = { ...initialData };

export function formatTime(value) {
  const { _seconds, _minutes } = value;
  const formattedSeconds = _seconds.toString().padStart(2, "0");
  const formattedMinutes = _minutes.toString().padStart(2, "0");
  return `${formattedMinutes}:${formattedSeconds}`;
}

export function startTimer() {
  const countDownSeconds = function () {
    if (data._seconds > 0) {
      data._seconds--;
    } else {
      clearInterval(data.timer);
    }
    document.dispatchEvent(new CustomEvent("timerUpdated", { detail: data }));
  };

  data.timer = setInterval(countDownSeconds, 1000);
}

export function pauseTimer() {
  if (data.timer) clearInterval(data.timer);
}

export function resetTimer() {
  pauseTimer();
  data = { ...initialData };
  document.dispatchEvent(new CustomEvent("timerUpdated", { detail: data }));
}
