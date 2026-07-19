// src/data/hub/sceneArt.js
// One real background image per top-down map "scene" — ported from SeeDS's
// Campus/CS-Block/Dorm model (src/components/campus/art.js there). Evade OS
// only has two scene levels worth this treatment: the Hub overview (all 5
// realms on one background) and the two zoned realms' zone-select screens
// (Realm III: Gauntlet + Vault, Realm IV: Tower + Archive). Fill in a path
// here once art exists — getSceneArt() in utils/sceneArt.js falls back to a
// CSS-gradient placeholder whenever a value here is null, so dropping in
// real art is a one-field change, not a rewrite. See ART-REQUIREMENTS.md for
// the brief (framing, what each scene needs to show).
export const SCENE_ART = {
  hub: null, // e.g. "/hub-art/core-terminal-room.png"
  zone3: null, // e.g. "/hub-art/realm-3-gauntlet-vault.png"
  zone4: null, // e.g. "/hub-art/realm-4-tower-archive.png"
};
