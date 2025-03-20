import * as canvasModel from "../models/canvasModel.js";
import * as timerModel from "../models/timerModel.js";
class CanvasView {
  initialStart = canvasModel.watchData.seconds;

  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.internalRadius = canvasModel.watchData.radius;
    this.externalRadius = this.internalRadius + 20;
    this.canvas.width = this.internalRadius * 2 + 50;
    this.canvas.height = this.internalRadius * 2 + 50;
    this.centerX = this.canvas.width / 2;
    this.centerY = this.canvas.height / 2;
    this.previousSeconds = canvasModel.watchData.seconds;
    this.previousMinutes = canvasModel.watchData.minutes;
    this.previousHours = canvasModel.watchData.hours;
    this.drawDial();
  }

  drawDial() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.beginPath();
    this.ctx.arc(
      this.centerX,
      this.centerY,
      this.internalRadius,
      0,
      2 * Math.PI
    );
    this.ctx.fillStyle = "#f0f0f0";
    this.ctx.fill();
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.arc(
      this.centerX,
      this.centerY,
      this.externalRadius,
      0,
      2 * Math.PI
    );
    this.ctx.stroke();

    //this.drawDialLines();
    this.drawDialNumbers();
    this.drawHourHand();
    this.drawMinuteHand();
    this.drawSecondsHand();
    this.drawDownwardTriangle(15);

    if (
      timerModel.data.isRunning &&
      timerModel.data._minutes !== 0 &&
      timerModel.data._seconds !== 0
    ) {
      this.drawLoadingBar();
    }
  }

  drawLoadingBar() {
    let outerRadius = this.externalRadius - 3;
    let innerRadius = this.internalRadius + 3;
    const boundArc = this.ctx.arc.bind(this.ctx, this.centerX, this.centerY);

    let startAngle = this.degToRad(6 * this.initialStart);
    let endAngle = this.degToRad(6 * canvasModel.watchData.seconds);

    this.ctx.beginPath();
    // this.ctx.arc(this.centerX, this.centerY, outerRadius, startAngle, endAngle);
    boundArc(outerRadius, startAngle, endAngle);

    this.ctx.lineTo(
      this.centerX + innerRadius * Math.cos(endAngle),
      this.centerY + innerRadius * Math.sin(endAngle)
    );
    boundArc(innerRadius, endAngle, startAngle, true);

    this.ctx.closePath();
    this.ctx.fillStyle = "#78909c";
    this.ctx.fill();
    this.ctx.stroke();
  }

  drawDownwardTriangle(size) {
    const angle = this.degToRad(0);
    const triangleX =
      this.centerX + (this.internalRadius + 5) * Math.cos(angle);
    const triangleY =
      this.centerY + (this.internalRadius + 5) * Math.sin(angle);

    this.ctx.beginPath();
    this.ctx.moveTo(triangleX, triangleY);
    this.ctx.lineTo(triangleX - size / 2, triangleY - size);
    this.ctx.lineTo(triangleX + size / 2, triangleY - size);

    this.ctx.closePath();
    this.ctx.fillStyle = "#607d8b";
    this.ctx.fill();
  }

  drawDialLines() {
    const minutesArray = Array.from({ length: 61 }, (_, i) => i);

    minutesArray.forEach((i) => {
      //const angle = this.toRadians(6 * i); //minutes/seconds
      const angle = this.degToRad(0.5 * (60 * i)); //hours

      const calculateDialLineCoordinates = function (angle) {
        const externalPoint = {
          x: this.centerX + (this.externalRadius - 5) * Math.cos(angle),
          y: this.centerY + (this.externalRadius - 5) * Math.sin(angle),
        };

        const internalPoint = {
          a: this.centerX + (this.internalRadius + 5) * Math.cos(angle),
          b: this.centerY + (this.internalRadius + 5) * Math.sin(angle),
        };

        return { ...externalPoint, ...internalPoint };
      };

      const { x, y, a, b } = calculateDialLineCoordinates(angle);

      this.ctx.moveTo(x, y);
      this.ctx.lineTo(a, b);
      this.ctx.stroke();
    });
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
      let angle = this.degToRad(30 * (index + 1));
      const x = this.centerX + this.internalRadius * offset * Math.cos(angle);

      const y = this.centerY + this.internalRadius * offset * Math.sin(angle);

      this.ctx.fillText(num, x, y);
    });
  }

  drawHand(length, angle, type) {
    angle = this.degToRad(angle);
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
      this.internalRadius,
      6 * canvasModel.watchData.seconds,
      "second"
    );
  }

  drawMinuteHand() {
    this.drawHand(
      this.internalRadius * 0.95,
      6 * canvasModel.watchData.minutes,
      "minute"
    );
  }

  drawHourHand() {
    this.drawHand(
      this.internalRadius * 0.6,
      0.5 * (60 * canvasModel.watchData.hours + canvasModel.watchData.minutes),
      "hour"
    );
  }

  degToRad = (degrees) => ((degrees - 90) * Math.PI) / 180;

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
