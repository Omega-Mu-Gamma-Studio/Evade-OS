// src/components/hub/RealmEntryTransition.jsx
// Section 1 / Section 3.3 of PRD: 2-3s CSS/Framer Motion sequence, zero art cost.
// 1. name card  2. color flood  3. signature FX (glitch/scanline/pulse, per realm/zone)
// 4. fade into first lesson (handled by caller via onComplete).
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FX_BY_REALM = {
  1: 'glitch', 2: 'pulse', 3: 'scanline', 4: 'glitch', 5: 'pulse',
};

export default function RealmEntryTransition({ name, accent, realmNum, onComplete }) {
  const [stage, setStage] = useState('card'); // card -> flood -> fx -> done
  const fx = FX_BY_REALM[realmNum] ?? 'pulse';

  useEffect(() => {
    const t1 = setTimeout(() => setStage('flood'), 800);
    const t2 = setTimeout(() => setStage('fx'), 1400);
    const t3 = setTimeout(() => onComplete?.(), 2600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        style={{
          position: 'fixed', inset: 0, zIndex: 200, display: 'flex',
          alignItems: 'center', justifyContent: 'center', pointerEvents: 'none',
          background: stage === 'card' ? '#000' : accent.primary,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        {stage === 'card' && (
          <motion.h1
            initial={{ opacity: 0, letterSpacing: '0.4em' }}
            animate={{ opacity: 1, letterSpacing: '0.15em' }}
            transition={{ duration: 0.6 }}
            style={{ color: accent.primary, fontFamily: 'var(--font-ui)', fontSize: '2rem', textTransform: 'uppercase' }}
          >
            {name}
          </motion.h1>
        )}
        {stage === 'fx' && (
          <motion.div
            initial={{ opacity: 0.9 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1.1 }}
            style={{
              position: 'absolute', inset: 0,
              background:
                fx === 'scanline'
                  ? 'repeating-linear-gradient(0deg, rgba(0,0,0,0.3) 0px, rgba(0,0,0,0.3) 2px, transparent 2px, transparent 4px)'
                  : fx === 'glitch'
                  ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)'
                  : `radial-gradient(circle, ${accent.secondary} 0%, transparent 70%)`,
            }}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
}
