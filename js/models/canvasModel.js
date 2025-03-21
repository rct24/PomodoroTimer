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
};

export function updateTime() {
  watchData._now = new Date();
}

export function setAngles({ start, end }) {
  if (!timerModel.data.isRunning && !watchData.timerStarted) return;

  // Check if the same values are already in the angles array
  const lastElement = watchData.angles[watchData.angles.length - 1];
  if (lastElement && lastElement.start === start && lastElement.end === end) {
    return;
  }

  watchData.angles.push({ start, end });
  console.log(`Angles updated: ${JSON.stringify(watchData.angles)}`);
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
