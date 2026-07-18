// src/components/visualizers/DiskScheduler.jsx
// Disk scheduling algorithms FCFS/SSTF/SCAN/... (Section 3.1). Note: per PRD
// Section 6.0, the only disk-scheduling-algorithm lesson (4.12) is Terminal-mode,
// so this primitive currently has no Visual-mode caller in the mapping — built
// per the fixed primitive library regardless, functional and ready if that changes.
import { useState } from 'react';
import { simulateDisk } from '../../engine/disk.js';

const DEFAULT_REQUESTS = [{ id: 'r1', cylinder: 98 }, { id: 'r2', cylinder: 183 }, { id: 'r3', cylinder: 37 }, { id: 'r4', cylinder: 122 }, { id: 'r5', cylinder: 14 }, { id: 'r6', cylinder: 124 }, { id: 'r7', cylinder: 65 }];
const ALGORITHMS = ['fcfs', 'sstf', 'scan', 'cscan', 'look'];

export default function DiskScheduler({ requests = DEFAULT_REQUESTS, onObjectiveComplete }) {
  const [algorithm, setAlgorithm] = useState('fcfs');
  const [result, setResult] = useState(null);

  const run = () => {
    const r = simulateDisk(requests, algorithm, { headStart: 53, diskSize: 200 });
    setResult(r);
    onObjectiveComplete();
  };

  const maxCyl = 200;

  return (
    <div>
      <div style={{ display: 'flex', gap: '0.5em', marginBottom: '1em', flexWrap: 'wrap' }}>
        {ALGORITHMS.map((a) => (
          <button
            key={a}
            onClick={() => setAlgorithm(a)}
            style={{
              padding: '0.35em 0.8em', borderRadius: 4, cursor: 'pointer', textTransform: 'uppercase', fontSize: '0.75rem',
              background: algorithm === a ? 'var(--accent-primary)' : 'transparent',
              color: algorithm === a ? 'var(--ink-black)' : 'var(--accent-primary)',
              border: '1px solid var(--accent-primary)',
            }}
          >
            {a}
          </button>
        ))}
        <button onClick={run} style={{ marginLeft: 'auto', padding: '0.35em 1em', borderRadius: 4, background: 'var(--accent-secondary)', color: 'var(--ink-black)', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
          Run
        </button>
      </div>
      <div style={{ position: 'relative', height: 30, background: 'rgba(255,255,255,0.05)', borderRadius: 4 }}>
        {requests.map((r) => (
          <div key={r.id} title={r.id} style={{ position: 'absolute', left: `${(r.cylinder / maxCyl) * 100}%`, top: 4, width: 4, height: 22, background: 'rgba(255,255,255,0.4)' }} />
        ))}
      </div>
      {result && (
        <div style={{ marginTop: '0.8em', fontSize: '0.8rem', fontFamily: 'var(--font-terminal)' }}>
          <div>Order: {result.order.map((r) => r.cylinder).join(' \u2192 ')}</div>
          <div style={{ color: 'var(--accent-primary)' }}>Total head movement: {result.totalSeek} cylinders</div>
        </div>
      )}
    </div>
  );
}
