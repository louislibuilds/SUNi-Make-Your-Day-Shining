/** Shared product / category preview ??no external image hosts */
export const PRODUCT_PLACEHOLDER_IMAGE =
  'data:image/svg+xml,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
      <rect fill="#efece6" width="400" height="300"/>
      <text x="200" y="155" text-anchor="middle" fill="#6b6b68" font-family="system-ui,sans-serif" font-size="14">SUNi</text>
    </svg>`
  );

export function resolveProductImage(url?: string | null): string {
  if (!url || url.includes('unsplash.com')) {
    return PRODUCT_PLACEHOLDER_IMAGE;
  }
  return url;
}
