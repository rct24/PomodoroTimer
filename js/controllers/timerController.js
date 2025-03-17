import * as model from "./../model.js";
import timerView from "../views/timerView.js";

const timerController = async function (action) {
  switch (action) {
    case "start":
      if (model.data.isRunning) return;

      console.log("Timer started");

      model.startTimer();
      break;

    case "pause":
      if (!model.data.isRunning) return;
      console.log("Timer paused");

      model.pauseTimer();
      break;

    case "reset":
      console.log("Timer reset");
      model.resetTimer();
      break;
  }
  timerView.updateTimerDisplay(model.data);
};

export default timerController;
