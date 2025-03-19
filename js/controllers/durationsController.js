import * as model from "../models/timerModel.js";
import durationsView from "../views/durationsView.js";

const durationsController = function (action) {
  switch (action) {
    case "pomodoro":
      model.setTimer(25, 0);
      break;

    case "shortBreak":
      model.setTimer(5, 0);
      break;

    case "longBreak":
      model.setTimer(30, 0);
      break;
  }
  durationsView.updateTimerDisplay(model.data);
};

export default durationsController;
