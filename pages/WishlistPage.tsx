import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';
import { useLocation } from '../contexts/LocationContext';
import { Product } from '../types';
import { HeartIcon, TrashIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

const { Link } = ReactRouterDOM as any;

const WishlistPage: React.FC = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { formatPrice } = useLocation();

  const handleMoveToCart = (product: Product) => {
    // Adds the first variant to the cart for simplicity.
    // A real app might show a modal to select variants.
    const variant = product.variants[0];
    if (variant) {
      addToCart(product, variant, 1);
      removeFromWishlist(product.id);
    } else {
        alert("This product has no variants available to add to cart.");
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 md:p-8">
        <h1 className="text-3xl font-bold mb-6">Your Wishlist</h1>
        {wishlistItems.length === 0 ? (
          <div className="text-center py-10">
            <HeartIcon className="h-16 w-16 mx-auto text-gray-400" />
            <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">Your wishlist is empty.</p>
            <p className="mt-2 text-gray-500">Add your favorite items to your wishlist to keep track of them.</p>
            <Link to="/" className="mt-6 inline-block bg-primary-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors duration-300">
              Discover Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map(product => (
              <div key={product.id} className="bg-gray-50 dark:bg-gray-900/50 rounded-lg shadow-md overflow-hidden group transition-shadow duration-300 flex flex-col">
                <Link to={`/product/${product.id}`} className="block">
                  <div className="relative">
                    <div 
                      className="w-full h-56 bg-cover bg-center" 
                      style={{ backgroundImage: `url(${product.images[0].image_url})`}} 
                      role="img"
                      aria-label={product.images[0].alt_text}
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">{product.brand}</p>
                    <h3 className="mt-1 font-semibold text-lg text-gray-800 dark:text-gray-200 group-hover:text-primary-600 dark:group-hover:text-primary-400 truncate">{product.title}</h3>
                    <p className="mt-2 text-xl font-bold text-primary-600 dark:text-primary-400">{formatPrice(product.final_price)}</p>
                  </div>
                </Link>
                <div className="mt-auto p-4 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row gap-2">
                   <button 
                    onClick={() => handleMoveToCart(product)}
                    className="flex-1 w-full text-sm inline-flex items-center justify-center px-3 py-2 bg-primary-600 text-white font-semibold rounded-md hover:bg-primary-700 transition-colors"
                  >
                    <ShoppingCartIcon className="h-4 w-4 mr-2"/>
                    Move to Cart
                  </button>
                  <button 
                    onClick={() => removeFromWishlist(product.id)}
                    className="w-full sm:w-auto text-sm inline-flex items-center justify-center px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;