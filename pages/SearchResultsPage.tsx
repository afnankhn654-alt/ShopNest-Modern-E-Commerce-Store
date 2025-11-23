
import React, { useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { Product } from '../types';
import { searchProducts, fetchProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';
import { useTheme } from '../contexts/ThemeContext';
import { useLoading } from '../contexts/LoadingContext';
import { Squares2X2Icon, Bars3Icon, MagnifyingGlassIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';

const { useLocation, Link, useNavigate } = ReactRouterDOM as any;

const SearchResultsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get('q') || '';
  const [products, setProducts] = useState<Product[]>([]);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const { layout, setLayout } = useTheme();
  const { startLoading, stopLoading } = useLoading();
  const [searchTerm, setSearchTerm] = useState(query);

  // Sync internal state with URL query
  useEffect(() => {
    setSearchTerm(query);
  }, [query]);

  // Load results if query exists
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

  // Load suggested products if NO query exists (Landing State)
  useEffect(() => {
    if (!query) {
      const loadSuggestions = async () => {
        setLoading(true);
        try {
          // Fetch all and shuffle slightly to show random suggestions
          const all = await fetchProducts();
          const shuffled = [...all].sort(() => 0.5 - Math.random()).slice(0, 8);
          setSuggestedProducts(shuffled);
        } catch (error) {
          console.error("Failed to load suggestions", error);
        } finally {
          setLoading(false);
        }
      };
      loadSuggestions();
    }
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  // 1. EMPTY STATE / SEARCH LANDING PAGE
  if (!query) {
      const popularSearches = ["Water Bottle", "Running Shoes", "Wireless Earbuds", "Yoga Mat", "Coffee", "Smart Watch"];
      
      return (
          <div className="container mx-auto px-4 py-8 flex flex-col items-center">
              <div className="w-full max-w-2xl">
                  {/* Search Header */}
                  <div className="text-center mb-8 animate-fade-in mt-4">
                      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Search ShopNest</h1>
                      <p className="text-gray-500 dark:text-gray-400">Find exactly what you're looking for.</p>
                  </div>

                  {/* Search Input */}
                  <form onSubmit={handleSearch} className="w-full relative mb-8 group">
                      <input 
                          type="text" 
                          className="w-full pl-12 pr-12 py-4 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 text-lg shadow-sm transition-all placeholder-gray-400"
                          placeholder="Search products, brands..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          autoFocus
                      />
                      <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                      {searchTerm && (
                          <button 
                            type="submit"
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors shadow-md"
                          >
                              <MagnifyingGlassIcon className="h-5 w-5" />
                          </button>
                      )}
                  </form>

                  {/* Trending Tags */}
                  <div className="w-full animate-slide-up mb-12">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-2">
                          <ArrowTrendingUpIcon className="h-4 w-4" /> Trending Searches
                      </h3>
                      <div className="flex flex-wrap gap-3">
                          {popularSearches.map(term => (
                              <button 
                                  key={term}
                                  onClick={() => navigate(`/search?q=${encodeURIComponent(term)}`)}
                                  className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 rounded-full text-sm font-medium transition-all shadow-sm hover:shadow-md"
                              >
                                  {term}
                              </button>
                          ))}
                      </div>
                  </div>
              </div>

              {/* Recommended Feed */}
              <div className="w-full border-t border-gray-200 dark:border-gray-800 pt-8">
                  <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Recommended for you</h2>
                  {loading ? (
                     <Spinner /> 
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {suggestedProducts.map(p => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                  )}
              </div>
          </div>
      );
  }

  // 2. SEARCH RESULTS PAGE
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header with Search Input for Refinement */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="w-full md:w-auto flex-1 max-w-xl">
             <form onSubmit={handleSearch} className="relative">
                 <input 
                    type="text" 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 border-none focus:ring-2 focus:ring-primary-500 text-sm md:text-base"
                 />
                 <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
             </form>
             <div className="mt-2 flex justify-between items-center px-1">
                <p className="text-xs text-gray-500 dark:text-gray-400">{products.length} results found</p>
             </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setLayout('grid')}
                className={`p-1.5 rounded-md transition-all ${layout === 'grid' ? 'bg-white dark:bg-gray-600 text-primary-600 shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
              >
                <Squares2X2Icon className="h-5 w-5" />
              </button>
              <button
                onClick={() => setLayout('list')}
                className={`p-1.5 rounded-md transition-all ${layout === 'list' ? 'bg-white dark:bg-gray-600 text-primary-600 shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
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
         <div className="text-center py-20">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
             <MagnifyingGlassIcon className="h-10 w-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No results found</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
            We couldn't find any products matching "{query}". Try checking your spelling or using different keywords.
          </p>
          <Link to="/products" className="inline-flex items-center justify-center bg-primary-600 text-white font-bold py-3 px-8 rounded-full hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-transform">
            Browse All Products
          </Link>
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;
