
import React from 'react';
import { StarIcon } from '@heroicons/react/24/solid';

interface RatingProps {
  rating: number;
  reviews_count?: number;
  size?: 'sm' | 'md';
}

const Rating: React.FC<RatingProps> = ({ rating, reviews_count, size = 'md' }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  const starSize = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5';
  const textSize = size === 'sm' ? 'text-xs' : 'text-sm';

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <StarIcon key={`full-${i}`} className={`${starSize} text-yellow-400`} />
      ))}
      {halfStar && <StarIcon key="half" className={`${starSize} text-yellow-400`} style={{ clipPath: 'inset(0 50% 0 0)' }} />}
      {[...Array(emptyStars)].map((_, i) => (
        <StarIcon key={`empty-${i}`} className={`${starSize} text-gray-300 dark:text-gray-600`} />
      ))}
      {reviews_count && <span className={`ml-2 ${textSize} text-gray-500 dark:text-gray-400`}>({reviews_count})</span>}
    </div>
  );
};

export default Rating;