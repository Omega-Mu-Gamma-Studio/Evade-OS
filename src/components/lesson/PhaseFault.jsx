// src/components/lesson/PhaseFault.jsx
// Section 4.1: "A fault is injected. The system begins to fail. Kernel-ka
// explains why." Passive — objective completes on mount, same reasoning as
// PhaseObserver. No button of its own.
import { useEffect } from 'react';

export default function PhaseFault({ lesson, onObjectiveComplete }) {
  const text = typeof lesson.content === 'object' && lesson.content?.fault && lesson.content.fault !== 'TBD'
    ? lesson.content.fault
    : `A fault has been injected into ${lesson.title}. The system begins to fail. (fault case content TBD)`;

  useEffect(() => {
    onObjectiveComplete();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ padding: '2rem', border: '1px solid #FF0033', borderRadius: 8, background: 'rgba(255,0,51,0.05)' }}>
      <div style={{ fontSize: '0.7rem', letterSpacing: '0.1em', color: '#FF0033', marginBottom: '0.6em' }}>FAULT</div>
      <p style={{ margin: 0, opacity: 0.85 }}>{text}</p>
    </div>
  );
}
