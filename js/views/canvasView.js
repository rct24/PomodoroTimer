import * as model from "../canvasModel.js";

class CanvasView {
  constructor() {
    //model.getTimeNow();
  }

  drawWatchFace() {
    if (canvas.getContext) {
      const ctx = canvas.getContext("2d");
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = model.data.radius;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#0d2d68";

      this.drawHourHand();
      ctx.stroke();
    }
  }

  drawHourHand() {
    if (canvas.getContext) {
      const ctx = canvas.getContext("2d");
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = model.data.radius;
      console.log(
        "canvas data:",
        canvas.width,
        canvas.height,
        centerX,
        centerY,
        radius
      );

      const hour_rad = this.toRadians(
        0.5 * (60 * new Date().getHours() + new Date().getMinutes())
      );
      const hour_x = centerX + radius * Math.cos(hour_rad);
      const hour_y = centerY + radius * Math.sin(hour_rad);

      ctx.moveTo(centerX, centerY);
      ctx.lineTo(hour_x, hour_y);
      ctx.stroke();
    }
  }

  drawSecondsHand() {}

  drawMinuteHand() {}

  toRadians(angle_inDegrees) {
    return (angle_inDegrees - 90) * (Math.PI / 180);
  }

  addHandlerRender() {
    window.addEventListener("load", this.drawWatchFace());
  }
}

export default new CanvasView();
