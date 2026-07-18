# Evade OS — Content Authoring Guide

Companion to `PRD.md` and `UI-IMPLEMENTATION.md`. This doc is for whoever
writes lesson content — human or AI — and needs to produce **correct,
renderer-compatible JSON** without reading the component source. If you
follow this doc exactly, the lesson will work the first time you load it.

Status: the schema described here is live — every field listed is actually
read by the UI layer (see "How this doc stays honest" at the bottom).

---

## 0. The core idea: no two lessons are the same shape

56 lessons share one **structural** skeleton (4 phases, a lesson JSON, a
dialogue JSON) but not one **content** shape. A lesson's content depends on
three independent axes, all set per-lesson:

1. **What renders it** — `visualComponent` (one of 8) or `terminalInteraction`
   (one of 3). This decides what object shape goes in `content.visualizer`
   or `content.terminal`. Section 2.
2. **What tone it's told in** — every realm/zone has an assigned emotional
   register (action, near-death tension, quiet instruction, bonding — PRD
   Section 10.1). Section 4.
3. **What OS concept it teaches** — the lesson's `title` and the syllabus
   mapping in PRD Section 2.0/6.0. This is the one thing you should never
   improvise; check the PRD before writing `observe`/`fault` text.

Get the renderer shape wrong and the lesson silently falls back to a
generic demo (it won't crash, but it won't be *your* content either). Get
the tone wrong and it'll be technically correct but read like it belongs
in the wrong realm. This doc covers both.

---

## 1. Two files per lesson (three, if you write hints separately — you don't)

| File | Path | Owns |
|---|---|---|
| Lesson JSON | `src/data/lessons/unit{N}/{N}.{M}.json` | Schema, renderer config, Observe/Fault text |
| Dialogue JSON | `src/data/dialogue/kernelka/{N}.{M}.json` | Kernel-ka's spoken lines, per mode, per phase, plus hints |

Both files already exist (as stubs) for all 56 lessons — you're filling
them in, not creating new files, unless you're adding a brand-new lesson
(see PRD Section 13.0).

---

## 2. Lesson JSON — full field reference

```jsonc
{
  "id": "3.8",                    // must match "{unit}.{lessonNumber}", filename must match too
  "unit": 3,                      // realm number, 1-5
  "title": "Deadlock System Model", // do not invent — must match PRD Section 2.0/6.0's syllabus mapping
  "zone": "vault",                // "gauntlet" | "vault" (realm 3), "tower" | "archive" (realm 4), null otherwise
  "presentationMode": "visual",   // "visual" | "terminal" — set once, never mixed within a lesson
  "phases": ["observe", "fault", "repair", "escape"], // omit "escape" only if escapePhaseOptional is true AND you've decided this lesson skips it
  "escapePhaseOptional": false,
  "narrative": { "story": "TBD", "normal": "TBD" }, // NOT currently read by any renderer — see Section 8. Leave as "TBD" or use for your own planning notes.
  "content": {
    "observe": "TBD",   // shown in the Observe phase panel, plain text, 1-3 sentences
    "fault": "TBD",     // shown in the Fault phase panel, plain text, 1-3 sentences
    "visualizer": {},   // ONLY when presentationMode is "visual" — shape depends on visualComponent, see Section 3
    "terminal": {}       // ONLY when presentationMode is "terminal" — shape depends on terminalInteraction, see Section 3
    // optional overrides, used only by the Escape phase if it should be a HARDER/DIFFERENT
    // version of the same puzzle under time pressure. Omit both to just reuse .visualizer/.terminal:
    // "visualizerEscape": {},
    // "terminalEscape": {}
  },
  "visualComponent": "deadlock-detector",  // one of the 8 in Section 3, or null if presentationMode is "terminal"
  "terminalInteraction": null              // "type" | "log-click" | "mixed", or null if presentationMode is "visual"
}
```

**Do not change:** `id`, `unit`, `zone`, `presentationMode`, `visualComponent`,
`terminalInteraction`. These are the schema fields from Section 6.0's mode
mapping — they're load-bearing for routing, palettes, and unlock logic.
Content authors only ever touch `content` (and `narrative`, which is inert).

**`observe` / `fault` text rules:**
- Both are read literally and shown as-is in a static panel — no markdown, no interpolation.
- 1–3 sentences. `observe` explains what's working; `fault` explains what just broke and why.
- These are Kernel-ka's *absence* — the panel text is narration, not her
  voice. Her voice is the dialogue JSON (Section 4). Keep this text
  clinical/expository; save personality for dialogue.

---

## 3. `content.visualizer` — exact shape per `visualComponent`

