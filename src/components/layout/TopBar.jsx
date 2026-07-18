// src/components/layout/TopBar.jsx
// Section 8: lesson title, phase progress dots, Passport icon, exit-to-hub button.
// Persists across all lesson-related screens.
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Indicator from '../ui/Indicator.jsx';
import Passport from '../ui/Passport.jsx';

export default function TopBar({ title, phases = null, phaseIndex = 0, timerSeconds = null, showExit = true }) {
  const [passportOpen, setPassportOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0.75rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.1)',
          background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', minWidth: 0 }}>
          {showExit && (
            <button
              onClick={() => navigate('/hub')}
              title="Exit to Hub"
              style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer', fontSize: '1.1rem' }}
            >
              ⌂
            </button>
          )}
          <span style={{ fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {title}
          </span>
        </div>

        {phases && <Indicator phases={phases} currentIndex={phaseIndex} timerSeconds={timerSeconds} />}

        <button
          onClick={() => setPassportOpen(true)}
          title="Passport / System Log"
          style={{ background: 'none', border: '1px solid var(--accent-primary)', color: 'var(--accent-primary)', borderRadius: 4, padding: '0.3em 0.6em', cursor: 'pointer' }}
        >
          Passport
        </button>
      </div>
      <Passport open={passportOpen} onClose={() => setPassportOpen(false)} />
    </>
  );
}
