// src/components/visualizers/MemoryMapper.jsx
// Paging, segmentation, virtual memory (Section 3.1). Grid view; clicking a page
// triggers a pageFault event through the engine and re-renders from its result.
import { useState } from 'react';
import { simulateMemory } from '../../engine/memory.js';

const FRAME_COUNT = 4;
const PAGE_COUNT = 8;

function initialPages() {
  return Array.from({ length: PAGE_COUNT }, (_, id) => ({ id, frame: null, valid: false, dirty: false, referenced: false }));
}

export default function MemoryMapper({ onObjectiveComplete }) {
  const [pages, setPages] = useState(initialPages);
  const [log, setLog] = useState([]);
  const [interactions, setInteractions] = useState(0);

  const touchPage = (pageId) => {
    const page = pages.find((p) => p.id === pageId);
    if (page.valid) return; // already resident, nothing to do
    const result = simulateMemory(pages, [], 'pageFault', { pageId, frameCount: FRAME_COUNT, algorithm: 'fifo' });
    setPages(result.pages);
    setLog((l) => [...l.slice(-4), ...result.log]);
    const next = interactions + 1;
    setInteractions(next);
    if (next >= 4) onObjectiveComplete();
  };

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5em', marginBottom: '1em' }}>
        {pages.map((p) => (
          <button
            key={p.id}
            onClick={() => touchPage(p.id)}
            style={{
              aspectRatio: '1', borderRadius: 6, cursor: 'pointer',
              background: p.valid ? 'var(--accent-primary)' : 'transparent',
              color: p.valid ? 'var(--ink-black)' : 'var(--accent-primary)',
              border: '1px solid var(--accent-primary)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem',
            }}
          >
            <span>Page {p.id}</span>
            <span style={{ fontSize: '0.65rem', opacity: 0.7 }}>{p.valid ? `frame ${p.frame}` : 'invalid'}</span>
          </button>
        ))}
      </div>
      <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-terminal)', opacity: 0.75, minHeight: '4em' }}>
        {log.map((l, i) => <div key={i}>{l}</div>)}
      </div>
      <div style={{ fontSize: '0.7rem', opacity: 0.5, marginTop: '0.5em' }}>{FRAME_COUNT} frames resident \u00b7 {interactions}/4 page touches</div>
    </div>
  );
}