Every field below is optional — omit any of them and the component's
built-in demo default is used, which is safe but generic. Fill in what
matters for *this* lesson's concept.

### `hotspot-diagram` — click-to-reveal static diagrams
```json
{
  "hotspots": [
    { "id": "a", "x": 20, "y": 30, "label": "Program Counter", "detail": "Holds the address of the next instruction to execute." },
    { "id": "b", "x": 60, "y": 20, "label": "ALU", "detail": "Performs arithmetic and logic operations." }
  ]
}
```
`x`/`y` are percentages (0–100) of the diagram panel. 3–5 hotspots is the sweet spot; the phase completes once every hotspot has been clicked.

### `drag-token` — resource/semaphore allocation
```json
{ "tokens": ["Sem-A", "Sem-B", "Sem-C"], "slots": ["Critical Section 1", "Critical Section 2", "Critical Section 3"] }
```
`tokens` and `slots` should be the same length — the phase completes once every slot has a token (click-to-assign; drag also works).

### `door-gate` — mutex / single-crossing mechanic
```json
{ "requiredCrossings": 3 }
```
Number of successful one-at-a-time crossings needed to complete the phase.

### `multi-avatar-puzzle` — producer-consumer / readers-writers / dining philosophers
```json
{ "capacity": 5, "requiredCycles": 4 }
```
`capacity` is the buffer size; `requiredCycles` is how many full produce→consume cycles (buffer returning to empty) are needed to complete.

### `process-viewer` — scheduling algorithms
```json
{
  "processes": [
    { "id": "P1", "name": "P1", "arrivalTime": 0, "burstTime": 5, "priority": 2 },
    { "id": "P2", "name": "P2", "arrivalTime": 1, "burstTime": 3, "priority": 1 },
    { "id": "P3", "name": "P3", "arrivalTime": 2, "burstTime": 4, "priority": 3 }
  ]
}
```
The player picks FCFS/SJF/RR/Priority themselves and hits Run — that part is interactive, not content. You're only authoring the process set. Lower `priority` number = higher priority. `priority` is unused by FCFS/SJF/RR but required for the Priority option to make sense.

### `memory-mapper` — paging
```json
{ "frameCount": 4, "pageCount": 8, "algorithm": "fifo" }
```
`algorithm` is `"fifo"` (only real option currently implemented — see Section 9 gap note below). Omit for the 4-frame/8-page default.

### `deadlock-detector` — wait-for graphs
```json
{
  "processes": [{ "id": "P1" }, { "id": "P2" }, { "id": "P3" }],
  "resources": [
    { "id": "R1", "heldBy": [{ "id": "P1" }], "neededBy": [{ "id": "P2" }] },
    { "id": "R2", "heldBy": [{ "id": "P2" }], "neededBy": [{ "id": "P3" }] },
    { "id": "R3", "heldBy": [{ "id": "P3" }], "neededBy": [{ "id": "P1" }] }
  ]
}
```
`heldBy`/`neededBy` are arrays (usually length 1). For a **no-deadlock** lesson variant, just don't close the cycle (e.g. drop the `R3` edge above).

### `disk-scheduler` — disk head scheduling
```json
{ "requests": [{ "id": "r1", "cylinder": 98 }, { "id": "r2", "cylinder": 183 }], "headStart": 53, "diskSize": 200 }
```
⚠️ **Known gap (see PRD Section 6.0):** the only disk-scheduling-algorithm lesson (4.12) is currently mapped to `presentationMode: "terminal"`, not `"visual"` — so this primitive has no lesson calling it yet. Confirm with James before assigning `disk-scheduler` to any lesson; it may mean 4.12 should actually be Visual.

---

## 4. `content.terminal` — exact shape per `terminalInteraction`

### `"type"` — player types real commands
```json
{ "requiredCalls": 2 }
```
`requiredCalls` = how many successful system calls the player must issue.
The available commands are fixed in `src/engine/syscall.js` (`fork`, `exec`,
`exit`, `wait`, `ps`, `kill`, `mount`, `chmod`). If your lesson needs a
command that isn't in that list, that's an engine change, not a content
change — flag it, don't work around it in JSON.

### `"log-click"` — a log stream the player clicks through
```json
{
  "log": [
    "[boot] initializing kernel subsystem...",
    "[boot] mounting root filesystem...",
    "[boot] spawning init process (PID 1)...",
    "[boot] system ready."
  ]
}
```
Each string is one click-to-reveal line. 4–8 lines is the sweet spot — this is a trace/timeline, not a wall of text.

