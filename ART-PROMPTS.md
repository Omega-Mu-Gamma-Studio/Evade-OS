# Evade OS — Art Generation Prompts

> Companion to `ART-REQUIREMENTS.md` (the "what and why") — this doc is the
> "paste this in and go" layer for the **7 scene images**: `Control Room`,
> `Realm Map` (Hub), and `Realm I`–`V`. Written generator-agnostic — each
> prompt is a plain descriptive paragraph that works in Midjourney, Nano
> Banana/Gemini, Stable Diffusion, or anything else, plus a compact
> tag-style line underneath for tools that prefer comma-separated keywords.
> Drop the finished file paths into `src/data/hub/sceneArt.js`.

## Shared boilerplate — appears in every prompt below

Paste this into every generation, verbatim, per the style bible in
`ART-REQUIREMENTS.md`:

> sumi-e ink wash, visible brush strokes, bleeding ink edges, monochrome —
> black ink, gray wash, white paper, no painted color, cyberpunk bunker
> setting, exposed conduit and circuitry, wide establishing shot, low detail
> in the corners, no figures present

**Negative prompt** (for tools that support one — otherwise phrase as "avoid"):
`color, saturated color, neon paint, photorealistic, 3D render, text, watermark, logo, blurry, characters, people, extra limbs, western comic style`

**Format:** landscape, 16:9 minimum (21:9 is fine and arguably better — these
render as `background-size: cover` full-bleed panels, so extra width just
means less cropping on ultrawide screens). Aim for at least 1920×1080.

**Why positions matter:** each image below lists where its clickable
landmarks need to sit, as rough percentages of the frame (`x%/y%` from the
top-left). These match the placeholder hotspot boxes already in the code
(`HubMap.jsx`'s `REALM_HOTSPOTS`, `RealmScene.jsx`'s `PORTAL_*`/`LORE_SPOTS*`)
— hit them reasonably closely and dropping the finished image in should need
zero coordinate tuning. Composition doesn't need to be pixel-exact, just
"landmark roughly in that third of the frame."

---

## 1. Control Room — Home screen splash

**File slot:** `SCENE_ART.controlRoom` · **No hotspots** — pure atmosphere
behind the title/mode-select menu.

**Compositional constraint:** the menu title and buttons render centered
over this image. Keep the dead-center of the frame relatively open/simple —
push the strongest linework and detail toward the lower third or off-center,
not directly behind where "EVADE OS" will sit.

**Prompt:**
> Wide atmospheric establishing shot of a single flickering console glowing
> in an otherwise dark, empty bunker corridor, thick cabling snaking across
> the floor toward a distant closed blast door, quiet and still, the upper-
> and mid-frame left mostly open and unlit, [shared boilerplate].

**Tags:** `dark bunker corridor, single glowing console, cabling on floor, distant blast door, quiet, empty, negative space upper-center`

---

## 2. Realm Map — Hub ("Core Terminal Room")

**File slot:** `SCENE_ART.hub` · **5 hotspots** (one per realm door), arranged
in a left-to-right zigzag: low → high → low → high → low.

| Realm | Position |
|---|---|
| I — Awakening | far left, lower-mid |
| II — Process Forge | left-of-center, upper |
| III — Gauntlet/Vault | center, lower |
| IV — Storage Vault | right-of-center, upper |
| V — Bunker Core | far right, lower-mid |

**Prompt:**
> Wide interior view of a large circular bunker control room, five visibly
> distinct doors or terminal structures spaced around the room in a gentle
> left-to-right zigzag — alternating lower and higher placement like
> stepping stones — each door a different shape and silhouette so they read
> as five separate destinations, thick conduit bundles running along floor
> and ceiling converging toward the room's center, [shared boilerplate].

**Tags:** `circular bunker control room, five distinct doors, zigzag layout, converging conduits, central hub`

---

## 3. Realm I — The Awakening

**File slot:** `SCENE_ART.realm1` · **1 portal** (center, x38–62% / y30–80%) +
**2 lore spots** (upper-left x6–18%/y8–22%, upper-right x82–94%/y8–22%).

*Mood: glitched, unstable, wireframe. Narrative: waking up with no memory of
this world's physics — the hardware substrate, the boot sequence.*

**Prompt:**
> Interior bunker chamber centered on a single cracked waking-pod or
> ignition console, trailing wires like it just released something, glitchy
> unstable linework as if the ink itself is still rendering in. In the upper
> left, a smaller dusty secondary console with a scrawled handwritten note
> pinned beside it. In the upper right, a wall etched with rows of
> boot-sequence glyphs and symbols. [shared boilerplate].

**Tags:** `cracked waking pod, central console, trailing wires, glitchy unstable linework, dusty side console with note, wall etched with boot glyphs`

---

## 4. Realm II — The Process Forge

