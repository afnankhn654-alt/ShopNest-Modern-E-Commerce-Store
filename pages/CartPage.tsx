import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useLocation } from '../contexts/LocationContext';
import { TrashIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';

const { Link, useNavigate } = ReactRouterDOM as any;

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const { formatPrice } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 md:p-8">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        {cartItems.length === 0 ? (
          <div className="text-center py-10">
            <ShoppingBagIcon className="h-16 w-16 mx-auto text-gray-400" />
            <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">Your Cart feels a little lonely. There is nothing here.</p>
            <Link to="/" className="mt-6 inline-block bg-primary-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors duration-300">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {cartItems.map(item => (
                  <li key={item.variant.variant_id} className="py-6 flex">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
                      <img src={item.product.images[0].image_url} alt={item.product.images[0].alt_text} className="h-full w-full object-cover object-center" />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                          <h3><Link to={`/product/${item.product.id}`}>{item.product.title}</Link></h3>
                          <p className="ml-4">{formatPrice(item.variant.price * item.quantity)}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{Object.values(item.variant.options).join(' / ')}</p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="flex items-center gap-3">
                           <button onClick={() => updateQuantity(item.variant.variant_id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors">-</button>
                           <span className="font-bold text-lg">{item.quantity}</span>
                           <button onClick={() => updateQuantity(item.variant.variant_id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors">+</button>
                        </div>
                        <div className="flex">
                          <button onClick={() => removeFromCart(item.variant.variant_id)} type="button" className="font-medium text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300 flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 p-2 rounded-md">
                            <TrashIcon className="h-4 w-4" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <button onClick={clearCart} className="mt-4 text-sm text-gray-500 hover:underline bg-gray-200 dark:bg-gray-700 p-2 rounded-md">Clear Cart</button>
            </div>
            <div className="lg:col-span-1">
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 sticky top-24">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">Order Summary</h2>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 dark:text-gray-300">Subtotal</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{formatPrice(cartTotal)}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 dark:text-gray-300">Shipping estimate</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{formatPrice(5)}</p>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex items-center justify-between">
                    <p className="text-base font-medium text-gray-900 dark:text-white">Order total</p>
                    <p className="text-base font-medium text-gray-900 dark:text-white">{formatPrice(cartTotal + 5)}</p>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/checkout')}
                  className="mt-6 w-full bg-primary-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors duration-300"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;