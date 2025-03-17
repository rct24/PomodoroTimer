export const data = {
  _seconds: 0,
  _minutes: 0,
  _hours: 0,
  time: Date.now(),

  center: null,
};

export function getTimeNow() {
  console.log(new Date(data.time).toLocaleTimeString());
}
