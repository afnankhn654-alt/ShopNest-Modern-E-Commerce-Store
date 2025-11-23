import React, { memo } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { Product } from '../types';
import { useTheme } from '../contexts/ThemeContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useLocation } from '../contexts/LocationContext';
import Rating from './Rating';
import { getOptimizedImageUrl } from '../utils/imageUtils';
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid, SparklesIcon } from '@heroicons/react/24/solid';

const { Link } = ReactRouterDOM as any;

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { layout } = useTheme();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { formatPrice } = useLocation();

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const WishlistButton = (
    <button
      onClick={handleWishlistToggle}
      className="absolute top-2 right-2 p-2 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-full text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors z-10"
      aria-label="Add to wishlist"
    >
      {isInWishlist(product.id) ? (
        <HeartIconSolid className="h-6 w-6 text-red-500" />
      ) : (
        <HeartIconOutline className="h-6 w-6" />
      )}
    </button>
  );

  const AiInsightBanner = product.trending_insight && (
    <div className="mt-2 p-2 bg-primary-50 dark:bg-primary-900/30 rounded-md text-xs text-primary-700 dark:text-primary-300 flex items-center space-x-2">
      <SparklesIcon className="h-4 w-4"/>
      <span>{product.trending_insight}</span>
    </div>
  );

  // Optimize image size for cards (600px is enough for high DPI screens @ 300px display width)
  const displayImage = getOptimizedImageUrl(product.images[0].image_url, 600);

  if (layout === 'list') {
    return (
      <div className="relative flex flex-col sm:flex-row items-start bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 w-full">
        {WishlistButton}
        <Link to={`/product/${product.id}`} className="block w-full sm:w-1/3 flex-shrink-0 h-48 sm:h-auto">
          <img 
            src={displayImage}
            alt={product.images[0].alt_text}
            loading="lazy"
            width="600"
            height="600"
            className="w-full h-full object-cover"
          />
        </Link>
        <div className="p-6 flex flex-col justify-between h-full w-full">
          <div>
            <div className="uppercase tracking-wide text-sm text-primary-500 font-semibold">{product.brand}</div>
            <Link to={`/product/${product.id}`} className="block mt-1 text-lg leading-tight font-medium text-black dark:text-white hover:underline">{product.title}</Link>
            <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm">{product.short_description}</p>
            {AiInsightBanner}
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-baseline">
                <span className="text-xl font-bold text-primary-600 dark:text-primary-400">{formatPrice(product.final_price)}</span>
                {product.discount_pct > 0 && <span className="ml-2 text-sm text-gray-500 line-through">{formatPrice(product.price)}</span>}
            </div>
            <Rating rating={product.rating} reviews_count={product.reviews_count} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <Link to={`/product/${product.id}`} className="block w-full h-56">
          <img 
             src={displayImage}
             alt={product.images[0].alt_text}
             loading="lazy"
             width="600"
             height="600"
             className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
           />
           {product.discount_pct > 0 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
              -{product.discount_pct}%
            </div>
          )}
        </Link>
        {WishlistButton}
        </div>
        <Link to={`/product/${product.id}`}>
        <div className="p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">{product.brand}</p>
          <h3 className="mt-1 font-semibold text-lg text-gray-800 dark:text-gray-200 group-hover:text-primary-600 dark:group-hover:text-primary-400 truncate">{product.title}</h3>
          {AiInsightBanner}
          <div className="mt-2 flex justify-between items-center">
            <p className="text-xl font-bold text-primary-600 dark:text-primary-400">{formatPrice(product.final_price)}</p>
            <Rating rating={product.rating} />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default memo(ProductCard);