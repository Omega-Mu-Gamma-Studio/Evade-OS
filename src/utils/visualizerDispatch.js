// src/utils/visualizerDispatch.js
// Section 3.1/3.2: every Visual-mode lesson maps to exactly one of the eight
// fixed primitives via its `visualComponent` field; Terminal-mode lessons all
// route through the single TerminalSimulator, configured by `terminalInteraction`.
import HotspotDiagram from '../components/visualizers/HotspotDiagram.jsx';
import DragToken from '../components/visualizers/DragToken.jsx';
import DoorGate from '../components/visualizers/DoorGate.jsx';
import MultiAvatarPuzzle from '../components/visualizers/MultiAvatarPuzzle.jsx';
import ProcessViewer from '../components/visualizers/ProcessViewer.jsx';
import MemoryMapper from '../components/visualizers/MemoryMapper.jsx';
import DeadlockDetector from '../components/visualizers/DeadlockDetector.jsx';
import DiskScheduler from '../components/visualizers/DiskScheduler.jsx';

export const VISUALIZER_REGISTRY = {
  'hotspot-diagram': HotspotDiagram,
  'drag-token': DragToken,
  'door-gate': DoorGate,
  'multi-avatar-puzzle': MultiAvatarPuzzle,
  'process-viewer': ProcessViewer,
  'memory-mapper': MemoryMapper,
  'deadlock-detector': DeadlockDetector,
  'disk-scheduler': DiskScheduler,
};

export function getVisualizer(visualComponent) {
  return VISUALIZER_REGISTRY[visualComponent] ?? null;
}
