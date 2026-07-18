// src/components/lesson/PhaseContainer.jsx
// Section 2: owns the persistent chrome (Kernel-ka dialogue, phase progress
// indicator, lesson title, exit-to-hub) via TopBar + KernelkaDialogue. Mounts a
// different phase component based on lesson.phases[phaseIndex]. Doesn't know or
// care whether that phase is Visual or Terminal — the phase components decide.
//
// Phase progression rule (strict, sequential):
//   dialogue plays -> dismissed -> interaction unlocks -> objective done -> Continue -> next phase
import { useEffect } from 'react';
import TopBar from '../layout/TopBar.jsx';
import KernelkaDialogue from '../companion/KernelkaDialogue.jsx';
import Button from '../ui/Button.jsx';
import PhaseObserver from './PhaseObserver.jsx';
import PhaseFault from './PhaseFault.jsx';
import PhaseRepair from './PhaseRepair.jsx';
import PhaseEscape from './PhaseEscape.jsx';
import { useLessonStore } from '../../store/lessonStore.js';
import { useProgressStore } from '../../store/progressStore.js';
import { useRapportStore } from '../../store/rapportStore.js';
import { getDialogue } from '../../utils/dataService.js';

const PHASE_COMPONENTS = {
  observe: PhaseObserver,
  fault: PhaseFault,
  repair: PhaseRepair,
  escape: PhaseEscape,
};

const ESCAPE_TIMER_SECONDS = 60;

export default function PhaseContainer({ lesson, onLessonComplete }) {
  const mode = useProgressStore((s) => s.mode);
  const completeLesson = useProgressStore((s) => s.completeLesson);
  const nudgeRapport = useRapportStore((s) => s.nudge);

  const {
    lessonId, phases, phaseIndex, dialogueDismissed, objectiveComplete, hintActive,
    loadLesson, dismissDialogue, markObjectiveComplete, advancePhase, dismissHint,
  } = useLessonStore();

  useEffect(() => {
    loadLesson(lesson);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson.id]);

  if (lessonId !== lesson.id || phases.length === 0) {
    return <div style={{ padding: '2rem', opacity: 0.5 }}>Loading lesson\u2026</div>;
  }

  const phase = phases[phaseIndex];
  const PhaseComponent = PHASE_COMPONENTS[phase];
  const dialogueData = getDialogue(lesson.id);
  const dialogueLines = dialogueData ? dialogueData[mode]?.[phase] ?? [] : [];

  const handleContinue = () => {
    if (mode === 'story') nudgeRapport(1);
    const advanced = advancePhase();
    if (!advanced) {
      completeLesson(lesson.id);
      onLessonComplete?.();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <TopBar
        title={`${lesson.id} \u2014 ${lesson.title}`}
        phases={phases}
        phaseIndex={phaseIndex}
        timerSeconds={phase === 'escape' ? ESCAPE_TIMER_SECONDS : null}
      />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '2rem', maxWidth: 860, margin: '0 auto', width: '100%' }}>
        <KernelkaDialogue
          key={`${lesson.id}-${phase}`}
          phase={phase}
          mode={mode}
          lines={dialogueLines}
          onDismissed={dismissDialogue}
        />

        {dialogueDismissed && (
          <>
            {hintActive && (
              <div style={{ padding: '0.75em 1em', border: '1px solid #FFCC00', borderRadius: 6, background: 'rgba(255,204,0,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem' }}>
                  Kernel-ka: "{dialogueData?.hints?.length ? dialogueData.hints[0] : 'Stuck? Look again at what just changed.'}"
                </span>
                <button onClick={dismissHint} style={{ background: 'none', border: 'none', color: '#FFCC00', cursor: 'pointer' }}>dismiss</button>
              </div>
            )}
            <PhaseComponent lesson={lesson} onObjectiveComplete={markObjectiveComplete} />
          </>
        )}

        {objectiveComplete && (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={handleContinue}>
              {phaseIndex >= phases.length - 1 ? 'Complete Lesson' : 'Continue \u2192'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
