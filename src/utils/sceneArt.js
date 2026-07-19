// src/utils/sceneArt.js
// Placeholder background for a top-down map scene (Hub, or a zoned realm's
// zone-select screen) until real art exists — see src/data/hub/sceneArt.js
// for where the real image path goes once it does.
//
// `tints` gives each realm/zone hotspot shown in this scene its own patch of
// color (its own accent primary), roughly where its hotspot sits, so the
// placeholder differentiates them instead of rendering one flat wash. This
// differentiation becomes automatic once real art replaces it — the
// realms/zones will just look different because they're drawn differently,
// same as SeeDS's campus/dorm scenes never needed per-building CSS tinting.
export function getSceneArt(artUrl, tints = [], bg = '#07070A') {
  if (artUrl) return `url('${artUrl}') center/cover`;
  if (tints.length === 0) return bg;
  const stops = tints.map((primary, i) => {
    const cx = ((i + 0.5) / tints.length) * 100;
    return `radial-gradient(circle at ${cx.toFixed(0)}% 50%, ${primary}2E, transparent 55%)`;
  });
  return `${stops.join(', ')}, ${bg}`;
}
