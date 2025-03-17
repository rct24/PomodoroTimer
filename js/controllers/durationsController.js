import * as model from "../timerModel.js";
import durationsView from "../views/durationsView.js";

const durationsController = async function (action) {
  switch (action) {
    case "pomodoro":
      //   console.log(`Pomodoro timer started`);

      model.setTimer(25, 0);
      break;

    case "shortBreak":
      //   console.log(`Short break timer started`);

      model.setTimer(5, 0);
      break;

    case "longBreak":
      //   console.log(`Long break timer started`);

      model.setTimer(30, 0);
      break;
  }
  durationsView.updateTimerDisplay(model.data);
};

export default durationsController;
