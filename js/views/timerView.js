import { initialData, formatTime } from "../models/timerModel.js";

class TimerView {
  _parentElement = document.querySelector(".pomodoro_timer");
  _timerDisplay = document.querySelector(".timer__display");
  _timerControls = document.querySelector(".timer-controls");
  _errorMessage = "No timer data found";
  _message = "";

  constructor() {
    this.updateTimerDisplay(initialData);
    this._addHandlerTimerUpdate();
  }

  updateTimerDisplay(data) {
    this._timerDisplay.textContent = formatTime(data);
  }

  _addHandlerTimerUpdate() {
    document.addEventListener("timerUpdated", (e) => {
      this.updateTimerDisplay(e.detail);
    });
  }

  addHandlerClick(handler) {
    this._timerControls.addEventListener("click", function (e) {
      e.preventDefault();
      const action = e.target.dataset.action;

      if (!action) return;

      handler(action);
    });
  }
}
export default new TimerView();
