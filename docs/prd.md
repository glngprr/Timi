# Product Requirements Document (PRD)

# Timi

**Tagline:** Every Second Counts

Version: 1.0

Project Type: Productivity Web Application

Platform: Responsive Web Application (Desktop-first, Mobile-friendly)

Status: Planning

Author: Gilang Permadi

---

# 1. Product Overview

Timi is a modern web-based productivity application that provides multiple time management tools in one place.

The application focuses on simplicity, speed, and distraction-free productivity.

Unlike traditional timer websites, Timi combines multiple timing utilities with a clean interface and excellent user experience.

---

# 2. Vision

Help people manage their time more effectively through a beautiful, fast, and minimal productivity toolkit.

---

# 3. Goals

Primary Goals

- Accurate digital clock
- Beautiful analog clock
- Reliable countdown timer
- Professional stopwatch
- Customizable Pomodoro timer
- Excellent Dark & Light Mode
- Responsive on all devices
- Fullscreen Focus Mode

Success Metrics

- Fast loading (<2s)
- Responsive on desktop/tablet/mobile
- Zero login required
- Works offline after first load (future)
- Lighthouse Score >95

---

# 4. Target Users

Students

Need:

- Study sessions
- Pomodoro

Professionals

Need:

- Meeting timer
- Time tracking

Developers

Need:

- Focus timer
- Stopwatch
- Minimal interface

General Users

Need:

- Daily clock
- Countdown timer

---

# 5. Core Features

## Digital Clock

Features

- Live time
- Live date
- Day of week
- 12-hour format
- 24-hour format
- Timezone display (future)

---

## Analog Clock

Features

- Smooth second hand
- Responsive scaling
- Minimal design
- Accurate local time

---

## Countdown Timer

Features

- Custom duration
- Start
- Pause
- Resume
- Reset
- Notification
- Sound alert
- Fullscreen

---

## Stopwatch

Features

- Millisecond precision
- Start
- Pause
- Resume
- Reset
- Lap recording
- Scrollable lap history

---

## Pomodoro Timer

Default

Focus
25 min

Short Break
5 min

Long Break
15 min

Features

- Fully customizable durations
- Auto start break customizable (in Setting)
- Auto start focus customizable (in Setting)
- Session counter
- Progress Ring
- Sound notification
- Browser notification
- Fullscreen

---

## Appearance

- Light Theme
- Dark Theme
- System Theme

Theme changes instantly without reload.

---

## Fullscreen Focus Mode

Available for

- Timer
- Stopwatch
- Pomodoro

Focus Mode hides

- Navigation
- Settings
- Extra UI

Displays only

- Timer
- Progress Ring
- Essential controls

---

# 6. Non-Functional Requirements

Performance

- Fast rendering
- Smooth animation
- Minimal JavaScript

Accessibility

- Keyboard navigation
- Focus states
- High contrast
- Screen reader support

Compatibility

Chrome

Edge

Firefox

Safari

Responsive

Desktop

Tablet

Mobile

---

# 7. Navigation Structure

Landing

↓

Dashboard

↓

Clock

↓

Timer

↓

Stopwatch

↓

Pomodoro

↓

Settings

Maximum navigation depth:

2 levels

---

# 8. Pages

## Landing Page

Contains

Logo

Hero Section

Features

CTA

Footer

---

## Dashboard

Quick access

Recent tool (future)

Large Digital Clock

Feature cards

---

## Clock

Digital Clock

Analog Clock

View options

- Digital
- Analog
- Both

---

## Timer

Countdown timer

Preset buttons

Custom duration

Fullscreen

---

## Stopwatch

Large timer

Lap history

Fullscreen

---

## Pomodoro

Focus timer

Progress Ring

Session statistics

Fullscreen

---

## Settings

Theme

Notifications

Sound

Time format

Pomodoro settings

Default page

---

# 9. User Flow

First Visit

Landing

↓

Dashboard

↓

Choose Tool

↓

Use Tool

Returning User

Dashboard

↓

Last Active Tool (future)

---

# 10. Functional Requirements

### FR-01

Display current local time.

---

### FR-02

Display analog clock.

---

### FR-03

Start countdown timer.

---

### FR-04

Pause countdown timer.

---

### FR-05

Reset countdown timer.

---

### FR-06

Play notification sound when timer ends.

---

### FR-07

Display browser notification.

---

### FR-08

Record stopwatch laps.

---

### FR-09

Start Pomodoro.

---

### FR-10

Switch between themes.

---

### FR-11

Enter fullscreen mode.

---

### FR-12

Persist user preferences using Local Storage.

---

# 11. Local Storage

Store

Theme

Time Format

Pomodoro Settings

Sound Volume

Notification Preference

Last Active Tool

Default Landing Page

---

# 12. Out of Scope (Version 1)

No login

No account

No cloud sync

No statistics

No calendar

No tasks

No AI assistant

No multiplayer

---

# 13. Keyboard Shortcuts

Space : Start/Pause
R : Reset
F : Fullscreen
Esc : Exit Fullscreen
C : Clock
T : Timer
S : Stopwatch
P : Pomodoro

---

# 14. Future Roadmap

Version 2

Statistics

History

Multiple Timers

Keyboard Shortcuts

Custom Themes

PWA

Offline Mode

---

Version 3

Task Manager

Calendar

Cloud Sync

Account

Achievements

---

# 15. Tech Stack

Frontend

Next.js

React

TypeScript

Tailwind CSS

State Management

Zustand

Icons

Lucide Icons

Animation

Framer Motion

Notifications

React Hot Toast

Storage

Local Storage

Deployment

Vercel

No backend required.

No database required.

---

# 16. Design Guidelines

Style

Modern

Minimal

Clean

Professional

Inspired by

Linear

Raycast

Notion

Apple Clock

Google Clock

Material Design 3

---

# 17. Brand

Name

Timi

Tagline

Every Second Counts

Primary Color

#2F80ED

Dark Background

#1E1E1E

Typography

Geist

Logo

Minimal clock icon

---

# 18. Success Criteria

The application should

Load quickly

Work without login

Be responsive

Support Dark & Light Mode

Maintain accessibility standards

Provide accurate timing

Offer a distraction-free user experience

Be ready for future expansion without architectural changes.
