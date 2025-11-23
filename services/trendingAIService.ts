
import { Product } from '../types';
import { ALL_COUNTRIES } from '../data/countries';

interface ProductWithScore extends Product {
  trending_score: number;
}

/**
 * Calculates a trending score for each product based on a weighted formula.
 * This simulates a backend AI service for trending product detection.
 * 
 * Accepts a country code to apply regional and continental biases.
 *
 * @param products - An array of all products.
 * @param regionCode - The 2-letter country code (e.g., 'US', 'JP').
 * @returns An array of products, each with a calculated `trending_score`.
 */
export const calculateTrendingScores = (products: Product[], regionCode: string = 'US'): ProductWithScore[] => {
  const now = new Date();
  
  // Resolve region details including continent
  const region = ALL_COUNTRIES.find(r => r.code === regionCode) || ALL_COUNTRIES[0];
  const continent = region.continent || 'NA';

  return products.map(product => {
    // Default values if metrics are not available
    const sales_7d = product.sales_7d || 0;
    const views_7d = product.views_7d || 0;
    const add_to_cart_7d = product.add_to_cart_7d || 0;

    // --- Time Decay Factor ---
    // Products created more recently get a higher weight.
    const creationDate = new Date(product.created_at);
    const daysSinceCreated = (now.getTime() - creationDate.getTime()) / (1000 * 3600 * 24);
    // The factor decays over 90 days, with a minimum value of 0.1.
    const timeDecayFactor = Math.max(0.1, 1 - (daysSinceCreated / 90));

    // --- Base Trending Score Calculation ---
    // Weighted sum of recent activity metrics.
    let trendingScore =
      (sales_7d * 0.4) +       // Sales are most important
      (views_7d * 0.3) +       // Views are a strong indicator of interest
      (add_to_cart_7d * 0.15) + // Add-to-cart shows purchase intent
      (product.rating * 0.1);  // High rating is a good sign

    // --- Regional & Continental Bias (AI Simulation) ---
    // Adjust score based on what is typically popular in specific regions.
    let regionalMultiplier = 1.0;
    let regionalInsight = "";

    // 1. Specific Country Bias
    if (regionCode === 'JP') {
      if (['Electronics', 'Gadgets'].includes(product.category)) {
        regionalMultiplier = 1.5;
        regionalInsight = "Top Tech in Tokyo";
      } else if (product.title.toLowerCase().includes("matcha")) {
        regionalMultiplier = 2.0;
        regionalInsight = "Local Favorite";
      }
    } else if (regionCode === 'BR' && product.category === 'Sports') {
        regionalMultiplier = 1.4;
        regionalInsight = "Trending in Brazil";
    } else if (regionCode === 'IN') {
        if (product.price < 50 || product.category === 'Electronics') {
            regionalMultiplier = 1.3;
            regionalInsight = "Bestseller in India";
        }
    }

    // 2. Continental Bias (Broad Fallback)
    // Only apply if no specific country insight was triggered
    if (regionalMultiplier === 1.0) {
        switch (continent) {
            case 'EU': // Europe
                if (product.category === 'Fashion' || product.tags.includes('eco-friendly')) {
                    regionalMultiplier = 1.25;
                    regionalInsight = "Trending in Europe";
                } else if (product.subcategory === 'Coffee' || product.subcategory === 'Decor') {
                    regionalMultiplier = 1.2;
                    regionalInsight = "European Choice";
                }
                break;
            case 'AS': // Asia
                if (product.category === 'Electronics' || product.category === 'Gadgets') {
                    regionalMultiplier = 1.3;
                    regionalInsight = "Asia Tech Trend";
                } else if (product.category === 'Beauty') {
                    regionalMultiplier = 1.25;
                    regionalInsight = "Beauty Favorite";
                }
                break;
            case 'NA': // North America
                if (product.category === 'Home & Living' || product.category === 'Pet Supplies') {
                    regionalMultiplier = 1.2;
                    regionalInsight = "Popular Nearby";
                }
                break;
            case 'SA': // South America
                if (product.category === 'Sports' || product.category === 'Fashion') {
                    regionalMultiplier = 1.25;
                    regionalInsight = "Regional Top Pick";
                }
                break;
        }
    }

    // Apply Factors
    trendingScore = (trendingScore * timeDecayFactor) * regionalMultiplier;

    return {
      ...product,
      trending_score: trendingScore,
      // If we generated a specific regional insight, override the default one
      trending_insight: regionalInsight || product.trending_insight
    };
  });
};
