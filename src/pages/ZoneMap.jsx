// src/pages/ZoneMap.jsx
// Section 1/3.2: zone selection within Realms III/IV. Story Mode: Zone A must
// clear before Zone B unlocks. Normal Mode: both free.
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Stage, Layer, Rect, Text } from 'react-konva';
import ZonePortal from '../components/hub/ZonePortal.jsx';
import RealmEntryTransition from '../components/hub/RealmEntryTransition.jsx';
import TopBar from '../components/layout/TopBar.jsx';
import { useRealmPalette } from '../hooks/useRealmPalette.js';
import { getUnit, getLessonsForZone, getZoneKeys } from '../utils/dataService.js';
import { useProgressStore } from '../store/progressStore.js';

const STAGE_W = 700, STAGE_H = 320;

export default function ZoneMap() {
  const { zoneId: realmParam } = useParams();
  const realmNum = Number(realmParam);
  const navigate = useNavigate();
  const unit = getUnit(realmNum);
  const zoneKeys = getZoneKeys(realmNum);
  const isZoneUnlocked = useProgressStore((s) => s.isZoneUnlocked);
  const isZoneComplete = useProgressStore((s) => s.isZoneComplete);
  const [transitionZone, setTransitionZone] = useState(null);
  const paletteStyle = useRealmPalette(realmNum, transitionZone ?? zoneKeys[0]);

  const zoneLessonIdsByZone = Object.fromEntries(
    zoneKeys.map((k) => [k, getLessonsForZone(realmNum, k).map((l) => l.id)])
  );

  const handleSelectZone = (zoneKey) => setTransitionZone(zoneKey);

  const handleTransitionComplete = () => {
    const zoneKey = transitionZone;
    setTransitionZone(null);
    const first = getLessonsForZone(realmNum, zoneKey)[0];
    if (first) navigate(`/lesson/${first.id}`);
  };

  if (!unit || zoneKeys.length === 0) {
    return <div style={{ padding: '2rem' }}>Realm {realmParam} has no zones.</div>;
  }

  return (
    <div style={{ ...paletteStyle, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopBar title={`Realm ${realmNum} \u2014 ${unit.realm}`} />
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Stage width={STAGE_W} height={STAGE_H}>
          <Layer>
            <Rect x={0} y={0} width={STAGE_W} height={STAGE_H} fill="#07070A" cornerRadius={12} />
            <Text text={unit.realm} x={0} y={16} width={STAGE_W} align="center" fontSize={14} fill="rgba(255,255,255,0.5)" />
            {zoneKeys.map((zoneKey, i) => {
              const zone = unit.zones[zoneKey];
              const unlocked = isZoneUnlocked(realmNum, zoneKey, zoneLessonIdsByZone);
              const sealed = isZoneComplete(realmNum, zoneLessonIdsByZone[zoneKey]);
              return (
                <ZonePortal
                  key={zoneKey}
                  x={140 + i * 280}
                  y={110}
                  label={zone.name}
                  accent={zone.accent}
                  unlocked={unlocked}
                  sealed={sealed}
                  onClick={() => handleSelectZone(zoneKey)}
                />
              );
            })}
          </Layer>
        </Stage>
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
