import Image from 'next/image';
import { Box, BoxProps } from '@chakra-ui/react';
import { getOptimizedImageUrl, getImageSizes, getAspectRatio } from '@/lib/image-utils';

interface OptimizedImageProps extends Omit<BoxProps, 'as' | 'fill'> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  breakpoint?: 'card' | 'hero' | 'gallery' | 'thumbnail';
  fill?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

/**
 * Optimized Image component that uses Next.js Image with Supabase CDN transformations
 * Automatically optimizes images for performance
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
  quality = 80,
  sizes,
  breakpoint = 'card',
  fill = false,
  objectFit = 'cover',
  onError,
  ...boxProps
}) => {
  // Get optimized URL with Supabase CDN transformations
  const optimizedSrc = getOptimizedImageUrl(
    src,
    width || 800,
    quality,
    'webp' // Prefer WebP for better compression
  );

  // Get responsive sizes if not provided
  const imageSizes = sizes || getImageSizes(breakpoint);

  // Calculate aspect ratio if height not provided
  const aspectRatio = height ? undefined : getAspectRatio(breakpoint);
  const calculatedHeight = height || (width ? width / (aspectRatio || 1) : undefined);

  // Fallback placeholder
  const placeholderSrc = 'https://placehold.co/800x600/e2e8f0/64748b?text=No+Image';

  if (fill) {
    return (
      <Box position="relative" width="100%" height="100%" overflow="hidden" {...boxProps}>
        <Image
          src={optimizedSrc || placeholderSrc}
          alt={alt}
          fill
          priority={priority}
          quality={quality}
          sizes={imageSizes}
          style={{ objectFit }}
          onError={onError}
          unoptimized={optimizedSrc?.includes('placehold.co') || optimizedSrc?.includes('via.placeholder.com')}
        />
      </Box>
    );
  }

  return (
    <Box position="relative" width={width} height={calculatedHeight} overflow="hidden" {...boxProps}>
      <Image
        src={optimizedSrc || placeholderSrc}
        alt={alt}
        width={width || 800}
        height={calculatedHeight || 600}
        priority={priority}
        quality={quality}
        sizes={imageSizes}
        style={{ objectFit, width: '100%', height: '100%' }}
        onError={onError}
        unoptimized={optimizedSrc?.includes('placehold.co') || optimizedSrc?.includes('via.placeholder.com')}
      />
    </Box>
  );
};

export default OptimizedImage;

