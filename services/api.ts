
import { products } from '../data/products';
import { Product } from '../types';
import { calculateTrendingScores } from './trendingAIService';

export const fetchProducts = async (category?: string): Promise<Product[]> => {
  console.log(`Fetching products for category: ${category}`);
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
  if (category) {
    return products.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }
  return products;
};

export const fetchProductById = async (id: string): Promise<Product | undefined> => {
  console.log(`Fetching product with id: ${id}`);
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
  return products.find(p => p.id === id);
};

export const searchProducts = async (query: string): Promise<Product[]> => {
  console.log(`Searching for products with query: ${query}`);
  await new Promise(resolve => setTimeout(resolve, 300)); // Simulate search delay

  if (!query) {
    return [];
  }

  const lowerCaseQuery = query.toLowerCase();
  
  return products.filter(product => {
    const inTitle = product.title.toLowerCase().includes(lowerCaseQuery);
    const inDescription = product.short_description.toLowerCase().includes(lowerCaseQuery);
    const inBrand = product.brand.toLowerCase().includes(lowerCaseQuery);
    const inCategory = product.category.toLowerCase().includes(lowerCaseQuery);
    const inTags = product.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery));
    
    return inTitle || inDescription || inBrand || inCategory || inTags;
  });
};


export const fetchTrendingProducts = async (regionCode: string = 'US'): Promise<Product[]> => {
  console.log(`Fetching trending products for region ${regionCode} using AI simulation...`);
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay

  // 1. Calculate trending scores for all products with Regional Bias
  const productsWithScores = calculateTrendingScores(products, regionCode);

  // 2. Sort products by the score in descending order
  const sortedProducts = productsWithScores.sort((a, b) => b.trending_score - a.trending_score);
  
  // 3. Take the top 4 products for the homepage
  const topTrending = sortedProducts.slice(0, 4);

  // 4. (Optional) Add a dynamic AI insight to the #1 trending product if not already set by region
  if (topTrending.length > 0 && topTrending[0].sales_7d && !topTrending[0].trending_insight) {
    topTrending[0].trending_insight = `Gaining traction with ${Math.floor(topTrending[0].sales_7d / 10) * 10}+ sales this week!`;
  }

  return topTrending;
};