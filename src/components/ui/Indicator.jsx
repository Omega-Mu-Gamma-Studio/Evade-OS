// src/components/ui/Indicator.jsx
// Phase progress indicator: 4 dots/segments, current phase highlighted.
// Section 2.3: Escape phase reuses this chrome but adds a visible countdown.
import { useEffect, useState } from 'react';

export default function Indicator({ phases, currentIndex, timerSeconds = null }) {
  const [remaining, setRemaining] = useState(timerSeconds);

  useEffect(() => {
    setRemaining(timerSeconds);
    if (timerSeconds == null) return;
    const interval = setInterval(() => {
      setRemaining((r) => (r == null || r <= 0 ? 0 : r - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [timerSeconds, currentIndex]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6em' }}>
      <div style={{ display: 'flex', gap: '0.4em' }}>
        {phases.map((phase, i) => (
          <span
            key={phase}
            title={phase}
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: i === currentIndex ? 'var(--accent-primary)' : 'rgba(255,255,255,0.2)',
              boxShadow: i === currentIndex ? '0 0 6px var(--accent-primary)' : 'none',
              transition: 'background 200ms ease',
            }}
          />
        ))}
      </div>
      {timerSeconds != null && (
        <span
          style={{
            fontFamily: 'var(--font-terminal)',
            color: remaining <= 5 ? '#FF0033' : 'var(--accent-primary)',
            fontSize: '0.85rem',
            minWidth: '2.5em',
          }}
        >
          {String(Math.max(remaining ?? 0, 0)).padStart(2, '0')}s
        </span>
      )}
    </div>
  );
}
