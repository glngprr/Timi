# Wireframe

Product: Timi

Tagline: Every Second Counts

Version: 1.0

Status: Low-Fidelity

---

# Purpose

This document describes the structural layout (wireframe) of every page in Timi.

It focuses on:

- Information hierarchy
- Component placement
- User flow
- Layout consistency

Visual styling, colors, typography, and branding are intentionally excluded.

Refer to `design-system.md` for visual specifications.

---

# Layout Principles

All pages follow these principles:

- Maximum content width: 1280px
- 8-point spacing system
- Large whitespace
- Responsive layout
- Sticky navigation (desktop)
- Bottom navigation (mobile)

---

# Desktop Layout

```
┌───────────────────────────────────────────────────────────────────────┐
│ Navigation Bar                                                        │
├───────────────────────────────────────────────────────────────────────┤
│                                                                       │
│                     Main Content Area                                 │
│                                                                       │
└───────────────────────────────────────────────────────────────────────┘
```

---

# Landing Page

Purpose

Introduce Timi and encourage users to start using the application.

---

Layout

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Logo      Clock   Timer   Stopwatch   Pomodoro      Theme      Settings     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│                          [ Timi Logo ]                                      │
│                                                                             │
│                              Timi                                           │
│                      Every Second Counts                                    │
│                                                                             │
│      A minimal productivity toolkit for everyday focus.                     │
│                                                                             │
│         [ Start Focus Session ]   [ Explore Features ]                      │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│ Feature Cards                                                               │
│                                                                             │
│  Clock     Timer     Stopwatch     Pomodoro                                 │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ Footer                                                                      │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

# Dashboard

Purpose

Provide quick access to all tools.

---

Layout

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Navigation                                                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│                     10:45:38                                                │
│                  Friday, July 11                                            │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│ ┌────────────┐ ┌────────────┐                                               │
│ │ Clock      │ │ Timer      │                                               │
│ └────────────┘ └────────────┘                                               │
│                                                                             │
│ ┌────────────┐ ┌────────────┐                                               │
│ │ Stopwatch  │ │ Pomodoro   │                                               │
│ └────────────┘ └────────────┘                                               │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

# Clock Page

Purpose

Display current local time.

---

Layout

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Navigation                                                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│      Digital        Analog        Both                                      │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│                         10 : 45 : 38                                        │
│                                                                             │
│                     Friday, July 11                                         │
│                                                                             │
│                            ○                                                │
│                       ○         ○                                           │
│                    ○     Clock     ○                                        │
│                       ○         ○                                           │
│                            ○                                                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

# Timer

Purpose

Countdown timer.

---

Layout

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Navigation                                             Fullscreen           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│                             25:00                                           │
│                                                                             │
│                      ○──────────────○                                       │
│                   ○                  ○                                      │
│                  ○   Progress Ring    ○                                     │
│                   ○                  ○                                      │
│                      ○──────────────○                                       │
│                                                                             │
│            [ Start ] [ Pause ] [ Reset ]                                    │
│                                                                             │
│ Presets: 5m 10m 15m 25m 60m                                                 │
│                                                                             │
│ Custom Duration [__________]                                                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

# Stopwatch

Purpose

Measure elapsed time.

---

Layout

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Navigation                                             Fullscreen           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│                         00:15:28.32                                         │
│                                                                             │
│                [ Start ] [ Lap ] [ Reset ]                                  │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│ Lap History                                                                 │
│                                                                             │
│ #1     00:01:22                                                             │
│ #2     00:03:45                                                             │
│ #3     00:08:12                                                             │
│ #4     00:15:28                                                             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

# Pomodoro

Purpose

Focus session timer.

---

Layout

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Navigation                                             Fullscreen           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│ Focus      Short Break      Long Break                                      │
│                                                                             │
│                              25:00                                          │
│                                                                             │
│                      ○──────────────○                                       │
│                   ○                  ○                                      │
│                  ○   Progress Ring    ○                                     │
│                   ○                  ○                                      │
│                      ○──────────────○                                       │
│                                                                             │
│            [ Start ] [ Pause ] [ Reset ]                                    │
│                                                                             │
│ Session 2 / 4                                                               │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

# Settings

Purpose

Application customization.

---

Layout

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Settings                                                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│ Appearance                                                                  │
│ ○ Light                                                                     │
│ ○ Dark                                                                      │
│ ○ System                                                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│ Time Format                                                                 │
│ ○ 12 Hour                                                                   │
│ ○ 24 Hour                                                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│ Notifications                                                               │
│ ☑ Enable Notifications                                                      │
│ ☑ Play Sound                                                                │
│ Volume ─────────────●────────                                               │
├─────────────────────────────────────────────────────────────────────────────┤
│ Pomodoro                                                                    │
│ Focus Time      [25]                                                        │
│ Short Break    [5]                                                          │
│ Long Break    [15]                                                          │
│ ☑ Auto Start Break                                                          │
│ ☑ Auto Start Focus                                                          │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

# Fullscreen Focus Mode

Purpose

Provide a distraction-free workspace.

---

Layout

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                                                                             │
│                              18:42                                          │
│                                                                             │
│                      ○──────────────○                                       │
│                   ○                  ○                                      │
│                  ○   Progress Ring    ○                                     │
│                   ○                  ○                                      │
│                      ○──────────────○                                       │
│                                                                             │
│                      [ Pause ] [ Exit ]                                     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

# Tablet Layout

- Two-column grid
- Navigation remains at the top
- Cards resize proportionally
- Timer and Pomodoro occupy full width

---

# Mobile Layout

```
┌───────────────────────────────┐
│            Header             │
├───────────────────────────────┤
│                               │
│          Main Tool            │
│                               │
├───────────────────────────────┤
│ Clock Timer Stop Pomo Settings│
└───────────────────────────────┘
```

Guidelines

- Single-column layout
- Bottom navigation
- Full-width buttons
- Reduced spacing while preserving touch targets (minimum 44px)

---

# Wireframe Notes

This document intentionally excludes:

- Colors
- Typography
- Shadows
- Icons
- Animations
- Branding details

Those are defined in `design-system.md`.

The purpose of these wireframes is to validate layout, interaction flow, and component placement before moving to high-fidelity UI design and implementation.
