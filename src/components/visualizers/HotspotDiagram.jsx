// src/components/visualizers/HotspotDiagram.jsx
// Click-to-reveal static diagrams (Section 3.1). Content (hotspot labels/positions)
// is lesson data; falls back to placeholder hotspots when a lesson's content is "TBD".
import { useState } from 'react';

const DEFAULT_HOTSPOTS = [
  { id: 'a', x: 20, y: 30, label: 'Component A', detail: 'Detail for component A. (lesson content TBD)' },
  { id: 'b', x: 60, y: 20, label: 'Component B', detail: 'Detail for component B. (lesson content TBD)' },
  { id: 'c', x: 40, y: 65, label: 'Component C', detail: 'Detail for component C. (lesson content TBD)' },
];

export default function HotspotDiagram({ hotspots = DEFAULT_HOTSPOTS, onObjectiveComplete }) {
  const [seen, setSeen] = useState(new Set());
  const [active, setActive] = useState(null);

  const reveal = (h) => {
    setActive(h);
    const next = new Set(seen).add(h.id);
    setSeen(next);
    if (next.size >= hotspots.length) onObjectiveComplete();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%' }}>
      <div style={{ position: 'relative', width: '100%', minHeight: 240, flex: '1 1 auto', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }}>
        {hotspots.map((h) => (
          <button
            key={h.id}
            onClick={() => reveal(h)}
            style={{
              position: 'absolute', left: `${h.x}%`, top: `${h.y}%`, transform: 'translate(-50%, -50%)',
              width: 22, height: 22, borderRadius: '50%', cursor: 'pointer',
              background: seen.has(h.id) ? 'var(--accent-primary)' : 'transparent',
              border: '2px solid var(--accent-primary)',
            }}
            title={h.label}
          />
        ))}
        <div style={{ position: 'absolute', top: 8, right: 12, fontSize: '0.7rem', opacity: 0.5 }}>
          {seen.size}/{hotspots.length} revealed
        </div>
      </div>

      {/* Detail panel lives in normal flow below the diagram (not an absolute
          overlay on top of it) — this is what used to sit over the bottom
          hotspot and block clicks on it. Reserved min-height so revealing the
          first node doesn't jump the layout. */}
      <div style={{ minHeight: 64, border: '1px solid var(--accent-primary)', borderRadius: 6, padding: '0.6em 0.8em', background: 'rgba(0,0,0,0.35)' }}>
        {active ? (
          <>
            <strong>{active.label}</strong>
            <p style={{ margin: '0.3em 0 0', fontSize: '0.85rem', opacity: 0.85 }}>{active.detail}</p>
          </>
        ) : (
          <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.4 }}>Click a node to inspect it.</p>
        )}
      </div>
    </div>
  );
}
