import * as model from "../models/canvasModel.js";
import canvasView from "../views/canvasView.js";

const canvasController = function () {
  model.updateTime();
  canvasView.drawDial();
};

export default canvasController;