### `"mixed"` — log-click gate, then a type prompt
```json
{ "log": ["...", "..."], "requiredCalls": 1 }
```
Same fields as the two modes above, combined. The player clicks through the log first, then the type prompt unlocks.

---

## 5. Escape-phase overrides — when to use them

Most lessons should **omit** `visualizerEscape`/`terminalEscape` entirely —
Escape then just reuses the Repair config under a countdown timer, which is
enough for "the same task, but faster." Only add an override when the
Escape phase genuinely needs different data — e.g. a `deadlock-detector`
Escape that presents a *new*, harder wait-for graph rather than re-scanning
the one from Repair. If you do add one, it follows the exact same shape as
the base key (`visualizerEscape` mirrors `visualizer`'s shape; same for
terminal).

---

## 6. Dialogue JSON — Kernel-ka's lines

```jsonc
// src/data/dialogue/kernelka/3.8.json
{
  "lessonId": "3.8",
  "story": {
    "observe": ["First line, click to advance.", "Second line, click again dismisses and unlocks the phase."],
    "fault": ["..."],
    "repair": ["..."],
    "escape": ["..."]
  },
  "normal": {
    "observe": ["Flat, functional line — no personality, no rapport arc. See Section 8."],
    "fault": ["..."],
    "repair": ["..."],
    "escape": ["..."]
  },
  "hints": ["A single short nudge shown if the player is stuck or idle too long."]
}
```

**Hard rules (from the phase-gate mechanic in UI-IMPLEMENTATION.md Section 2):**
- Dialogue plays **before** the phase's interaction unlocks, never during or after. Don't write a line that reacts to something the player hasn't done yet in that phase — it hasn't happened when the line displays.
- Each array entry is one click-to-dismiss VN line. Keep each entry to one beat — one sentence, maybe two short ones. If you're writing a paragraph, split it into multiple array entries instead.
- An empty array (`[]`) is valid — the UI falls back to a short generic line for that phase/mode automatically. Better to leave a slot empty than write a placeholder line that reads as real content.
- `hints`: **one field, used across the whole lesson** (not per-phase). Keep it short and non-spoiler — a nudge toward what to look at, never the answer.

---

## 7. Tone by realm/zone — this is where "not all lessons are the same" lives

Straight from PRD Section 10.1. Every dialogue line you write (Story Mode
only — Normal Mode is always flat, see Section 8) should read like it
belongs in this register:

| Realm | Zone | Tone | Feel |
|---|---|---|---|
| I — Awakening | — | Cryptic, instructive | *Teaching / orientation.* Kernel-ka is a stranger giving you the rules. |
| II — Process Forge | — | Encouraging, building rapport | *Bonding.* This is where the relationship starts forming. |
| III — Gauntlet | — | Encouraging, urgent | *Action sequence.* Fast, competitive, time pressure in the voice itself. |
| III — Vault | — | Serious, trusting | *Close to death.* Claustrophobic, red-lit — she's scared too, but steady. |
| IV — Tower | — | Desperate, protective | *Close to death, different flavor.* Vertigo, instability — she's trying to keep you from paging out. |
| IV — Archive | — | Intimate, vulnerable | *Bonding, deeper.* She's revealing something personal here. |
| V — Bunker Core | — | Revealing, decisive | *Climax.* The 15-year twist lands in this realm — see PRD Section 10.3. |

