# Evade OS

> *"Your survival is the syllabus."*

**Evade OS** (in-fiction title: **Kernel-ka's Bunker**) is a narrative-driven,
gamified learning environment for **CS22403 — Operating Systems**, built by
**Omega Mu Gamma Studio**.

You wake up trapped in a digital bunker with no memory of its physics.
Kernel-ka — cryptic, calm, and hiding a 15-year secret — teaches you the OS
syllabus as survival mechanics. Interrupts, scheduling, deadlocks, paging,
and system calls aren't theory here. They're the rules that decide whether
you live, freeze, or escape.

## Status

🚧 Repo scaffold — build phase starting. See `PRD.md` for full spec.

## Structure

- **5 realms**, mapped 1:1 to the syllabus's 5 units
- **56 lessons**, each running a 4-phase loop: Observe → Fault → Repair → Escape
- **Two presentation modes** per lesson: Visual (Konva.js) or Terminal
- **One shared engine**, reskinned per realm/zone via design tokens

See `src/data/lessons/` for the full per-unit lesson set, and
`src/styles/tokens.css` for the per-realm/zone accent palette.

## Tech Stack

React 18 + Vite, TypeScript, Zustand, Konva.js / react-konva, React Router,
localStorage persistence, Vercel deployment. See PRD Section 7.0.

## Contributing

See PRD Section 13.0 for lesson/dialogue/visualizer contribution guidelines.

## License

TBD — likely PolyForm Noncommercial 1.0.0 or MIT (see PRD Section 15.0).
