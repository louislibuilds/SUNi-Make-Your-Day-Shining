import { useState } from 'react';
import { resolveProductImage } from '../../lib/media';

type ImageWithFallbackProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  /** Stable identifier used to generate a consistent placeholder colour. */
  seed?: string | number;
  /** Short label (e.g. product/category name) shown as initials on the placeholder. */
  label?: string;
};

export function ImageWithFallback({
  src,
  alt,
  style,
  className,
  seed,
  label,
  ...rest
}: ImageWithFallbackProps) {
  const [didError, setDidError] = useState(false);
  const requested = typeof src === 'string' ? src : undefined;
  const resolved = resolveProductImage(didError ? undefined : requested, seed, label);

  return (
    <img
      src={resolved}
      alt={alt ?? label ?? 'Product preview'}
      className={className}
      style={style}
      loading="lazy"
      {...rest}
      onError={() => setDidError(true)}
    />
  );
}
