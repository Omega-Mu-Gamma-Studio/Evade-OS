// src/hooks/useRealmPalette.js
// UI-IMPLEMENTATION.md Section 5: palette values are applied as CSS custom
// properties at the route/screen level, on a top-level wrapper element.
// Children never hardcode hex values — they read var(--accent-primary) etc.
import { useMemo } from 'react';
import { getPalette } from '../utils/dataService.js';

/**
 * @param {number|null} realmNum
 * @param {string|null} [zoneKey]
 * @returns {React.CSSProperties} spread onto the wrapper element's `style` prop
 */
export function useRealmPalette(realmNum, zoneKey = null) {
  return useMemo(() => {
    if (!realmNum) {
      // Hub / no active realm: neutral default, per Section 5.
      return {
        '--accent-primary': 'var(--ink-white)',
        '--accent-secondary': 'var(--ink-white)',
        '--bg-base': 'var(--ink-black)',
      };
    }
    const { primary, secondary, bg } = getPalette(realmNum, zoneKey);
    return {
      '--accent-primary': primary,
      '--accent-secondary': secondary,
      '--bg-base': bg,
    };
  }, [realmNum, zoneKey]);
}
