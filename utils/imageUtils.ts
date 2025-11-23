
/**
 * Optimizes Unsplash image URLs by adjusting the width parameter.
 * This significantly reduces download size for thumbnails and previews.
 * 
 * @param url The original image URL
 * @param width The desired width (default 600px)
 * @returns The optimized URL
 */
export const getOptimizedImageUrl = (url: string, width: number = 600): string => {
  if (!url) return '';
  
  // Only optimize Unsplash URLs
  if (url.includes('unsplash.com')) {
    if (url.includes('w=')) {
      return url.replace(/w=\d+/, `w=${width}`);
    } else {
      const separator = url.includes('?') ? '&' : '?';
      return `${url}${separator}w=${width}`;
    }
  }
  
  return url;
};
