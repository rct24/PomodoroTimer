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

  // Case 1: Continuation of previous segment
  if (last.end === radStart) {
    last.end = radEnd;
  }
  // Case 2: Update existing segment's end
  else if (last.start === radStart) {
    last.end = radEnd;
  }
  // Case 3: Add new segment
  else {
    angles.push({ start: radStart, end: radEnd });
  }
}

export function getAngles() {
  return watchData.angles;
}

export function resetAngles() {
  watchData.angles = [];
  console.log(`Angles reset: ${JSON.stringify(watchData.angles)}`);
}

export function setTimerStarted(value) {
  watchData.timerStarted = value;
  console.log(`Timer started: ${watchData.timerStarted}`);
}
