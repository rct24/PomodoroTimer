import * as timerModel from "../models/timerModel.js";
import * as canvasModel from "../models/canvasModel.js";
import timerView from "../views/timerView.js";
import canvasView from "../views/canvasView.js";

const timerController = function (action) {
  switch (action) {
    case "start":
      canvasModel.setTimerStarted(true);
      if (timerModel.data.isRunning) return;
      timerModel.startTimer();

      canvasView.initialStart = canvasModel.watchData.minutes;

      break;

    case "pause":
      if (!timerModel.data.isRunning) return;
      timerModel.pauseTimer();
      break;

    case "reset":
      timerModel.resetTimer();
      canvasModel.resetAngles();
      canvasModel.setTimerStarted(false);
      break;
  }
  timerView.updateTimerDisplay(timerModel.data);
};

export default timerController;
