// src/components/avatar/Customization.jsx
// Section 7: lives inside Settings.jsx, not a separate onboarding flow.
// A color picker + a small preset set of wireframe shapes — intentionally minimal.
import { useAvatarStore, AVATAR_COLORS, AVATAR_SHAPES } from '../../store/avatarStore.js';
import AvatarRenderer from './AvatarRenderer.jsx';

export default function Customization() {
  const { color, shape, setColor, setShape } = useAvatarStore();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 360 }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <AvatarRenderer size={72} visualState="idle" />
      </div>

      <div>
        <div style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '0.4em' }}>Color</div>
        <div style={{ display: 'flex', gap: '0.5em' }}>
          {AVATAR_COLORS.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              aria-label={c}
              style={{
                width: 28, height: 28, borderRadius: '50%', background: c, cursor: 'pointer',
                border: c === color ? '2px solid white' : '2px solid transparent',
              }}
            />
          ))}
        </div>
      </div>

      <div>
        <div style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '0.4em' }}>Shape</div>
        <div style={{ display: 'flex', gap: '0.5em' }}>
          {AVATAR_SHAPES.map((sh) => (
            <button
              key={sh}
              onClick={() => setShape(sh)}
              style={{
                padding: '0.4em', borderRadius: 4, cursor: 'pointer',
                background: sh === shape ? 'rgba(255,255,255,0.15)' : 'transparent',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              <AvatarRenderer size={24} shape={sh} color={color} visualState="idle" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
