// src/engine/syscall.js
// Pure JS. Minimal system-call dispatcher backing TerminalSimulator 'type' mode
// (lessons 1.7, 5.3, 5.7, etc). Real per-lesson command sets are content-phase work —
// this provides the shape/behavior the UI needs to be fully clickable/typable now.

const REGISTRY = {
  fork: () => ({ ok: true, output: 'Child process created. PID assigned.' }),
  exec: (arg) => ({ ok: true, output: `Replacing process image with '${arg ?? '<program>'}'.` }),
  exit: () => ({ ok: true, output: 'Process terminated. Resources released.' }),
  wait: () => ({ ok: true, output: 'Parent blocked until child terminates.' }),
  ps: () => ({ ok: true, output: 'PID  STATE     CMD\n1    running   init\n2    ready     shell' }),
  kill: (arg) => ({ ok: true, output: `Signal sent to PID ${arg ?? '<pid>'}.` }),
  mount: (arg) => ({ ok: true, output: `Filesystem mounted at ${arg ?? '<path>'}.` }),
  chmod: (arg) => ({ ok: true, output: `Permissions updated: ${arg ?? '<mode> <path>'}.` }),
};

/**
 * @param {string} input raw typed command line, e.g. "fork" or "exec myprogram"
 * @returns {{ ok: boolean, output: string }}
 */
export function runSyscall(input) {
  const [cmd, ...rest] = input.trim().split(/\s+/);
  const handler = REGISTRY[cmd];
  if (!handler) return { ok: false, output: `Unknown system call: '${cmd}'.` };
  return handler(rest.join(' '));
}

export const AVAILABLE_SYSCALLS = Object.keys(REGISTRY);
