import timerView from "./views/timerView.js";
import timerController from "./controllers/timerController.js";
import durationsView from "./views/durationsView.js";
import durationsController from "./controllers/durationsController.js";
import canvasView from "./views/canvasView.js";
import canvasController from "./controllers/canvasController.js";
import { setTimer } from "./timerModel.js";

const init = function () {
  //setting initial time when opening the app
  canvasView.addHandlerRender(canvasController);
  setTimer(25, 0);

  timerView.addHandlerClick(timerController);
  durationsView.addHandlerClick(durationsController);
};

init();
