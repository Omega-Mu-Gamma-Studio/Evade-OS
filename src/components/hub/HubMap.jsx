// src/components/hub/HubMap.jsx
// Section 1: flat illustrated "core terminal room". Konva background + clickable
// hotspot nodes layered on top. 5 realm nodes, freeform/constellation layout,
// loosely left-to-right so Story Mode still reads implicit progression.
import { Stage, Layer, Rect, Text } from 'react-konva';
import RealmPortal from './RealmPortal.jsx';
import { getAllUnits, getLessonsForRealm } from '../../utils/dataService.js';
import { useProgressStore } from '../../store/progressStore.js';

// Loosely left-to-right constellation, not a straight row.
const POSITIONS = {
  1: { x: 120, y: 260 },
  2: { x: 280, y: 130 },
  3: { x: 460, y: 300 },
  4: { x: 640, y: 150 },
  5: { x: 820, y: 260 },
};

const STAGE_W = 940, STAGE_H = 420;

export default function HubMap({ onSelectRealm }) {
  const units = getAllUnits();
  const isRealmUnlocked = useProgressStore((s) => s.isRealmUnlocked);
  const allLessonIds = units.flatMap((u) => getLessonsForRealm(u.realmNum).map((l) => l.id));

  return (
    <Stage width={STAGE_W} height={STAGE_H} style={{ margin: '0 auto', display: 'block' }}>
      <Layer>
        {/* Background: single illustrated graphic slot — art TBD, placeholder fill for now */}
        <Rect x={0} y={0} width={STAGE_W} height={STAGE_H} fill="#07070A" cornerRadius={12} />
        <Text
          text="KERNEL-KA'S BUNKER — CORE TERMINAL ROOM"
          x={0} y={16} width={STAGE_W} align="center"
          fontSize={12} fill="rgba(255,255,255,0.25)" letterSpacing={2}
        />
        {units.map((unit) => (
          <RealmPortal
            key={unit.realmNum}
            x={POSITIONS[unit.realmNum].x}
            y={POSITIONS[unit.realmNum].y}
            label={`${unit.realmNum}. ${unit.title}`}
            accent={unit.accent ?? Object.values(unit.zones)[0].accent}
            unlocked={isRealmUnlocked(unit.realmNum, allLessonIds)}
            onClick={() => onSelectRealm(unit.realmNum)}
          />
        ))}
      </Layer>
    </Stage>
  );
}
