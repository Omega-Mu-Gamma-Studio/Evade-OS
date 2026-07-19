// src/pages/HubMap.jsx
// Section 1: central hub, "Core Terminal Room". Ported to the SeeDS-style
// top-down map (SceneFrame + SceneHotspot) instead of the old Konva canvas —
// one bunker overview scene with all 5 realm doors as hotspots, matching how
// SeeDS's Campus screen shows every department on one background. Single-zone
// realms (I, II, V) -> transition -> next lesson. Dual-zone realms (III, IV)
// -> transition -> ZoneMap.jsx. Mode toggle lives in Settings, not here; hub
// reflects current mode passively via Kernel-ka's portrait.
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SceneFrame from '../components/hub/SceneFrame.jsx';
import SceneHotspot from '../components/hub/SceneHotspot.jsx';
import RealmEntryTransition from '../components/hub/RealmEntryTransition.jsx';
import TopBar from '../components/layout/TopBar.jsx';
import Sidebar from '../components/layout/Sidebar.jsx';
import RapportPanel from '../components/companion/RapportPanel.jsx';
import { useRealmPalette } from '../hooks/useRealmPalette.js';
import {
  getAllUnits, getUnit, getLessonsForRealm, getFirstIncompleteLesson, realmHasZones,
} from '../utils/dataService.js';
import { getSceneArt } from '../utils/sceneArt.js';
import { SCENE_ART } from '../data/hub/sceneArt.js';
import { useProgressStore } from '../store/progressStore.js';

// Placeholder bounding boxes — loose left-to-right constellation (same rough
// layout the old Konva POSITIONS used). Swap these once the real hub art
// exists so each box hugs the actual illustrated realm door — see
// ART-REQUIREMENTS.md.
const REALM_HOTSPOTS = {
  1: { x: 3.8, y: 46.9, width: 18, height: 30 },
  2: { x: 20.8, y: 16, width: 18, height: 30 },
  3: { x: 39.9, y: 56.4, width: 18, height: 30 },
  4: { x: 59.1, y: 20.7, width: 18, height: 30 },
  5: { x: 78.2, y: 46.9, width: 18, height: 30 },
};

export default function HubMap() {
  const navigate = useNavigate();
  const mode = useProgressStore((s) => s.mode);
  const completedLessons = useProgressStore((s) => s.completedLessons);
  const isRealmUnlocked = useProgressStore((s) => s.isRealmUnlocked);
  const [transitionRealm, setTransitionRealm] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const paletteStyle = useRealmPalette(null);

  const units = getAllUnits();
  const allLessonIds = units.flatMap((u) => getLessonsForRealm(u.realmNum).map((l) => l.id));

  const currentRealm = units.find((u) => {
    const unlocked = isRealmUnlocked(u.realmNum, allLessonIds);
    const lessons = getLessonsForRealm(u.realmNum);
    const complete = lessons.length > 0 && lessons.every((l) => completedLessons[l.id]);
    return unlocked && !complete;
  })?.realmNum;

  const hubArt = getSceneArt(
    SCENE_ART.hub,
    units.map((u) => (u.accent ?? Object.values(u.zones ?? {})[0]?.accent)?.primary ?? '#FFFFFF'),
  );

  const handleSelectRealm = (realmNum) => setTransitionRealm(realmNum);

  const handleTransitionComplete = () => {
    const realmNum = transitionRealm;
    setTransitionRealm(null);
    if (realmHasZones(realmNum)) {
      navigate(`/zone/${realmNum}`);
    } else {
      const target = getFirstIncompleteLesson(getLessonsForRealm(realmNum), completedLessons);
      if (target) navigate(`/lesson/${target.id}`);
    }
  };

  return (
    <div style={{ ...paletteStyle, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopBar title="Kernel-ka's Bunker \u2014 Core Terminal Room" showExit={false} />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed((c) => !c)} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.25rem', padding: '1.25rem' }}>
          <SceneFrame art={hubArt} title="Core Terminal Room" caption="Five realms, one bunker. Pick where you left off.">
            {units.map((unit) => {
              const unlocked = isRealmUnlocked(unit.realmNum, allLessonIds);
              const accent = (unit.accent ?? Object.values(unit.zones ?? {})[0]?.accent)?.primary ?? '#00FFAA';
              return (
                <SceneHotspot
                  key={unit.realmNum}
                  {...REALM_HOTSPOTS[unit.realmNum]}
                  label={`${unit.realmNum}. ${unit.title}`}
                  sublabel={realmHasZones(unit.realmNum) ? 'Two zones inside' : 'Enter realm'}
                  accent={accent}
                  locked={!unlocked}
                  lockedReason="Clear the previous realm first"
                  current={unit.realmNum === currentRealm}
                  onClick={() => handleSelectRealm(unit.realmNum)}
                />
              );
            })}
          </SceneFrame>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75em', opacity: 0.9 }}>
            <RapportPanel size={56} />
            <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>
              {mode === 'normal' ? 'Kernel-ka is present, inert.' : 'Kernel-ka is watching.'}
            </span>
          </div>
        </div>
      </div>

      {transitionRealm && (() => {
        const unit = getUnit(transitionRealm);
        const accent = unit?.accent ?? Object.values(unit?.zones ?? {})[0]?.accent ?? { primary: '#FFFFFF', secondary: '#FFFFFF' };
        return (
          <RealmEntryTransition
            realmNum={transitionRealm}
            name={unit?.realm ?? `Realm ${transitionRealm}`}
            accent={accent}
            onComplete={handleTransitionComplete}
          />
        );
      })()}
    </div>
  );
}
