// src/components/visualizers/DoorGate.jsx
// Mutex/critical-section single-crossing mechanic (Section 3.1): only one
// avatar may cross at a time. Extended to lock/unlock for the Mutex Locks lesson.
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function DoorGate({ requiredCrossings = 3, onObjectiveComplete }) {
  const [locked, setLocked] = useState(false);
  const [crossings, setCrossings] = useState(0);
  const [violation, setViolation] = useState(false);

  const attemptCross = () => {
    if (locked) {
      setViolation(true);
      setTimeout(() => setViolation(false), 500);
      return;
    }
    setLocked(true);
    setTimeout(() => {
      setLocked(false);
      setCrossings((c) => {
        const next = c + 1;
        if (next >= requiredCrossings) onObjectiveComplete();
        return next;
      });
    }, 700);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
      <motion.div
        animate={{ borderColor: violation ? '#FF0033' : locked ? 'var(--accent-secondary)' : 'var(--accent-primary)' }}
        style={{ width: 160, height: 100, border: '3px solid', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <span style={{ fontSize: '0.85rem', opacity: 0.8 }}>{locked ? 'CROSSING\u2026' : 'GATE OPEN'}</span>
      </motion.div>
      <button
        onClick={attemptCross}
        disabled={locked}
        style={{
          padding: '0.5em 1.2em', borderRadius: 4, cursor: locked ? 'not-allowed' : 'pointer',
          background: 'var(--accent-primary)', color: 'var(--ink-black)', border: 'none', fontWeight: 600,
        }}
      >
        Attempt Crossing
      </button>
      <div style={{ fontSize: '0.75rem', opacity: 0.6 }}>
        Crossings: {crossings}/{requiredCrossings}
        {violation && <span style={{ color: '#FF0033', marginLeft: '0.6em' }}>Collision! Wait for the gate.</span>}
      </div>
    </div>
  );
}
