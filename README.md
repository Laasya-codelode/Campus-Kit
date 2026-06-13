# CampusKit

A dark-themed college essentials app — checklists, weekly schedule, and homework tracker — built with React + Vite.

## Features

- **Checklists** — per-year (Freshman → Senior) categorised checklists with progress tracking
- **Schedule** — add classes by day/time with live "starting soon" and "happening now" indicators
- **Assignments** — homework tracker with priority levels, due-date countdowns, and auto reminders
- **Smart reminders** — yellow/red banners appear automatically as classes approach or deadlines near
- **Persisted state** — everything saved to `localStorage`; nothing lost on refresh

## Quick start

```bash
npm install
npm run dev
```

Then open http://localhost:5173

## Build for production

```bash
npm run build
npm run preview
```

## Stack

- React 18
- Vite 5
- CSS Modules
- lucide-react icons
- No other runtime dependencies

## Project structure

```
src/
  components/
    Sidebar.jsx          # persistent left nav
    ReminderBanner.jsx   # urgent/warn/soft alert strips
    Toast.jsx            # bottom pop-up confirmations
  hooks/
    useLocalStorage.js   # typed localStorage hook
  pages/
    Checklist.jsx        # year-based checklist with progress bar
    Schedule.jsx         # weekly class manager + reminders
    Homework.jsx         # assignment tracker + reminders
  utils/
    data.js              # checklist content + colour tokens
    time.js              # date/time helpers
  App.jsx
  index.css              # design tokens + global reset
```