// src/components/hub/ZonePortal.jsx
// Same visual language as RealmPortal, one level down (Zone A / Zone B within
// Realms III/IV). Used by ZoneMap.jsx.
import { Group, Rect, Text } from 'react-konva';

export default function ZonePortal({ x, y, label, accent, unlocked, sealed, onClick }) {
  const w = 200, h = 110;
  return (
    <Group x={x} y={y} onClick={unlocked ? onClick : undefined} onTap={unlocked ? onClick : undefined} listening={unlocked}>
      <Rect
        width={w} height={h} cornerRadius={8}
        fill="#0A0A0F"
        stroke={accent.primary}
        strokeWidth={unlocked ? 2 : 1}
        opacity={unlocked ? 1 : 0.3}
        shadowBlur={unlocked ? 18 : 0}
        shadowColor={accent.primary}
      />
      <Text
        text={label}
        fontSize={14}
        fontStyle="bold"
        fill={unlocked ? '#FFFFFF' : 'rgba(255,255,255,0.35)'}
        width={w - 20} x={10} y={16}
        align="center"
      />
      <Text
        text={unlocked ? (sealed ? '[SEALED]' : 'ENTER →') : 'LOCKED'}
        fontSize={11}
        fill={accent.primary}
        opacity={unlocked ? 1 : 0.4}
        width={w - 20} x={10} y={h - 30}
        align="center"
      />
    </Group>
  );
}
