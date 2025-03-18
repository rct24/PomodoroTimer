import * as model from "../canvasModel.js";

class CanvasView {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.radius = model.watchData.radius;
    this.canvas.width = this.radius * 2 + 10;
    this.canvas.height = this.radius * 2 + 10;
  }

  drawWatchFace() {
    if (canvas.getContext) {
      const { ctx, canvas } = this;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.arc(centerX, centerY, this.radius, 0, 2 * Math.PI);
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#0d2d68";
      ctx.stroke();

      // Draw hour hand
      this.drawHand(
        centerX,
        centerY,
        this.radius * 0.8,
        this.toRadians(
          0.5 * (60 * model.watchData.hours + model.watchData.minutes)
        ),
        ctx,
        "hour"
      );

      // Draw minute hand
      this.drawHand(
        centerX,
        centerY,
        this.radius * 0.95,
        this.toRadians(6 * model.watchData.minutes),
        ctx,
        "minute"
      );
    }
  }

  drawHand(centerX, centerY, length, angle, ctx, type) {
    this.setHandStyles(ctx, type);

    const x = centerX + length * Math.cos(angle);
    const y = centerY + length * Math.sin(angle);

    const offset = 20;
    const adjustedX = centerX + (length - offset) * Math.cos(angle);
    const adjustedY = centerY + (length - offset) * Math.sin(angle);

    switch (type) {
      case "hour":
        ctx.beginPath();
        ctx.arc(adjustedX, adjustedY, 5, 0, 2 * Math.PI);

        ctx.fill();
        break;
      case "minute":
        ctx.beginPath();
        ctx.arc(adjustedX, adjustedY, 10, 0, 2 * Math.PI);

        ctx.fill();
        break;
    }

    ctx.moveTo(centerX, centerY);
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  drawSecondsHand() {
    if (canvas.getContext) {
      const ctx = canvas.getContext("2d");
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      this.drawHand(
        centerX,
        centerY,
        this.radius,
        this.toRadians(6 * model.watchData.seconds),
        ctx,
        "second"
      );
    }
  }

  toRadians(angle_inDegrees) {
    return (angle_inDegrees - 90) * (Math.PI / 180);
  }

  setHandStyles(ctx, type) {
    switch (type) {
      case "hour":
        ctx.strokeStyle = "#0d2d68";
        ctx.lineWidth = 8;
        break;
      case "minute":
        ctx.strokeStyle = "#0d2d68";
        ctx.lineWidth = 6;
        break;
      case "second":
        ctx.strokeStyle = "#ff4500";
        ctx.lineWidth = 4;
        break;
      default:
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 2;
    }
  }

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }

  startSecondsHand() {
    setInterval(() => {
      this.drawWatchFace();
      this.drawSecondsHand();
    }, 1000);
  }
}

export default new CanvasView();
