import { initialData, data, formatTime } from "../model.js";

export class DurationsView {
  _parentElement = document.querySelector(".pomodoro_durations");
  _timerDisplay = document.querySelector(".timer__display");

  updateTimerDisplay(data) {
    this._timerDisplay.textContent = formatTime(data);
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      e.preventDefault();
      const action = e.target.dataset.action;
      if (!action) return;
      handler(action);
    });
  }
}
export default new DurationsView();
