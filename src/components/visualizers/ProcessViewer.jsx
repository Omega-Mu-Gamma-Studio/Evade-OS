// src/components/visualizers/ProcessViewer.jsx
// Process lifecycle / scheduling visualizations (Section 3.1). Engine <-> Visualizer
// contract (Section 3.3): calls scheduler.js once per player action, renders from result.
import { useState } from 'react';
import { simulateScheduling } from '../../engine/scheduler.js';

const DEFAULT_PROCESSES = [
  { id: 'P1', name: 'P1', arrivalTime: 0, burstTime: 5, priority: 2 },
  { id: 'P2', name: 'P2', arrivalTime: 1, burstTime: 3, priority: 1 },
  { id: 'P3', name: 'P3', arrivalTime: 2, burstTime: 4, priority: 3 },
];

const ALGORITHMS = [
  { id: 'fcfs', label: 'FCFS' },
  { id: 'sjf', label: 'SJF' },
  { id: 'rr', label: 'Round Robin' },
  { id: 'priority', label: 'Priority' },
];

const COLORS = ['#00FFAA', '#33CCFF', '#FF5500', '#FFCC00', '#FF00AA'];

export default function ProcessViewer({ processes = DEFAULT_PROCESSES, onObjectiveComplete }) {
  const [algorithm, setAlgorithm] = useState('fcfs');
  const [result, setResult] = useState(null);
  const [hasRun, setHasRun] = useState(false);

  const run = () => {
    const r = simulateScheduling(processes, algorithm, 2);
    setResult(r);
    if (!hasRun) { setHasRun(true); onObjectiveComplete(); }
  };

  const maxEnd = result ? Math.max(...result.timeline.map((t) => t.end)) : 1;

  return (
    <div>
      <div style={{ display: 'flex', gap: '0.5em', marginBottom: '1em', flexWrap: 'wrap' }}>
        {ALGORITHMS.map((a) => (
          <button
            key={a.id}
            onClick={() => setAlgorithm(a.id)}
            style={{
              padding: '0.35em 0.8em', borderRadius: 4, cursor: 'pointer',
              background: algorithm === a.id ? 'var(--accent-primary)' : 'transparent',
              color: algorithm === a.id ? 'var(--ink-black)' : 'var(--accent-primary)',
              border: '1px solid var(--accent-primary)',
            }}
          >
            {a.label}
          </button>
        ))}
        <button onClick={run} style={{ marginLeft: 'auto', padding: '0.35em 1em', borderRadius: 4, background: 'var(--accent-secondary)', color: 'var(--ink-black)', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
          Run
        </button>
      </div>

      {result && (
        <>
          <div style={{ position: 'relative', height: 40, background: 'rgba(255,255,255,0.05)', borderRadius: 4, overflow: 'hidden' }}>
            {result.timeline.map((slice, i) => {
              const pIdx = processes.findIndex((p) => p.id === slice.id);
              return (
                <div
                  key={i}
                  title={`${slice.id}: ${slice.start}\u2013${slice.end}`}
                  style={{
                    position: 'absolute', left: `${(slice.start / maxEnd) * 100}%`,
                    width: `${((slice.end - slice.start) / maxEnd) * 100}%`, top: 0, bottom: 0,
                    background: COLORS[pIdx % COLORS.length], display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.7rem', color: '#000', borderRight: '1px solid #000',
                  }}
                >
                  {slice.id}
                </div>
              );
            })}
          </div>
          <div style={{ fontSize: '0.75rem', opacity: 0.7, marginTop: '0.6em' }}>
            Avg wait: {result.avgWaitTime.toFixed(1)} \u00b7 Avg turnaround: {result.avgTurnaroundTime.toFixed(1)} \u00b7 Avg response: {result.avgResponseTime.toFixed(1)}
          </div>
        </>
      )}
    </div>
  );
}
