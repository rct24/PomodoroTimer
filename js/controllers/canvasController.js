import * as model from "../models/canvasModel.js";
import canvasView from "../views/canvasView.js";
import * as timerModel from "../models/timerModel.js";

export const watchController = function () {
  model.updateTime();

  canvasView.drawDial();
};

export const loadBarController = function () {};