If you're not sure which bucket a line falls into, check the lesson's
`unit`/`zone` fields against this table — don't guess from the OS topic
alone. A scary-sounding topic (deadlock) in a realm with an encouraging
tone (it isn't, Vault is serious/trusting — but hypothetically) still gets
written in that realm's register, not the topic's vibe.

Example lines that hit these tones correctly (from the PRD, don't reuse
verbatim — write your own in the same register):
- Awakening: *"This world runs on physics you don't know yet. Learn fast."*
- Process Forge: *"You're becoming something. Let's give it shape."*
- Vault: *"I've been in this vault before. Trust me."*
- Archive: *"These memories are all I have left."*

---

## 8. Story Mode vs. Normal Mode — not a tone slider, a different write

Normal Mode dialogue is **not** "Story Mode but toned down." Per PRD
Section 10.2, it's flat and functional — no tone progression, no rapport,
no callbacks to the narrative arc. Write Normal Mode lines as if Kernel-ka
is a UI element that happens to talk: purely instructional. Don't try to
preserve "a little bit" of the Story Mode voice in Normal Mode lines —
if you can't tell whether a Normal Mode line was accidentally written in
Story Mode's voice, it probably was; rewrite it plainer.

---

## 9. Known gaps — don't author content that depends on these yet

- **`narrative.story`/`narrative.normal`** in the lesson JSON schema are
  not read by any component. Dialogue lives entirely in the dialogue JSON
  (Section 6). Leave `narrative` as `"TBD"` or repurpose it for your own
  planning notes — it won't reach the game either way. Worth a call from
  James on whether to wire it up or drop it.
- **Native entities** (`src/data/entities/miku.json`, `redditGuy.json`)
  have a `dialogue: []` field in their schema, but no component renders
  entity dialogue yet — Kernel-ka is the only companion currently wired
  into the UI. Filling in Miku/Reddit Guy's `dialogue` array won't show up
  in-game until that renderer exists (PRD Section 12.0 lists this as not
  yet started). Fine to draft the lines for later, just know they're inert
  for now.
- **`memory-mapper`'s `algorithm` field** only supports `"fifo"` in the
  current engine (`src/engine/memory.js`) — `"lru"`/`"optimal"`/`"clock"`
  are accepted as values but currently behave identically to FIFO (the
  engine has a placeholder eviction order, noted in its own comments).
  Don't author a lesson that depends on the *difference* between
  algorithms yet.

---

## 10. Worked example — a complete visual lesson

`src/data/lessons/unit3/3.8.json`:
```json
{
  "id": "3.8",
  "unit": 3,
  "title": "Deadlock System Model",
  "zone": "vault",
  "presentationMode": "visual",
  "phases": ["observe", "fault", "repair", "escape"],
  "escapePhaseOptional": false,
  "narrative": { "story": "TBD", "normal": "TBD" },
  "content": {
    "observe": "Three processes each hold one resource and wait on another. As long as no one waits on their own resource, the system keeps moving.",
    "fault": "P3 just requested R1 — which P1 is holding while waiting on R2, which P2 is holding while waiting on R3. Nobody can move.",
    "visualizer": {
      "processes": [{ "id": "P1" }, { "id": "P2" }, { "id": "P3" }],
      "resources": [
        { "id": "R1", "heldBy": [{ "id": "P1" }], "neededBy": [{ "id": "P2" }] },
        { "id": "R2", "heldBy": [{ "id": "P2" }], "neededBy": [{ "id": "P3" }] },
        { "id": "R3", "heldBy": [{ "id": "P3" }], "neededBy": [{ "id": "P1" }] }
      ]
    }
  },
  "visualComponent": "deadlock-detector",
  "terminalInteraction": null
}
```

`src/data/dialogue/kernelka/3.8.json`:
```json
{
  "lessonId": "3.8",
  "story": {
    "observe": ["I've been in this vault before. Trust me — watch how they wait on each other."],
    "fault": ["There. Feel that? Nothing's moving. That's not a slowdown — that's a deadlock."],
    "repair": ["Find the cycle. Break one edge and everyone breathes again."],
    "escape": ["No time to admire it. Scan, find the cycle, move."]
  },
  "normal": {
    "observe": ["Three processes, each holding one resource and requesting another."],
    "fault": ["A circular wait has formed. No process can proceed."],
    "repair": ["Run the wait-for graph scan to identify the cycle."],
    "escape": ["Identify the cycle before the timer expires."]
  },
  "hints": ["Follow each process's arrow to the resource it's waiting on — does the trail loop back?"]
}
```

---

## 11. Validating a lesson you just wrote

No build step needed for content-only changes (JSON is loaded at runtime
via `import.meta.glob`).

```bash
npm run dev
```
Then navigate directly to `http://localhost:5173/lesson/{your-lesson-id}`
(e.g. `/lesson/3.8`) — you don't need to click through the Hub every time.
Check:
- Observe/Fault text reads correctly and isn't truncated oddly.
- The visualizer/terminal shows your data, not the generic demo default (if it's the default, your `content.visualizer`/`content.terminal` key is probably misspelled or misplaced).
- Dialogue lines dismiss correctly and match the phase.
- Toggle Story/Normal in Settings and re-check dialogue tone in both.

---

## How this doc stays honest

Every field described above is read by real code, not aspirational: lesson
`content.observe`/`content.fault` → `PhaseObserver.jsx`/`PhaseFault.jsx`;
`content.visualizer`/`content.terminal` (and their `*Escape` variants) →
`PhaseRepair.jsx`/`PhaseEscape.jsx`, spread as props into the dispatched
visualizer or `TerminalSimulator`; dialogue `story`/`normal` arrays →
`KernelkaDialogue.jsx`; `hints` → `PhaseContainer.jsx`'s hint banner. If a
future code change stops reading one of these fields, this doc is wrong and
should be fixed alongside that change — not the other way around.
