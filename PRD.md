Kernel-ka's Bunker — Product Requirements Document (PRD)

Version: 3.0 (Syllabus-Aligned Consolidation)
Status: Draft for Review
Target Course: CS22403 — Operating Systems (L-T-P-C: 3-0-0-3)
Studio: Omega Mu Gamma Studio

This version re-aligns the entire design to the actual CS22403 syllabus, which
is **5 units**, not 6. Prior drafts (PRD v1.0–v2.0) assumed a 6-unit structure
where Unit I covered process basics and Units IV/V split memory and file
systems. The real syllabus distributes content differently — this version
corrects the curriculum mapping and restructures realms accordingly, while
keeping every architectural decision made in the prior addenda (one engine,
per-lesson Visual/Terminal mode, portrait-based art, hub/realm navigation).

---

## 0.0 — What Changed From v2.0

| # | Change | Why |
|---|---|---|
| 1 | Realm count: 6 → 5 | The syllabus has 5 units. No 6th "Bunker Core" unit exists separately — its content (VMs, Linux, Mobile OS) is folded into the syllabus's actual Unit V. |
| 2 | Realm I content fully replaced | The syllabus's Unit I is computer architecture + OS overview (interrupts, cache, DMA, multiprocessor, system calls, boot) — not process concepts. This is new lesson content, not a rename. |
| 3 | Process concept/threads/IPC moved | These belong to the syllabus's Unit II (Process Management), not Unit I. |
| 4 | Units III and IV each internally split into two zones | Unit III bundles CPU Scheduling + Deadlock; Unit IV bundles Memory Management + Disk/File Systems. Rather than force these into one flat lesson list, each realm keeps two narrative "zones" internally — preserving the CPU Core / Deadlock Vault and Memory Tower / Archive flavor from earlier drafts, without inventing units the syllabus doesn't have. |
| 5 | Unit III naming note | The syllabus titles Unit III "PROCESS SYNCHRONISATION," but its listed content is CPU Scheduling and Deadlock — actual synchronization topics (critical-section, mutex, semaphores, monitors) are listed under Unit II. This reads as a likely labeling inconsistency in the source syllabus document. This PRD maps realms by **content**, not the printed title. Worth confirming against your institution's official syllabus copy. |
| 6 | Lesson count: 52 → 56 | Recount based on actual syllabus sub-topics (see Section 2.0). |

Everything else — the engine, phase structure, Visual/Terminal toggle
philosophy, art direction, companion system, tech stack — carries forward
unchanged from v2.0.

---

## 1.0 — Overview

### 1.1 What is Kernel-ka's Bunker?

Kernel-ka's Bunker is an interactive, narrative-driven learning environment for
the CS22403 Operating Systems syllabus. It is not a textbook companion. It is a
replacement for the moment when a process diagram — or a cache hierarchy, or a
wait-for graph — stops making sense.

The core idea:

**Your survival is the syllabus.**

A process scheduler isn't an algorithm; it's the force that decides whether you
move or freeze. A page table isn't a data structure; it's the map of your own
fragmented consciousness. A deadlock isn't a theoretical problem; it's a trap
that will delete you if you can't break the cycle. Even the hardware itself —
the interrupts, the cache hierarchy, the boot sequence — is the physics of the
world you wake up into.

### 1.2 The Narrative Premise

You are an apprentice technician. Your first solo assignment: inspect an old,
decommissioned bunker. You find a terminal, a chair, and a cryo-chamber. You
touch the screen. The world dissolves.

You wake up as an avatar — a glowing, wireframe version of yourself — in a
digital world. Your body is still in the chair. Or is it?

A voice. Female. Calm. Cryptic. She calls herself Kernel-ka.

"You're going to see a lot of things that look like rules. They're not rules.
They're physics. Learn them, or the system will erase you. And I need you to
survive."

The game is your journey through the digital bunker, learning the OS syllabus
to stay alive, uncover the truth about Kernel-ka, and find a way back to your
body.

