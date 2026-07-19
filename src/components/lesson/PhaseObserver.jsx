// src/components/lesson/PhaseObserver.jsx
// Section 4.1: "The concept is demonstrated correctly... No interaction yet."
// Passive demo panel — nothing to *do* here, so the objective completes as
// soon as the phase mounts (dialogue has already gated it). No button of its
// own: PhaseContainer's single "Continue" button is the only CTA on screen.
import { useEffect } from 'react';

export default function PhaseObserver({ lesson, onObjectiveComplete }) {
  const text = typeof lesson.content === 'object' && lesson.content?.observe && lesson.content.observe !== 'TBD'
    ? lesson.content.observe
    : `The system demonstrates ${lesson.title} operating correctly. (content TBD)`;

  useEffect(() => {
    onObjectiveComplete();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ padding: '2rem', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, background: 'rgba(255,255,255,0.02)' }}>
      <div style={{ fontSize: '0.7rem', letterSpacing: '0.1em', opacity: 0.5, marginBottom: '0.6em' }}>OBSERVE</div>
      <p style={{ margin: 0, opacity: 0.85 }}>{text}</p>
    </div>
  );
}
