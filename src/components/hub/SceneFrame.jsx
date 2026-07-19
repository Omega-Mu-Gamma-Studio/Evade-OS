// src/components/hub/SceneFrame.jsx
// Ported from SeeDS's src/components/campus/SceneFrame.jsx — same shape
// (full-bleed background via `art`, vignette, heading, optional back button,
// hotspots dropped in as children over the same coordinate space) — restyled
// to Evade OS's bezel/scanline terminal look instead of SeeDS's warm
// ink-wash chrome. Reuses the .evade-frame/corner-dot/scanline treatment
// from styles/lessonFrame.css so this reads as the same "viewport" as the
// lesson screen, just showing a map instead of a lesson.
import { useNavigate } from 'react-router-dom';
import './SceneFrame.css';

export default function SceneFrame({ art, title, caption, backTo, backLabel = 'Back', children }) {
  const navigate = useNavigate();

  return (
    <div className="hub-scene-frame evade-frame">
      <span className="evade-corner-dot evade-corner-dot--tl" />
      <span className="evade-corner-dot evade-corner-dot--tr" />
      <span className="evade-corner-dot evade-corner-dot--bl" />
      <span className="evade-corner-dot evade-corner-dot--br" />

      <div className="hub-scene-frame__art" style={{ background: art }}>
        <div className="hub-scene-frame__vignette" aria-hidden="true" />

        {backTo && (
          <button
            className="hub-scene-frame__back"
            onClick={() => navigate(backTo)}
            aria-label={backLabel}
          >
            {'\u2190'} {backLabel}
          </button>
        )}

        <div className="hub-scene-frame__heading">
          <h1 className="evade-gradient-text">{title}</h1>
          {caption && <p>{caption}</p>}
        </div>

        <div className="hub-scene-frame__hotspots">{children}</div>
      </div>
    </div>
  );
}