**The Ending (spoiler, but it's the pitch):** You escape the matrix. You wake
up in your cryo-chamber. You turn to your left. Kernel-ka is waking up in the
pod next to you. She is real. She is your boss's daughter. She has been
trapped for 15 years. You hold hands and walk out. Your boss is stunned. Game
ends.

### 1.3 Design Philosophy: One Engine, Five Realms

Each of the five units is a distinct **realm**, matching the syllabus 1:1 —
with its own visual identity, hazard logic, and accent palette. Two realms
(III and IV) are internally divided into two **zones** each, reflecting the
two content halves the syllabus bundles into those units. All realms and
zones run on the **same core game engine**: the same four-phase lesson loop,
the same companion/dialogue rig, the same progress system.

This replaced an earlier draft that assigned six separate gameplay genres to
six invented units. That approach was scoped out both for build complexity
and — now confirmed — for not matching the actual syllabus structure.

---

## 2.0 — Curriculum Mapping

All five realms map directly to CS22403's five units. Each realm is entered
from a central hub, with a narrative context that makes the concepts feel
urgent.

### Realm I — The Awakening
**Syllabus Unit I: Operating System Overview (7 hrs)**

| Lesson | Topic | Concept |
|---|---|---|
| 1.1 | Computer System Basics | Basic elements, instruction execution |
| 1.2 | Interrupts | Interrupt-driven operation |
| 1.3 | Memory Hierarchy & Cache | Memory hierarchy, cache memory |
| 1.4 | Direct Memory Access | DMA controller operation |
| 1.5 | Multiprocessor & Multicore Organization | Parallel hardware organization |
| 1.6 | OS Objectives, Functions & Evolution | What an OS does, and how it got here |
| 1.7 | OS Structure, Operations & System Calls | System call interface |
| 1.8 | System Programs, OS Generation & Boot | How an OS comes into being |

**Narrative Context:** You wake up with no memory of how this world works — not
even its physics. Kernel-ka teaches you the hardware substrate beneath
everything: the hierarchy, the interrupts, the boot sequence that brought this
world (and you) into existence.

### Realm II — The Process Forge
**Syllabus Unit II: Process Management (10 hrs)**

| Lesson | Topic | Concept |
|---|---|---|
| 2.1 | Process Concept | What is a process? |
| 2.2 | Process Scheduling | Basic scheduling concepts |
| 2.3 | Operations on Processes | Creation, termination |
| 2.4 | Inter-process Communication | Pipes, signals, shared memory |
| 2.5 | Threads Overview & Multithreading Models | Thread models |
| 2.6 | Threading Issues | Concurrency problems |
| 2.7 | Critical-Section Problem | Mutual exclusion basics |
| 2.8 | Synchronization Hardware | Test-and-set, compare-and-swap |
| 2.9 | Mutex Locks | Mutual exclusion |
| 2.10 | Semaphores | Counting and binary semaphores |
| 2.11 | Classic Synchronization Problems | Producer-consumer, readers-writers, dining philosophers |
| 2.12 | Critical Regions & Monitors | Higher-level synchronization constructs |

**Narrative Context:** Kernel-ka teaches you to give your own form structure —
to understand yourself as a process, to split into threads, and to cooperate
(without colliding) with the other entities sharing this world.

### Realm III — The Scheduling Gauntlet & Deadlock Vault
**Syllabus Unit III: "Process Synchronisation" — content: CPU Scheduling +
Deadlock (10 hrs)**

Two zones within one realm.

**Zone A — The Scheduling Gauntlet**

| Lesson | Topic | Concept |
|---|---|---|
| 3.1 | Scheduling Criteria | CPU utilization, throughput, turnaround, waiting, response time |
| 3.2 | FCFS Scheduling | First-Come, First-Served |
| 3.3 | SJF Scheduling | Shortest-Job-First |
| 3.4 | Round-Robin Scheduling | Preemptive time-slicing |
| 3.5 | Priority Scheduling | Static and dynamic priority |
| 3.6 | Multiple-Processor Scheduling | Load balancing, affinity |
| 3.7 | Real-Time Scheduling | Hard vs. soft real-time |

**Zone B — The Deadlock Vault**

| Lesson | Topic | Concept |
|---|---|---|
| 3.8 | Deadlock System Model | Resources, processes, allocation |
| 3.9 | Deadlock Characterization | Mutual exclusion, hold and wait, no preemption, circular wait |
| 3.10 | Methods for Handling Deadlocks | Prevention, avoidance, detection, recovery |
| 3.11 | Deadlock Prevention | Breaking the four conditions |
| 3.12 | Deadlock Avoidance | Banker's Algorithm |
| 3.13 | Deadlock Detection | Wait-for graphs |
| 3.14 | Recovery from Deadlock | Process termination, resource preemption |

**Narrative Context:** You compete for CPU time at the Core — the scheduler is
the law. Then you're sealed into a vault with several entities, and the only
way out is to understand and break the deadlock trapping you all.

### Realm IV — The Storage Vault
**Syllabus Unit IV: Storage Management (9 hrs)**

Two zones within one realm.

**Zone A — The Memory Tower**

| Lesson | Topic | Concept |
|---|---|---|
| 4.1 | Main Memory Background & Swapping | Address binding, moving processes to/from disk |
| 4.2 | Contiguous Memory Allocation | Fixed and dynamic partitioning |
| 4.3 | Paging | Page tables, frame allocation |
| 4.4 | Segmentation | Segment tables, logical address translation |
| 4.5 | Segmentation with Paging | Combined approach |
| 4.6 | Virtual Memory & Demand Paging | Demand paging |
| 4.7 | Page Replacement | FIFO, Optimal, LRU, Clock |
| 4.8 | Allocation of Frames | Fixed vs. variable allocation |
| 4.9 | Thrashing | Causes and prevention |
| 4.10 | Allocating Kernel Memory | Slab allocation, buddy system |

**Zone B — The Archive**

| Lesson | Topic | Concept |
|---|---|---|
| 4.11 | Disk Structure | Physical layout |
| 4.12 | Disk Scheduling | FCFS, SSTF, SCAN, C-SCAN, LOOK |
| 4.13 | Swap-Space Management | Use and implementation |
| 4.14 | Directory & Disk Structure / Directory Implementation | Linear lists, hash tables |
| 4.15 | Allocation Methods | Contiguous, linked, indexed |

**Narrative Context:** You must climb the tower, paging yourself between
floors as the power fails — then descend into the Archive, where your
fragmented memories wait to be reassembled by following the inode pointers.

### Realm V — The Bunker Core
**Syllabus Unit V: Virtual Machines (9 hrs)**

| Lesson | Topic | Concept |
|---|---|---|
| 5.1 | Virtual Machines | Types, benefits, implementation |
| 5.2 | Distributed Systems | Types of network-based OS |
| 5.3 | Linux System | Design principles, kernel modules |
| 5.4 | Mobile OS Architecture Overview | iOS vs. Android, compared |
| 5.5 | Mobile OS — iOS | Architecture, SDK framework, media/services/core OS layers, file system |
| 5.6 | Mobile OS — Android | Architecture, SDK framework, media/services/core OS layers, file system |
| 5.7 | The Final System Call | Climax of the game (narrative capstone) |

**Narrative Context:** You reach the core of the Bunker and step outside your
own world entirely — seeing it as a VM on a host system, then out further
still to distributed systems, Linux, and mobile platforms. The truth about
Kernel-ka is revealed. You perform the ultimate system call to escape.

**Total: 56 lessons across 5 realms.**

---

## 3.0 — World & Navigation Structure

### 3.1 Central Hub

A single persistent hub (the Bunker's core terminal room / consciousness map)
from which the player selects a realm. Five realm portals/nodes, one per
syllabus unit. Realms III and IV show their two internal zones as sub-nodes
once entered.

### 3.2 Navigation Modes

| Mode | Behavior |
|---|---|
| **Story Mode** | Realms unlock and must be entered in sequence: I → II → III → IV → V. Within Realms III and IV, Zone A must be cleared before Zone B unlocks. Full narrative — Kernel-ka's dialogue, rapport, the 15-year reveal — is gated to this mode. |
| **Normal Mode** | All unlocked realms and zones are freely selectable in any order. Practice/drilling focus. |

**Normal Mode narrative behavior:** Narrative is stripped, not silenced.
Kernel-ka's portrait stays visible with a neutral expression (no rapport
rim-light pulse), and she gives short, flat, functional lines only ("Fault
detected." / "Try again." / "Cleared."). Hints remain available on request.
The Escape phase becomes a pure speed challenge with no narrative stakes.

### 3.3 Realm Entry Sequence

On entering a new realm (or a new zone within Realms III/IV), a short (2–3s)
CSS/Framer Motion transition plays, at zero art cost:

1. Realm/zone name displays (e.g., "The Deadlock Vault").
2. Screen briefly floods with the realm's (or zone's) accent color.
3. A short signature effect plays, themed per realm/zone (glitch / scanline /
   pulse).
4. Fades into the first lesson.

---

## 4.0 — Game Design

### 4.1 The Lesson Structure — The Bunker Protocol

Every lesson follows a consistent four-phase pattern:

| Phase | What Happens |
|---|---|
| 1. Observe | The concept is demonstrated correctly. Kernel-ka explains what's happening. No interaction yet. |
| 2. Fault | A fault is injected. The system begins to fail. Kernel-ka explains why. |
| 3. Repair | The system resets. The player does the work: write the fix, reallocate memory, break the deadlock. |
| 4. Escape | A timed challenge applying the concept under pressure. |

The Escape phase is optional for some lessons (see Section 6.0 for per-lesson
notes).

### 4.2 One Engine, Two Presentation Modes

Every realm/zone runs the same phase engine, rendered through one of two
presentation shells, chosen **per lesson**:

- **Visual mode**: background art + interactive hotspots/draggables +
  CSS-animated state changes.
- **Terminal mode**: a stylized command/log interface for concepts that are
  naturally command- or trace-driven.

**Rule of thumb:** if the concept is about *structure*, use Visual. If it's
about *sequence, timeline, or trace*, use Terminal.

**Lesson schema:**
```json
{
  "id": "3.12",
  "unit": 3,
  "zone": "deadlock-vault",
  "presentationMode": "visual",
  "phases": ["observe", "fault", "repair", "escape"]
}
```

### 4.3 The Avatar

The player controls a customizable wireframe avatar representing their
consciousness in the digital world.

- **Customization:** a handful of colors and simple shapes.
- **Motion:** avatar moves based on player interaction.
- **State:** visual state reflects the current OS concept (e.g., flickering
  for a page fault, freezing for a deadlock).

### 4.4 Per-Realm / Per-Zone Visual Identity

| Realm | Zone | Theme |
|---|---|---|
| I — The Awakening | — | Glitched, unstable, wireframe |
| II — The Process Forge | — | Warm, structural, forming |
| III — The Scheduling Gauntlet & Deadlock Vault | Gauntlet | Fast, bright, competitive |
| III — The Scheduling Gauntlet & Deadlock Vault | Vault | Claustrophobic, tense, red-lit |
| IV — The Storage Vault | Tower | Vertigo-inducing, layered, unstable |
| IV — The Storage Vault | Archive | Dusty, fragmented, sepia-toned |
| V — The Bunker Core | — | Clean, sterile, revealing |

### 4.5 Kernel-ka — The Companion

Kernel-ka is the player's constant companion in Story Mode. She provides:

- **Dialogue:** scripted lines per phase per lesson, with variations based on
  progress and choices.
- **Hints:** contextual hints if the player is stuck on a repair or escape
  challenge.
- **Rapport:** a hidden score tracking the player's relationship with her.
  Affects dialogue tone (warm, neutral, cold) and potentially the ending.

### 4.6 Native Entities

Non-playable entities native to the digital world — not real people, but
system daemons, forum avatars, or other digital constructs.

- **Miku (The System Daemon):** hyper-energetic entity representing a
  high-priority system process. Appears in Realm III (Gauntlet + Vault zones).
- **Reddit Guy (The Forum Node):** perpetually sarcastic entity representing
  a low-priority user process. Appears in Realm III (Gauntlet) and Realm IV
  (Archive zone).
- Additional entities: TBD, added as needed.

### 4.7 The Passport / System Log

A progress-tracking system visually showing completed lessons, zones, and
realms.

- **Stamps:** each completed lesson grants a stamp.
- **Seals:** completing all lessons in a zone (or a full realm, for
  single-zone realms) grants a special seal.
- **Visual:** displayed as a physical booklet or digital terminal screen.

---

## 5.0 — Art Direction

### 5.1 Style

Cyberpunk ink-wash. Black / neon / gray base palette, with per-realm/zone
accent tones layered on top (Section 5.3).

### 5.2 Portrait-Based Character Art

- **Kernel-ka:** a single ink-wash portrait. No expression variants needed.
- **Player avatar:** same treatment — one portrait, reused everywhere.
- **Scene compositing:** portraits are composited onto generated backgrounds
  as needed, rather than illustrating unique art per scene.

**Asset footprint:** roughly 2 portraits (Kernel-ka + player) + 7 background
environments (one per realm/zone, with state variants for normal/fault/
escape) + a handful of splash-art pieces.

**Generation workflow:** single-pass AI image generation with a consistent
prompt prefix, applied to backgrounds, portraits, and splash art alike:

```
[Subject], ink-wash style, cyberpunk aesthetic, black ink with neon [accent
color] highlights, digital art, minimalist, sharp lines, atmospheric,
[additional detail]
```

Manual touch-up (e.g., in Photopea) only where a generated result needs
correcting.

### 5.3 Per-Realm / Per-Zone Accent Palette

| Realm | Zone | Primary Accent | Secondary | Background Base |
|---|---|---|---|---|
| I — Awakening | — | #00FFAA (cyan-green) | #FF00FF (magenta) | #0A0A0F |
| II — Process Forge | — | #33CCFF (electric blue) | #FFAA00 (warm amber) | #0A0F14 |
| III — Scheduling Gauntlet | Gauntlet | #FF5500 (orange) | #FFCC00 (yellow) | #1A0A05 |
| III — Deadlock Vault | Vault | #FF0033 (crimson) | #880011 (dark red) | #1A0505 |
| IV — Memory Tower | Tower | #7700FF (purple) | #FF00AA (pink) | #0F051A |
| IV — Archive | Archive | #CC8844 (amber) | #884422 (brown) | #1A120A |
| V — Bunker Core | — | #00CCFF (bright blue) | #FFFFFF (white) | #0A0F14 |

Usage: background art accents, UI borders/buttons/highlights, Kernel-ka's
portrait rim light, and terminal-mode prompt/status text color.

### 5.4 Splash Art

Reserved for lesson-complete moments and realm/zone boss/escape-sequence
climaxes only — not every lesson.

---

## 6.0 — Full Lesson Mode Mapping

Rule of thumb: **structure → Visual, sequence/timeline/trace → Terminal.**

### Realm I — The Awakening

| # | Lesson | Mode | What Happens |
|---|---|---|---|
| 1.1 | Computer System Basics | Visual | Diagram of CPU/memory/I/O components; click to animate the instruction execution cycle. |
| 1.2 | Interrupts | Terminal | Interrupt log stream; player watches interrupt vector table entries fire and ISRs get invoked. |
| 1.3 | Memory Hierarchy & Cache | Visual | Layered pyramid diagram; click each level to compare speed/size/cost tradeoffs. |
| 1.4 | Direct Memory Access | Visual | Animated diagram of a DMA controller moving data on the bus without CPU involvement. |
| 1.5 | Multiprocessor & Multicore Organization | Visual | Diagram comparing single-core vs. multiprocessor/multicore layouts. |
| 1.6 | OS Objectives, Functions & Evolution | Visual | Clickable timeline of OS eras; each stop reveals what the OS's job was at that stage. |
| 1.7 | OS Structure, Operations & System Calls | Terminal | Type the correct system call to trigger an OS operation and progress. |
| 1.8 | System Programs, OS Generation & Boot | Terminal | Step-by-step boot sequence log; player issues commands to bring the system up. |

### Realm II — The Process Forge

| # | Lesson | Mode | What Happens |
|---|---|---|---|
| 2.1 | Process Concept | Visual | Clickable process diagram; click components to reveal what a process is made of. |
| 2.2 | Process Scheduling (basics) | Visual | Overview diagram showing processes queued for CPU access. |
| 2.3 | Operations on Processes | Terminal | Type commands to spawn and terminate processes; log shows the resulting process tree. |
| 2.4 | Inter-process Communication | Visual | Diagram of two processes; drag data through a pipe/shared-memory connector. |
| 2.5 | Threads Overview & Multithreading Models | Visual | Side-by-side single- vs multi-threaded avatar completing the same task. |
| 2.6 | Threading Issues | Visual | Two threads race on a shared variable; player watches/causes a race condition. |
| 2.7 | Critical-Section Problem | Visual | Mutex-door/bridge mechanic — only one avatar may cross at a time. |
| 2.8 | Synchronization Hardware | Terminal | Register-level trace of test-and-set / compare-and-swap operations. |
| 2.9 | Mutex Locks | Visual | Door/bridge mechanic extended to lock/unlock interactions. |
| 2.10 | Semaphores | Visual | Resource-pool token allocator; drag tokens to tasks to keep the system running. |
| 2.11 | Classic Synchronization Problems | Visual | Multi-avatar puzzle scenarios (producer-consumer, readers-writers, dining philosophers). |
| 2.12 | Critical Regions & Monitors | Visual | A "monitor room" structure with built-in condition variables; player enters/exits under enforced mutual exclusion. |

### Realm III, Zone A — The Scheduling Gauntlet

| # | Lesson | Mode | What Happens |
|---|---|---|---|
| 3.1 | Scheduling Criteria | Terminal | Live metrics dashboard (utilization, throughput, turnaround, wait, response) as a scenario runs. |
| 3.2 | FCFS Scheduling | Visual | Gantt chart / race track; avatars run in arrival order. |
| 3.3 | SJF Scheduling | Visual | Gantt chart; player reorders by burst time, sees race outcome change. |
| 3.4 | Round-Robin Scheduling | Visual | Race track with visible time-slicing; avatars swap in/out per quantum. |
| 3.5 | Priority Scheduling | Visual | Race positions shift live as priority values change. |
| 3.6 | Multiple-Processor Scheduling | Visual | Multiple parallel tracks/lanes; player balances load across them. |
| 3.7 | Real-Time Scheduling | Visual | Timeline showing hard/soft deadlines; missed deadlines flagged visually. |

### Realm III, Zone B — The Deadlock Vault

| # | Lesson | Mode | What Happens |
|---|---|---|---|
| 3.8 | Deadlock System Model | Visual | Map of resources, processes, and current allocation. |
| 3.9 | Deadlock Characterization | Visual | Click entities to inspect held/needed resources; wait-for graph builds live. |
| 3.10 | Methods for Handling Deadlocks | Visual | Overview diagram of the four approaches, presented as selectable paths. |
| 3.11 | Deadlock Prevention | Terminal | Resource-allocation decision log as the player breaks one of the four conditions. |
| 3.12 | Deadlock Avoidance (Banker's Algorithm) | Visual | Resource-allocation matrix table; player tests allocations against safety, matrix updates live. |
| 3.13 | Deadlock Detection | Visual | Wait-for graph scan; player highlights the circular wait. |
| 3.14 | Recovery from Deadlock | Terminal | Morality-choice command: player issues a termination command against one process to break the cycle. |

### Realm IV, Zone A — The Memory Tower

| # | Lesson | Mode | What Happens |
|---|---|---|---|
| 4.1 | Main Memory Background & Swapping | Visual | Platform-tower mechanic; blocks physically move between memory and disk levels. |
| 4.2 | Contiguous Memory Allocation | Visual | Partition blocks resize/shift as processes are allocated. |
| 4.3 | Paging | Visual | Grid view; player jumps page-to-page, missed jumps trigger page faults. |
| 4.4 | Segmentation | Visual | Tower zones with different rules (code = jump, data = walk only). |
| 4.5 | Segmentation with Paging | Visual | Combined grid + segment-zone view. |
| 4.6 | Virtual Memory & Demand Paging | Terminal | Page-fault log stream as pages are demand-loaded. |
| 4.7 | Page Replacement | Visual | Animated grid running FIFO/Optimal/LRU/Clock; player watches/chooses eviction. |
| 4.8 | Allocation of Frames | Visual | Frame-allocation grid, fixed vs. variable toggle. |
| 4.9 | Thrashing | Visual | Tower shake/collapse effect as fault rate spikes. |
| 4.10 | Allocating Kernel Memory | Terminal | Memory-pool trace log for slab/buddy allocation events. |

### Realm IV, Zone B — The Archive

| # | Lesson | Mode | What Happens |
|---|---|---|---|
| 4.11 | Disk Structure | Visual | Physical layout diagram of the disk. |
| 4.12 | Disk Scheduling | Terminal | I/O request queue/log; player directs the disk head using FCFS/SSTF/SCAN/C-SCAN/LOOK. |
| 4.13 | Swap-Space Management | Terminal | Swap-space trace log as pages move in/out. |
| 4.14 | Directory & Disk Structure / Directory Implementation | Visual | Tree view; player builds/traverses linear list vs. hash-table directory structures. |
| 4.15 | Allocation Methods | Visual | Block diagram; player allocates space via contiguous/linked/indexed, sees resulting fragmentation. |

### Realm V — The Bunker Core

| # | Lesson | Mode | What Happens |
|---|---|---|---|
| 5.1 | Virtual Machines | Visual | System-view diagram; player sees the Bunker as a VM layer on a host system. |
| 5.2 | Distributed Systems | Visual | Network-node diagram of network-based OS types. |
| 5.3 | Linux System | Terminal | Real/simulated Linux commands (`ps`, `kill`, `mount`, `chmod`) used to manipulate the system, alongside kernel module concepts. |
| 5.4 | Mobile OS Architecture Overview | Visual | Side-by-side layered architecture diagram comparing iOS and Android. |
| 5.5 | Mobile OS — iOS | Visual | Layered architecture diagram (SDK Framework, Media/Services/Core OS layers, file system). |
| 5.6 | Mobile OS — Android | Visual | Layered architecture diagram (SDK Framework, Media/Services/Core OS layers, file system). |
| 5.7 | The Final System Call | Terminal | Climax; player issues the final, irreversible system call to escape. |

**Mode tally:** Visual — 42 lessons · Terminal — 14 lessons, across 56 total
lessons.

---

## 7.0 — Tech Stack

| Layer | Technology | Justification |
|---|---|---|
| App shell & UI | React 19+ with Vite | Studio standard. Fast HMR for rapid iteration. |
| Language | JavaScript (JSX) | Matches studio convention on SeeDS/GateLab. No TypeScript build step; the schema-driven lesson/dialogue JSON files serve as the shape contract instead. |
| State Management | Zustand | Studio standard. Fits game state (avatar, progress, rapport, inventory). |
| Canvas Rendering | Konva.js + react-konva | Studio standard (GateLab). 2D is sufficient for all lessons. |
| Routing | React Router | Needed for Hub Map, Realm/Zone pages, Lesson pages, Settings, Ending. |
| Persistence | localStorage (Zustand persist) | Sufficient for MVP. No cloud backend needed. |
| Simulation Engine | Vanilla JS | Pure logic — scheduler, memory manager, deadlock detector, disk scheduler. No React, no Konva. |
| Deployment | Vercel | Studio standard. Works with Vite builds. |

No 3D engine is required under this architecture.

---

## 8.0 — Project Structure

```
Kernelkas-Bunker/
├── public/
│   ├── art/
│   │   ├── bunker/          # Realm/zone environments
│   │   ├── avatar/          # Player avatar assets
│   │   ├── kernelka/        # Kernel-ka portrait
│   │   └── entities/        # Miku, Reddit Guy, etc.
│   ├── audio/               # Ambient sounds, optional dialogue
│   └── sprites/             # UI sprites, icons
├── src/
│   ├── pages/
│   │   ├── Home.jsx         # Landing page, mode select
│   │   ├── HubMap.jsx       # Central hub / realm selection
│   │   ├── ZoneMap.jsx      # Zone selection within Realms III/IV
│   │   ├── LessonPage.jsx   # The lesson container
│   │   ├── Settings.jsx     # Theme, avatar customization
│   │   └── Ending.jsx       # The final scene
│   ├── components/
│   │   ├── layout/
│   │   │   ├── TopBar.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── hub/
│   │   │   ├── HubMap.jsx
│   │   │   ├── RealmPortal.jsx
│   │   │   ├── ZonePortal.jsx
│   │   │   └── RealmEntryTransition.jsx
│   │   ├── avatar/
│   │   │   ├── AvatarRenderer.jsx
│   │   │   └── Customization.jsx
│   │   ├── companion/
│   │   │   ├── KernelkaDialogue.jsx
│   │   │   └── RapportPanel.jsx
│   │   ├── lesson/
│   │   │   ├── PhaseObserver.jsx
│   │   │   ├── PhaseFault.jsx
│   │   │   ├── PhaseRepair.jsx
│   │   │   ├── PhaseEscape.jsx
│   │   │   └── PhaseContainer.jsx
│   │   ├── visualizers/
│   │   │   ├── ProcessViewer.jsx
│   │   │   ├── MemoryMapper.jsx
│   │   │   ├── DiskScheduler.jsx
│   │   │   ├── DeadlockDetector.jsx
│   │   │   └── TerminalSimulator.jsx
│   │   └── ui/
│   │       ├── Button.jsx
│   │       ├── Indicator.jsx
│   │       └── Passport.jsx
│   ├── data/
│   │   ├── lessons/
│   │   │   ├── unit1/       # 1.1.json through 1.8.json
│   │   │   ├── unit2/       # 2.1.json through 2.12.json
│   │   │   ├── unit3/       # 3.1.json through 3.14.json (zones: gauntlet, vault)
│   │   │   ├── unit4/       # 4.1.json through 4.15.json (zones: tower, archive)
│   │   │   └── unit5/       # 5.1.json through 5.7.json
│   │   ├── units/           # Realm/zone metadata, narrative context, palette tokens
│   │   ├── dialogue/        # Kernel-ka's full script
│   │   └── entities/        # Native entity definitions
│   ├── engine/              # Pure JS simulation logic
│   │   ├── scheduler.js     # Process scheduling simulator
│   │   ├── memory.js        # Paging, segmentation, thrashing simulator
│   │   ├── deadlock.js      # Deadlock detection and recovery simulator
│   │   ├── disk.js          # File system and disk scheduling simulator
│   │   └── syscall.js       # System call interface
│   ├── hooks/               # Custom React hooks
│   ├── store/               # Zustand slices
│   │   ├── lessonStore.js
│   │   ├── progressStore.js
│   │   ├── rapportStore.js
│   │   └── avatarStore.js
│   ├── utils/               # Helpers, highlighters, renderer dispatchers
│   └── styles/              # tokens.css (per-realm/zone accent palette, shared design tokens)
├── PRD.md                   # This file
├── README.md                # High-level overview
└── package.json
```

---

## 9.0 — Simulation Engine Specifications

The simulation engine is the heart of the game. It is a pure JavaScript
module that models the core OS concepts. It does not depend on React or the
canvas layer. The visualizers and terminal renderers simply read state from
the engine and render it.

### 9.1 Core Data Models

Shapes below are documented as JSDoc typedefs (not TypeScript interfaces) —
the engine is plain JS. These comments live alongside the real code in
`src/engine/` for editor autocomplete without a build-step type checker.

```js
/**
 * @typedef {Object} Process
 * @property {string} id
 * @property {string} name
 * @property {'new'|'ready'|'running'|'blocked'|'terminated'} state
 * @property {number} priority
 * @property {number} burstTime
 * @property {number} remainingTime
 * @property {number} arrivalTime
 * @property {number} waitTime
 * @property {number} turnaroundTime
 * @property {number} responseTime
 * @property {MemoryAllocation} memory
 */

/**
 * @typedef {Object} MemoryPage
 * @property {number} id
 * @property {number|null} frame
 * @property {boolean} valid
 * @property {boolean} dirty
 * @property {boolean} referenced
 */

/**
 * @typedef {Object} MemorySegment
 * @property {number} id
 * @property {number} base
 * @property {number} limit
 * @property {'code'|'data'|'stack'} type
 */

/**
 * @typedef {Object} Resource
 * @property {string} id
 * @property {'cpu'|'memory'|'disk'|'io'} type
 * @property {number} count
 * @property {number} available
 * @property {Process[]} heldBy
 * @property {Process[]} neededBy
 */

/**
 * @typedef {Object} Inode
 * @property {number} id
 * @property {number} size
 * @property {string} permissions
 * @property {number[]} directBlocks
 * @property {number[]} indirectBlocks
 */

/**
 * @typedef {Object} FileAllocation
 * @property {'contiguous'|'linked'|'indexed'} type
 * @property {number[]} blocks
 * @property {number} fragmentation
 */
```

### 9.2 Simulation Functions

```js
/**
 * @param {Process[]} processes
 * @param {'fcfs'|'sjf'|'rr'|'priority'} algorithm
 * @param {number} timeQuantum
 * @returns {SimulationResult}
 */
function simulateScheduling(processes, algorithm, timeQuantum) {}

/**
 * @param {MemoryPage[]} pages
 * @param {MemorySegment[]} segments
 * @param {'pageFault'|'segmentationFault'|'swapOut'|'swapIn'} event
 * @returns {MemoryState}
 */
function simulateMemory(pages, segments, event) {}

/**
 * @param {Process[]} processes
 * @param {Resource[]} resources
 * @returns {DeadlockGraph}
 */
function detectDeadlock(processes, resources) {}

/**
 * @param {Request[]} requests
 * @param {'fcfs'|'sstf'|'scan'|'cscan'|'look'} algorithm
 * @returns {DiskResult}
 */
function simulateDisk(requests, algorithm) {}
```

---

## 10.0 — Narrative Specifications

### 10.1 Kernel-ka's Dialogue Arc (Story Mode)

| Realm | Zone | Her Tone | Example Line |
|---|---|---|---|
| I — Awakening | — | Cryptic, instructive | "This world runs on physics you don't know yet. Learn fast." |
| II — Process Forge | — | Encouraging, building rapport | "You're becoming something. Let's give it shape." |
| III | Gauntlet | Encouraging, urgent | "Faster. The scheduler is greedy." |
| III | Vault | Serious, trusting | "I've been in this vault before. Trust me." |
| IV | Tower | Desperate, protective | "Don't page out. I'll keep your body safe." |
| IV | Archive | Intimate, vulnerable | "These memories are all I have left." |
| V — Bunker Core | — | Revealing, decisive | "I've been waiting 15 years for you." |

### 10.2 Kernel-ka's Dialogue in Normal Mode

Flat and functional only — no tone progression, no rapport. See Section 3.2.

### 10.3 The Ending

After performing the final system call (Realm V), the screen fades to white.
The player regains consciousness in their cryo-chamber. The chamber door
opens. They step out, disoriented.

A figure in the pod next to them stirs. It's Kernel-ka. She sits up. She is
real.

She smiles. "You made it."

They walk together through the bunker. The player pushes open the bunker
door. Sunlight floods in. Standing there is the player's boss, waiting for
the inspection report. He sees his daughter. He is utterly stunned. The game
ends on that freeze-frame.

---

## 11.0 — Key Features (Summary)

**Core**
- 5 realms, 56 lessons mapped 1:1 to CS22403's actual 5-unit structure
- 4-phase lesson structure (Observe → Fault → Repair → Escape)
- 2 modes: Story (full narrative, sequential) and Normal (free navigation,
  drilling focus)
- Two realms (III, IV) split into two internal zones each, matching how the
  syllabus bundles Scheduling+Deadlock and Memory+Storage into single units
- One shared engine across all realms/zones; identity expressed via palette,
  hazard logic, and background art
- Per-lesson Visual/Terminal presentation, data-driven via lesson schema
- 2D Konva.js rendering; no 3D dependency
- Kernel-ka companion with hidden rapport system (Story Mode)
- Native entities (Miku, Reddit Guy)
- Passport / System Log progress tracking
- Realm/Zone Entry transition sequence (CSS/Framer Motion, zero art cost)

**Narrative**
- Full narrative arc from apprentice to equal, now carried across 5 realms
  (with Realms III/IV each delivering two emotional beats via their zones)
- The 15-year twist — Kernel-ka is the boss's daughter
- Hand-holding ending with emotional payoff

**Art**
- Cyberpunk ink-wash style, per-realm/zone neon accent palette
- Portrait-based characters (Kernel-ka + player), no expression variants
- Small, reusable asset footprint via AI-generated backgrounds + portrait
  compositing (single-pass generation, no heavy node-based pipeline)
- Splash art reserved for lesson-complete and boss/climax moments only

**Technical**
- React 19+ / Vite / JavaScript (JSX)
- Zustand for state management
- Konva.js for 2D rendering
- Pure JS simulation engine for OS logic, decoupled from rendering
- Vercel deployment, localStorage persistence

---

## 12.0 — Not Yet Started (Known Gaps)

| Item | Status | Notes |
|---|---|---|
| Lesson content (specific fault cases, code snippets) | TBD | Guided by Section 6.0's mode mapping |
| Kernel-ka's full dialogue (Story + Normal Mode variants) | TBD | Outline exists per realm/zone; script needs writing |
| Visual assets (realm/zone backgrounds, avatar, portraits) | TBD | Style defined (Section 5.0); generation not yet started |
| Simulation engine implementation | TBD | Pure JS functions need writing and unit-testing |
| Audio (ambient, sound effects, voice) | TBD | Optional but recommended |
| Full QA / playtesting | TBD | Requires build completion |
| Unit III naming inconsistency | Open | Confirm against official syllabus copy whether "Process Synchronisation" is the correct title for scheduling+deadlock content, or a document error. |

---

## 13.0 — Contribution Guidelines

- **New lesson:** add a file to `src/data/lessons/unit{N}/{N}.{M}.json`
  following the schema in Section 4.2, including `presentationMode` and, for
  Units III/IV, `zone`.
- **New realm/zone:** define its lesson set and ensure every lesson is
  assigned to exactly one realm (and zone, where applicable), with an entry
  in the accent palette table.
- **New dialogue:** add to `src/data/dialogue/kernelka/` for the specific
  lesson ID, with Story and Normal Mode variants.
- **New visualizer/terminal renderer:** extend the VisualizerDispatch system
  to handle new OS concepts.
- Never hardcode a specific asset or dialogue path outside the appropriate
  service files.

---

## 14.0 — References

- **CS22403 Syllabus:** the target curriculum for this project (5 units, as
  mapped in Section 2.0).
- **SeeDS:** Data Structures visualizer — model for the phased lesson engine
  and hub/hotspot navigation.
- **GateLab:** Digital Logic simulator — model for narrative framing, the
  fault-first phase approach, and the portrait + curated-background asset
  economy.
- **GAMMA_COUSINS.md:** the studio's character design philosophy (adaptable
  for Kernel-ka and the player portrait).

---

## 15.0 — License

Likely PolyForm Noncommercial License 1.0.0 (matching SeeDS) or MIT License
(matching GateLab). TBD.

---

*"Every professor here teaches the exact same material. Pick whoever makes you
want to show up to class."*
— Kernel-ka's Bunker, onboarding screen

---

## Changelog

| Version | Date | Changes |
|---|---|---|
| 1.0 | 2026-07-13 | Initial draft. Six units, each with a distinct gameplay genre. Proposed Babylon.js 3D hub map. |
| 1.1 | 2026-07-13 | Pivoted to one unified engine reskinned per realm. Adopted GateLab-style curated art + CSS animation over 3D. Introduced central hub with Story/Normal navigation and per-lesson Visual/Terminal toggle. Cyberpunk ink-wash art direction, portrait-based characters. Removed Babylon.js. |
| 1.2 | 2026-07-13 | Finalized Normal Mode narrative behavior. Adopted Realm Entry transition and per-realm accent palette. Added full per-lesson mode mapping for 52 lessons across 6 (invented) units. |
| 2.0 | 2026-07-13 | Consolidated v1.0–v1.2 into a single PRD. Removed superseded six-genre and Babylon.js content outright. |
| 3.0 | 2026-07-13 | **Re-aligned to the actual CS22403 syllabus (5 units, not 6).** Rebuilt Realm I entirely around computer architecture/OS overview content. Moved process/thread/sync content to Realm II per the real syllabus. Merged CPU Scheduling + Deadlock into Realm III (two zones) and Memory + Storage into Realm IV (two zones), matching how the syllabus actually bundles them. Removed the invented "Bunker Core as 6th unit" structure — VMs/Linux/Mobile OS is the syllabus's actual Unit V. Recounted to 56 lessons; rebuilt full mode mapping and palette accordingly. Flagged an apparent title/content mismatch in the syllabus's Unit III. |
| 3.1 | 2026-07-18 | Project repo scaffolded as **Evade OS** (Section 7.0/8.0 now reflect the built repo, not just the plan). Dropped TypeScript in favor of plain JavaScript/JSX to match studio convention on SeeDS/GateLab — Section 9.0's data models converted from TypeScript interfaces to JSDoc typedefs accordingly. Bumped baseline stack to React 19, Vite 8, React Router 7, Zustand 5, Konva 10/react-konva 19, Framer Motion 12. |
