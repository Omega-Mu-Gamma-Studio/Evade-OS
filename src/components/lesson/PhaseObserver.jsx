// src/components/lesson/PhaseObserver.jsx
// Section 4.1: "The concept is demonstrated correctly... No interaction yet."
// Passive demo panel; objective completes as soon as it's acknowledged.
export default function PhaseObserver({ lesson, onObjectiveComplete }) {
  const text = typeof lesson.content === 'object' && lesson.content?.observe && lesson.content.observe !== 'TBD'
    ? lesson.content.observe
    : `The system demonstrates ${lesson.title} operating correctly. (content TBD)`;

  return (
    <div style={{ padding: '2rem', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, background: 'rgba(255,255,255,0.02)' }}>
      <div style={{ fontSize: '0.7rem', letterSpacing: '0.1em', opacity: 0.5, marginBottom: '0.6em' }}>OBSERVE</div>
      <p style={{ margin: 0, opacity: 0.85 }}>{text}</p>
      <button
        onClick={onObjectiveComplete}
        style={{ marginTop: '1.2em', padding: '0.4em 1em', borderRadius: 4, background: 'transparent', border: '1px solid var(--accent-primary)', color: 'var(--accent-primary)', cursor: 'pointer' }}
      >
        Understood — continue
      </button>
    </div>
  );
}
