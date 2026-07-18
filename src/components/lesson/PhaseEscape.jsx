// src/components/lesson/PhaseEscape.jsx
// Section 4.1: "A timed challenge applying the concept under pressure."
// Reuses Repair's chrome (Section 2.3). Configured from lesson.content.visualizerEscape /
// .terminalEscape if the lesson defines a harder/different scenario for the timed
// challenge, falling back to the same .visualizer / .terminal used by Repair
// (see CONTENT-GUIDE.md). The timer itself is rendered by PhaseContainer's Indicator.
import { getVisualizer } from '../../utils/visualizerDispatch.js';
import TerminalSimulator from '../visualizers/TerminalSimulator.jsx';

export default function PhaseEscape({ lesson, onObjectiveComplete }) {
  const content = typeof lesson.content === 'object' && lesson.content ? lesson.content : {};

  if (lesson.presentationMode === 'terminal') {
    return (
      <TerminalSimulator
        interactionType={lesson.terminalInteraction}
        {...(content.terminalEscape ?? content.terminal ?? {})}
        onObjectiveComplete={onObjectiveComplete}
      />
    );
  }
  const Visualizer = getVisualizer(lesson.visualComponent);
  if (!Visualizer) {
    return <div style={{ opacity: 0.6 }}>No visualizer registered for '{lesson.visualComponent}'.</div>;
  }
  return <Visualizer {...(content.visualizerEscape ?? content.visualizer ?? {})} onObjectiveComplete={onObjectiveComplete} />;
}
