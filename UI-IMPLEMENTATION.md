# Evade OS — UI Implementation Doc

Companion to `PRD.md` (v3.1). This doc translates the PRD's UI-relevant
sections into concrete component decisions, ready to implement against the
existing (currently stubbed) file structure. Nothing here changes the PRD's
content/lesson design — it's purely the UI layer.

Status: Decided, pre-implementation. Supersedes nothing in the PRD; fills in
what the PRD left as "TBD" or unstated for the UI.

---

## 0. Baseline facts (from repo inspection)

- All 22 files in `src/components/**` are 11-line stubs (`<p>X — not yet
  implemented</p>`). Nothing to preserve — free to design from scratch.
- `src/engine/*.js` and `src/store/*.js` are 0-byte files. Logic and state
  layers don't exist yet.
- All 56 lesson JSONs exist under `src/data/lessons/unit{N}/` with correct
  shape (`id`, `unit`, `zone`, `presentationMode`, `phases`,
  `escapePhaseOptional`) but `content` and `narrative` are `"TBD"`.
- `tokens.css` exists but is minimal — becomes the home for palette custom
  properties (Section 5).
- Pages already scaffolded as routes: `Home`, `HubMap`, `ZoneMap`,
  `LessonPage`, `Settings`, `Ending`.

**Schema addition needed:** lesson JSON currently has `presentationMode`
("visual" | "terminal") but nothing identifying *which* visual primitive or
terminal interaction style a lesson uses. Add before content-writing begins:

```json
{
  "presentationMode": "visual",
  "visualComponent": "hotspot-diagram",   // see Section 3.1 for the enum
  "terminalInteraction": null              // "type" | "log-click" | "mixed", when presentationMode is "terminal"
}
```

---

## 1. Hub (`HubMap.jsx`)

- **Metaphor:** flat illustrated "core terminal room" — a single background
  graphic, not a navigable 3D/first-person space. Consistent with the
  "consciousness map" framing in the PRD narrative.
- **Rendering:** Konva.js, background image + clickable hotspot nodes layered
  on top.
- **Layout:** 5 realm nodes positioned freeform/constellation-style (not a
  straight row or rigid path), but loosely arranged left-to-right (or
  similar directional cue) so Story Mode players still read implicit
  progression, even though Normal Mode doesn't enforce order.
- **Locked state:** grayed out / silhouetted, always visible. The full shape
  of the game is visible from the first visit — nothing is hidden.
- **Realm click:**
  - Single-zone realms (I, II, V) → `RealmEntryTransition` → straight into
    first lesson.
  - Dual-zone realms (III, IV) → `RealmEntryTransition` → `ZoneMap.jsx`
    (separate screen) → zone entry transition → first lesson of the zone.
- **Mode toggle (Story/Normal):** lives in `Settings.jsx`, not on the hub.
  Hub reflects current mode passively (e.g. Kernel-ka's portrait present but
  neutral/no rim-light in Normal Mode) rather than exposing a switch itself.

### `RealmPortal` / `ZonePortal`
- Renders one node: icon/label, locked vs unlocked visual state, accent
  color from the realm/zone's palette entry (Section 5) applied to its glow
  even while locked (dimmed).

### `RealmEntryTransition`
- 2–3s sequence, CSS/Framer Motion, zero art cost:
  1. Realm/zone name card.
  2. Screen flood in the realm/zone's primary accent color.
  3. Signature FX themed per realm/zone (glitch / scanline / pulse — pick
     per realm during content pass).
  4. Fade into first lesson.

---

## 2. Lesson Shell (`PhaseContainer.jsx` + 4 phase components)

### Persistent chrome (owned by `PhaseContainer`)
- Kernel-ka dialogue box
- Phase progress indicator (4 dots/segments, current phase highlighted)
- Lesson title
- Exit-to-hub control

