// src/pages/Home.jsx
// Landing page + mode select (Story vs Normal), per PRD 3.2.
import { useNavigate } from 'react-router-dom';
import { useProgressStore } from '../store/progressStore.js';
import Button from '../components/ui/Button.jsx';

export default function Home() {
  const navigate = useNavigate();
  const mode = useProgressStore((s) => s.mode);
  const setMode = useProgressStore((s) => s.setMode);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2rem', textAlign: 'center', padding: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2.2rem', letterSpacing: '0.08em', marginBottom: '0.4em' }}>ESCAPE-OS</h1>
        <p style={{ opacity: 0.6, fontStyle: 'italic', maxWidth: 480 }}>
          "Every professor here teaches the exact same material. Pick whoever makes you want to show up to class."
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
  );
}
