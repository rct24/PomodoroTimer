import * as model from "./model.js";
import timerView from "./views/timerView.js";

const timerController = async function (action) {
  switch (action) {
    case "start":
      console.log("Timer started");
      model.startTimer();
      break;

    case "pause":
      console.log("Timer paused at", model.data._seconds);
      model.pauseTimer();
      break;

    case "reset":
      console.log("Timer reset to", model.initialData._seconds);
      model.resetTimer();
      break;
  }
  timerView.updateTimerDisplay(model.data);
};

const init = function () {
  timerView.addHandlerClick(timerController);
};

init();
