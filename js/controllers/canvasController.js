import * as model from "../canvasModel.js";
import { data } from "../timerModel.js";
import canvasView from "../views/canvasView.js";

const canvasController = function () {
  model.updateTime();
  canvasView.drawWatchFace();
  canvasView.drawSecondsHand();
};

export default canvasController;
