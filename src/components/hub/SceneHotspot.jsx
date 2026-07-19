// src/components/hub/SceneHotspot.jsx
// Ported from SeeDS's src/components/campus/Hotspot.jsx — same mechanic: a
// percentage bounding box (x/y = top-left, not center) that stays fully
// invisible at rest and reveals an outline + tooltip on hover/focus, so the
// scene art reads clean until someone's actually looking for what's
// clickable. Difference from SeeDS: takes its own `accent` color, since
// Evade OS wants each realm/zone glowing its own hue rather than one shared
// hover color (SeeDS's campus buildings all reveal the same warm gold).
import { useState } from 'react';
import './SceneHotspot.css';

export default function SceneHotspot({
  x,
  y,
  width,
  height,
  label,
  sublabel,
  accent = '#00FFAA',
  locked = false,
  current = false,
  lockedReason = 'Locked for now',
  onClick,
}) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const active = hovered || focused;

  return (
    <div
      className="scene-hotspot"
      style={{ left: `${x}%`, top: `${y}%`, width: `${width}%`, height: `${height}%`, '--hotspot-accent': accent }}
    >
      <button
        type="button"
        className={[
          'scene-hotspot__region',
          locked ? 'scene-hotspot__region--locked' : '',
          current ? 'scene-hotspot__region--current' : '',
          active ? 'scene-hotspot__region--active' : '',
        ].join(' ').trim()}
        disabled={locked}
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        aria-label={locked ? `${label} (${lockedReason})` : label}
      >
        {current && <span className="scene-hotspot__pulse" aria-hidden="true" />}
      </button>

      {active && (
        <div className="scene-hotspot__tooltip" role="tooltip">
          <span className="scene-hotspot__tooltip-title">{label}</span>
          {(locked ? lockedReason : sublabel) && (
            <span className="scene-hotspot__tooltip-sub">{locked ? lockedReason : sublabel}</span>
          )}
        </div>
      )}
    </div>
  );
}
