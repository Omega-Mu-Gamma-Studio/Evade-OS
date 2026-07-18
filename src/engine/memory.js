// src/engine/memory.js
// Pure JS. Paging / segmentation / thrashing simulator. Section 9 of PRD.

/**
 * @param {import('./types').MemoryPage[]} pages
 * @param {import('./types').MemorySegment[]} segments
 * @param {'pageFault'|'segmentationFault'|'swapOut'|'swapIn'} event
 * @param {{pageId?: number, algorithm?: 'fifo'|'optimal'|'lru'|'clock', frameCount?: number}} [opts]
 * @returns {{ pages: import('./types').MemoryPage[], segments: import('./types').MemorySegment[], event: string, evicted: number|null, log: string[] }}
 */
export function simulateMemory(pages, segments, event, opts = {}) {
  const pgs = pages.map((p) => ({ ...p }));
  const segs = segments.map((s) => ({ ...s }));
  const log = [];
  let evicted = null;

  if (event === 'pageFault') {
    const target = pgs.find((p) => p.id === opts.pageId) ?? pgs.find((p) => !p.valid);
    const usedFrames = pgs.filter((p) => p.valid).map((p) => p.frame);
    const frameCount = opts.frameCount ?? 4;
    if (usedFrames.length < frameCount) {
      const freeFrame = [...Array(frameCount).keys()].find((f) => !usedFrames.includes(f));
      if (target) {
        target.valid = true;
        target.frame = freeFrame;
        target.referenced = true;
        log.push(`Page ${target.id} loaded into frame ${freeFrame}.`);
      }
    } else {
      // eviction needed
      const algorithm = opts.algorithm ?? 'fifo';
      const resident = pgs.filter((p) => p.valid);
      let victim;
      if (algorithm === 'lru' || algorithm === 'fifo') {
        victim = resident[0]; // placeholder ordering; real recency tracking is a content-phase task
      } else {
        victim = resident.find((p) => !p.referenced) ?? resident[0];
      }
      if (victim) {
        evicted = victim.id;
        const freedFrame = victim.frame;
        victim.valid = false;
        victim.frame = null;
        if (target) {
          target.valid = true;
          target.frame = freedFrame;
          target.referenced = true;
        }
        log.push(`Page ${victim.id} evicted (${algorithm}) from frame ${freedFrame}; page ${target?.id} loaded.`);
      }
    }
  } else if (event === 'segmentationFault') {
    const seg = segs[0];
    log.push(seg ? `Access outside segment ${seg.id} bounds [${seg.base}, ${seg.base + seg.limit}).` : 'Segmentation fault.');
  } else if (event === 'swapOut') {
    const target = pgs.find((p) => p.id === opts.pageId && p.valid);
    if (target) {
      target.valid = false;
      target.dirty = false;
      log.push(`Page ${target.id} swapped out to disk.`);
    }
  } else if (event === 'swapIn') {
    const target = pgs.find((p) => p.id === opts.pageId && !p.valid);
    if (target) {
      target.valid = true;
      log.push(`Page ${target.id} swapped in from disk.`);
    }
  }

  return { pages: pgs, segments: segs, event, evicted, log };
}
