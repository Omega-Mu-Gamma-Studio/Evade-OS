// src/components/hub/RealmPortal.jsx
// One hub node: icon/label, locked vs unlocked visual state, accent glow
// (dimmed while locked, per Section 1). Rendered inside HubMap's Konva Stage.
import { Group, Circle, Text } from 'react-konva';

export default function RealmPortal({ x, y, label, accent, unlocked, onClick }) {
  const radius = 34;
  return (
    <Group x={x} y={y} onClick={unlocked ? onClick : undefined} onTap={unlocked ? onClick : undefined} listening={unlocked}>
      <Circle
        radius={radius + 10}
        fill={accent.primary}
        opacity={unlocked ? 0.18 : 0.05}
        shadowBlur={unlocked ? 24 : 0}
        shadowColor={accent.primary}
      />
      <Circle
        radius={radius}
        fill={unlocked ? '#0A0A0F' : '#111111'}
        stroke={accent.primary}
        strokeWidth={unlocked ? 2 : 1}
        opacity={unlocked ? 1 : 0.35}
      />
      <Text
        text={unlocked ? '' : '🔒'}
        fontSize={16}
        width={radius * 2}
        height={radius * 2}
        offsetX={radius}
        offsetY={radius - 4}
        align="center"
        verticalAlign="middle"
        opacity={unlocked ? 0 : 0.6}
      />
      <Text
        text={label}
        fontSize={12}
        fill={unlocked ? '#FFFFFF' : 'rgba(255,255,255,0.35)'}
        width={140}
        offsetX={70}
        y={radius + 12}
        align="center"
        fontStyle={unlocked ? 'bold' : 'normal'}
      />
    </Group>
  );
}
