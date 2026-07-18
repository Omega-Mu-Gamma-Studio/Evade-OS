// src/store/rapportStore.js
// Hidden relationship score (Story Mode only). NEVER surfaced as a number/bar/UI element
// (PRD 4.5, UI-IMPLEMENTATION.md Section 4) — only consumed to derive portrait rim-light
// color/intensity and dialogue tone tier.
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const TIERS = ['cold', 'neutral', 'warm']; // low -> high

export const useRapportStore = create(
  persist(
    (set, get) => ({
      score: 0, // unbounded internal counter, never rendered directly

      nudge: (delta) => set((state) => ({ score: state.score + delta })),

      // Normal Mode: rapport is inert — always neutral, no pulse (Section 3.2 / Section 4).
      tier: (mode) => {
        if (mode === 'normal') return 'neutral';
        const { score } = get();
        if (score < -5) return 'cold';
        if (score > 10) return 'warm';
        return 'neutral';
      },

      // Rim-light intensity 0..1, layered on top of the current realm/zone accent color.
      // Fully inert (0, static) in Normal Mode.
      rimLightIntensity: (mode) => {
        if (mode === 'normal') return 0;
        const { score } = get();
        return Math.max(0, Math.min(1, Math.abs(score) / 20));
      },
    }),
    { name: 'evade-os-rapport' }
  )
);

export { TIERS };
