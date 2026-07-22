# User Flow

Product: Timi

Tagline: Every Second Counts

Version: 1.0

Status: Approved

---

# Purpose

This document defines how users navigate through Timi to complete common tasks.

The objective is to make every interaction:

- Fast
- Predictable
- Simple
- Distraction-free

Users should accomplish their goal with the fewest possible steps.

---

# User Personas

## Student

Goals

- Study with Pomodoro
- Time practice exams
- Track study sessions

---

## Professional

Goals

- Manage meetings
- Track presentations
- Stay focused while working

---

## Developer

Goals

- Deep work
- Pomodoro sessions
- Stopwatch for testing
- Minimal interface

---

## General User

Goals

- View current time
- Set quick timers
- Use a stopwatch

---

# Primary User Journey

```
Open Website
      │
      ▼
Landing Page
      │
      ▼
Dashboard
      │
      ▼
Choose Tool
      │
      ▼
Use Tool
      │
      ▼
Finish Session
```

---

# First Visit Flow

```
Open Website
      │
      ▼
Landing Page
      │
      ▼
Read Features
      │
      ▼
Click "Start Focus Session"
      │
      ▼
Dashboard
      │
      ▼
Select Tool
```

---

# Returning User Flow

```
Open Website
      │
      ▼
Dashboard
      │
      ▼
Continue Using Tool
```

Future Enhancement

```
Open Website
      │
      ▼
Automatically Open Last Active Tool
```

---

# Digital Clock Flow

Goal

Check the current time.

```
Dashboard
      │
      ▼
Clock
      │
      ▼
View Digital Clock
      │
      ▼
Done
```

Estimated Steps

3

---

# Analog Clock Flow

Goal

View an analog clock.

```
Dashboard
      │
      ▼
Clock
      │
      ▼
Switch to Analog
      │
      ▼
Done
```

Estimated Steps

3

---

# Countdown Timer Flow

Goal

Run a countdown timer.

```
Dashboard
      │
      ▼
Timer
      │
      ▼
Choose Preset
      │
      │
      ├────────────┐
      ▼            ▼
Custom Time    Preset Time
      │            │
      └──────┬─────┘
             ▼
          Start
             │
             ▼
        Timer Running
             │
      ┌──────┼────────┐
      ▼      ▼        ▼
    Pause  Reset   Fullscreen
             │
             ▼
        Timer Complete
             │
             ▼
 Sound + Notification
```

---

# Stopwatch Flow

Goal

Measure elapsed time.

```
Dashboard
      │
      ▼
Stopwatch
      │
      ▼
Start
      │
      ▼
Running
      │
      ├─────────────┐
      ▼             ▼
     Lap          Pause
      │             │
      └──────┬──────┘
             ▼
           Reset
```

---

# Pomodoro Flow

Goal

Complete a focus session.

```
Dashboard
      │
      ▼
Pomodoro
      │
      ▼
Choose Mode
      │
      ▼
Start Focus
      │
      ▼
Progress Ring
      │
      ▼
Focus Complete
      │
      ▼
Short Break
      │
      ▼
Focus
      │
      ▼
Long Break
```

---

# Fullscreen Focus Flow

Available From

- Timer
- Stopwatch
- Pomodoro

```
Tool
      │
      ▼
Click Fullscreen
      │
      ▼
Hide Navigation
      │
      ▼
Focus Mode
      │
      ▼
Exit
      │
      ▼
Return to Tool
```

---

# Theme Flow

```
Open Theme Menu
      │
      ▼
Choose Theme
      │
      ├─────────────┐
      ▼             ▼
    Light        Dark
      │             │
      └──────┬──────┘
             ▼
         Save Preference
```

No page reload.

Preference stored locally.

---

# Settings Flow

```
Dashboard
      │
      ▼
Settings
      │
      ▼
Select Category
      │
      ├──────────────┐
      ▼              ▼
 Appearance      Notifications
      │              │
      ▼              ▼
   Save         Save
```

---

# Notification Flow

```
Timer Ends
      │
      ▼
Play Sound
      │
      ▼
Browser Notification
      │
      ▼
Dismiss
```

---

# Error Flow

Invalid Timer Input

```
User Input
      │
      ▼
Validate
      │
      ├────────────┐
      ▼            ▼
 Valid        Invalid
      │            │
      ▼            ▼
 Continue    Show Error
```

---

# Responsive Flow

Desktop

```
Navigation
      │
      ▼
Main Content
```

Tablet

```
Navigation
      │
      ▼
Responsive Grid
```

Mobile

```
Header
      │
      ▼
Main Tool
      │
      ▼
Bottom Navigation
```

---

# Local Storage Flow

```
Change Theme
      │
      ▼
Save to Local Storage
      │
      ▼
Reload Website
      │
      ▼
Restore Theme
```

The same pattern applies to:

- Time format
- Pomodoro settings
- Sound volume
- Notification preference
- Default tool (future)
- Last active tool (future)

---

# Future User Flows

## Statistics

```
Dashboard
      │
      ▼
Statistics
      │
      ▼
Daily Focus Time
```

---

## Multiple Timers

```
Dashboard
      │
      ▼
Create Timer
      │
      ▼
Timer List
      │
      ▼
Run Multiple Timers
```

---

## PWA

```
Visit Website
      │
      ▼
Install Prompt
      │
      ▼
Install App
      │
      ▼
Launch Timi
```

---

# UX Principles

Every primary task should require no more than:

- 3–4 interactions for common actions
- 1 click to switch between tools
- 1 click to enter Fullscreen Focus Mode
- 1 click to change theme

Avoid unnecessary confirmations.

Avoid interrupting the user's focus.

Preserve user preferences between sessions whenever possible.
