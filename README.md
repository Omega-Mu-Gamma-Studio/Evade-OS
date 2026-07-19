# Evade OS

> *"Your survival is the syllabus."*

**Evade OS** (in-fiction title: **Kernel-ka's Bunker**) is a narrative-driven,
gamified learning environment for **CS22403 — Operating Systems**, built by
**Omega Mu Gamma Studio**.

You wake up trapped in a digital bunker with no memory of its physics.
Kernel-ka — cryptic, calm, and hiding a 15-year secret — teaches you the OS
syllabus as survival mechanics. Interrupts, scheduling, deadlocks, paging,
and system calls aren't theory here. They're the rules that decide whether
you live, freeze, or evade.

## Status

🛠 **UI shell functional, content pending.** The full navigable loop works
end-to-end — Home → Hub → Zone → Lesson → phase gates → back out — with
placeholder/demo data everywhere the PRD marks a lesson's `content` or
`narrative` as `"TBD"`. Story writing, art, and dialogue scripting are the
next phase. See `PRD.md` for the full spec and `UI-IMPLEMENTATION.md` for
the UI layer's concrete component decisions.

## Quick Start

```bash
npm install
npm run dev      # local dev server
npm run build    # production build
npm run preview  # preview a production build locally
```

## Structure

- **5 realms**, mapped 1:1 to the syllabus's 5 units (Realms III and IV each
  split into two zones)
- **56 lessons**, each running a 4-phase loop: Observe → Fault → Repair → Escape
- **Two presentation modes** per lesson, set via `visualComponent` /
  `terminalInteraction` in each lesson's JSON:
  - **Visual** — one of 8 fixed interaction primitives (hotspot diagram, drag
    token, door gate, multi-avatar puzzle, process viewer, memory mapper,
    deadlock detector, disk scheduler)
  - **Terminal** — a single shell (`type`, `log-click`, or `mixed` interaction)
- **One shared simulation engine** (`src/engine/`), reskinned per realm/zone
  via CSS custom properties, not per-component hardcoded colors

### Where things live

```
src/
├── components/
│   ├── hub/          Hub map, realm/zone portals, entry transitions
│   ├── lesson/        PhaseContainer + the 4 phase components
│   ├── visualizers/    The 8 Visual primitives + TerminalSimulator
│   ├── companion/     Kernel-ka dialogue + rapport rim-light
│   ├── avatar/        Player avatar rendering + customization
│   ├── layout/         TopBar, Sidebar
│   └── ui/             Button, Indicator, Passport
├── engine/            Pure-JS simulation logic (scheduler, memory, deadlock, disk, syscall)
├── store/             Zustand stores (progress, lesson session, rapport, avatar)
├── data/
│   ├── lessons/        56 lesson JSONs, one folder per unit
│   ├── units/           Per-realm/zone metadata + accent palettes
│   ├── dialogue/        Kernel-ka's per-lesson, per-mode dialogue lines
│   └── entities/        Character/entity data
├── hooks/             useRealmPalette (Section 5 of UI-IMPLEMENTATION.md)
├── utils/             dataService (all JSON loading goes through here), visualizerDispatch
└── pages/             Route-level screens: Home, HubMap, RealmScene, LessonPage, Settings, Ending
```

`src/styles/tokens.css` holds the shared design tokens; per-realm/zone accent
colors live in `src/data/units/*.json` and are injected at runtime.

## Tech Stack

React 19, Vite 8, React Router 7, Zustand 5 (with `persist` for local
progress/avatar/rapport state), Konva 10 / react-konva 19, Framer Motion 12.
Plain JavaScript/JSX — no TypeScript (dropped in v3.1 to match studio
convention on SeeDS/GateLab; see PRD Changelog). Deploys to Vercel. Full
rationale in PRD Section 7.0.

## Contributing

See PRD Section 13.0 for lesson/dialogue/visualizer contribution guidelines,
and **`CONTENT-GUIDE.md`** for the practical, field-by-field reference for
writing a lesson's JSON content — renderer shapes, dialogue tone rules, and
a worked example. Lesson content and dialogue are plain JSON — no code
changes needed to write a lesson once its `visualComponent`/
`terminalInteraction` is assigned.

## License

TBD — likely PolyForm Noncommercial 1.0.0 or MIT (see PRD Section 15.0).
