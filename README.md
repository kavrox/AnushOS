# AnushOS v1

A personal, single-page control dashboard built to enforce discipline through structure, visibility, and strict streak logic.

AnushOS is not a productivity template.  
It is a behavioral control system.

---

## Philosophy

AnushOS is built on three principles:

- Clarity over aesthetics
- Structure over motivation
- Discipline over flexibility

Everything is visible on one screen.  
No scrolling. No hidden panels. No distractions.

---

## Features (v1)

### 1. Real-Time Header
- Dynamic greeting (Morning / Afternoon / Evening / Night)
- Live updating clock
- Full formatted date (e.g., Monday, 23 February 2026)
- Streak counter
- Daily completion tracker

---

### 2. Daily Recurring Tasks
- Editable task list
- Auto reset every midnight
- All tasks must be completed to preserve streak
- If not completed → streak resets to 0

Strict by design.

---

### 3. Weekly Recurring Tasks
- Editable weekly task list
- Auto reset every Monday 00:00
- Independent from streak logic
- Must be completed before week ends

---

### 4. Todo List
- Non-recurring task list
- Add / remove tasks
- Flexible section

---

### 5. Important Dates
- Calendar-based input (form)
- Sorted automatically by nearest date
- Color-coded urgency:
  - >7 days → normal
  - 3–7 days → yellow
  - 1–2 days → orange
  - 0 or past → red
- Delete functionality

---

### 6. Structured Links Panel
Grouped quick-access links:
- Amrita
- Skill
- Misc

Minimal and static for fast access.

---

## Layout

- Desktop-only
- Framed control-panel layout
- No outer page scrolling
- Scroll inside individual sections
- CSS Grid-based structure

---

## Streak Logic

Streak increases only if:

- All daily recurring tasks are completed before reset.

If even one daily task is incomplete at midnight:
- Streak resets immediately to 0.

No grace period.
No partial credit.

---

## Tech Stack

- HTML
- CSS (Grid Layout)
- Vanilla JavaScript
- localStorage persistence

No frameworks.
No backend.
Fully client-side.

---

## Version

Current Version: v1

v1 includes:
- Full dashboard structure
- Recurring systems
- Real-time clock
- Date alert logic
- Strict streak mechanism

---

## Future Roadmap

Potential v2 upgrades:
- Weekly analytics summary
- Habit statistics
- Recurring yearly dates
- Export / backup system
- Theme customization
- Cloud sync

---

## Usage

1. Open `index.html` in browser.
2. Add recurring tasks.
3. Use daily.
4. Do not break streak.

---

## Author

Built by Anush  
For long-term personal evolution.
