import * as timerModel from "../models/timerModel.js";
import timerView from "../views/timerView.js";

const timerController = function (action) {
  switch (action) {
    case "start":
      if (timerModel.data.isRunning) return;
      timerModel.startTimer();
      break;

    case "pause":
      if (!timerModel.data.isRunning) return;
      timerModel.pauseTimer();
      break;

    case "reset":
      timerModel.resetTimer();
      break;
  }
  timerView.updateTimerDisplay(timerModel.data);
};

export default timerController;
