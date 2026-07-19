# Evade OS — Art Requirements

> Companion to `UI-IMPLEMENTATION.md`. That doc says where components live;
> this one says what images they need, and — since there's no artist and
> everything gets AI-generated — how to get the most mileage out of a small
> asset count. Written after the Section 2 UI pass (bezel frame, nav/canvas/
> log grid, docked Kernel-ka bar) landed in code.

## Style bible (paste into every generation prompt)

**Cyberpunk ink wash.** Traditional sumi-e / ink-wash brush technique —
visible brush texture, bleeding edges, irregular linework, restrained tonal
range (mostly black/gray/white) — applied to cyberpunk subject matter
(bunker interiors, exposed circuitry, terminal glow). The tension between a
soft analog medium and a hard digital subject *is* the style; don't let
either side win. Keep it desaturated: color comes from the app's own accent
overlays (see "Stretching the budget" below), not from painted-in neon.

Consistency anchors to repeat verbatim across prompts:
- "sumi-e ink wash, visible brush strokes, bleeding ink edges"
- "monochrome — black ink, gray wash, white paper, no painted color"
- "cyberpunk bunker setting, exposed conduit and circuitry"
- "clean single subject, no background clutter" (for portraits/icons) or
  "wide establishing shot, low detail in the corners" (for backdrops)

## Stretching the budget: recolor, don't regenerate

The UI already reads every color from `--accent-primary` /
`--accent-secondary` per realm/zone (`tokens.css`, `useRealmPalette`) — nothing
is hardcoded per-realm in code. Art should follow the same rule:

- Generate backdrops and icons **as grayscale ink wash**, then apply a CSS
  color overlay (`mix-blend-mode: color` or `screen` + `var(--accent-primary)`
  at low opacity) at render time to reskin one image per realm/zone. This is
  the difference between needing **1 backdrop** and needing **7** (5 realms +
  2 sub-zones).
- Only paint color directly into an asset when the *ink itself* needs to
  imply something CSS can't (e.g. a specific fault-state glow baked into a
  diagram). Default to grayscale-plus-overlay.

## Asset list (priority order)

### P0a — top-down map scenes (Hub + Zone III/IV select)

Ported the SeeDS `SceneFrame`/`Hotspot` pattern for the Hub and the two
zoned realms' zone-select screens (`src/components/hub/SceneFrame.jsx`,
`SceneHotspot.jsx`). Same deal as SeeDS's Campus/Dorm scenes: **one full
background per scene**, with invisible hotspot boxes positioned over
whatever's actually drawn in it — not one image per realm.

0. **Hub overview — "Core Terminal Room"** (1 image) — wide shot showing 5
   distinct doors/terminals/structures, one per realm, arranged so each can
   get its own hotspot box (currently placeholder percentages in
   `HubMap.jsx`'s `REALM_HOTSPOTS` — a loose left-to-right scatter; tune
   these to match wherever the 5 structures actually land in the art). This
   single image is what makes "each realm has its own art" true — the realms
   just need to look different *in this one picture*, the same way SeeDS's
   Campus image shows visibly different buildings without any per-building
   CSS.
0b. **Realm III zone-select — "Gauntlet & Vault"** (1 image) — 2 distinct
   zone doors.
0c. **Realm IV zone-select — "Tower & Archive"** (1 image) — 2 distinct
   zone doors.

Until these exist, `getSceneArt()` (`src/utils/sceneArt.js`) renders each
scene as an accent-tinted CSS gradient instead — one soft color patch per
realm/zone, so the placeholder isn't just a flat void, but this is not a
substitute for the real thing. Drop a path into
`src/data/hub/sceneArt.js` (`SCENE_ART.hub` / `.zone3` / `.zone4`) and the
gradient is replaced automatically, no other code changes.

### P0 — needed for the lesson screen to stop feeling blank

1. **Kernel-ka portrait** (1 image) — the rim-light rig in `RapportPanel.jsx`
   already exists and expects one static ink-wash portrait, no expression
   variants (rapport is shown via rim-light only, per PRD). Bust/shoulders
   framing, neutral/unreadable expression so it doesn't fight the rim-light
   acting. Currently a placeholder glyph.
2. **Bunker backdrop, 1 grayscale base** — sits behind `.evade-canvas`
   (currently a plain grid-paper CSS pattern). Wide, low-detail, ink-wash
   corridor/machine-room shot. Recolored per realm via the overlay technique
   above — this single image is what makes all 5 realms feel like the same
   place instead of 5 unrelated screens.
3. **Hotspot-diagram base art, one per distinct diagram** — `HotspotDiagram.jsx`
   currently renders labeled dots over a blank tinted rectangle. Lesson 1.1
   (computer system basics: CPU/memory/I/O/bus) is the first real one; each
   *new* diagram shape needs its own ink-wash illustration, but diagrams
   reused across lessons (same 4 components, different hotspot emphasis)
   share one image. Budget for roughly one per distinct system diagram, not
   one per lesson.

### P1 — noticeable once P0 is in, not blocking

4. **Realm/zone accent motifs** (up to 7, one per realm/zone) — a small
   graphic element (a symbol, not a scene) unique enough to tell realms apart
   at a glance even under the same shared backdrop and the same accent-overlay
   trick. Keep these simple; they're a detail, not a centerpiece.
5. **Entity portraits** — Miku ("The System Daemon") and Reddit Guy ("The
   Forum Node"), one image each, same portrait framing rules as Kernel-ka.
6. **Home screen splash** (1 image) — first thing the player sees before the
   UI chrome takes over; can be more atmospheric/detailed than in-lesson art
   since it doesn't need to share space with hotspots or dialogue.

### P2 — polish, do last if budget allows

7. **Ending screen illustration** (1 image).
8. **Visualizer-specific icon sets** for the remaining 7 primitives (drag
   token, door gate, multi-avatar puzzle, process viewer, memory mapper,
   deadlock detector, disk scheduler) — each needs at most a handful of small
   ink-wash icon elements (not full scenes), since the interaction chrome
   (frame, grid, dots) is already CSS, not art.

## Explicitly not art

Bezel frame, corner dots, scanlines, grid-paper canvas texture, and the
gradient/glow effects introduced in this UI pass are all CSS
(`src/styles/lessonFrame.css`, `src/styles/tokens.css`) — generating textures
for any of these would be wasted budget.
