/**
 * Product / category preview images — fully generated, no external image hosts.
 *
 * When a product has no real image (or only a legacy stock URL), we render a
 * deterministic placeholder derived from a seed so each item gets its own
 * colour and initials. This keeps the catalogue looking intentional and varied
 * while staying offline-friendly.
 */

type Palette = { from: string; to: string; ink: string };

const PALETTES: Palette[] = [
  { from: '#e9e4da', to: '#d6c9b4', ink: '#8a7a58' }, // warm sand
  { from: '#dbe6e5', to: '#b6cdca', ink: '#3f6b6f' }, // teal mist
  { from: '#efe6da', to: '#d8bd97', ink: '#a07c44' }, // soft gold
  { from: '#e3e7df', to: '#c1cdb7', ink: '#5b6b4b' }, // sage
  { from: '#ede1db', to: '#d9b6a4', ink: '#a5624a' }, // terracotta
  { from: '#e4e2e8', to: '#c4c0cd', ink: '#5f5a6b' }, // lilac grey
  { from: '#dfe4ea', to: '#b6c2d1', ink: '#4a5b70' }, // dusk blue
];

function hashSeed(seed: string | number): number {
  const s = String(seed);
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function initials(label?: string): string {
  if (!label) return 'SUNi';
  const words = label
    .trim()
    .split(/\s+/)
    .filter((w) => /^[a-z0-9]/i.test(w)) // skip tokens like "&"
    .slice(0, 2);
  const chars = words.map((w) => w.charAt(0).toUpperCase()).join('');
  return chars || 'SUNi';
}

/** Deterministic SVG placeholder as a data URI. Same seed → same image. */
export function generatePlaceholder(seed: string | number, label?: string): string {
  const h = hashSeed(seed);
  const p = PALETTES[h % PALETTES.length];
  const angle = h % 2 === 0 ? 135 : 45;
  const text = escapeXml(initials(label));
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
    <defs>
      <linearGradient id="g" gradientTransform="rotate(${angle})">
        <stop offset="0%" stop-color="${p.from}"/>
        <stop offset="100%" stop-color="${p.to}"/>
      </linearGradient>
    </defs>
    <rect width="600" height="600" fill="url(#g)"/>
    <text x="300" y="330" text-anchor="middle" fill="${p.ink}" fill-opacity="0.5" font-family="Georgia, 'Times New Roman', serif" font-size="200" font-weight="600">${text}</text>
    <text x="300" y="548" text-anchor="middle" fill="${p.ink}" fill-opacity="0.75" font-family="system-ui, sans-serif" font-size="22" letter-spacing="6">SUNi</text>
  </svg>`;
  return 'data:image/svg+xml,' + encodeURIComponent(svg);
}

/** Generic fallback (no seed available), e.g. hero art. */
export const PRODUCT_PLACEHOLDER_IMAGE = generatePlaceholder('suni-default', 'SUNi');

function isUsableImage(url?: string | null): boolean {
  if (!url) return false;
  if (url.startsWith('data:')) return false; // legacy inline placeholder
  if (url.includes('unsplash.com')) return false; // dropped stock host
  return true;
}

/**
 * Resolve the best image to show. Real URLs pass through; otherwise a seeded
 * placeholder is generated (or the generic one if no seed is provided).
 */
export function resolveProductImage(
  url?: string | null,
  seed?: string | number,
  label?: string,
): string {
  if (isUsableImage(url)) return url as string;
  if (seed !== undefined && seed !== null && seed !== '') {
    return generatePlaceholder(seed, label);
  }
  return PRODUCT_PLACEHOLDER_IMAGE;
}
