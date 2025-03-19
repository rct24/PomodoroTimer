import * as model from "../models/canvasModel.js";
import canvasView from "../views/canvasView.js";

const canvasController = function () {
  console.log(`controller hit`);

  model.updateTime();
  canvasView.drawDial();
};

export default canvasController;
