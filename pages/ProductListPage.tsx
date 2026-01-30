import React, { useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { Product } from '../types';
import { fetchProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';
import { useTheme } from '../contexts/ThemeContext';
import { useLoading } from '../contexts/LoadingContext';
import { Squares2X2Icon, Bars3Icon, AdjustmentsHorizontalIcon, SparklesIcon } from '@heroicons/react/24/outline';

const { useParams } = ReactRouterDOM as any;

const categoryThemes: Record<string, { image: string, tagline: string, color: string }> = {
  "Electronics": { image: "https://images.unsplash.com/photo-1550009158-94ae76552485?q=80&w=2000", tagline: "Cutting-Edge Tech, Unbeatable Prices.", color: "rgba(29, 78, 216, 0.7)" },
  "Home & Living": { image: "https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=2000", tagline: "Craft Your Perfect Sanctuary.", color: "rgba(5, 150, 105, 0.7)" },
  "Fashion": { image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2000", tagline: "Define Your Style, Redefine Your Look.", color: "rgba(219, 39, 119, 0.7)" },
  "Beauty": { image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=2000", tagline: "Unleash Your Inner Radiance.", color: "rgba(124, 58, 237, 0.7)" },
  "Gadgets": { image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=2000", tagline: "Innovation in the Palm of Your Hand.", color: "rgba(79, 70, 229, 0.7)" },
  "Sports": { image: "https://images.unsplash.com/photo-1517649763942-7e3c76272c27?q=80&w=2000", tagline: "Achieve Your Peak Performance.", color: "rgba(234, 88, 12, 0.7)" },
  "Pet Supplies": { image: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=2000", tagline: "Everything Your Best Friend Deserves.", color: "rgba(101, 163, 13, 0.7)" },
  "Toys & Games": { image: "https://images.unsplash.com/photo-1596460107914-7812514159f3?q=80&w=2000", tagline: "Unlock Imagination & Fun.", color: "rgba(250, 204, 21, 0.7)" },
  "Health": { image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2000", tagline: "Wellness for a Better You.", color: "rgba(13, 148, 136, 0.7)" },
  "Accessories": { image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=2000", tagline: "The Perfect Finishing Touches.", color: "rgba(107, 114, 128, 0.7)" },
  "default": { image: "https://images.unsplash.com/photo-1555066931-4365d1469488?q=80&w=2000", tagline: "Explore Our Curated Collection.", color: "rgba(55, 65, 81, 0.7)" },
};

const ProductListPage: React.FC = () => {
  const { category } = useParams() as { category?: string };
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { layout, setLayout } = useTheme();
  const { startLoading, stopLoading } = useLoading();

  const theme = category && categoryThemes[category] ? categoryThemes[category] : categoryThemes.default;

  useEffect(() => {
    const loadProducts = async () => {
      startLoading();
      setLoading(true);
      try {
        const data = await fetchProducts(category);
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
        stopLoading();
      }
    };
    loadProducts();
  }, [category, startLoading, stopLoading]);

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      {/* Thematic Hero Banner */}
      <div 
        className="relative h-96 bg-cover bg-center flex items-center justify-center text-white text-center px-4"
        style={{ backgroundImage: `url(${theme.image})` }}
      >
        <div 
          className="absolute inset-0" 
          style={{ backgroundColor: theme.color, mixBlendMode: 'multiply' }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="relative z-10 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight drop-shadow-2xl">{category || 'All Products'}</h1>
          <p className="mt-4 text-xl font-medium opacity-90 drop-shadow-lg">{theme.tagline}</p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-20 relative z-10">
        {/* Controls */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg p-4 mb-8 flex flex-col md:flex-row justify-between items-center gap-4 sticky top-20">
          <div>
            <p className="font-bold text-gray-800 dark:text-white">{products.length} Products</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors">
                <AdjustmentsHorizontalIcon className="h-5 w-5"/>
                <span className="font-medium">Filter & Sort</span>
            </button>
            <div className="flex items-center bg-gray-200 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setLayout('grid')}
                className={`p-1.5 rounded-md transition-all ${layout === 'grid' ? 'bg-white dark:bg-gray-600 text-primary-600 shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                aria-label="Grid View"
              >
                <Squares2X2Icon className="h-5 w-5" />
              </button>
              <button
                onClick={() => setLayout('list')}
                className={`p-1.5 rounded-md transition-all ${layout === 'list' ? 'bg-white dark:bg-gray-600 text-primary-600 shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                aria-label="List View"
              >
                <Bars3Icon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <div className={
            layout === 'grid'
              ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              : "flex flex-col gap-6"
          }>
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListPage;
