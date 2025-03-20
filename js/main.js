import timerView from "./views/timerView.js";
import timerController from "./controllers/timerController.js";
import durationsView from "./views/durationsView.js";
import durationsController from "./controllers/durationsController.js";
import {
  watchController,
  loadBarController,
} from "./controllers/canvasController.js";
import { setTimer } from "./models/timerModel.js";
import canvasView from "./views/canvasView.js";

const init = function () {
  setTimer(25, 0);
  canvasView.addHandlerOnLoad(() => {
    setInterval(watchController, 1000);
  });
  timerView.addHandlerClick(timerController);
  durationsView.addHandlerClick(durationsController);
};

init();
