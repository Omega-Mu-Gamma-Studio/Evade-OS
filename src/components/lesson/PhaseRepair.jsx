// src/components/lesson/PhaseRepair.jsx
// Section 4.1: "The system resets. The player does the work." Mounts the
// lesson's dispatched Visual primitive or TerminalSimulator, configured from
// lesson.content.visualizer / lesson.content.terminal (see CONTENT-GUIDE.md).
// The primitive itself calls onObjectiveComplete once its interaction is satisfied.
import { getVisualizer } from '../../utils/visualizerDispatch.js';
import TerminalSimulator from '../visualizers/TerminalSimulator.jsx';

export default function PhaseRepair({ lesson, onObjectiveComplete }) {
  const content = typeof lesson.content === 'object' && lesson.content ? lesson.content : {};

  if (lesson.presentationMode === 'terminal') {
    return (
      <TerminalSimulator
        interactionType={lesson.terminalInteraction}
        {...(content.terminal ?? {})}
        onObjectiveComplete={onObjectiveComplete}
      />
    );
  }
  const Visualizer = getVisualizer(lesson.visualComponent);
  if (!Visualizer) {
    return <div style={{ opacity: 0.6 }}>No visualizer registered for '{lesson.visualComponent}'.</div>;
  }
  return <Visualizer {...(content.visualizer ?? {})} onObjectiveComplete={onObjectiveComplete} />;
}
