// src/components/companion/KernelkaDialogue.jsx
// VN-style, click-to-dismiss per line. Dialogue is a GATE before interaction,
// never concurrent with it (Section 2 phase-progression rule). Normal Mode:
// flat/functional lines only, no tone progression (Section 3.2 / 10.2).
import { useState } from 'react';
import RapportPanel from './RapportPanel.jsx';

const NORMAL_MODE_FALLBACK = {
  observe: 'Observing system state.',
  fault: 'Fault detected.',
  repair: 'Repair required.',
  escape: 'Escape sequence armed.',
};

const STORY_MODE_FALLBACK = {
  observe: 'Watch closely. This is how it\u2019s supposed to work.',
  fault: 'There — it just broke. Do you see why?',
  repair: 'Your turn. Fix it before the system notices.',
  escape: 'No more watching. Move.',
};

export default function KernelkaDialogue({ phase, mode, lines, onDismissed }) {
  const [index, setIndex] = useState(0);

  const script =
    lines && lines.length > 0
      ? lines
      : [mode === 'normal' ? NORMAL_MODE_FALLBACK[phase] : STORY_MODE_FALLBACK[phase]];

  const isLast = index >= script.length - 1;

  const handleAdvance = () => {
    if (isLast) onDismissed();
    else setIndex((i) => i + 1);
  };

  return (
    <div className="evade-dialogue-bar" onClick={handleAdvance}>
      <RapportPanel size={40} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '0.65rem', color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.25em' }}>
          Kernel-ka
        </div>
        <p style={{ margin: 0, lineHeight: 1.4 }}>{script[index]}</p>
      </div>
      <div style={{ fontSize: '0.7rem', opacity: 0.5, flexShrink: 0, whiteSpace: 'nowrap' }}>
        {isLast ? 'click \u23f5' : `more (${index + 1}/${script.length}) \u23f5`}
      </div>
    </div>
  );
}
