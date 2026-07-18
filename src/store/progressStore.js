// src/store/progressStore.js
// Tracks mode (story/normal), completed lessons/zones/realms, and unlock logic.
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const REALM_ORDER = [1, 2, 3, 4, 5];
const ZONED_REALMS = { 3: ['gauntlet', 'vault'], 4: ['tower', 'archive'] };

export const useProgressStore = create(
  persist(
    (set, get) => ({
      mode: 'story', // 'story' | 'normal'
      completedLessons: {}, // { [lessonId]: true }

      setMode: (mode) => set({ mode }),

      completeLesson: (lessonId) =>
        set((state) => ({
          completedLessons: { ...state.completedLessons, [lessonId]: true },
        })),

      isLessonComplete: (lessonId) => !!get().completedLessons[lessonId],

      // A realm is "cleared" once every lesson id starting with `${realm}.` is complete.
      isRealmComplete: (realmNum, allLessonIds) => {
        const ids = allLessonIds.filter((id) => id.startsWith(`${realmNum}.`));
        if (ids.length === 0) return false;
        return ids.every((id) => get().completedLessons[id]);
      },

      isZoneComplete: (realmNum, zoneLessonIds) => {
        if (zoneLessonIds.length === 0) return false;
        return zoneLessonIds.every((id) => get().completedLessons[id]);
      },

      // Story Mode: realms unlock strictly in order I -> V.
      // Normal Mode: everything is unlocked.
      isRealmUnlocked: (realmNum, allLessonIds) => {
        const { mode, isRealmComplete } = get();
        if (mode === 'normal') return true;
        const idx = REALM_ORDER.indexOf(realmNum);
        if (idx === 0) return true;
        const prevRealm = REALM_ORDER[idx - 1];
        return isRealmComplete(prevRealm, allLessonIds);
      },

      // Story Mode: within realms III/IV, Zone A must clear before Zone B unlocks.
      isZoneUnlocked: (realmNum, zoneKey, zoneLessonIdsByZone) => {
        const { mode, isZoneComplete } = get();
        if (mode === 'normal') return true;
        const zones = ZONED_REALMS[realmNum];
        if (!zones) return true;
        const idx = zones.indexOf(zoneKey);
        if (idx <= 0) return true;
        const prevZone = zones[idx - 1];
        return isZoneComplete(realmNum, zoneLessonIdsByZone[prevZone] || []);
      },
    }),
    { name: 'evade-os-progress' }
  )
);

export { REALM_ORDER, ZONED_REALMS };
