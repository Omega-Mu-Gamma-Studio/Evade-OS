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
        borderRight: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)',
        display: 'flex', flexDirection: 'column', padding: '0.75rem 0.5rem', gap: '0.4rem',
      }}
    >
      <button onClick={onToggle} style={{ background: 'none', border: 'none', color: 'var(--ink-white)', cursor: 'pointer', textAlign: 'left' }}>
        {collapsed ? '»' : '« Realms'}
      </button>
      {!collapsed &&
        units.map((unit) => {
          const unlocked = isRealmUnlocked(unit.realmNum, allLessonIds);
          return (
            <button
              key={unit.realmNum}
              disabled={!unlocked}
              onClick={() => navigate(`/hub#realm-${unit.realmNum}`)}
              style={{
                background: 'none', border: 'none', textAlign: 'left', padding: '0.4em 0.2em',
                color: unlocked ? 'var(--ink-white)' : 'rgba(255,255,255,0.25)',
                cursor: unlocked ? 'pointer' : 'not-allowed', fontSize: '0.85rem',
              }}
            >
              {unit.realmNum}. {unit.title}
            </button>
          );
        })}
      {!collapsed && (
        <button
          onClick={() => navigate('/settings')}
          style={{ marginTop: 'auto', background: 'none', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer', textAlign: 'left' }}
        >
          ⚙ Settings
        </button>
      )}
    </div>
  );
}
