import * as timerModel from "../models/timerModel.js";

export const watchData = {
  _now: new Date(),
  get seconds() {
    return this._now.getSeconds();
  },
  get minutes() {
    return this._now.getMinutes();
  },
  get hours() {
    return this._now.getHours();
  },
  radius: 300,
  dpr: window.devicePixelRatio || 1,
  angles: [],
  timerStarted: false,
  degToRad: (degrees) => ((degrees - 90) * Math.PI) / 180,
  initialAngle: 0,
};

export function updateTime() {
  watchData._now = new Date();
}

export function setAngles({ start, end }) {
  const angles = watchData.angles;
  const radStart = watchData.degToRad(start);
  const radEnd = watchData.degToRad(end);

  // Handle empty array case first
  if (angles.length === 0) {
    angles.push({ start: radStart, end: radEnd });
    return;
  }

  const last = angles[angles.length - 1];

  if (last.end === radStart) {
    last.end = radEnd;
  } else if (last.start === radStart) {
    last.end = radEnd;
  } else {
    angles.push({ start: radStart, end: radEnd });
  }
}

export function getAngles() {
  return watchData.angles;
}

export function resetAngles() {
  watchData.angles = [];
}

export function setTimerStarted(value) {
  watchData.timerStarted = value;
}
