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
};

export function updateTime() {
  watchData._now = new Date();
}

export function initializeStart() {}
