// src/data/hub/sceneArt.js
// One real background image per top-down map "scene" — ported from SeeDS's
// Campus/CS-Block/Dorm model (src/components/campus/art.js there). Three
// scene tiers: the Control Room (Home splash, no hotspots — pure mood),
// the Realm Map (Hub, all 5 realm doors on one background), and one Realm
// scene per realm (`RealmScene.jsx`) — 2-3 landmarks each: a portal (or
// two, for the zoned Realms III/IV) plus a couple lore/fun-fact spots.
// Fill in a path here once art exists — getSceneArt() in utils/sceneArt.js
// falls back to a CSS-gradient placeholder whenever a value here is null,
// so dropping in real art is a one-field change, not a rewrite. See
// ART-REQUIREMENTS.md for the brief (framing, what each scene needs to show).
export const SCENE_ART = {
  controlRoom: null, // e.g. "/hub-art/control-room-splash.png" — Home screen backdrop, no hotspots
  hub: null, // e.g. "/hub-art/core-terminal-room.png" — the Realm Map, 5 realm doors
  realm1: null, // e.g. "/hub-art/realm-1-the-awakening.png"
  realm2: null, // e.g. "/hub-art/realm-2-process-forge.png"
  realm3: null, // e.g. "/hub-art/realm-3-gauntlet-vault.png" — two portals in one scene
  realm4: null, // e.g. "/hub-art/realm-4-tower-archive.png" — two portals in one scene
  realm5: null, // e.g. "/hub-art/realm-5-bunker-core.png"
};
