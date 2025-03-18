export const data = {
  time: {
    _now: 0,
    _seconds: 0,
    _minutes: 0,
    _hours: 0,
  },

  center: null,
  radius: 300,
  canvas: null,
};

export function getTimeNow() {
  const now = new Date();
  data.time._now = now;
  data.time._seconds = now.getSeconds();
  data.time._minutes = now.getMinutes();
  data.time._hours = now.getHours();
  console.log(
    `Local Time: ${data.time._hours}:${data.time._minutes}:${data.time._seconds}`
  );
}

//setInterval(getTimeNow, 1000);
