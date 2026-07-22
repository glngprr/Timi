# Navigation Map

Product: Timi

Version: 1.0

Tagline: Every Second Counts

---

# Navigation Philosophy

Timi follows a **flat navigation structure**.

Users should be able to access every major tool within one click.

Maximum navigation depth:

2 levels

The interface prioritizes speed, simplicity, and minimal cognitive load.

---

# Site Map

```
Landing (/)
│
├── Dashboard (/dashboard)
│
├── Clock (/clock)
│     ├── Digital
│     ├── Analog
│     └── Both
│
├── Timer (/timer)
│
├── Stopwatch (/stopwatch)
│
├── Pomodoro (/pomodoro)
│
└── Settings (/settings)
```

---

# Navigation Flow

```
Landing
      │
      ▼
Dashboard
      │
      ├────────► Clock
      │
      ├────────► Timer
      │
      ├────────► Stopwatch
      │
      ├────────► Pomodoro
      │
      └────────► Settings
```

Users can move between tools without returning to the Landing page.

---

# Desktop Navigation

Position

Top Navigation Bar

Layout

```
┌──────────────────────────────────────────────────────────────┐
│ Logo │ Clock │ Timer │ Stopwatch │ Pomodoro │ Theme │ ⚙ │
└──────────────────────────────────────────────────────────────┘
```

Height

72px

Behavior

- Sticky
- Transparent on Landing
- Solid background on tool pages
- Active page highlighted
- Responsive spacing

---

# Mobile Navigation

Position

Bottom Navigation

Height

64px

Always visible.

---

# Landing Page

Route

```
/
```

Purpose

Introduce Timi.

Contents

- Logo
- Hero section
- Tagline
- Features
- CTA button
- Footer

Primary CTA

```
Start Using Timi
```

Destination

```
/dashboard
```

---

# Dashboard

Route

```
/dashboard
```

Purpose

Central hub for all productivity tools.

Contents

- Large Digital Clock
- Quick Tool Cards
- Theme Toggle
- Current Date

Quick Access

```
Clock

Timer

Stopwatch

Pomodoro
```

---

# Clock Page

Route

```
/clock
```

Purpose

Display current local time.

Modes

- Digital
- Analog
- Both

Navigation

```
Digital

Analog

Both
```

Future

Timezone selector

---

# Timer Page

Route

```
/timer
```

Purpose

Countdown timer.

Components

- Progress Ring
- Time Display
- Presets
- Controls
- Fullscreen Button

Actions

Start

Pause

Reset

Fullscreen

---

# Stopwatch Page

Route

```
/stopwatch
```

Purpose

Track elapsed time.

Components

Large Timer

Lap List

Controls

Actions

Start

Pause

Lap

Reset

Fullscreen

---

# Pomodoro Page

Route

```
/pomodoro
```

Purpose

Focus timer.

Modes

Focus

Short Break

Long Break

Components

Progress Ring

Session Counter

Controls

Settings Shortcut

Fullscreen

---

# Settings

Route

```
/settings
```

Purpose

Customize application behavior.

Sections

Appearance

Notifications

Sound

Time Format

Pomodoro

Default Tool

About

---

# Fullscreen Focus Mode

Available From

Timer

Stopwatch

Pomodoro

Route

Same page

Displayed as fullscreen overlay.

Navigation hidden.

Exit

ESC

or

Exit Button

---

# Header Behavior

Landing

Transparent

↓

Scroll

Solid Background

↓

Other Pages

Always Solid

---

# Footer

Landing Only

Contents

Logo

Copyright

Version

GitHub (future)

Privacy (future)

---

# Active Navigation

Current page uses

- Primary Blue indicator
- Bold text
- Optional underline

---

# Theme Toggle

Available Everywhere

Desktop

Top Right

Mobile

Inside Settings

Behavior

Instant

No page reload

Saved to Local Storage

---

# Error Navigation

Unknown Route

```
/*
```

Redirect

404 Page

Message

```
Page Not Found
```

Button

```
Back to Dashboard
```

---

# Loading Navigation

Each page displays

- Skeleton UI
- Fade transition
- Maximum loading target <500ms

---

# Route Summary

| Route      | Description            |
| ---------- | ---------------------- |
| /          | Landing Page           |
| /dashboard | Main Dashboard         |
| /clock     | Digital & Analog Clock |
| /timer     | Countdown Timer        |
| /stopwatch | Stopwatch              |
| /pomodoro  | Pomodoro Timer         |
| /settings  | Application Settings   |
| /404       | Not Found              |

---

# Navigation Principles

Every important feature should be reachable within one click.

Avoid nested menus.

Avoid modal-based navigation.

Maintain consistent navigation placement across all pages.

Prioritize speed and focus over visual complexity.
