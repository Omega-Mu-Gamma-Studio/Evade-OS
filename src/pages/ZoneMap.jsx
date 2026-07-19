// src/pages/ZoneMap.jsx
// Section 1/3.2: zone selection within Realms III/IV. Ported to the
// SeeDS-style top-down map (SceneFrame + SceneHotspot) instead of the old
// Konva canvas — one zone-select scene with both zone doors as hotspots,
// same structural level as SeeDS's Dorm screen. Story Mode: Zone A must
// clear before Zone B unlocks. Normal Mode: both free.
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SceneFrame from '../components/hub/SceneFrame.jsx';
import SceneHotspot from '../components/hub/SceneHotspot.jsx';
import RealmEntryTransition from '../components/hub/RealmEntryTransition.jsx';
import TopBar from '../components/layout/TopBar.jsx';
import { useRealmPalette } from '../hooks/useRealmPalette.js';
import { getUnit, getLessonsForZone, getZoneKeys, getFirstIncompleteLesson } from '../utils/dataService.js';
import { getSceneArt } from '../utils/sceneArt.js';
import { SCENE_ART } from '../data/hub/sceneArt.js';
import { useProgressStore } from '../store/progressStore.js';

// Placeholder side-by-side bounding boxes for the two zone doors. Swap once
// real zone-select art exists — see ART-REQUIREMENTS.md.
const ZONE_HOTSPOTS = [
  { x: 8, y: 20, width: 36, height: 60 },
  { x: 56, y: 20, width: 36, height: 60 },
];

export default function ZoneMap() {
  const { zoneId: realmParam } = useParams();
  const realmNum = Number(realmParam);
  const navigate = useNavigate();
  const unit = getUnit(realmNum);
  const zoneKeys = getZoneKeys(realmNum);
  const isZoneUnlocked = useProgressStore((s) => s.isZoneUnlocked);
  const isZoneComplete = useProgressStore((s) => s.isZoneComplete);
  const completedLessons = useProgressStore((s) => s.completedLessons);
  const [transitionZone, setTransitionZone] = useState(null);
  const paletteStyle = useRealmPalette(realmNum, transitionZone ?? zoneKeys[0]);

  if (!unit || zoneKeys.length === 0) {
    return <div style={{ padding: '2rem' }}>Realm {realmParam} has no zones.</div>;
  }

  const zoneLessonIdsByZone = Object.fromEntries(
    zoneKeys.map((k) => [k, getLessonsForZone(realmNum, k).map((l) => l.id)])
  );

  const zoneArt = getSceneArt(
    SCENE_ART[`zone${realmNum}`],
    zoneKeys.map((k) => unit.zones[k].accent.primary),
  );

  const handleSelectZone = (zoneKey) => setTransitionZone(zoneKey);

  const handleTransitionComplete = () => {
    const zoneKey = transitionZone;
    setTransitionZone(null);
    const target = getFirstIncompleteLesson(getLessonsForZone(realmNum, zoneKey), completedLessons);
    if (target) navigate(`/lesson/${target.id}`);
  };

  return (
    <div style={{ ...paletteStyle, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopBar title={`Realm ${realmNum} \u2014 ${unit.realm}`} />
      <div style={{ flex: 1, display: 'flex', padding: '1.25rem' }}>
        <SceneFrame art={zoneArt} title={unit.realm} backTo="/hub" backLabel="Back to the bunker">
          {zoneKeys.map((zoneKey, i) => {
            const zone = unit.zones[zoneKey];
            const unlocked = isZoneUnlocked(realmNum, zoneKey, zoneLessonIdsByZone);
            const sealed = isZoneComplete(realmNum, zoneLessonIdsByZone[zoneKey]);
            return (
              <SceneHotspot
                key={zoneKey}
                {...ZONE_HOTSPOTS[i]}
                label={zone.name}
                sublabel={sealed ? 'Cleared' : 'Enter zone'}
                accent={zone.accent.primary}
                locked={!unlocked}
                lockedReason="Clear the first zone before this one unlocks"
                current={unlocked && !sealed}
                onClick={() => handleSelectZone(zoneKey)}
              />
            );
          })}
        </SceneFrame>
      </div>

      {transitionZone && (
        <RealmEntryTransition
          realmNum={realmNum}
          name={unit.zones[transitionZone].name}
          accent={unit.zones[transitionZone].accent}
          onComplete={handleTransitionComplete}
        />
      )}
    </div>
  );
}
