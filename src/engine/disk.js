// src/engine/disk.js
// Pure JS. Disk head scheduling. Section 9 of PRD.

/**
 * @param {{id:string, cylinder:number}[]} requests
 * @param {'fcfs'|'sstf'|'scan'|'cscan'|'look'} algorithm
 * @param {{headStart?: number, diskSize?: number, direction?: 1|-1}} [opts]
 * @returns {{ order: {id:string, cylinder:number}[], totalSeek: number }}
 */
export function simulateDisk(requests, algorithm, opts = {}) {
  const headStart = opts.headStart ?? 50;
  const diskSize = opts.diskSize ?? 200;
  let direction = opts.direction ?? 1;
  const reqs = [...requests];
  let head = headStart;
  let totalSeek = 0;
  const order = [];

  const takeClosest = (pool) =>
    pool.reduce((a, b) => (Math.abs(a.cylinder - head) <= Math.abs(b.cylinder - head) ? a : b));

  if (algorithm === 'fcfs') {
    for (const r of reqs) {
      totalSeek += Math.abs(r.cylinder - head);
      head = r.cylinder;
      order.push(r);
    }
  } else if (algorithm === 'sstf') {
    const pool = [...reqs];
    while (pool.length) {
      const next = takeClosest(pool);
      totalSeek += Math.abs(next.cylinder - head);
      head = next.cylinder;
      order.push(next);
      pool.splice(pool.indexOf(next), 1);
    }
  } else if (algorithm === 'scan' || algorithm === 'look' || algorithm === 'cscan') {
    const sorted = [...reqs].sort((a, b) => a.cylinder - b.cylinder);
    const ahead = sorted.filter((r) => r.cylinder >= head);
    const behind = sorted.filter((r) => r.cylinder < head).reverse();
    let seq = direction === 1 ? [...ahead, ...behind] : [...behind, ...ahead];

    if (algorithm === 'scan') {
      const end = direction === 1 ? diskSize - 1 : 0;
      totalSeek += Math.abs(end - head);
      head = end;
      seq = direction === 1 ? [...ahead, ...behind] : [...behind, ...ahead];
    }
    if (algorithm === 'cscan' && direction === 1 && behind.length) {
      totalSeek += Math.abs(diskSize - 1 - head) + (diskSize - 1) + 0; // sweep to end, jump to 0
      head = 0;
    }

    for (const r of seq) {
      totalSeek += Math.abs(r.cylinder - head);
      head = r.cylinder;
      order.push(r);
    }
  }

  return { order, totalSeek };
}
