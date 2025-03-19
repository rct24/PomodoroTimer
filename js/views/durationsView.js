import { initialData, data, formatTime } from "../models/timerModel.js";

export class DurationsView {
  _parentElement = document.querySelector(".pomodoro_durations");
  _timerDisplay = document.querySelector(".timer__display");
  _pomodoroButton = document.getElementById("pomodoro");

  updateTimerDisplay(data) {
    this._timerDisplay.textContent = formatTime(data);
  }

  addHandlerClick(handler) {
    this._pomodoroButton.classList.add("active");

    this._parentElement.addEventListener("click", function (e) {
      e.preventDefault();
      const action = e.target.dataset.action;

      if (!action) return;

      const activeButton = e.target.classList.toggle("active");

      //toggle active button state for durations
      if (activeButton) {
        document
          .querySelectorAll(".pomodoro_durations button")
          .forEach((button) => {
            if (button !== e.target) {
              button.classList.remove("active");
            }
          });
      }

      handler(action);
    });
  }
}
export default new DurationsView();
