# **Pomodoro Timer Application Design Document**

## **1. Overview**
The Pomodoro Timer application is a web-based tool designed to help users manage their time using the Pomodoro technique. It includes a timer for work sessions (Pomodoro), short breaks and long breaks, as well as a graphical display using a canvas element.

---

## **2. Functional Requirements**
### **Core Features**
1. **Timer Management**:
   - Start, pause, and reset the timer.
   - Display the remaining time in minutes and seconds.
   - Support three modes: Pomodoro (25 minutes), Short Break (5 minutes), and Long Break (30 minutes).

2. **Canvas Graphics**:
   - Render a graphical clock face using the `` element.
   - Display hour and second hands dynamically based on real-time data.

3. **User Interaction**:
   - Buttons to control the timer and switch between modes.
   - Visual feedback for active mode selection.

---

## **3. Non-Functional Requirements**
### **Performance**:
- Timer updates every second without lag.
- Canvas rendering should be smooth and responsive.

### **Usability**:
- Intuitive interface with clear labels for buttons.
- Responsive design for desktop and mobile devices.

### **Maintainability**:
- Modular code structure using ES6 modules for scalability and readability.

---

## **4. Architecture**
### **4.1 Application Structure**
The application follows the Model-View-Controller (MVC) pattern:

- **Models**: Handle data logic (e.g., timer state, canvas properties).
- **Views**: Render UI elements and update them based on user actions or data changes.
- **Controllers**: Manage interactions between models and views.

### **4.2 File Organization**
```
├── index.html
├── style.css
└── js/
    ├── main.js
    ├── controllers/
    │   ├── canvasController.js
    │   ├── durationsController.js
    │   ├── timerController.js
    │   └── watchController.js
    ├── models/
    │   ├── canvasModel.js
    │   ├── timerModel.js
    │   └── watchModel.js
    └── views/
        ├── canvasView.js
        ├── durationsView.js
        └── timerView.js
```

---

## **5. Components**

### **5.1 Models**
#### **Timer Model (`timerModel.js`)**
- Manages timer state (`_minutes`, `_seconds`, `isRunning`).
- Functions:
  - `startTimer()`: Starts the countdown.
  - `pauseTimer()`: Pauses the countdown.
  - `resetTimer()`: Resets the timer to initial values.
  - `setTimer(minutes, seconds)`: Sets custom durations.

#### **Canvas Model (`canvasModel.js`)**
- Stores properties for canvas rendering (e.g., radius, center).
- Functions:
  - `getTimeNow()`: Retrieves current time for graphical updates.

---

### **5.2 Views**
#### **Timer View (`timerView.js`)**
- Displays the timer countdown.
- Updates UI based on timer state changes.
- Listens for custom events like `timerUpdated`.

#### **Durations View (`durationsView.js`)**
- Handles user interactions with duration buttons (Pomodoro, Short Break, Long Break).
- Updates active button states visually.

#### **Canvas View (`canvasView.js`)**
- Renders graphical elements on the `` element.
- Functions:
  - `drawWatchFace()`: Draws the clock's outer circle.
  - `drawHourHand()`: Draws the hour hand dynamically.

---

### **5.3 Controllers**
#### **Timer Controller (`timerController.js`)**
- Processes user actions (`start`, `pause`, `reset`) and updates the timer model accordingly.

#### **Durations Controller (`durationsController.js`)**
- Handles duration selection actions (Pomodoro, Short Break, Long Break).
- Updates the timer model with selected durations.

#### **Canvas Controller (`canvasController.js`)**
- Placeholder for future canvas-related logic.

---

## **6. User Interface Design**

### **HTML Structure (`index.html`)**
1. ``: Displays graphical elements like a clock face.
2. ``: Contains timer display and controls.
3. ``: Buttons for selecting durations.

### **CSS Styling (`style.css`)**
1. Responsive layout centered on the screen.
2. Styled buttons with hover effects and active states.
3. Canvas element styled with borders and rounded corners.

---

## **7. Event Handling**

### Custom Events
1. `timerUpdated`: Triggered when the timer state changes; updates UI elements dynamically.

### User Actions
1. Button clicks for starting, pausing, resetting, or changing durations are handled via event listeners in respective views/controllers.

---

## **8. Future Enhancements**
1. Add sound notifications when timers end.
2. Implement progress tracking (e.g., completed Pomodoros).
3. Enhance canvas graphics with animations or additional details like minute hands.