Each phase component (`PhaseObserver`, `PhaseFault`, `PhaseRepair`,
`PhaseEscape`) can override or hide specific chrome elements via props from
`PhaseContainer` (e.g. Escape may want to emphasize the progress indicator
as a timer instead — see 2.3), but the frame itself doesn't disappear
between phases.

### Phase progression rule (strict, sequential — no race conditions)

```
[phase enters]
   → Kernel-ka's line(s) play, click-to-dismiss, VN-style
   → interaction/objective unlocks only after her dialogue is dismissed
   → player completes the objective
   → "Continue" becomes available → next phase
```

Dialogue is a **gate before** interaction, never concurrent with it. This
was chosen specifically to avoid needing to reconcile "objective done before
she finishes talking" — that state can't occur.

### Visual vs Terminal
Only the center panel swaps. Kernel-ka's dialogue box position, the
progress indicator, title, and exit control stay constant in both modes —
`PhaseContainer` doesn't know or care which mode it's hosting; it just
mounts a different center-panel component based on `presentationMode` (and
`visualComponent` / `terminalInteraction`, see Section 3).

### 2.3 — Escape phase distinctiveness
Open / low priority. Minimum viable: reuse Repair's chrome, add a visible
timer element to the progress-indicator area. Revisit once a few Escape
lessons are actually being built and it's clearer whether more drama
(red accent, music sting) earns its cost.

---

## 3. Visual / Terminal Renderers

### 3.1 Visual mode — fixed primitive library

Five reusable interaction primitives, plus four concept-specific
simulators. Every Visual-mode lesson maps to exactly one of these nine via
its `visualComponent` field:

| `visualComponent` value | Component | Used for |
|---|---|---|
| `hotspot-diagram` | `HotspotDiagram` | Click-to-reveal static diagrams (bulk of Realm I, process concept overview, etc.) |
| `drag-token` | `DragToken` | Resource/semaphore allocation drag mechanics |
| `door-gate` | `DoorGate` | Mutex/critical-section single-crossing mechanic |
| `multi-avatar-puzzle` | `MultiAvatarPuzzle` | Producer-consumer, readers-writers, dining philosophers |
| `process-viewer` | `ProcessViewer` | Process lifecycle / scheduling visualizations |
| `memory-mapper` | `MemoryMapper` | Paging, segmentation, virtual memory |
| `deadlock-detector` | `DeadlockDetector` | Wait-for graphs, deadlock detection/avoidance |
| `disk-scheduler` | `DiskScheduler` | Disk scheduling algorithms (FCFS/SSTF/SCAN/...) |

No per-lesson bespoke components — every Visual lesson is content
(background art, hotspot positions, drag targets) fed into one of these
nine, not a new component.

### 3.2 Terminal mode — one shell, per-lesson interaction style

Single `TerminalSimulator` component; behavior configured per lesson via
`terminalInteraction`:

| Value | Behavior |
|---|---|
| `type` | Player types real command input (e.g. 1.7 — type the correct system call) |
| `log-click` | Log stream plays out; player clicks/selects at decision points (e.g. 1.2 — interrupt log) |
| `mixed` | Both — decided case-by-case in that lesson's content data |

### 3.3 Engine ↔ Visualizer contract

Simple call-and-render: a visualizer calls its corresponding engine function
(`scheduler.js`, `memory.js`, `deadlock.js`, `disk.js`, `syscall.js`) once
per player action, receives the resulting state, and re-renders from it. No
scrubbing/rewind/generator interface for now — keeps the engine functions
pure, small, and easy to unit-test in isolation. Revisit only if a specific
lesson genuinely needs replay/rewind (none currently do, per the lesson
mapping).

---

## 4. Companion (Kernel-ka)

- **Portrait:** single ink-wash image, no expression variants (per PRD —
  all "acting" comes through rim-light and dialogue, not the face).
- **Rapport:** never shown as a number, bar, or any explicit UI element.
  Expressed *only* via portrait rim-light color/intensity, layered on top
  of the current realm/zone accent color. Fully inert (neutral, static, no
  pulse) in Normal Mode.
