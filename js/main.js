import timerView from "./views/timerView.js";
import timerController from "./controllers/timerController.js";
import durationsView from "./views/durationsView.js";
import durationsController from "./controllers/durationsController.js";
import { setTimer, data } from "./model.js";

const init = function () {
  //setting initial time when opening the app
  setTimer(25, 0);

  timerView.addHandlerClick(timerController);
  durationsView.addHandlerClick(durationsController);
};

init();
