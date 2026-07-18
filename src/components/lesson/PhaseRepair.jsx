// src/components/lesson/PhaseRepair.jsx
// Section 4.1: "The system resets. The player does the work." Mounts the
// lesson's dispatched Visual primitive or TerminalSimulator; the primitive
// itself calls onObjectiveComplete once its interaction loop is satisfied.
import { getVisualizer } from '../../utils/visualizerDispatch.js';
import TerminalSimulator from '../visualizers/TerminalSimulator.jsx';

export default function PhaseRepair({ lesson, onObjectiveComplete }) {
  if (lesson.presentationMode === 'terminal') {
    return <TerminalSimulator interactionType={lesson.terminalInteraction} onObjectiveComplete={onObjectiveComplete} />;
  }
  const Visualizer = getVisualizer(lesson.visualComponent);
  if (!Visualizer) {
    return <div style={{ opacity: 0.6 }}>No visualizer registered for '{lesson.visualComponent}'.</div>;
  }
  return <Visualizer onObjectiveComplete={onObjectiveComplete} />;
}
