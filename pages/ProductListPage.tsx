import React, { useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { Product } from '../types';
import { fetchProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';
import { useTheme } from '../contexts/ThemeContext';
import { useLoading } from '../contexts/LoadingContext';
import { Squares2X2Icon, Bars3Icon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

const { useParams } = ReactRouterDOM as any;

const ProductListPage: React.FC = () => {
  const { category } = useParams() as { category?: string };
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { layout, setLayout } = useTheme();
  const { startLoading, stopLoading } = useLoading();

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
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold capitalize">{category || 'All Products'}</h1>
            <p className="text-gray-500 dark:text-gray-400">{products.length} items</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                <AdjustmentsHorizontalIcon className="h-5 w-5"/>
                <span>Filter</span>
            </button>
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
  );
};

export default ProductListPage;