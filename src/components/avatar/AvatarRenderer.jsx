// src/components/avatar/AvatarRenderer.jsx
// Section 4.3 / 7 of PRD: wireframe avatar. Visual state reflects the current
// OS concept automatically (flicker on page fault, freeze on deadlock, etc.)
// — no player-facing control for this beyond it happening on-screen.
import { motion } from 'framer-motion';
import { useAvatarStore } from '../../store/avatarStore.js';

const SHAPE_PATHS = {
  triangle: 'M20 2 L38 34 L2 34 Z',
  square: 'M4 4 H36 V36 H4 Z',
  hex: 'M20 2 L36 11 V29 L20 38 L4 29 V11 Z',
  circle: 'M20 2 A18 18 0 1 1 19.99 2 Z',
};

const STATE_ANIMATIONS = {
  idle: { opacity: 1 },
  flicker: { opacity: [1, 0.2, 1, 0.3, 1] },
  freeze: { opacity: 1, filter: 'saturate(0)' },
  glow: { opacity: 1, scale: [1, 1.12, 1] },
};

export default function AvatarRenderer({ size = 40, color, shape, visualState }) {
  const storeColor = useAvatarStore((s) => s.color);
  const storeShape = useAvatarStore((s) => s.shape);
  const storeState = useAvatarStore((s) => s.visualState);

  const c = color ?? storeColor;
  const s = shape ?? storeShape;
  const vs = visualState ?? storeState;

  return (
    <motion.svg
      width={size} height={size} viewBox="0 0 40 40"
      animate={STATE_ANIMATIONS[vs] ?? STATE_ANIMATIONS.idle}
      transition={{ duration: vs === 'flicker' ? 0.6 : 1.2, repeat: vs === 'flicker' || vs === 'glow' ? Infinity : 0, repeatDelay: vs === 'glow' ? 1 : 0 }}
    >
      <path d={SHAPE_PATHS[s] ?? SHAPE_PATHS.triangle} fill="none" stroke={c} strokeWidth={2} />
    </motion.svg>
  );
}
