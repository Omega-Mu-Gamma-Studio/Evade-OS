// src/utils/dataService.js
// Central loader for lesson/unit/dialogue JSON, via Vite's import.meta.glob (eager).
// Everything else (stores, pages, components) should go through this rather than
// importing data JSON directly, so the loading strategy can change in one place.

import funFactsData from '../data/systemLog/funFacts.json';
import loreData from '../data/systemLog/lore.json';

const lessonModules = import.meta.glob('../data/lessons/unit*/*.json', { eager: true });
const unitModules = import.meta.glob('../data/units/unit*.json', { eager: true });
const dialogueModules = import.meta.glob('../data/dialogue/kernelka/*.json', { eager: true });
const entityModules = import.meta.glob('../data/entities/*.json', { eager: true });

function unwrap(mod) {
  return mod.default ?? mod;
}

// --- Lessons ---------------------------------------------------------------

/** @returns {object[]} every lesson, sorted by realm then lesson number */
export function getAllLessons() {
  return Object.values(lessonModules)
    .map(unwrap)
    .sort((a, b) => {
      const [au, an] = a.id.split('.').map(Number);
      const [bu, bn] = b.id.split('.').map(Number);
      return au - bu || an - bn;
    });
}

export function getLesson(lessonId) {
  return getAllLessons().find((l) => l.id === lessonId) ?? null;
}

export function getLessonsForRealm(realmNum) {
  return getAllLessons().filter((l) => l.unit === realmNum);
}

export function getLessonsForZone(realmNum, zoneKey) {
  return getAllLessons().filter((l) => l.unit === realmNum && l.zone === zoneKey);
}

/** @returns {object|null} the next lesson after this one within its zone (if
 *  zoned) or realm (if not) — null if this was the last lesson in that scope. */
export function getNextLessonInSequence(lesson) {
  const list = lesson.zone ? getLessonsForZone(lesson.unit, lesson.zone) : getLessonsForRealm(lesson.unit);
  const idx = list.findIndex((l) => l.id === lesson.id);
  if (idx === -1 || idx === list.length - 1) return null;
  return list[idx + 1];
}

/** @returns {object|null} the first not-yet-completed lesson in `list` (falls
 *  back to the first lesson if all are complete, e.g. Normal Mode replay). */
export function getFirstIncompleteLesson(list, completedLessons) {
  if (list.length === 0) return null;
  return list.find((l) => !completedLessons[l.id]) ?? list[0];
}

// --- Units / realms ----------------------------------------------------------

const REALM_TITLES = {
  1: 'The Awakening',
  2: 'The Process Forge',
  3: 'The Scheduling Gauntlet & Deadlock Vault',
  4: 'The Storage Vault',
  5: 'The Bunker Core',
};

export function getUnit(realmNum) {
  const key = Object.keys(unitModules).find((k) => k.endsWith(`unit${realmNum}.json`));
  return key ? unwrap(unitModules[key]) : null;
}

export function getAllUnits() {
  return [1, 2, 3, 4, 5].map((n) => ({ realmNum: n, title: REALM_TITLES[n], ...getUnit(n) }));
}

/** Returns { primary, secondary, bg } for a realm, or a realm+zone. */
export function getPalette(realmNum, zoneKey = null) {
  const unit = getUnit(realmNum);
  if (!unit) return { primary: '#FFFFFF', secondary: '#888888', bg: '#0A0A0F' };
  if (zoneKey && unit.zones && unit.zones[zoneKey]) {
    return unit.zones[zoneKey].accent;
  }
  return unit.accent ?? { primary: '#FFFFFF', secondary: '#888888', bg: '#0A0A0F' };
}

export function realmHasZones(realmNum) {
  const unit = getUnit(realmNum);
  return !!(unit && unit.zones);
}

export function getZoneKeys(realmNum) {
  const unit = getUnit(realmNum);
  return unit?.zones ? Object.keys(unit.zones) : [];
}

// --- Dialogue ----------------------------------------------------------------

export function getDialogue(lessonId) {
  const key = Object.keys(dialogueModules).find((k) => k.endsWith(`/${lessonId}.json`));
  return key ? unwrap(dialogueModules[key]) : null;
}

// --- Entities ------------------------------------------------------------------

export function getAllEntities() {
  return Object.values(entityModules).map(unwrap);
}

// --- System Log (fun facts + lore) --------------------------------------------
// Section 2 UI pass. Fun facts are lesson-tied when the lesson has one authored,
// otherwise a stable pick from the general pool (stable per lessonId, so it
// doesn't reshuffle on every re-render of the same lesson). Lore unlocks
// sequentially with completed-lesson count, looping once the entries run out.

function stablePick(list, seedString) {
  if (!list || list.length === 0) return null;
  let hash = 0;
  for (let i = 0; i < seedString.length; i += 1) hash = (hash * 31 + seedString.charCodeAt(i)) >>> 0;
  return list[hash % list.length];
}

/** @returns {string} a fun fact for this lesson — lesson-tied if authored, else general pool */
export function getFunFact(lessonId) {
  const tied = funFactsData.byLesson?.[lessonId];
  if (tied && tied.length > 0) return stablePick(tied, lessonId);
  return stablePick(funFactsData.general, lessonId) ?? '';
}

/** @returns {{id: string, text: string}} the next lore entry, keyed off completed-lesson count */
export function getLoreEntry(completedCount = 0) {
  const entries = loreData.entries ?? [];
  if (entries.length === 0) return null;
  return entries[completedCount % entries.length];
}
