import * as model from "../models/canvasModel.js";
import canvasView from "../views/canvasView.js";

export const watchController = function () {
  model.updateTime();

  canvasView.drawDial();
};

export const loadController = function () {
  model.initializeStart();
  //canvasView.drawLoading();
};
