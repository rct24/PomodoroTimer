import * as model from "../canvasModel.js";

class CanvasView {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.radius = model.watchData.radius;
    this.canvas.width = this.radius * 2 + 20;
    this.canvas.height = this.radius * 2 + 20;
    this.drawWatchNumbers();
  }

  drawWatchFace() {
    if (canvas.getContext) {
      const { ctx, canvas } = this;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      ctx.lineWidth = 1;
      ctx.strokeStyle = "#607d8b";
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.arc(centerX, centerY, this.radius, 0, 2 * Math.PI);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(centerX, centerY, this.radius + 5, 0, 2 * Math.PI);
      ctx.stroke();

      //Draw numbers
      this.drawWatchNumbers(centerX, centerY, this.radius * 0.95);

      // Draw hour hand
      this.drawHand(
        centerX,
        centerY,
        this.radius * 0.6,
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

  drawWatchNumbers(centerX, centerY, length, ctx) {
    const numbers = Array.from(Array(13).keys());
    numbers.shift();

    this.ctx.font = "25px serif";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";

    numbers.forEach((i, number) => {
      const x = centerX + length * Math.cos(this.toRadians(0.5 * (60 * i)));
      const y = centerY + length * Math.sin(this.toRadians(0.5 * (60 * i)));
      this.ctx.fillText(i, x, y);
    });
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
        ctx.strokeStyle = "#1e3a5f";
        ctx.lineWidth = 8;
        break;
      case "minute":
        ctx.strokeStyle = "#0d2d68";
        ctx.lineWidth = 4;
        break;
      case "second":
        ctx.strokeStyle = "#607d8b";
        ctx.lineWidth = 2;
        break;
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
