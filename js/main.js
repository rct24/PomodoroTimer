import timerView from "./views/timerView.js";
import timerController from "./controllers/timerController.js";
import durationsView from "./views/durationsView.js";
import durationsController from "./controllers/durationsController.js";
import { setTimer, data } from "./model.js";

const init = function () {
  //setting initial time when opening the app
  draw();
  setTimer(25, 0);

  timerView.addHandlerClick(timerController);
  durationsView.addHandlerClick(durationsController);
};

function draw() {
  const canvas = document.getElementById("canvas");

  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 300;

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas before drawing
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.stroke();
  }
}

init();
