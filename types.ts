
export interface Image {
  image_url: string;
  alt_text: string;
}

// FIX: Add additional optional properties to the Variant options to support more product types.
export interface Variant {
  variant_id: string;
  options: {
    color?: string;
    size?: string;
    set?: string;
    kit?: string;
    pieces?: string;
    style?: string;
  };
  price: number;
  stock_qty: number;
  sku: string;
}

export interface Review {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  verified: boolean;
  helpful_count: number;
  images?: string[];
  location?: string;
  variant_name?: string; // e.g. "Color: Black | Size: L"
}

export interface Product {
  id: string;
  title: string;
  short_description: string;
  long_description: string;
  category: string;
  subcategory: string;
  brand: string;
  price: number;
  currency: string;
  discount_pct: number;
  final_price: number;
  stock_qty: number;
  sku: string;
  tags: string[];
  rating: number;
  reviews_count: number;
  created_at: string;
  is_trending: boolean;
  popularity_score: number;
  variants: Variant[];
  images: Image[];
  // New fields for AI Trending simulation
  sales_7d?: number;
  views_7d?: number;
  add_to_cart_7d?: number;
  trending_insight?: string;
  // Technical Details
  specs?: Record<string, string>;
}

export interface CartItem {
  product: Product;
  variant: Variant;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export type Theme = 'light' | 'dark';
export type Layout = 'grid' | 'list';

export interface Region {
  code: string;
  name: string;
  flag: string;
  currencyCode: string;
  currencySymbol: string;
  exchangeRate: number; // Relative to USD (Base 1.0)
  locale: string;
  continent?: string; // 'NA', 'EU', 'AS', etc.
}