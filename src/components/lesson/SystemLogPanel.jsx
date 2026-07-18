// src/components/lesson/SystemLogPanel.jsx
// Right sidebar of the lesson frame (Section 2 UI pass). Purely flavor, never
// gates progression — a fun fact (lesson-tied when authored, else general
// pool) plus a lore fragment that unlocks sequentially with lesson progress.
// Hidden entirely on narrow viewports (see .evade-lesson-grid in
// lessonFrame.css) since it's the first thing that can be dropped.
import { useMemo } from 'react';
import { getFunFact, getLoreEntry } from '../../utils/dataService.js';
import { useProgressStore } from '../../store/progressStore.js';

export default function SystemLogPanel({ lessonId }) {
  const completedCount = useProgressStore((s) => Object.keys(s.completedLessons).length);

  const fact = useMemo(() => getFunFact(lessonId), [lessonId]);
  const lore = useMemo(() => getLoreEntry(completedCount), [completedCount]);

  return (
    <div className="evade-system-log">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4em', color: 'var(--accent-secondary)' }}>
        <span aria-hidden="true">{'\u25c8'}</span>
        <span style={{ letterSpacing: '0.08em' }}>system log</span>
      </div>

      {fact && (
        <div>
          <div style={{ opacity: 0.5, marginBottom: '0.3em' }}>fun fact</div>
          <div>{fact}</div>
        </div>
      )}

      {lore && (
        <div>
          <div style={{ opacity: 0.5, marginBottom: '0.3em' }}>lore fragment</div>
          <div>{lore.text}</div>
        </div>
      )}
    </div>
  );
}