**File slot:** `SCENE_ART.realm2` · **1 portal** (center, x38–62% / y30–80%) +
**2 lore spots** (upper-left, upper-right, same as above).

*Mood: warm, structural, forming. Narrative: learning to give your own form
structure — process, threads, cooperation.*

**Prompt:**
> Interior bunker chamber centered on a forge-terminal — a structural
> gantry rig with molten light pooling at its base, something visibly being
> cast or assembled rather than just switched on, scaffolding framing the
> shot. In the upper left, a rack holding several half-formed thread-avatar
> silhouettes. In the upper right, a stack of cooled, finished "process
> ingot" blocks. [shared boilerplate].

**Tags:** `forge terminal, molten light, scaffolding gantry, rack of half-formed avatars, stacked process ingots`

---

## 5. Realm III — The Scheduling Gauntlet & Deadlock Vault

**File slot:** `SCENE_ART.realm3` · **2 portals** — Gauntlet (left, x8–38% /
y24–79%), Vault (right, x62–92% / y24–79%) — + **4 lore spots**, one pair
per zone tucked into that zone's corners:
- Gauntlet: upper-left (x2–12%/y4–16%), lower-left (x2–12%/y84–96%)
- Vault: upper-right (x88–98%/y4–16%), lower-right (x88–98%/y84–96%)

*Mood split down the middle — Gauntlet: fast, bright, competitive. Vault:
claustrophobic, tense, sealed.*

**Prompt:**
> Split interior composition. Left half: a race-gate/arena entrance with
> painted track markings on the floor, open, fast, energetic linework. Right
> half: a heavy sealed vault door studded with locking bolts, tight and
> claustrophobic, denser crosshatching. In the gate's upper-left corner, a
> worn scoreboard. In the gate's lower-left corner, a wall scratched with
> tally marks. In the vault's upper-right corner, an old logbook on a
> ledge. In the vault's lower-right corner, a broken chain fragment.
> [shared boilerplate].

**Tags:** `split composition, race gate arena left, sealed vault door right, scoreboard, tally marks, logbook, broken chain`

---

## 6. Realm IV — The Storage Vault

**File slot:** `SCENE_ART.realm4` · **2 portals** — Tower (left, x8–38% /
y24–79%), Archive (right, x62–92% / y24–79%) — + **4 lore spots**, same
corner layout as Realm III (Tower gets the left pair, Archive the right).

*Mood split — Tower: vertigo-inducing, layered, unstable. Archive: dusty,
fragmented, sepia-toned (even though this stays grayscale for now).*

**Prompt:**
> Split interior composition. Left half: a spiraling stairwell or open
> elevator shaft climbing upward, floors visibly flickering/unstable,
> vertigo-inducing perspective looking up. Right half: a low archive
> doorway with file drawers pulled open and papers spilling out, dusty and
> fragmented. In the tower's upper-left corner, a cracked pressure gauge. In
> the tower's lower-left corner, a maintenance log board. In the archive's
> upper-right corner, a datapad showing fragmented file previews. In the
> archive's lower-right corner, an old photograph pinned to a board.
> [shared boilerplate].

**Tags:** `split composition, spiraling unstable stairwell left, archive doorway with spilling files right, cracked gauge, log board, datapad, pinned photograph`

---

## 7. Realm V — The Bunker Core

**File slot:** `SCENE_ART.realm5` · **1 portal** (center, x38–62% / y30–80%)
+ **2 lore spots** (upper-left, upper-right).

*Mood: clean, sterile, revealing. Narrative: the reveal realm — seeing your
own world as a VM on a host system, Kernel-ka's secret.*

**Prompt:**
> Interior bunker chamber centered on an open, clean reactor or pillar
> chamber, glass and mirror-sheen surfaces instead of grime, sparse
> confident linework instead of dense crosshatching, everything visible, no
> shadows hiding anything. In the upper left, a screen displaying nested
> layered system diagrams. In the upper right, a private terminal station,
> subtly more personal/lived-in than the rest of the room. [shared
> boilerplate].

**Tags:** `open reactor chamber, glass and mirror surfaces, sparse clean linework, nested system diagram screen, private terminal station`

---

## Checklist

- [ ] Control Room → `SCENE_ART.controlRoom`
- [ ] Realm Map / Hub → `SCENE_ART.hub`
- [ ] Realm I → `SCENE_ART.realm1`
- [ ] Realm II → `SCENE_ART.realm2`
- [ ] Realm III → `SCENE_ART.realm3`
- [ ] Realm IV → `SCENE_ART.realm4`
- [ ] Realm V → `SCENE_ART.realm5`

Once a file lands, drop its path into the matching key in
`src/data/hub/sceneArt.js` — `getSceneArt()` picks it up automatically, no
other code changes needed. Re-check the hotspot boxes in `HubMap.jsx` /
`RealmScene.jsx` against the finished art and nudge the `x/y/width/height`
percentages if a landmark ended up somewhere different than planned.
