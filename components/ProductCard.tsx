import React, { memo } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { Product } from '../types';
import { useTheme } from '../contexts/ThemeContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';
import { useLocation } from '../contexts/LocationContext';
import { useNotification } from '../contexts/NotificationContext';
import Rating from './Rating';
import { getOptimizedImageUrl } from '../utils/imageUtils';
import { 
    HeartIcon as HeartIconOutline, 
    SparklesIcon,
    ShoppingCartIcon,
    CpuChipIcon,
    CameraIcon,
    PaintBrushIcon,
    CubeIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

const { Link } = ReactRouterDOM as any;

interface ProductCardProps {
  product: Product;
  isSimple?: boolean;
}

// Helper for dynamic key features
const getKeyFeatures = (category: string) => {
    switch(category) {
        case "Electronics":
        case "Gadgets":
            return [
                { icon: CpuChipIcon, text: "Advanced Chipset" },
                { icon: CameraIcon, text: "High-Res Display" },
            ];
        case "Fashion":
        case "Accessories":
             return [
                { icon: PaintBrushIcon, text: "Modern Design" },
                { icon: CubeIcon, text: "Premium Fabric" },
            ];
        default:
            return [
                { icon: CubeIcon, text: "Durable Materials" },
                { icon: SparklesIcon, text: "Easy to Clean" },
            ];
    }
}


const ProductCard: React.FC<ProductCardProps> = ({ product, isSimple = false }) => {
  const { layout } = useTheme();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { addNotification } = useNotification();
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

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const variant = product.variants[0];
    if (variant) {
        addToCart(product, variant, 1);
        addNotification({
            type: 'success',
            title: 'Added to Cart!',
            message: `1 x ${product.title}`,
            productImage: product.images[0].image_url
        });
    }
  };
  
  const WishlistButton = (
    <button
      onClick={handleWishlistToggle}
      className="absolute top-3 right-3 p-2 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-full text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors z-20"
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

  const displayImage = getOptimizedImageUrl(product.images[0].image_url, 600);
  
  // --- CREATIVE "SPEC SHEET" LIST VIEW ---
  if (layout === 'list' && !isSimple) {
    const keyFeatures = getKeyFeatures(product.category);
    
    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden group hover:shadow-xl transition-shadow duration-300 flex flex-col md:flex-row border border-transparent hover:border-primary-200 dark:hover:border-primary-800 relative">
            <div className="absolute top-4 right-4 z-20">
                 {WishlistButton}
            </div>
            {/* Image Section */}
            <div className="relative md:w-2/5 p-4 flex items-center justify-center">
                <Link to={`/product/${product.id}`} className="block w-full h-56 md:h-full">
                    <img 
                        src={displayImage}
                        alt={product.images[0].alt_text}
                        loading="lazy"
                        className="w-full h-full object-contain transform transition-transform duration-500 group-hover:scale-105"
                    />
                </Link>
            </div>
            
            {/* Details Section */}
            <div className="p-6 flex-1 flex flex-col justify-between bg-gray-50/50 dark:bg-gray-900/20 md:border-l border-gray-100 dark:border-gray-700/50">
                <div>
                  <Link to={`/product/${product.id}`} className="block">
                      <p className="text-sm font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wide">{product.brand}</p>
                      <h3 className="mt-1 font-bold text-xl text-gray-800 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{product.title}</h3>
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{product.short_description}</p>
                  </Link>
                  
                  {/* Key Features */}
                  <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
                    {keyFeatures.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                        <feature.icon className="h-5 w-5 text-gray-400"/>
                        <span>{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
                    <div className="flex-shrink-0">
                        <Rating rating={product.rating} reviews_count={product.reviews_count} size="sm" />
                        <div className="mt-2">
                            <span className="text-2xl font-extrabold text-gray-900 dark:text-white transition-colors duration-300 group-hover:text-primary-600 dark:group-hover:text-primary-400">{formatPrice(product.final_price)}</span>
                            {product.discount_pct > 0 && <span className="ml-2 text-sm text-gray-500 line-through">{formatPrice(product.price)}</span>}
                        </div>
                    </div>
                    <div className="w-full sm:w-auto relative">
                        <Link to={`/product/${product.id}`} className="w-full sm:w-auto block px-6 py-3 text-center border-2 border-primary-600 text-primary-600 dark:text-primary-400 font-bold rounded-lg transition-all duration-300 opacity-100 group-hover:opacity-0">
                           View Details
                        </Link>
                         <button 
                            onClick={handleAddToCart}
                            className="absolute inset-0 w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white font-bold rounded-lg transition-all duration-300 opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100"
                        >
                            <ShoppingCartIcon className="h-5 w-5" />
                           Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
  }


  // --- STANDARD GRID VIEW ---
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
        {isSimple ? (
          <div className="p-4">
            <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200 group-hover:text-primary-600 dark:group-hover:text-primary-400 truncate">{product.title}</h3>
            <p className="mt-2 text-xl font-bold text-gray-900 dark:text-white transition-colors duration-300 group-hover:text-primary-600 dark:group-hover:text-primary-400">{formatPrice(product.final_price)}</p>
          </div>
        ) : (
          <div className="p-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">{product.brand}</p>
            <h3 className="mt-1 font-semibold text-lg text-gray-800 dark:text-gray-200 group-hover:text-primary-600 dark:group-hover:text-primary-400 truncate">{product.title}</h3>
            {AiInsightBanner}
            <div className="mt-2 flex justify-between items-center">
              <p className="text-xl font-bold text-gray-900 dark:text-white transition-colors duration-300 group-hover:text-primary-600 dark:group-hover:text-primary-400">{formatPrice(product.final_price)}</p>
              <Rating rating={product.rating} />
            </div>
          </div>
        )}
      </Link>
    </div>
  );
};

export default memo(ProductCard);