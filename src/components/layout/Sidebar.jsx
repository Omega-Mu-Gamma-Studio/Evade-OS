// src/components/layout/Sidebar.jsx
// Section 8: realm quick-jump + settings shortcut. Secondary nav surface,
// available from lesson/hub screens; not required for the hub's primary flow.
// Realm rows expand into their lesson list (1.1, 1.2, ...) — a lesson is
// jumpable once it's been reached (completed, or the first incomplete one
// in that realm's sequence); anything past that stays greyed out, same
// styling as a locked realm, so this can't be used to skip past the portal.
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAllUnits, getAllLessons, getLessonsForRealm } from '../../utils/dataService.js';
import { useProgressStore } from '../../store/progressStore.js';

export default function Sidebar({ collapsed = false, onToggle }) {
  const navigate = useNavigate();
  const location = useLocation();
  const units = getAllUnits();
  const isRealmUnlocked = useProgressStore((s) => s.isRealmUnlocked);
  const completedLessons = useProgressStore((s) => s.completedLessons);
  const allLessonIds = getAllLessons().map((l) => l.id);
  const [expandedRealm, setExpandedRealm] = useState(null);

  const currentLessonId = location.pathname.startsWith('/lesson/')
    ? location.pathname.split('/lesson/')[1]
    : null;

  return (
    <div
      style={{
        width: collapsed ? 48 : 200, transition: 'width 160ms ease', overflowX: 'hidden',
        borderRight: '1px solid color-mix(in srgb, var(--accent-primary) 20%, transparent)',
        background: 'rgba(0,0,0,0.3)', fontFamily: 'var(--font-terminal)', fontSize: '11px',
        display: 'flex', flexDirection: 'column', padding: '0.85rem 0.6rem', gap: '1rem',
        maxHeight: '100vh',
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
        <div style={{ overflowY: 'auto', flex: 1, minHeight: 0 }}>
          <div style={{ opacity: 0.5, marginBottom: '0.5em', letterSpacing: '0.05em' }}>realms</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4em' }}>
            {units.map((unit) => {
              const unlocked = isRealmUnlocked(unit.realmNum, allLessonIds);
              const dotColor = unit.accent?.primary ?? 'rgba(255,255,255,0.3)';
              const isOpen = expandedRealm === unit.realmNum;
              const lessons = getLessonsForRealm(unit.realmNum);
              // First not-yet-completed lesson in this realm is the current
              // "frontier" — it and everything before it are jumpable from
              // here; anything after stays locked, same rule the portal uses.
              const frontierIdx = lessons.findIndex((l) => !completedLessons[l.id]);
              const reachableCount = frontierIdx === -1 ? lessons.length : frontierIdx + 1;

              return (
                <div key={unit.realmNum}>
                  <button
                    disabled={!unlocked}
                    onClick={() => (unlocked ? setExpandedRealm(isOpen ? null : unit.realmNum) : null)}
                    style={{
                      width: '100%', background: 'none', border: 'none', textAlign: 'left', padding: 0,
                      display: 'flex', alignItems: 'center', gap: '0.5em',
                      color: unlocked ? 'var(--ink-white)' : 'rgba(255,255,255,0.25)',
                      cursor: unlocked ? 'pointer' : 'not-allowed',
                    }}
                  >
                    <span style={{ opacity: 0.5, width: '0.9em', flexShrink: 0 }}>
                      {unlocked ? (isOpen ? '▾' : '▸') : ''}
                    </span>
                    <span
                      style={{
                        width: 6, height: 6, borderRadius: '50%', flexShrink: 0,
                        background: unlocked ? dotColor : 'transparent',
                        border: unlocked ? 'none' : `1px solid ${dotColor}`,
                        boxShadow: unlocked ? `0 0 5px ${dotColor}` : 'none',
                      }}
                    />
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {unit.realmNum}. {unit.title}
                    </span>
                  </button>

                  {isOpen && (
                    <div
                      style={{
                        display: 'flex', flexDirection: 'column', gap: '0.45em',
                        marginTop: '0.5em', paddingLeft: '1.4em',
                        borderLeft: `1px solid color-mix(in srgb, ${dotColor} 30%, transparent)`,
                      }}
                    >
                      {lessons.map((lesson, i) => {
                        const done = !!completedLessons[lesson.id];
                        const reachable = i < reachableCount;
                        const active = lesson.id === currentLessonId;
                        return (
                          <button
                            key={lesson.id}
                            disabled={!reachable}
                            onClick={() => navigate(`/lesson/${lesson.id}`)}
                            style={{
                              background: 'none', border: 'none', textAlign: 'left', padding: 0,
                              display: 'flex', alignItems: 'baseline', gap: '0.5em',
                              color: active ? dotColor : reachable ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.2)',
                              cursor: reachable ? 'pointer' : 'not-allowed',
                              fontWeight: active ? 'bold' : 'normal',
                            }}
                            title={lesson.title}
                          >
                            <span style={{ flexShrink: 0, opacity: 0.7 }}>{done ? '✓' : lesson.id}</span>
                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {lesson.title}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

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
