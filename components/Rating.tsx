
import React from 'react';
import { StarIcon } from '@heroicons/react/24/solid';

interface RatingProps {
  rating: number;
  reviews_count?: number;
}

const Rating: React.FC<RatingProps> = ({ rating, reviews_count }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <StarIcon key={`full-${i}`} className="h-5 w-5 text-yellow-400" />
      ))}
      {halfStar && <StarIcon key="half" className="h-5 w-5 text-yellow-400" style={{ clipPath: 'inset(0 50% 0 0)' }} />}
      {[...Array(emptyStars)].map((_, i) => (
        <StarIcon key={`empty-${i}`} className="h-5 w-5 text-gray-300 dark:text-gray-600" />
      ))}
      {reviews_count && <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">({reviews_count})</span>}
    </div>
  );
};

export default Rating;
