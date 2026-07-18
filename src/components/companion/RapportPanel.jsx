// src/components/companion/RapportPanel.jsx
// Section 4 of PRD/UI doc: rapport is NEVER a number/bar. Expressed only via
// portrait rim-light color/intensity, layered over the current realm/zone accent.
// Fully inert (neutral, static, no pulse) in Normal Mode. Single ink-wash
// portrait, no expression variants — all "acting" is rim-light + dialogue.
import { motion } from 'framer-motion';
import { useRapportStore } from '../../store/rapportStore.js';
import { useProgressStore } from '../../store/progressStore.js';

export default function RapportPanel({ size = 84 }) {
  const mode = useProgressStore((s) => s.mode);
  const intensity = useRapportStore((s) => s.rimLightIntensity(mode));
  const tier = useRapportStore((s) => s.tier(mode));

  const tierColor = { cold: '#3366FF', neutral: 'var(--accent-primary)', warm: '#FF3366' }[tier];

  return (
    <motion.div
      style={{
        width: size, height: size, borderRadius: '50%',
        background: '#151515',
        border: '2px solid rgba(255,255,255,0.15)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', flexShrink: 0,
      }}
      animate={{
        boxShadow: mode === 'normal'
          ? '0 0 0px transparent'
          : `0 0 ${8 + intensity * 20}px ${tierColor}`,
      }}
      transition={{ duration: 0.8 }}
    >
      {/* Portrait slot — single ink-wash image, TBD asset */}
      <span style={{ fontSize: size * 0.4, opacity: 0.5 }}>芽</span>
    </motion.div>
  );
}
