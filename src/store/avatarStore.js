// src/store/avatarStore.js
// Player avatar: persisted customization (color + shape) + transient in-lesson visual state.
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const AVATAR_COLORS = ['#00FFAA', '#33CCFF', '#FF5500', '#7700FF', '#CC8844', '#FFFFFF'];
export const AVATAR_SHAPES = ['triangle', 'square', 'hex', 'circle'];

export const useAvatarStore = create(
  persist(
    (set) => ({
      color: AVATAR_COLORS[0],
      shape: AVATAR_SHAPES[0],
      // 'idle' | 'flicker' (page fault) | 'freeze' (deadlock) | 'glow' (success)
      visualState: 'idle',

      setColor: (color) => set({ color }),
      setShape: (shape) => set({ shape }),
      setVisualState: (visualState) => set({ visualState }),
    }),
    {
      name: 'evade-os-avatar',
      partialize: (state) => ({ color: state.color, shape: state.shape }), // don't persist transient visualState
    }
  )
);
