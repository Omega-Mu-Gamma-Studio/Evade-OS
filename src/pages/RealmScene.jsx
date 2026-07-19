// src/pages/RealmScene.jsx
// The "Realm" tier between the Realm Map (Hub) and a lesson. One image per
// realm, 2-3 hotspots max — this is deliberately NOT a per-lesson map:
//   - Portal hotspot(s): the only clickable thing that navigates anywhere.
//     Clicking one drops the player into their current lesson frontier for
//     that realm/zone (getFirstIncompleteLesson) — same "resume where you
//     left off" behavior the old Hub-and-ZoneMap flow already had. Realms
//     III/IV keep two portals side by side (Gauntlet/Vault, Tower/Archive);
//     everything else gets one.
//   - Lore hotspot(s): flavor only. Pops a small panel with a lore entry or
//     fun fact pulled from the existing systemLog data — no unlock logic,
//     no navigation. Gives the scene something to click besides "go".
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SceneFrame from '../components/hub/SceneFrame.jsx';
import SceneHotspot from '../components/hub/SceneHotspot.jsx';
import RealmEntryTransition from '../components/hub/RealmEntryTransition.jsx';
import TopBar from '../components/layout/TopBar.jsx';
import { useRealmPalette } from '../hooks/useRealmPalette.js';
import {
  getUnit, getLessonsForZone, getLessonsForRealm, getZoneKeys, realmHasZones,
  getFirstIncompleteLesson, getFunFact, getLoreEntry,
} from '../utils/dataService.js';
import { getSceneArt } from '../utils/sceneArt.js';
import { SCENE_ART } from '../data/hub/sceneArt.js';
import { useProgressStore } from '../store/progressStore.js';

// Placeholder hotspot boxes — swap once real art exists so each box hugs
// whatever the portal/lore landmark actually is (a door, a cliff edge, a
// terminal). See ART-REQUIREMENTS.md.
const PORTAL_SINGLE = { x: 38, y: 30, width: 24, height: 50 };
const PORTAL_ZONED = [
  { x: 8, y: 24, width: 30, height: 55 },
  { x: 62, y: 24, width: 30, height: 55 },
];
const LORE_SPOTS = [
  { x: 6, y: 8, width: 12, height: 14 },
  { x: 82, y: 8, width: 12, height: 14 },
];