- **Hints:** no manual hint button. Auto-triggers after the player struggles
  — N failed attempts or T seconds idle on Repair/Escape (exact thresholds
  TBD during tuning). This interrupts the current phase rather than waiting
  for a phase boundary, since it's reactive to player state, not scripted.
- **Dialogue box:** VN-style, click-to-dismiss per line. Matches the
  deliberate pacing of Observe/Fault explanations and the phase-gate rule
  in Section 2.

---

## 5. Accent Palette Application

- Palette values (hex, per realm/zone — PRD Section 5.3) are applied as CSS
  custom properties at the **route/screen level**, not hardcoded per
  component.
- `ZoneMap` / `LessonPage` (and `HubMap` for locked/unlocked node glows)
  read the current realm/zone and set custom properties on a top-level
  wrapper element:

```css
:root {
  --accent-primary: /* set at runtime per realm/zone */;
  --accent-secondary: /* ... */;
  --bg-base: /* ... */;
}
```

- Every child (buttons, borders, Kernel-ka rim-light, terminal prompt/status
  text) reads via `var(--accent-primary)` etc. — no component hardcodes a
  realm's hex value directly.
- `tokens.css` holds the base token *names* and any static (non-realm)
  values (e.g. base black/gray from the cyberpunk ink-wash palette); the
  realm-specific values are injected at runtime by whichever page component
  owns the current realm/zone context.

---

## 6. Passport / System Log

- Rendered as a **terminal-style overlay**, not a physical booklet — reuses
  `TerminalSimulator` styling for visual consistency with the rest of the
  UI rather than introducing a skeuomorphic paper aesthetic.
- Opened via a persistent icon in `TopBar`; renders as a modal/overlay, not
  a dedicated route.
- Contents: one row per realm, lesson stamps filled in as completed within
  each row, a seal marker once a zone (or single-zone realm) is fully
  cleared.

---

## 7. Avatar Customization

- Lives inside `Settings.jsx` alongside the mode toggle — not a separate
  onboarding flow or dedicated page.
- UI: a color picker + a small preset set of wireframe shapes (per PRD:
  "a handful of colors and simple shapes" — intentionally minimal).
- In-lesson avatar state (flicker for page fault, freeze for deadlock, etc.)
  is entirely automatic, driven by lesson/phase context — no player-facing
  control for this beyond it happening on-screen.

---

## 8. Layout Shell (`TopBar` / `Sidebar`)

- **`TopBar`:** lesson title, phase progress dots, Passport icon (Section
  6), exit-to-hub button. Persists across all lesson-related screens.
- **`Sidebar`:** kept — used for realm quick-jump and a settings shortcut,
  available from lesson/hub screens as a secondary nav surface (not
  required for the hub's primary flow, which is the map itself).

---

## 9. Build Order (suggested)

Given the dependency shape of the above:

1. **Tokens + palette wiring** (Section 5) — nothing else can be visually
   verified without this in place first.
2. **`PhaseContainer` + the 4 phase stubs** (Section 2) — the piece every
   lesson routes through; get the chrome and phase-gate logic solid with
   placeholder content before wiring real lessons in.
3. **One Visual primitive + one Terminal shell** end-to-end (e.g.
   `HotspotDiagram` + `TerminalSimulator` in `type` mode) against a single
   real lesson (1.1 and 1.7 are good candidates — both already have clean
   schema entries) to prove the `PhaseContainer` contract works before
   building out the remaining 7 primitives.
4. **Hub + Zone map** (Section 1) — once a lesson can actually be reached
   and completed end-to-end, wire up navigation into it.
5. **Companion polish** (Section 4) — rim-light rapport, hint triggers.
6. **Passport, avatar customization, remaining primitives** — fill in
   breadth once the vertical slice works.

Schema addition (Section 0) should land before step 3, since the primitive
choice depends on it.
