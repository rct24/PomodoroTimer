import * as model from "../canvasModel.js";

class CanvasView {
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
      ctx.stroke();

      //hour hand
      this.drawHand(
        centerX,
        centerY,
        radius * 0.8,
        this.toRadians(
          0.5 * (60 * new Date().getHours() + new Date().getMinutes())
        ),
        ctx,
        "hour"
      );

      //minute hand
      this.drawHand(
        centerX,
        centerY,
        radius * 0.95,
        this.toRadians(6 * new Date().getMinutes()),
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

    if (type === "hour") {
      ctx.beginPath();
      ctx.arc(adjustedX, adjustedY, 5, 0, 2 * Math.PI);
      ctx.fillStyle = "#0d2d68";
      ctx.fill();
    } else if (type === "minute") {
      ctx.beginPath();
      ctx.arc(adjustedX, adjustedY, 10, 0, 2 * Math.PI);
      ctx.fillStyle = "#0d2d68";
      ctx.fill();
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
      const radius = model.data.radius;

      this.drawHand(
        centerX,
        centerY,
        radius,
        this.toRadians(6 * new Date().getSeconds()),
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

  addHandlerRender() {
    window.addEventListener("load", () => {
      this.drawWatchFace();
      this.startSecondsHand();
    });
  }

  startSecondsHand() {
    setInterval(() => {
      this.drawWatchFace();
      this.drawSecondsHand();
    }, 1000);
  }
}

export default new CanvasView();
