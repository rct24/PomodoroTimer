import * as model from "../models/watchModel.js";
import canvasView from "../views/canvasView.js";

export const watchController = function () {
  model.updateTime();

  canvasView.drawDial();
  
};

export const loadBarController = function () {};
