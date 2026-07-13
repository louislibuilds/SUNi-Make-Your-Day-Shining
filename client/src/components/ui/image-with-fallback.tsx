import { useState } from 'react';
import { Package } from 'lucide-react';
import { PRODUCT_PLACEHOLDER_IMAGE, resolveProductImage } from '../../lib/media';

type ImageWithFallbackProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  showIconFallback?: boolean;
};

export function ImageWithFallback({
  src,
  alt,
  style,
  className,
  showIconFallback = true,
  ...rest
}: ImageWithFallbackProps) {
  const [didError, setDidError] = useState(false);
  const resolved = resolveProductImage(src);

  if (!src || didError) {
    if (!showIconFallback) {
      return (
        <img
          src={PRODUCT_PLACEHOLDER_IMAGE}
          alt={alt ?? 'Product preview'}
          className={className}
          style={style}
          {...rest}
        />
      );
    }

    return (
      <div
        className={`flex items-center justify-center bg-[#efece6] text-[#6b6b68] ${className ?? ''}`}
        style={style}
        role="img"
        aria-label={alt ?? 'Product preview'}
      >
        <Package className="h-10 w-10 opacity-40" strokeWidth={1.25} />
      </div>
    );
  }

  return (
    <img
      src={resolved}
      alt={alt}
      className={className}
      style={style}
      {...rest}
      onError={() => setDidError(true)}
    />
  );
}
