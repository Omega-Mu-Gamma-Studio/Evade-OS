// src/components/lesson/PhaseEscape.jsx
// Section 4.1: "A timed challenge applying the concept under pressure."
// Reuses Repair's chrome (Section 2.3, minimum-viable Escape distinctiveness);
// the timer itself is rendered by PhaseContainer's Indicator, driven from here.
import { getVisualizer } from '../../utils/visualizerDispatch.js';
import TerminalSimulator from '../visualizers/TerminalSimulator.jsx';

export default function PhaseEscape({ lesson, onObjectiveComplete }) {
  if (lesson.presentationMode === 'terminal') {
    return <TerminalSimulator interactionType={lesson.terminalInteraction} onObjectiveComplete={onObjectiveComplete} />;
  }
  const Visualizer = getVisualizer(lesson.visualComponent);
  if (!Visualizer) {
    return <div style={{ opacity: 0.6 }}>No visualizer registered for '{lesson.visualComponent}'.</div>;
  }
  return <Visualizer onObjectiveComplete={onObjectiveComplete} />;
}
