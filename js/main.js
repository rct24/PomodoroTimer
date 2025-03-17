import timerView from "./views/timerView.js";
import timerController from "./controllers/timerController.js";

const init = function () {
  timerView.addHandlerClick(timerController);
};

init();
