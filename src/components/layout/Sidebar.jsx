// src/components/layout/Sidebar.jsx
// Section 8: realm quick-jump + settings shortcut. Secondary nav surface,
// available from lesson/hub screens; not required for the hub's primary flow.
import { useNavigate } from 'react-router-dom';
import { getAllUnits } from '../../utils/dataService.js';
import { useProgressStore } from '../../store/progressStore.js';
import { getAllLessons } from '../../utils/dataService.js';

export default function Sidebar({ collapsed = false, onToggle }) {
  const navigate = useNavigate();
  const units = getAllUnits();
  const isRealmUnlocked = useProgressStore((s) => s.isRealmUnlocked);
  const allLessonIds = getAllLessons().map((l) => l.id);

  return (
    <div
      style={{
        width: collapsed ? 48 : 200, transition: 'width 160ms ease', overflow: 'hidden',
        borderRight: '1px solid color-mix(in srgb, var(--accent-primary) 20%, transparent)',
        background: 'rgba(0,0,0,0.3)', fontFamily: 'var(--font-terminal)', fontSize: '11px',
        display: 'flex', flexDirection: 'column', padding: '0.85rem 0.6rem', gap: '1rem',
      }}
    >
      <button
        onClick={onToggle}
        style={{
          background: 'none', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer',
          textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.5em',
        }}
      >
        <span aria-hidden="true">⌂</span>
        {!collapsed && <span>hub</span>}
      </button>

      {!collapsed && (
        <div>
          <div style={{ opacity: 0.5, marginBottom: '0.5em', letterSpacing: '0.05em' }}>realms</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55em' }}>
            {units.map((unit) => {
              const unlocked = isRealmUnlocked(unit.realmNum, allLessonIds);
              const dotColor = unit.accent?.primary ?? 'rgba(255,255,255,0.3)';
              return (
                <button
                  key={unit.realmNum}
                  disabled={!unlocked}
                  onClick={() => navigate(`/hub#realm-${unit.realmNum}`)}
                  style={{
                    background: 'none', border: 'none', textAlign: 'left', padding: 0,
                    display: 'flex', alignItems: 'center', gap: '0.5em',
                    color: unlocked ? 'var(--ink-white)' : 'rgba(255,255,255,0.25)',
                    cursor: unlocked ? 'pointer' : 'not-allowed',
                  }}
                >
                  <span
                    style={{
                      width: 6, height: 6, borderRadius: '50%', flexShrink: 0,
                      background: unlocked ? dotColor : 'transparent',
                      border: unlocked ? 'none' : `1px solid ${dotColor}`,
                      boxShadow: unlocked ? `0 0 5px ${dotColor}` : 'none',
                    }}
                  />
                  {unit.realmNum}. {unit.title}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5em', opacity: collapsed ? 0 : 1 }}>
        <span aria-hidden="true">≡</span>
        {!collapsed && <span>lessons</span>}
      </div>

      <button
        onClick={() => navigate('/settings')}
        style={{
          marginTop: 'auto', background: 'none', border: 'none', color: 'var(--accent-primary)',
          cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.5em',
        }}
      >
        <span aria-hidden="true">⚙</span>
        {!collapsed && <span>settings</span>}
      </button>
    </div>
  );
}
