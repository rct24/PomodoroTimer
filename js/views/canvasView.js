import * as model from "../canvasModel.js";

class CanvasView {
  _parentElement = document.getElementById("canvas");

  constructor() {
    model.getTimeNow();
  }

  draw() {
    const canvas = document.getElementById("canvas");

    if (canvas.getContext) {
      const ctx = canvas.getContext("2d");
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = 300;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#0d2d68";
      ctx.stroke();
    }
  }

  addHandlerRender() {
    window.addEventListener("load", this.draw);
  }
}

export default new CanvasView();
