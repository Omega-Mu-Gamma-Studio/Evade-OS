// src/components/visualizers/TerminalSimulator.jsx
// Section 3.2 / 6: single shell, behavior configured per lesson via
// `terminalInteraction`: 'type' | 'log-click' | 'mixed'.
// Also used standalone for the Passport overlay's visual language (Section 6).
import { useState } from 'react';
import { runSyscall, AVAILABLE_SYSCALLS } from '../../engine/syscall.js';

const DEFAULT_LOG = [
  '[boot] initializing kernel subsystem...',
  '[boot] mounting root filesystem...',
  '[boot] spawning init process (PID 1)...',
  '[boot] system ready.',
];

function shellStyle() {
  return {
    background: '#050505', border: '1px solid var(--accent-primary)', borderRadius: 6,
    padding: '1rem', fontFamily: 'var(--font-terminal)', color: 'var(--accent-primary)',
    minHeight: 220, display: 'flex', flexDirection: 'column', gap: '0.5rem',
  };
}

function TypeMode({ onObjectiveComplete, requiredCalls = 1 }) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [count, setCount] = useState(0);

  const submit = () => {
    if (!input.trim()) return;
    const result = runSyscall(input);
    setHistory((h) => [...h, { cmd: input, ...result }]);
    setInput('');
    if (result.ok) {
      const next = count + 1;
      setCount(next);
      if (next >= requiredCalls) onObjectiveComplete();
    }
  };

  return (
    <div style={shellStyle()}>
      <div style={{ flex: 1, overflowY: 'auto', fontSize: '0.85rem' }}>
        {history.map((h, i) => (
          <div key={i}>
            <div>&gt; {h.cmd}</div>
            <div style={{ color: h.ok ? 'inherit' : '#FF0033', opacity: 0.85 }}>{h.output}</div>
          </div>
        ))}
        {history.length === 0 && (
          <div style={{ opacity: 0.5 }}>Available: {AVAILABLE_SYSCALLS.join(', ')}</div>
        )}
      </div>
      <div style={{ display: 'flex', gap: '0.5em' }}>
        <span>&gt;</span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          style={{ flex: 1, background: 'transparent', border: 'none', color: 'inherit', fontFamily: 'inherit', outline: 'none' }}
          placeholder="type a system call..."
          autoFocus
        />
      </div>
    </div>
  );
}

function LogClickMode({ log = DEFAULT_LOG, onObjectiveComplete }) {
  const [revealed, setRevealed] = useState(1);
  const done = revealed >= log.length;

  const advance = () => {
    if (done) { onObjectiveComplete(); return; }
    setRevealed((r) => r + 1);
  };

  return (
    <div style={shellStyle()} onClick={advance} role="button" tabIndex={0}>
      <div style={{ flex: 1, fontSize: '0.85rem' }}>
        {log.slice(0, revealed).map((line, i) => <div key={i}>{line}</div>)}
      </div>
      <div style={{ fontSize: '0.7rem', opacity: 0.5 }}>
        {done ? 'click to confirm log trace \u2192' : 'click to advance the log \u2192'}
      </div>
    </div>
  );
}

function MixedMode({ log, requiredCalls, onObjectiveComplete }) {
  // log-click gate, then a type prompt — decided case-by-case in real lesson content.
  const [phase, setPhase] = useState('log');
  if (phase === 'log') {
    return <LogClickMode log={log} onObjectiveComplete={() => setPhase('type')} />;
  }
  return <TypeMode requiredCalls={requiredCalls} onObjectiveComplete={onObjectiveComplete} />;
}

export default function TerminalSimulator({ interactionType, log, requiredCalls, onObjectiveComplete }) {
  if (interactionType === 'type') return <TypeMode requiredCalls={requiredCalls} onObjectiveComplete={onObjectiveComplete} />;
  if (interactionType === 'log-click') return <LogClickMode log={log} onObjectiveComplete={onObjectiveComplete} />;
  return <MixedMode log={log} requiredCalls={requiredCalls} onObjectiveComplete={onObjectiveComplete} />;
}
