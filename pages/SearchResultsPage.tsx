
import React, { useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { Product } from '../types';
import { searchProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';
import { useLoading } from '../contexts/LoadingContext';
import useDebounce from '../hooks/useDebounce';
import { MagnifyingGlassIcon, ArrowTrendingUpIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { getOptimizedImageUrl } from '../utils/imageUtils';

const { useLocation, useNavigate } = ReactRouterDOM as any;

const popularSearches = ["Water Bottle", "Running Shoes", "Wireless Earbuds", "Yoga Mat"];

const SearchResultsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get('q') || '';
  
  const [products, setProducts] = useState<Product[]>([]
  );
  const [loading, setLoading] = useState(false);
  const { startLoading, stopLoading } = useLoading();
  const [searchTerm, setSearchTerm] = useState(query);
  
  // Debounce for the main search action (triggers URL change)
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  
  // States and debounce for live suggestions
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debouncedSuggestionTerm = useDebounce(searchTerm, 300);

  // State to control the layout, preventing "jumps"
  const [showResultsLayout, setShowResultsLayout] = useState(!!query);

  // Effect to sync URL search param with local state
  useEffect(() => {
    setSearchTerm(query);
    if (query) {
      setShowResultsLayout(true);
    }
  }, [query]);

  // Effect for auto-searching with debouncing. This updates the URL.
  useEffect(() => {
    const trimmedDebouncedTerm = debouncedSearchTerm.trim();
    if (trimmedDebouncedTerm !== query) {
      // IMPORTANT: Removed setShowSuggestions(false) from here. 
      // Suggestions should remain visible until blur or explicit click.
      navigate(trimmedDebouncedTerm ? `/search?q=${encodeURIComponent(trimmedDebouncedTerm)}` : '/search', { replace: true });
    }
  }, [debouncedSearchTerm, navigate, query]);
  
  // Effect for fetching suggestions
  useEffect(() => {
    const fetchSuggestions = async () => {
      const term = debouncedSuggestionTerm.trim();
      if (term.length > 1) {
        const results = await searchProducts(term);
        setSuggestions(results.slice(0, 5));
      } else {
        setSuggestions([]);
      }
    };
    fetchSuggestions();
  }, [debouncedSuggestionTerm]);

  // Effect for fetching main search data when the URL query changes
  useEffect(() => {
    const loadProducts = async () => {
      setShowSuggestions(false); // Hide suggestions when main search results are loading
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
  
  const handleBack = () => {
    if (showResultsLayout) {
      setShowResultsLayout(false);
      setSearchTerm(''); 
    } else {
      navigate(-1);
    }
  };

  const handleSuggestionClick = (title: string) => {
    setShowSuggestions(false);
    setSearchTerm(title);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-gray-900 text-white overflow-hidden relative">
        <div className="absolute inset-0 z-0 opacity-40">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
           <div 
             className="absolute inset-0 bg-repeat animate-move-bg"
             style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)`,
                backgroundSize: '2rem 2rem',
             }}
           ></div>
        </div>
        
        <button 
          onClick={handleBack} 
          className="absolute top-6 left-6 z-30 p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors"
          aria-label="Go back"
        >
          <ArrowLeftIcon className="h-6 w-6 text-white"/>
        </button>

        <div className={`flex flex-col w-full h-full transition-all duration-700 ease-in-out ${showResultsLayout ? 'justify-start pt-24' : 'justify-center'}`}>
            <div className="relative z-10 flex flex-col items-center text-center max-w-3xl w-full mx-auto px-4">
                
                <div className={`transition-all duration-500 ease-in-out ${showResultsLayout ? 'opacity-0 h-0 scale-95 pointer-events-none' : 'opacity-100 h-auto mb-12'}`}>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                        Search the Store
                    </h1>
                    <p className="text-lg text-gray-400 mt-4">Find exactly what you're looking for.</p>
                </div>

                <div className="w-full relative">
                    <form onSubmit={(e) => e.preventDefault()} className="w-full relative group transition-all duration-700 ease-in-out">
                        <MagnifyingGlassIcon className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-500 group-focus-within:text-primary-400 transition-colors pointer-events-none z-10" />
                        <input
                            type="text"
                            className="w-full pl-16 pr-6 py-5 rounded-full border-2 border-gray-700 bg-gray-800/50 backdrop-blur-sm focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 text-xl shadow-2xl shadow-black/50 transition-all placeholder-gray-500 outline-none relative z-0"
                            placeholder="What are you looking for?"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setShowSuggestions(true);
                            }}
                            onFocus={() => setShowSuggestions(true)}
                            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                            autoFocus
                        />
                    </form>
                    
                    {showSuggestions && suggestions.length > 0 && (
                        <div className="absolute top-full mt-3 w-full bg-gray-800/90 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-2xl z-20 overflow-hidden animate-fade-in">
                            <p className="p-3 text-xs font-bold uppercase text-gray-400 border-b border-gray-700">Top Suggestions</p>
                            <ul className="divide-y divide-gray-700">
                                {suggestions.map(product => (
                                    <li key={product.id}>
                                        <button
                                            onMouseDown={() => handleSuggestionClick(product.title)}
                                            className="w-full text-left flex items-center p-4 hover:bg-primary-500/10 transition-colors"
                                        >
                                            <img 
                                                src={getOptimizedImageUrl(product.images[0].image_url, 80)} 
                                                alt={product.title} 
                                                className="w-12 h-12 object-cover rounded-lg mr-4 flex-shrink-0 bg-gray-700" 
                                            />
                                            <div className="overflow-hidden">
                                              <span className="text-white font-semibold truncate block">{product.title}</span>
                                              <span className="text-gray-400 text-xs">{product.category}</span>
                                            </div>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>


                <div className={`transition-all duration-500 ease-in-out ${showResultsLayout ? 'opacity-0 h-0 scale-95 pointer-events-none' : 'opacity-100 h-auto mt-24'}`}>
                    <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in">
                        <span className="text-sm font-bold text-gray-500 uppercase flex items-center gap-1.5"><ArrowTrendingUpIcon className="h-4 w-4"/> Trending:</span>
                        {popularSearches.map(term => (
                            <button
                              key={term}
                              onClick={() => {
                                  setSearchTerm(term);
                                  setShowResultsLayout(true);
                              }}
                              className="px-4 py-1.5 bg-gray-700/50 border border-gray-600 hover:border-primary-500 text-gray-300 hover:text-white rounded-full text-sm font-medium transition-all shadow-sm hover:shadow-lg hover:shadow-primary-500/10"
                            >
                              {term}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className={`flex-1 w-full container mx-auto mt-8 overflow-y-auto scrollbar-hide transition-opacity duration-700 ${showResultsLayout ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                 {loading ? (
                  <Spinner />
                ) : (
                  <>
                    {products.length > 0 ? (
                      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-6 space-y-6 px-4 pb-8">
                        {products.map(product => (
                          <div key={product.id} className="break-inside-avoid">
                            <ProductCard product={product} />
                          </div>
                        ))}
                      </div>
                    ) : (
                      query && (
                        <div className="text-center py-10">
                          <h2 className="text-2xl font-bold mb-2">No results for "{query}"</h2>
                          <p className="text-gray-400 mb-8">Try a different search term or check your spelling.</p>
                        </div>
                      )
                    )}
                  </>
                )}
            </div>
        </div>
    </div>
  );
};

export default SearchResultsPage;
