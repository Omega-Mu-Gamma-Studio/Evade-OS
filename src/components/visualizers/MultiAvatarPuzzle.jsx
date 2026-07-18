// src/components/visualizers/MultiAvatarPuzzle.jsx
// Producer-consumer, readers-writers, dining philosophers (Section 3.1).
// Generic buffer-based puzzle: keep the buffer inside bounds for N cycles
// without overflow/underflow. Specific problem framing is lesson content.
import { useState } from 'react';

export default function MultiAvatarPuzzle({ capacity = 5, requiredCycles = 4, onObjectiveComplete }) {
  const [buffer, setBuffer] = useState(0);
  const [cycles, setCycles] = useState(0);
  const [message, setMessage] = useState('');

  const produce = () => {
    if (buffer >= capacity) { setMessage('Buffer full — producer must wait.'); return; }
    setBuffer((b) => b + 1);
    setMessage('');
  };

  const consume = () => {
    if (buffer <= 0) { setMessage('Buffer empty — consumer must wait.'); return; }
    setBuffer((b) => {
      const next = b - 1;
      if (b === 1) {
        setCycles((c) => {
          const nc = c + 1;
          if (nc >= requiredCycles) onObjectiveComplete();
          return nc;
        });
      }
      return next;
    });
    setMessage('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '0.4em' }}>
        {Array.from({ length: capacity }).map((_, i) => (
          <div
            key={i}
            style={{
              width: 24, height: 24, borderRadius: 4,
              border: '1px solid var(--accent-primary)',
              background: i < buffer ? 'var(--accent-primary)' : 'transparent',
            }}
          />
        ))}
      </div>
      <div style={{ display: 'flex', gap: '0.75em' }}>
        <button onClick={produce} style={{ padding: '0.4em 1em', borderRadius: 4, background: 'transparent', border: '1px solid var(--accent-primary)', color: 'var(--accent-primary)', cursor: 'pointer' }}>Producer avatar: add</button>
        <button onClick={consume} style={{ padding: '0.4em 1em', borderRadius: 4, background: 'transparent', border: '1px solid var(--accent-secondary)', color: 'var(--accent-secondary)', cursor: 'pointer' }}>Consumer avatar: take</button>
      </div>
      <div style={{ fontSize: '0.75rem', opacity: 0.6 }}>
        Full cycles: {cycles}/{requiredCycles} {message && <span style={{ color: '#FFCC00', marginLeft: '0.6em' }}>{message}</span>}
      </div>
    </div>
  );
}
