import * as model from "../timerModel.js";
import timerView from "../views/timerView.js";

const timerController = function (action) {
  switch (action) {
    case "start":
      if (model.data.isRunning) return;

      model.startTimer();
      break;

    case "pause":
      if (!model.data.isRunning) return;

      model.pauseTimer();
      break;

    case "reset":
      model.resetTimer();
      break;
  }
  timerView.updateTimerDisplay(model.data);
};

export default timerController;
