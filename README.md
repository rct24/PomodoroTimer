# Design Document - Pomodoro Timer

## Overview
The Pomodoro Timer is a simple web application that helps users manage their time using the Pomodoro technique. The application provides a timer with different duration modes, allowing users to switch between work sessions and breaks.

## Architecture
The application follows a **modular JavaScript architecture** and is structured into multiple layers:
- **HTML & CSS**: Defines the UI structure and styling.
- **JavaScript (Modules)**: Implements functionality using the MVC pattern.
  - **Model**: Handles timer data and logic.
  - **View**: Manages UI updates and interactions.
  - **Controller**: Connects user actions to model updates.

## File Structure
```
PomodoroTimer/
│── index.html         # Main HTML file
│── style.css         # Stylesheet
│── js/
│   ├── main.js       # Application entry point
│   ├── model.js      # Data model & timer logic
│   ├── controllers/
│   │   ├── timerController.js       # Handles timer actions (start, pause, reset)
│   │   ├── durationsController.js   # Handles duration selection (Pomodoro, Short Break, Long Break)
│   ├── views/
│   │   ├── timerView.js     # Manages timer UI updates
│   │   ├── durationsView.js # Handles user interactions for durations
```

## Components
### **Model (model.js)**
- Stores the timer state (`minutes`, `seconds`, `isRunning`).
- Implements core functions:
  - `startTimer()`: Starts countdown.
  - `pauseTimer()`: Pauses countdown.
  - `resetTimer()`: Resets timer.
  - `setTimer(minutes, seconds)`: Sets a specific time.
  
### **Controllers**
- `timerController.js`: Listens for start, pause, and reset actions and updates the model.
- `durationsController.js`: Listens for Pomodoro/Break selection and updates the timer accordingly.

### **Views**
- `timerView.js`: Updates the displayed timer when data changes.
- `durationsView.js`: Handles button clicks for Pomodoro/Break selection.

## Data Flow
1. User clicks a button (e.g., "Start").
2. The **controller** processes the action and updates the **model**.
3. The **model** triggers an event (`timerUpdated`).
4. The corresponding **view** listens for the event and updates the UI.

## Future Improvements
- Add sound notifications when a session ends.
- Allow users to customize session durations.
- Store timer state in `localStorage` to persist data between page reloads.

---
This document provides an overview of the architecture and components of the Pomodoro Timer application.

