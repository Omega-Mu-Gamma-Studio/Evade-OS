// src/store/lessonStore.js
// Session state for whichever lesson is currently mounted in PhaseContainer.
// Owns the phase-gate rule (Section 2 of UI-IMPLEMENTATION.md):
//   dialogue plays -> dismissed -> interaction unlocks -> objective done -> Continue -> next phase
import { create } from 'zustand';

const HINT_FAILED_ATTEMPTS_THRESHOLD = 3; // TBD during tuning, per PRD 4.5 / UI doc Section 4
const HINT_IDLE_MS = 30000; // TBD during tuning

export const useLessonStore = create((set, get) => ({
  lessonId: null,
  phases: [],
  phaseIndex: 0,
  dialogueDismissed: false,
  objectiveComplete: false,
  failedAttempts: 0,
  hintActive: false,
  _idleTimer: null,

  loadLesson: (lessonData) => {
    get()._clearIdleTimer();
    set({
      lessonId: lessonData.id,
      phases: lessonData.phases,
      phaseIndex: 0,
      dialogueDismissed: false,
      objectiveComplete: false,
      failedAttempts: 0,
      hintActive: false,
    });
    get()._armIdleTimer();
  },

  currentPhase: () => {
    const { phases, phaseIndex } = get();
    return phases[phaseIndex] ?? null;
  },

  dismissDialogue: () => {
    get()._clearIdleTimer();
    set({ dialogueDismissed: true });
    get()._armIdleTimer();
  },

  markObjectiveComplete: () => {
    get()._clearIdleTimer();
    set({ objectiveComplete: true, hintActive: false });
  },

  registerFailedAttempt: () => {
    const attempts = get().failedAttempts + 1;
    set({ failedAttempts: attempts });
    if (attempts >= HINT_FAILED_ATTEMPTS_THRESHOLD) {
      set({ hintActive: true });
    }
  },

  dismissHint: () => set({ hintActive: false, failedAttempts: 0 }),

  advancePhase: () => {
    const { phaseIndex, phases } = get();
    if (phaseIndex >= phases.length - 1) return false; // lesson complete, caller should route out
    get()._clearIdleTimer();
    set({
      phaseIndex: phaseIndex + 1,
      dialogueDismissed: false,
      objectiveComplete: false,
      failedAttempts: 0,
      hintActive: false,
    });
    get()._armIdleTimer();
    return true;
  },

  isLastPhase: () => {
    const { phaseIndex, phases } = get();
    return phaseIndex === phases.length - 1;
  },

  // Hints auto-trigger on idle too, not just failed attempts (reactive, interrupts current phase).
  _armIdleTimer: () => {
    const timer = setTimeout(() => {
      const { dialogueDismissed, objectiveComplete } = get();
      if (dialogueDismissed && !objectiveComplete) set({ hintActive: true });
    }, HINT_IDLE_MS);
    set({ _idleTimer: timer });
  },
  _clearIdleTimer: () => {
    const t = get()._idleTimer;
    if (t) clearTimeout(t);
  },

  reset: () => {
    get()._clearIdleTimer();
    set({
      lessonId: null,
      phases: [],
      phaseIndex: 0,
      dialogueDismissed: false,
      objectiveComplete: false,
      failedAttempts: 0,
      hintActive: false,
      _idleTimer: null,
    });
  },
}));
