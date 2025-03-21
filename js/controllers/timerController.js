import * as timerModel from "../models/timerModel.js";
import * as canvasModel from "../models/canvasModel.js";
import timerView from "../views/timerView.js";

const timerController = function (action) {
  switch (action) {
    case "start":
      canvasModel.setTimerStarted(true); // Set timer started flag
      if (timerModel.data.isRunning) return;
      timerModel.startTimer();

      //canvasModel.resetAngles(); // Reset angles on start
      break;

    case "pause":
      canvasModel.setTimerStarted(false);
      if (!timerModel.data.isRunning) return;
      timerModel.pauseTimer();
      break;

    case "reset":
      timerModel.resetTimer();
      canvasModel.resetAngles(); // Reset angles on reset
      canvasModel.setTimerStarted(false); // Reset timer started flag
      break;
  }
  timerView.updateTimerDisplay(timerModel.data);
};

export default timerController;
