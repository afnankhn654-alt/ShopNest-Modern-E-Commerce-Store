import React, { useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { Product } from '../types';
import { searchProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';
import { useTheme } from '../contexts/ThemeContext';
import { useLoading } from '../contexts/LoadingContext';
import { MagnifyingGlassIcon, ArrowTrendingUpIcon, XMarkIcon } from '@heroicons/react/24/outline';

const { useLocation, Link, useNavigate } = ReactRouterDOM as any;

const popularSearches = ["Water Bottle", "Running Shoes", "Wireless Earbuds", "Yoga Mat", "Coffee", "Smart Watch"];

const SearchResultsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get('q') || '';
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const { layout } = useTheme();
  const { startLoading, stopLoading } = useLoading();
  const [searchTerm, setSearchTerm] = useState(query);

  useEffect(() => {
    setSearchTerm(query);
  }, [query]);

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  // --- Creative Search Landing Page ---
  if (!query) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen h-full w-full bg-gray-900 text-white p-4 overflow-hidden relative">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0 opacity-40">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
           <style>{`@keyframes move-bg { to { background-position: 100% 100%; } }`}</style>
           <div 
             className="absolute inset-0 bg-repeat"
             style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)`,
                backgroundSize: '2rem 2rem',
                animation: 'move-bg 200s linear infinite'
             }}
           ></div>
        </div>
        
        <button 
          onClick={() => navigate(-1)} 
          className="absolute top-6 right-6 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors"
          aria-label="Go back"
        >
          <XMarkIcon className="h-6 w-6 text-white"/>
        </button>

        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl w-full">
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                Search the Cosmos
            </h1>
            <p className="text-lg text-gray-400 mb-12">Discover products with the power of AI-driven search.</p>

            <form onSubmit={handleSearch} className="w-full relative group mb-24">
              <MagnifyingGlassIcon className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-500 group-focus-within:text-primary-400 transition-colors pointer-events-none" />
              <input
                type="text"
                className="w-full pl-16 pr-6 py-5 rounded-full border-2 border-gray-700 bg-gray-800/50 backdrop-blur-sm focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 text-xl shadow-2xl shadow-black/50 transition-all placeholder-gray-500 outline-none"
                placeholder="What are you looking for?"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
            </form>

            <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in">
                <span className="text-sm font-bold text-gray-500 uppercase flex items-center gap-1.5"><ArrowTrendingUpIcon className="h-4 w-4"/> Trending:</span>
                {popularSearches.slice(0, 4).map(term => (
                    <button
                      key={term}
                      onClick={() => navigate(`/search?q=${encodeURIComponent(term)}`)}
                      className="px-4 py-1.5 bg-gray-700/50 border border-gray-600 hover:border-primary-500 text-gray-300 hover:text-white rounded-full text-sm font-medium transition-all shadow-sm hover:shadow-lg hover:shadow-primary-500/10"
                    >
                      {term}
                    </button>
                ))}
            </div>
        </div>
      </div>
    );
  }

  // --- Creative Search Results Page ---
  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      {/* Header with refined search */}
      <header className="sticky top-16 md:top-0 z-30 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg shadow-sm border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="container mx-auto flex justify-center">
            <form onSubmit={handleSearch} className="w-full max-w-2xl relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-full bg-gray-200 dark:bg-gray-700 border-none focus:ring-2 focus:ring-primary-500 text-base"
              />
            </form>
        </div>
      </header>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 px-1">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Results for "{query}"</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">{loading ? 'Searching...' : `${products.length} products found`}</p>
        </div>

        {loading ? (
          <Spinner />
        ) : products.length > 0 ? (
          // Masonry Layout
          <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-6 space-y-6">
            {products.map(product => (
              <div key={product.id} className="break-inside-avoid">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="bg-gray-200 dark:bg-gray-800 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <MagnifyingGlassIcon className="h-10 w-10 text-gray-400 dark:text-gray-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No results found</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
              We couldn't find any products matching "{query}". Try checking your spelling or using different keywords.
            </p>
            <Link to="/" className="inline-flex items-center justify-center bg-primary-600 text-white font-bold py-3 px-8 rounded-full hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-transform">
              Browse All Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;