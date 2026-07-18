// src/components/visualizers/DragToken.jsx
// Resource/semaphore allocation drag mechanics (Section 3.1). Uses native HTML5
// drag-and-drop for the interaction; falls back to click-to-assign for accessibility.
import { useState } from 'react';

const DEFAULT_TOKENS = ['T1', 'T2', 'T3'];
const DEFAULT_SLOTS = ['Task A', 'Task B', 'Task C'];

export default function DragToken({ tokens = DEFAULT_TOKENS, slots = DEFAULT_SLOTS, onObjectiveComplete }) {
  const [assignments, setAssignments] = useState({}); // slot -> token
  const [selectedToken, setSelectedToken] = useState(null);

  const assignedTokens = new Set(Object.values(assignments));
  const remaining = tokens.filter((t) => !assignedTokens.has(t));

  const assign = (slot, token) => {
    if (!token) return;
    setAssignments((a) => {
      const next = { ...a, [slot]: token };
      if (Object.keys(next).length >= Math.min(tokens.length, slots.length)) {
        setTimeout(onObjectiveComplete, 0);
      }
      return next;
    });
    setSelectedToken(null);
  };

  return (
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
      <div>
        <div style={{ fontSize: '0.75rem', opacity: 0.6, marginBottom: '0.4em' }}>Resource tokens</div>
        <div style={{ display: 'flex', gap: '0.5em' }}>
          {remaining.map((t) => (
            <button
              key={t}
              draggable
              onDragStart={(e) => e.dataTransfer.setData('text/plain', t)}
              onClick={() => setSelectedToken(t)}
              style={{
                padding: '0.5em 0.8em', borderRadius: 4, cursor: 'grab',
                background: selectedToken === t ? 'var(--accent-primary)' : 'transparent',
                color: selectedToken === t ? 'var(--ink-black)' : 'var(--accent-primary)',
                border: '1px solid var(--accent-primary)',
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.75em' }}>
        {slots.map((slot) => (
          <div
            key={slot}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => assign(slot, e.dataTransfer.getData('text/plain'))}
            onClick={() => assign(slot, selectedToken)}
            style={{
              width: 90, height: 70, border: '1px dashed rgba(255,255,255,0.3)', borderRadius: 6,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.3em',
              cursor: 'pointer', background: assignments[slot] ? 'rgba(0,255,170,0.08)' : 'transparent',
            }}
          >
            <span style={{ fontSize: '0.7rem', opacity: 0.6 }}>{slot}</span>
            {assignments[slot] && <strong>{assignments[slot]}</strong>}
          </div>
        ))}
      </div>
    </div>
  );
}
