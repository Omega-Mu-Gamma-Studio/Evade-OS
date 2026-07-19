// src/pages/Home.jsx
// Landing page + mode select (Story vs Normal), per PRD 3.2. Also the
// "Control Room" — the atmospheric backdrop the player sees before any
// hotspot chrome shows up. Unlike Hub/RealmScene this has no hotspots and
// no bezel frame; just a full-bleed image + vignette behind the menu, per
// ART-REQUIREMENTS.md P1's Home splash brief ("more atmospheric/detailed
// since it doesn't need to share space with hotspots or dialogue").
import { useNavigate } from 'react-router-dom';
import { useProgressStore } from '../store/progressStore.js';
import Button from '../components/ui/Button.jsx';
import { getSceneArt } from '../utils/sceneArt.js';
import { SCENE_ART } from '../data/hub/sceneArt.js';

export default function Home() {
  const navigate = useNavigate();
  const mode = useProgressStore((s) => s.mode);
  const setMode = useProgressStore((s) => s.setMode);

  const controlRoomArt = getSceneArt(SCENE_ART.controlRoom, ['#00CCFF'], '#050508');

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: controlRoomArt }} />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.7) 100%)',
        }}
      />

      <div
        style={{
          position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex',
          flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: '2rem', textAlign: 'center', padding: '2rem',
        }}
      >
        <div>
          <h1 style={{ fontSize: '2.2rem', letterSpacing: '0.08em', marginBottom: '0.4em' }}>EVADE OS</h1>
          <p style={{ opacity: 0.6, fontStyle: 'italic', maxWidth: 480 }}>
            "Every Choice you make is a moment between life and death!"
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          {['story', 'normal'].map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              style={{
                padding: '0.6em 1.4em', borderRadius: 4, cursor: 'pointer', textTransform: 'capitalize',
                background: mode === m ? 'var(--accent-primary)' : 'transparent',
                color: mode === m ? 'var(--ink-black)' : 'var(--ink-white)',
                border: '1px solid var(--accent-primary)',
              }}
            >
              {m} Mode
            </button>
          ))}
        </div>

        <Button onClick={() => navigate('/hub')}>Enter the Bunker</Button>
      </div>
    </div>
  );
}
