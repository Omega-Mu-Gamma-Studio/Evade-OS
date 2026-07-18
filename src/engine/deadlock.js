// src/engine/deadlock.js
// Pure JS. Wait-for graph construction + cycle detection. Section 9 of PRD.

/**
 * @param {import('./types').Process[]} processes
 * @param {import('./types').Resource[]} resources
 * @returns {{ edges: {from:string, to:string}[], cycle: string[]|null, deadlocked: boolean }}
 */
export function detectDeadlock(processes, resources) {
  // Build a wait-for graph: process A -> process B if A needs a resource held by B.
  const edges = [];
  for (const res of resources) {
    for (const needer of res.neededBy ?? []) {
      for (const holder of res.heldBy ?? []) {
        if (needer.id !== holder.id) edges.push({ from: needer.id, to: holder.id });
      }
    }
  }

  const adjacency = {};
  for (const e of edges) {
    (adjacency[e.from] ??= []).push(e.to);
  }

  const visited = new Set();
  const stack = new Set();
  let cycle = null;

  function dfs(node, path) {
    if (cycle) return;
    visited.add(node);
    stack.add(node);
    for (const next of adjacency[node] ?? []) {
      if (stack.has(next)) {
        const start = path.indexOf(next);
        cycle = path.slice(start).concat(next);
        return;
      }
      if (!visited.has(next)) dfs(next, [...path, next]);
      if (cycle) return;
    }
    stack.delete(node);
  }

  for (const p of processes) {
    if (!visited.has(p.id)) dfs(p.id, [p.id]);
    if (cycle) break;
  }

  return { edges, cycle, deadlocked: !!cycle };
}
