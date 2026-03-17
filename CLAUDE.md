# Code & Dragons

> Gamified coding education platform — learn design patterns through dungeon-style lessons.

**Status:** MVP feature-complete (2026-03)
**Stack guide:** `../CLAUDE.md`

---

## What it does

Interactive coding game where developers learn software design patterns (SOLID, GoF, etc.) through narrative-driven lessons with a live code editor. XP tracking, dungeon sidebar, level progression.

## Stack

- React + Vite + TypeScript
- Tailwind v4
- Monaco Editor (code editor)
- react-markdown + remark-gfm (lesson theory)
- localStorage (progress persistence)

## Key Paths

```
src/
  components/
    CodeEditor.tsx      ← Monaco editor wrapper
    TestRunner.tsx      ← Run/validate user code
    LessonView.tsx      ← Split narrative/editor layout
    ProgressMap.tsx     ← Dungeon sidebar with XP
  store/
    progress.ts         ← localStorage progress store
  data/
    lessons/            ← Lesson definitions (SRP, OCP, DIP, LSP, Factory, Strategy...)
```

## Lessons Structure

```typescript
interface Lesson {
  id: string
  title: string
  level: number
  concept: string          // e.g. "SRP", "OCP"
  theory: string           // markdown
  starterCode: string      // JS starter
  starterCodeTS: string    // TS starter
  tests: string[]          // test cases
}
```

## Features (shipped)

- **Levels 1–3** — SRP, OCP, DIP, LSP, Factory Method, Strategy
- **JS/TS toggle** — Monaco transpiles TS → JS at runtime, saves code per lesson+language
- **starterCodeTS** — Level 1 lessons have TS starters (SRP, OCP, DIP)
- **Dungeon sidebar** — ProgressMap with XP tracking, lesson navigation
- **Mobile drawer** — Sidebar as drawer on small screens
- **Markdown theory** — Lesson theory rendered with react-markdown + typography
- **LocalStorage progress** — Saves completion state and code per lesson

## Commands

```bash
bun dev          # localhost:5173
bun run build    # production build
```

## Not yet covered

- [ ] Tests (no Vitest setup yet)
- [ ] Levels 4+ lessons
- [ ] Backend / user accounts
- [ ] Leaderboard
