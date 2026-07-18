// src/components/visualizers/DeadlockDetector.jsx
// Wait-for graphs, deadlock detection/avoidance (Section 3.1). "Scan" runs the
// engine's detectDeadlock() once and renders the resulting graph/cycle.
import { useState } from 'react';
import { detectDeadlock } from '../../engine/deadlock.js';

const DEFAULT_PROCESSES = [{ id: 'P1' }, { id: 'P2' }, { id: 'P3' }];
const DEFAULT_RESOURCES = [
  { id: 'R1', heldBy: [{ id: 'P1' }], neededBy: [{ id: 'P2' }] },
  { id: 'R2', heldBy: [{ id: 'P2' }], neededBy: [{ id: 'P3' }] },
  { id: 'R3', heldBy: [{ id: 'P3' }], neededBy: [{ id: 'P1' }] },
];

export default function DeadlockDetector({ processes = DEFAULT_PROCESSES, resources = DEFAULT_RESOURCES, onObjectiveComplete }) {
  const [result, setResult] = useState(null);

  const scan = () => {
    const r = detectDeadlock(processes, resources);
    setResult(r);
    onObjectiveComplete();
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '1.5em', flexWrap: 'wrap', marginBottom: '1em' }}>
        {processes.map((p) => {
          const inCycle = result?.cycle?.includes(p.id);
          return (
            <div
              key={p.id}
              style={{
                width: 60, height: 60, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: `2px solid ${inCycle ? '#FF0033' : 'var(--accent-primary)'}`,
                boxShadow: inCycle ? '0 0 12px #FF0033' : 'none',
              }}
            >
              {p.id}
            </div>
          );
        })}
      </div>
      <button onClick={scan} style={{ padding: '0.4em 1.2em', borderRadius: 4, background: 'var(--accent-primary)', color: 'var(--ink-black)', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
        Scan Wait-For Graph
      </button>
      {result && (
        <div style={{ marginTop: '0.8em', fontSize: '0.8rem', fontFamily: 'var(--font-terminal)' }}>
          {result.edges.map((e, i) => <div key={i}>{e.from} \u2192 waits on \u2192 {e.to}</div>)}
          <div style={{ marginTop: '0.4em', color: result.deadlocked ? '#FF0033' : 'var(--accent-primary)' }}>
            {result.deadlocked ? `Circular wait detected: ${result.cycle.join(' \u2192 ')}` : 'No cycle detected.'}
          </div>
        </div>
      )}
    </div>
  );
}
