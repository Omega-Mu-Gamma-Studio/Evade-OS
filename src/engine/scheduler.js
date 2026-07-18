// src/engine/scheduler.js
// Pure JS. No React, no Konva. Section 9 of PRD.
/** @typedef {import('./types').Process} Process */

/**
 * @param {Process[]} processes
 * @param {'fcfs'|'sjf'|'rr'|'priority'} algorithm
 * @param {number} [timeQuantum]
 * @returns {{ timeline: {id:string, start:number, end:number}[], processes: Process[], avgWaitTime: number, avgTurnaroundTime: number, avgResponseTime: number }}
 */
export function simulateScheduling(processes, algorithm, timeQuantum = 2) {
  const procs = processes.map((p) => ({ ...p, remainingTime: p.remainingTime ?? p.burstTime, waitTime: 0, turnaroundTime: 0, responseTime: -1 }));
  const timeline = [];
  let time = 0;

  const order = (arr) => [...arr].sort((a, b) => a.arrivalTime - b.arrivalTime);

  if (algorithm === 'fcfs') {
    for (const p of order(procs)) {
      time = Math.max(time, p.arrivalTime);
      if (p.responseTime === -1) p.responseTime = time - p.arrivalTime;
      timeline.push({ id: p.id, start: time, end: time + p.burstTime });
      time += p.burstTime;
      p.waitTime = timeline[timeline.length - 1].start - p.arrivalTime;
      p.turnaroundTime = time - p.arrivalTime;
      p.remainingTime = 0;
    }
  } else if (algorithm === 'sjf') {
    const remaining = order(procs);
    const done = [];
    while (remaining.length) {
      const ready = remaining.filter((p) => p.arrivalTime <= time);
      const pool = ready.length ? ready : [remaining[0]];
      const next = pool.reduce((a, b) => (a.burstTime <= b.burstTime ? a : b));
      time = Math.max(time, next.arrivalTime);
      if (next.responseTime === -1) next.responseTime = time - next.arrivalTime;
      timeline.push({ id: next.id, start: time, end: time + next.burstTime });
      time += next.burstTime;
      next.waitTime = timeline[timeline.length - 1].start - next.arrivalTime;
      next.turnaroundTime = time - next.arrivalTime;
      next.remainingTime = 0;
      remaining.splice(remaining.indexOf(next), 1);
      done.push(next);
    }
  } else if (algorithm === 'priority') {
    const remaining = order(procs);
    while (remaining.length) {
      const ready = remaining.filter((p) => p.arrivalTime <= time);
      const pool = ready.length ? ready : [remaining[0]];
      const next = pool.reduce((a, b) => (a.priority <= b.priority ? a : b));
      time = Math.max(time, next.arrivalTime);
      if (next.responseTime === -1) next.responseTime = time - next.arrivalTime;
      timeline.push({ id: next.id, start: time, end: time + next.burstTime });
      time += next.burstTime;
      next.waitTime = timeline[timeline.length - 1].start - next.arrivalTime;
      next.turnaroundTime = time - next.arrivalTime;
      next.remainingTime = 0;
      remaining.splice(remaining.indexOf(next), 1);
    }
  } else if (algorithm === 'rr') {
    const queue = [];
    const arrivals = order(procs);
    let ai = 0;
    time = arrivals.length ? arrivals[0].arrivalTime : 0;
    queue.push(arrivals[ai++]);
    while (queue.length) {
      const p = queue.shift();
      if (p.arrivalTime > time) time = p.arrivalTime;
      if (p.responseTime === -1) p.responseTime = time - p.arrivalTime;
      const slice = Math.min(timeQuantum, p.remainingTime);
      timeline.push({ id: p.id, start: time, end: time + slice });
      time += slice;
      p.remainingTime -= slice;
      while (ai < arrivals.length && arrivals[ai].arrivalTime <= time) queue.push(arrivals[ai++]);
      if (p.remainingTime > 0) queue.push(p);
      else p.turnaroundTime = time - p.arrivalTime;
      if (queue.length === 0 && ai < arrivals.length) {
        time = arrivals[ai].arrivalTime;
        queue.push(arrivals[ai++]);
      }
    }
    for (const p of procs) {
      const slices = timeline.filter((t) => t.id === p.id);
      const busy = slices.reduce((s, t) => s + (t.end - t.start), 0);
      p.waitTime = p.turnaroundTime - busy;
    }
  }

  const avg = (fn) => procs.reduce((s, p) => s + fn(p), 0) / (procs.length || 1);
  return {
    timeline,
    processes: procs,
    avgWaitTime: avg((p) => p.waitTime),
    avgTurnaroundTime: avg((p) => p.turnaroundTime),
    avgResponseTime: avg((p) => p.responseTime),
  };
}
