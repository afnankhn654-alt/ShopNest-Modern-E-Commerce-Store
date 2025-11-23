import React, { useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { Product } from '../types';
import { searchProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';
import { useTheme } from '../contexts/ThemeContext';
import { useLoading } from '../contexts/LoadingContext';
import { Squares2X2Icon, Bars3Icon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const { useLocation, Link } = ReactRouterDOM as any;

const SearchResultsPage: React.FC = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q') || '';
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { layout, setLayout } = useTheme();
  const { startLoading, stopLoading } = useLoading();

  useEffect(() => {
    const loadProducts = async () => {
      if (!query) {
        setProducts([]);
        setLoading(false);
        return;
      }
      startLoading();
      setLoading(true);
      try {
        const data = await searchProducts(query);
        setProducts(data);
      } catch (error) {
        console.error("Failed to search products:", error);
      } finally {
        setLoading(false);
        stopLoading();
      }
    };
    loadProducts();
  }, [query, startLoading, stopLoading]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Search Results for "{query}"</h1>
            <p className="text-gray-500 dark:text-gray-400">{products.length} items found</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
              <button
                onClick={() => setLayout('grid')}
                className={`p-2 rounded-l-md ${layout === 'grid' ? 'bg-primary-500 text-white' : 'bg-transparent text-gray-600 dark:text-gray-300'}`}
              >
                <Squares2X2Icon className="h-5 w-5" />
              </button>
              <button
                onClick={() => setLayout('list')}
                className={`p-2 rounded-r-md ${layout === 'list' ? 'bg-primary-500 text-white' : 'bg-transparent text-gray-600 dark:text-gray-300'}`}
              >
                <Bars3Icon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <Spinner />
      ) : products.length > 0 ? (
        <div className={
          layout === 'grid'
            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            : "flex flex-col gap-6"
        }>
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
         <div className="text-center py-10">
          <MagnifyingGlassIcon className="h-16 w-16 mx-auto text-gray-400" />
          <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">No products found for "{query}".</p>
          <p className="mt-2 text-gray-500">Try searching for something else or browse all our products.</p>
          <Link to="/products" className="mt-6 inline-block bg-primary-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors duration-300">
            Browse All Products
          </Link>
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;