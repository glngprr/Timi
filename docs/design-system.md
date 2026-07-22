# Timi Design System

Version: 1.0

Product: Timi

Tagline: Every Second Counts

---

# Design Principles

Timi follows five core principles:

- Minimal
- Clean
- Modern
- Fast
- Focused

Every interface element should reduce cognitive load and help users stay focused.

---

# Brand Identity

Name

Timi

Tagline

Every Second Counts

Primary Brand Color

#2F80ED

Dark Background

#1E1E1E

Logo

Minimal clock-inspired icon

Typography

Geist

---

# Color System

## Brand

| Token          | Value   |
| -------------- | ------- |
| Primary        | #2F80ED |
| Primary Hover  | #256FD1 |
| Primary Active | #1D5DBA |
| Primary Light  | #DCEEFF |

---

## Light Theme

### Background

| Token                | Value   |
| -------------------- | ------- |
| Background           | #FBFBFD |
| Secondary Background | #F5F5F7 |
| Card                 | #FFFFFF |
| Card Hover           | #F4F6F8 |

### Text

| Token     | Value   |
| --------- | ------- |
| Primary   | #1F2937 |
| Secondary | #6B7280 |
| Muted     | #9CA3AF |
| Disabled  | #D1D5DB |

### Border

| Token   | Value   |
| ------- | ------- |
| Default | #E5E7EB |
| Strong  | #CBD5E1 |

---

## Dark Theme

### Background

| Token                | Value   |
| -------------------- | ------- |
| Background           | #1E1E1E |
| Secondary Background | #252526 |
| Card                 | #2D2D30 |
| Card Hover           | #3A3A3D |

### Text

| Token     | Value   |
| --------- | ------- |
| Primary   | #FFFFFF |
| Secondary | #D4D4D4 |
| Muted     | #A6A6A6 |
| Disabled  | #737373 |

### Border

| Token   | Value   |
| ------- | ------- |
| Default | #3E3E42 |
| Strong  | #505050 |

---

## Status Colors

| Status  | Color   |
| ------- | ------- |
| Success | #22C55E |
| Warning | #F59E0B |
| Error   | #EF4444 |
| Info    | #3B82F6 |

---

## Productivity Colors

| Element                | Color   |
| ---------------------- | ------- |
| Focus Session          | #2F80ED |
| Short Break            | #22C55E |
| Long Break             | #8B5CF6 |
| Progress Ring          | #2F80ED |
| Remaining Ring (Light) | #E5E7EB |
| Remaining Ring (Dark)  | #3A3A3D |

---

# Typography

Primary Font

Geist

Fallback

Inter

System UI

sans-serif

---

## Font Scale

| Style      | Size | Weight |
| ---------- | ---- | ------ |
| Display XL | 72px | 700    |
| Display    | 60px | 700    |
| H1         | 48px | 700    |
| H2         | 36px | 700    |
| H3         | 30px | 600    |
| H4         | 24px | 600    |
| H5         | 20px | 600    |
| H6         | 18px | 600    |
| Body Large | 18px | 400    |
| Body       | 16px | 400    |
| Small      | 14px | 400    |
| Caption    | 12px | 400    |

Line Height

150%

Letter Spacing

Default

---

# Spacing

Use an 8-point grid.

| Token | Value |
| ----- | ----- |
| xs    | 4px   |
| sm    | 8px   |
| md    | 16px  |
| lg    | 24px  |
| xl    | 32px  |
| 2xl   | 48px  |
| 3xl   | 64px  |
| 4xl   | 96px  |

---

# Border Radius

| Token  | Value  |
| ------ | ------ |
| Small  | 8px    |
| Medium | 12px   |
| Large  | 16px   |
| XL     | 20px   |
| Full   | 9999px |

---

# Shadows

Light Theme

Default Card Shadow

0 8px 24px rgba(15, 23, 42, 0.06)

Card Hover Shadow

0 12px 32px rgba(15, 23, 42, 0.08)

Small

0 4px 12px rgba(15, 23, 42, 0.04)

Dark Theme

Prefer elevation through lighter surfaces instead of strong shadows.

Shadow

0 4px 20px rgba(0,0,0,.25)

---

# Icons

Library

Lucide Icons

Style

Outline

Stroke Width

2px

Icon Sizes

16px

20px

24px

32px

Common Icons

Clock

Timer

Alarm

Play

Pause

Stop

RotateCcw

Settings

Moon

Sun

Volume2

Bell

Expand

Minimize

ChevronRight

Check

X

---

# Buttons

Primary Button

Background

Primary Blue

Text

White

Radius

12px

Height

48px

Hover

Primary Hover

---

Secondary Button

Background

Transparent

Border

Default Border

Text

Primary Text

---

Ghost Button

Transparent

No Border

Used in toolbar

---

Icon Button

Square

44 × 44

Rounded

Centered Icon

---

# Cards

Radius

16px

Padding

24px

Background

Card Color

Border

Default Border

Hover

Lift slightly

Background becomes Card Hover

---

# Inputs

Height

48px

Radius

12px

Padding

16px

Border

1px

Focus

2px Primary Blue Ring

Placeholder

Muted Text

---

# Progress Ring

Used in

Timer

Pomodoro

Circular Progress

Stroke Width

12px

Foreground

Primary Blue

Background

Remaining Ring

Animation

Smooth

---

# Navigation

Desktop

Top Navigation

Logo

Clock

Timer

Stopwatch

Pomodoro

Theme

Settings

Height

72px

---

Mobile

Bottom Navigation

Clock

Timer

Stopwatch

Pomodoro

Settings

Height

64px

---

# Layout

Container

1280px

Content Width

1100px

Card Gap

24px

Section Gap

64px

---

# Theme Rules

Light Theme

Background

White

Cards

White

Text

Dark Gray

Primary

Blue

---

Dark Theme

Background

#1E1E1E

Cards

#2D2D30

Text

White

Primary

Blue

Never invert the blue brand color between themes.

---

# Animation Rules

Duration

Fast

150ms

Normal

250ms

Slow

400ms

Easing

ease-out

Use animations only when they improve usability.

Avoid excessive motion.

---

# Accessibility

Minimum Contrast

WCAG AA

Keyboard Navigation

Required

Visible Focus Ring

Required

Touch Target

Minimum 44px

---

# Sound

Notification

Soft

Short

Non-intrusive

Volume

User Adjustable

Mute Supported

---

# Responsive Breakpoints

| Device  | Width       |
| ------- | ----------- |
| Mobile  | <640px      |
| Tablet  | 640–1023px  |
| Laptop  | 1024–1279px |
| Desktop | ≥1280px     |

---

# Design Inspirations

Linear

Raycast

Notion

Apple Clock

Google Clock

Material Design 3

---

# Component Guidelines

Prioritize whitespace over borders.

Avoid unnecessary colors.

Use blue only to indicate actions, progress, or focus.

Keep interfaces distraction-free.

Every component should support both Light and Dark themes.

Consistency is more important than decoration.
