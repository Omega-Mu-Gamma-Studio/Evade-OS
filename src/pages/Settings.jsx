// src/pages/Settings.jsx
// Section 1 / 7: mode toggle (Story/Normal) lives here, not on the hub.
// Avatar customization lives here too, not a separate onboarding flow.
import { useNavigate } from 'react-router-dom';
import { useProgressStore } from '../store/progressStore.js';
import Customization from '../components/avatar/Customization.jsx';
import TopBar from '../components/layout/TopBar.jsx';
import { useRealmPalette } from '../hooks/useRealmPalette.js';

export default function Settings() {
  const navigate = useNavigate();
  const mode = useProgressStore((s) => s.mode);
  const setMode = useProgressStore((s) => s.setMode);
  const paletteStyle = useRealmPalette(null);

  return (
    <div style={{ ...paletteStyle, minHeight: '100vh' }}>
      <TopBar title="Settings" showExit={true} />
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <section>
          <h2 style={{ fontSize: '1rem', marginBottom: '0.6em' }}>Game Mode</h2>
          <div style={{ display: 'flex', gap: '0.75em' }}>
            {['story', 'normal'].map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                style={{
                  padding: '0.5em 1.2em', borderRadius: 4, cursor: 'pointer', textTransform: 'capitalize',
                  background: mode === m ? 'var(--accent-primary)' : 'transparent',
                  color: mode === m ? 'var(--ink-black)' : 'var(--ink-white)',
                  border: '1px solid var(--accent-primary)',
                }}
              >
                {m} Mode
              </button>
            ))}
          </div>
          <p style={{ fontSize: '0.8rem', opacity: 0.5, marginTop: '0.6em' }}>
            Story Mode gates realms/zones in order and gives Kernel-ka a visible rapport arc.
            Normal Mode unlocks everything and keeps Kernel-ka's presence neutral.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1rem', marginBottom: '0.6em' }}>Avatar</h2>
          <Customization />
        </section>

        <button onClick={() => navigate('/hub')} style={{ alignSelf: 'flex-start', background: 'none', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer' }}>
          \u2190 Back to Hub
        </button>
      </div>
    </div>
  );
}
