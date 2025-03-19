import * as model from "../models/canvasModel.js";

class CanvasView {
  constructor() {
    console.log(`canvas CONSTR hit`);

    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.radius = model.watchData.radius;
    this.canvas.width = this.radius * 2 + 20;
    this.canvas.height = this.radius * 2 + 20;
    this.centerX = this.canvas.width / 2;
    this.centerY = this.canvas.height / 2;
    this.previousSeconds = model.watchData.seconds;
    this.previousMinutes = model.watchData.minutes;
    this.previousHours = model.watchData.hours;
    this.drawDial();
  }

  drawDial() {
    console.log(`watch face drawn`);

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.beginPath();
    this.ctx.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.arc(this.centerX, this.centerY, this.radius + 5, 0, 2 * Math.PI);
    this.ctx.stroke();
    this.drawDialNumbers();
    this.drawHourHand();
    this.drawMinuteHand();
    this.drawSecondsHand();
  }

  drawDialNumbers() {
    const numbers = Array.from(Array(13).keys()).slice(1);
    const romanNumbers = [
      "I",
      "II",
      "III",
      "IV",
      "V",
      "VI",
      "VII",
      "VIII",
      "IX",
      "X",
      "XI",
      "XII",
    ];
    this.ctx.font = "25px serif";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillStyle = "#607d8b";
    const offset = 0.93;

    romanNumbers.forEach((num, index) => {
      const x =
        this.centerX +
        this.radius * offset * Math.cos(this.toRadians(30 * (index + 1)));

      const y =
        this.centerY +
        this.radius * offset * Math.sin(this.toRadians(30 * (index + 1)));

      this.ctx.fillText(num, x, y);
    });
  }

  drawHand(length, angle, type) {
    this.setHandStyles(type);

    const x = this.centerX + length * Math.cos(angle);
    const y = this.centerY + length * Math.sin(angle);

    const offset = 20;
    const adjustedX = this.centerX + (length - offset) * Math.cos(angle);
    const adjustedY = this.centerY + (length - offset) * Math.sin(angle);

    if (type === "hour" || type === "minute") {
      this.ctx.beginPath();
      const radius = type === "hour" ? 5 : 10;
      this.ctx.arc(adjustedX, adjustedY, radius, 0, 2 * Math.PI);
      this.ctx.fill();
    }

    this.ctx.moveTo(this.centerX, this.centerY);
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
  }

  drawSecondsHand() {
    this.drawHand(
      this.radius,
      this.toRadians(6 * model.watchData.seconds),
      "second"
    );
  }

  drawMinuteHand() {
    this.drawHand(
      this.radius * 0.95,
      this.toRadians(6 * model.watchData.minutes),
      "minute"
    );
  }

  drawHourHand() {
    this.drawHand(
      this.radius * 0.6,
      this.toRadians(
        0.5 * (60 * model.watchData.hours + model.watchData.minutes)
      ),
      "hour"
    );
  }

  toRadians(angle_inDegrees) {
    return (angle_inDegrees - 90) * (Math.PI / 180);
  }

  setHandStyles(type) {
    switch (type) {
      case "hour":
        this.ctx.strokeStyle = "#1e3a5f";
        this.ctx.lineWidth = 8;
        break;
      case "minute":
        this.ctx.strokeStyle = "#0d2d68";
        this.ctx.lineWidth = 4;
        break;
      case "second":
        this.ctx.strokeStyle = "#607d8b";
        this.ctx.lineWidth = 2;
        break;
    }
  }

  addHandlerOnLoad(handler) {
    window.addEventListener("load", handler);
  }
}

export default new CanvasView();
