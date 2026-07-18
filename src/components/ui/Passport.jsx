// src/components/ui/Passport.jsx
// Section 6: terminal-style overlay (not a route), reuses TerminalSimulator styling.
// One row per realm; lesson stamps fill in as completed; a seal marker once a
// zone (or single-zone realm) is fully cleared.
import { getAllUnits, getLessonsForRealm, getLessonsForZone, getZoneKeys, realmHasZones } from '../../utils/dataService.js';
import { useProgressStore } from '../../store/progressStore.js';

export default function Passport({ open, onClose }) {
  const isLessonComplete = useProgressStore((s) => s.isLessonComplete);
  const isZoneComplete = useProgressStore((s) => s.isZoneComplete);
  const isRealmComplete = useProgressStore((s) => s.isRealmComplete);

  if (!open) return null;

  const units = getAllUnits();

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 'min(720px, 90vw)', maxHeight: '80vh', overflowY: 'auto',
          background: '#050505', border: '1px solid var(--accent-primary)',
          borderRadius: 6, padding: '1.5rem', fontFamily: 'var(--font-terminal)',
          color: 'var(--accent-primary)', boxShadow: '0 0 24px rgba(0,0,0,0.6)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <span>&gt; SYSTEM LOG // PASSPORT</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>[ x ]</button>
        </div>
        {units.map((unit) => {
          const hasZones = realmHasZones(unit.realmNum);
          const realmLessons = getLessonsForRealm(unit.realmNum);
          const realmSealed = isRealmComplete(unit.realmNum, realmLessons.map((l) => l.id));
          return (
            <div key={unit.realmNum} style={{ marginBottom: '1rem', borderBottom: '1px dashed rgba(255,255,255,0.15)', paddingBottom: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--ink-white)' }}>
                <span>Realm {unit.realmNum} — {unit.title}</span>
                {!hasZones && <span>{realmSealed ? '[SEALED]' : ''}</span>}
              </div>
              {!hasZones && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35em', marginTop: '0.4em' }}>
                  {realmLessons.map((l) => (
                    <span key={l.id} style={{ opacity: isLessonComplete(l.id) ? 1 : 0.25 }}>
                      [{isLessonComplete(l.id) ? '#' : ' '}{l.id}]
                    </span>
                  ))}
                </div>
              )}
              {hasZones &&
                getZoneKeys(unit.realmNum).map((zoneKey) => {
                  const zoneLessons = getLessonsForZone(unit.realmNum, zoneKey);
                  const sealed = isZoneComplete(unit.realmNum, zoneLessons.map((l) => l.id));
                  return (
                    <div key={zoneKey} style={{ marginTop: '0.5em' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85em', color: 'var(--ink-white)' }}>
                        <span>&nbsp;&nbsp;Zone — {unit.zones[zoneKey].name}</span>
                        <span>{sealed ? '[SEALED]' : ''}</span>
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35em', marginTop: '0.3em' }}>
                        {zoneLessons.map((l) => (
                          <span key={l.id} style={{ opacity: isLessonComplete(l.id) ? 1 : 0.25 }}>
                            [{isLessonComplete(l.id) ? '#' : ' '}{l.id}]
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