export default function RealmScene() {
  const { realmNum: realmParam } = useParams();
  const realmNum = Number(realmParam);
  const navigate = useNavigate();
  const unit = getUnit(realmNum);
  const zoned = realmHasZones(realmNum);
  const zoneKeys = getZoneKeys(realmNum);
  const isZoneUnlocked = useProgressStore((s) => s.isZoneUnlocked);
  const isZoneComplete = useProgressStore((s) => s.isZoneComplete);
  const completedLessons = useProgressStore((s) => s.completedLessons);
  const [transitionTo, setTransitionTo] = useState(null); // { key, name, accent }
  const [lorePanel, setLorePanel] = useState(null); // { title, text }
  const paletteStyle = useRealmPalette(realmNum, zoned ? zoneKeys[0] : null);

  if (!unit) {
    return <div style={{ padding: '2rem' }}>Realm {realmParam} not found.</div>;
  }

  const realmLessons = getLessonsForRealm(realmNum);
  const zoneLessonIdsByZone = zoned
    ? Object.fromEntries(zoneKeys.map((k) => [k, getLessonsForZone(realmNum, k).map((l) => l.id)]))
    : {};

  const realmArt = getSceneArt(
    SCENE_ART[`realm${realmNum}`],
    zoned ? zoneKeys.map((k) => unit.zones[k].accent.primary) : [unit.accent.primary],
  );

  const handlePortalClick = (zoneKey) => {
    const accent = zoneKey ? unit.zones[zoneKey].accent : unit.accent;
    const name = zoneKey ? unit.zones[zoneKey].name : unit.realm;
    setTransitionTo({ key: zoneKey, name, accent });
  };

  const handleTransitionComplete = () => {
    const zoneKey = transitionTo?.key ?? null;
    setTransitionTo(null);
    const list = zoneKey ? getLessonsForZone(realmNum, zoneKey) : realmLessons;
    const target = getFirstIncompleteLesson(list, completedLessons);
    if (target) navigate(`/lesson/${target.id}`);
  };

  const showLore = (kind) => {
    if (kind === 'fact') {
      const seedLesson = realmLessons[0]?.id ?? `${realmNum}.1`;
      setLorePanel({ title: 'System log — fun fact', text: getFunFact(seedLesson) });
    } else {
      const completedCount = Object.keys(completedLessons).length;
      const entry = getLoreEntry(completedCount);
      setLorePanel({ title: 'System log — fragment', text: entry?.text ?? 'No fragment recovered yet.' });
    }
  };

  const portals = zoned
    ? zoneKeys.map((zoneKey, i) => {
        const zone = unit.zones[zoneKey];
        const unlocked = isZoneUnlocked(realmNum, zoneKey, zoneLessonIdsByZone);
        const sealed = isZoneComplete(realmNum, zoneLessonIdsByZone[zoneKey]);
        return (
          <SceneHotspot
            key={zoneKey}
            {...PORTAL_ZONED[i]}
            label={zone.name}
            sublabel={sealed ? 'Cleared \u2014 revisit' : 'Venture in'}
            accent={zone.accent.primary}
            locked={!unlocked}
            lockedReason="Clear the previous zone first"
            current={unlocked && !sealed}
            onClick={() => handlePortalClick(zoneKey)}
          />
        );
      })
    : [
        <SceneHotspot
          key="portal"
          {...PORTAL_SINGLE}
          label={unit.realm}
          sublabel="Venture in"
          accent={unit.accent.primary}
          current
          onClick={() => handlePortalClick(null)}
        />,
      ];

  return (
    <div style={{ ...paletteStyle, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopBar title={`Realm ${realmNum} \u2014 ${unit.realm}`} />
      <div style={{ flex: 1, display: 'flex', padding: '1.25rem' }}>
        <SceneFrame art={realmArt} title={unit.realm} backTo="/hub" backLabel="Back to the bunker">
          {portals}
          <SceneHotspot
            {...LORE_SPOTS[0]}
            label="Fun fact"
            sublabel="A stray log entry"
            accent="#FFCC00"
            current={false}
            onClick={() => showLore('fact')}
          />
          <SceneHotspot
            {...LORE_SPOTS[1]}
            label="Lore fragment"
            sublabel="Something Kernel-ka left behind"
            accent="#FFCC00"
            current={false}
            onClick={() => showLore('lore')}
          />
        </SceneFrame>
      </div>

      {lorePanel && (
        <div
          role="dialog"
          aria-label={lorePanel.title}
          onClick={() => setLorePanel(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 150, display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            background: 'rgba(0,0,0,0.6)', padding: '2rem',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: 420, background: '#0A0A0F', border: '1px solid var(--accent-primary)',
              borderRadius: 6, padding: '1.25rem 1.5rem', color: 'var(--ink-white)',
              fontFamily: 'var(--font-terminal)', fontSize: '0.85rem', lineHeight: 1.6,
            }}
          >
            <div style={{ opacity: 0.6, marginBottom: '0.6em', letterSpacing: '0.05em', fontSize: '0.75rem' }}>
              {lorePanel.title}
            </div>
            <div>{lorePanel.text}</div>
            <button
              onClick={() => setLorePanel(null)}
              style={{
                marginTop: '1.2em', background: 'none', border: '1px solid var(--accent-primary)',
                color: 'var(--accent-primary)', padding: '0.4em 0.9em', cursor: 'pointer',
              }}
            >
              close
            </button>
          </div>
        </div>
      )}

      {transitionTo && (
        <RealmEntryTransition
          realmNum={realmNum}
          name={transitionTo.name}
          accent={transitionTo.accent}
          onComplete={handleTransitionComplete}
        />
      )}
    </div>
  );
}
