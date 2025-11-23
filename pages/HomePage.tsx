import React, { useState, useEffect, useMemo } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { Product } from '../types';
import { fetchTrendingProducts, searchProducts } from '../services/api';
import { products as allProducts } from '../data/products';
import { useLocation } from '../contexts/LocationContext';
import { useLoading } from '../contexts/LoadingContext';
import { useDeviceDetection } from '../hooks/useDeviceDetection';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';
import { ChevronRightIcon, ChevronLeftIcon, MagnifyingGlassIcon, SparklesIcon, FireIcon } from '@heroicons/react/24/outline';
import { getOptimizedImageUrl } from '../utils/imageUtils';

const { Link } = ReactRouterDOM as any;

const BANNER_DATA = [
  {
    image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?q=80&w=2000", 
    title: "Pure & Refreshing",
    subtitle: "Discover our premium collection."
  },
  {
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2000", 
    title: "Holiday Gift Guide",
    subtitle: "Find the perfect gift for everyone on your list."
  },
  {
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2000", 
    title: "New Season Fashion",
    subtitle: "Check out the latest trends in clothing and accessories."
  },
  {
    image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=2000", 
    title: "Tech Upgrades",
    subtitle: "Upgrade your workspace with the latest gadgets."
  }
];

// Helper component for the white cards/widgets
const HomeWidget: React.FC<{ title: string; children: React.ReactNode; linkTo: string; linkText: string }> = ({ title, children, linkTo, linkText }) => (
  <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-5 flex flex-col h-full z-10 relative shadow-md rounded-sm">
    <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white truncate">{title}</h3>
    <div className="flex-grow">{children}</div>
    <Link to={linkTo} className="mt-4 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 hover:underline block font-medium">
      {linkText}
    </Link>
  </div>
);

// Helper for 2x2 Grid inside a widget
const WidgetQuadGrid: React.FC<{ items: Product[]; titleMap?: Record<string, string> }> = ({ items, titleMap }) => (
    <div className="grid grid-cols-2 gap-4 h-full">
        {items.slice(0, 4).map(item => (
            <Link key={item.id} to={`/product/${item.id}`} className="flex flex-col h-full group">
                <div className="flex-grow relative bg-gray-50 dark:bg-gray-700 mb-1 overflow-hidden rounded-sm">
                     {/* Optimize for small thumbnail size (300px) */}
                     <img 
                        src={getOptimizedImageUrl(item.images[0].image_url, 300)} 
                        alt={item.title} 
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-contain p-2 mix-blend-multiply dark:mix-blend-normal transition-transform duration-300 group-hover:scale-105"
                     />
                </div>
                <span className="text-xs text-gray-700 dark:text-gray-300 truncate">
                    {titleMap ? titleMap[item.id] || item.title : item.title}
                </span>
            </Link>
        ))}
    </div>
);

// --- CREATIVE MOBILE HOME (Blended Style: 30% PC / 70% Creative) ---
const CreativeMobileHome: React.FC<{ products: Product[], regionCode: string }> = ({ products, regionCode }) => {
  const trending = products.slice(0, 6); // First 6 are trending/water
  const forYou = products.slice(6); // Rest
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  // Auto-scroll banner
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % BANNER_DATA.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-mobile-body relative overflow-hidden">
      
      {/* 1. Mobile Carousel (Mirrors PC Hero) */}
      <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-gray-200 dark:bg-gray-800">
         {BANNER_DATA.map((banner, index) => (
            <div 
                key={index} 
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentBannerIndex ? 'opacity-100' : 'opacity-0'}`}
            >
                <img 
                    src={banner.image} 
                    alt={banner.title} 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-4">
                    <h2 className="text-white text-2xl font-bold font-mobile-display drop-shadow-md">{banner.title}</h2>
                    <p className="text-white/90 text-sm font-medium line-clamp-1">{banner.subtitle}</p>
                </div>
            </div>
         ))}
         {/* Dots */}
         <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1.5">
            {BANNER_DATA.map((_, idx) => (
                <div key={idx} className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentBannerIndex ? 'bg-white w-4' : 'bg-white/50'}`} />
            ))}
         </div>
      </div>

      {/* 2. Desktop-like Categories Row */}
      <div className="px-4 py-6 bg-white dark:bg-gray-800 shadow-sm mb-4">
          <div className="flex overflow-x-auto scrollbar-hide gap-6">
             {[
               {name: 'New', icon: <SparklesIcon className="h-5 w-5"/>, color: 'bg-yellow-100 text-yellow-600'},
               {name: 'Hot', icon: <FireIcon className="h-5 w-5"/>, color: 'bg-red-100 text-red-600'},
               {name: 'Tech', icon: <span className="text-sm font-bold">T</span>, color: 'bg-blue-100 text-blue-600'},
               {name: 'Home', icon: <span className="text-sm font-bold">H</span>, color: 'bg-green-100 text-green-600'},
               {name: 'Style', icon: <span className="text-sm font-bold">S</span>, color: 'bg-purple-100 text-purple-600'},
             ].map((cat, i) => (
                 <button key={i} className="flex flex-col items-center gap-2 group min-w-[50px]">
                     <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm ${cat.color} dark:bg-opacity-20`}>
                        {cat.icon}
                     </div>
                     <span className="text-xs font-medium text-gray-600 dark:text-gray-300">{cat.name}</span>
                 </button>
             ))}
          </div>
      </div>

      {/* 3. "Fresh Drops" / Water Collection (Horizontal Rail) */}
      <div className="mb-4 bg-white dark:bg-gray-800 py-6">
         <div className="px-4 flex justify-between items-center mb-4">
             <h3 className="font-bold text-lg text-gray-900 dark:text-white">Fresh Drops</h3>
             <Link to="/products" className="text-primary-600 text-sm font-medium">See all</Link>
         </div>
         
         <div className="flex overflow-x-auto scrollbar-hide px-4 gap-4 pb-2">
             {trending.map(p => (
                 <Link key={p.id} to={`/product/${p.id}`} className="min-w-[140px] w-[140px] flex-shrink-0">
                     <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2 border border-gray-100 dark:border-gray-700">
                         <img src={getOptimizedImageUrl(p.images[0].image_url, 300)} className="w-full h-full object-cover" alt={p.title}/>
                     </div>
                     <h4 className="font-medium text-sm text-gray-800 dark:text-gray-200 truncate">{p.title}</h4>
                     <p className="text-sm font-bold text-primary-600">${p.final_price}</p>
                 </Link>
             ))}
         </div>
      </div>

      {/* 4. "Just For You" - Standard Grid (Matches Desktop UI Cards) */}
      <div className="px-4 pb-4">
         <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-4">Just For You</h3>
         <div className="grid grid-cols-2 gap-4">
             {forYou.map((p) => (
                 <ProductCard key={p.id} product={p} />
             ))}
         </div>
      </div>

    </div>
  );
};

const HomePage: React.FC = () => {
  const [trending, setTrending] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentRegion } = useLocation();
  const { startLoading, stopLoading } = useLoading();
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  
  // Detect Device
  const { isMobile, isTablet } = useDeviceDetection();
  const isMobileView = isMobile || isTablet;

  // Widget Data Slices
  const under25 = allProducts.filter(p => p.final_price <= 25).slice(0, 4);
  const fashionItems = allProducts.filter(p => p.category === 'Fashion' || p.category === 'Accessories').slice(0, 4);
  const homeItems = allProducts.filter(p => p.category === 'Home & Living' || p.subcategory === 'Lighting').slice(0, 4);
  const bigDeal = allProducts.find(p => p.discount_pct >= 15) || allProducts[0];

  // Organize products by category for the long list
  const categorySections = useMemo(() => {
    const categories = Array.from(new Set(allProducts.map(p => p.category)));
    const priority = ['Electronics', 'Home & Living', 'Fashion', 'Beauty', 'Gadgets', 'Sports', 'Toys & Games'];
    const sortedCategories = categories.sort((a, b) => {
        const idxA = priority.indexOf(a);
        const idxB = priority.indexOf(b);
        if (idxA !== -1 && idxB !== -1) return idxA - idxB;
        if (idxA !== -1) return -1;
        if (idxB !== -1) return 1;
        return a.localeCompare(b);
    });

    return sortedCategories.map(cat => ({
        name: cat,
        products: allProducts.filter(p => p.category === cat).slice(0, 10) 
    }));
  }, []);

  useEffect(() => {
    const loadData = async () => {
      startLoading();
      setLoading(true);
      try {
        // Fetch "water" products by default as requested
        const data = await searchProducts('water');
        
        if (data && data.length > 0) {
            setTrending(data);
        } else {
            const trendingData = await fetchTrendingProducts(currentRegion.code);
            setTrending(trendingData);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
        stopLoading();
      }
    };
    loadData();
  }, [currentRegion.code, startLoading, stopLoading]);

  // Desktop Banner Auto-scroll
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % BANNER_DATA.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentBannerIndex]);

  const nextBanner = () => {
    setCurrentBannerIndex((prev) => (prev + 1) % BANNER_DATA.length);
  };

  const prevBanner = () => {
    setCurrentBannerIndex((prev) => (prev - 1 + BANNER_DATA.length) % BANNER_DATA.length);
  };

  // --- RETURN MOBILE VIEW IF DETECTED ---
  if (isMobileView && !loading) {
      // Pass all products (trending first) to mobile view
      const feedProducts = [...trending, ...allProducts.filter(p => !trending.find(t => t.id === p.id))];
      return <CreativeMobileHome products={feedProducts} regionCode={currentRegion.code} />;
  }

  // --- RETURN DESKTOP VIEW ---
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pb-0">
      
      {/* Hero Carousel */}
      <div className="relative w-full bg-white dark:bg-gray-800">
         <div className="w-full h-[280px] sm:h-[350px] md:h-[450px] relative overflow-hidden group">
             {BANNER_DATA.map((banner, index) => (
                <div 
                    key={index} 
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentBannerIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                >
                    <img 
                        src={banner.image} 
                        alt={banner.title} 
                        loading={index === 0 ? "eager" : "lazy"}
                        className="absolute inset-0 w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-100 dark:from-gray-900 to-transparent"></div>
                    
                    <div className="absolute top-[15%] left-4 sm:left-8 md:left-12 max-w-xl p-4">
                        <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 drop-shadow-lg animate-fadeIn">
                            {banner.title}
                        </h2>
                        <p className="text-white text-lg sm:text-xl font-medium drop-shadow-md animate-fadeIn delay-100">
                            {banner.subtitle}
                        </p>
                    </div>
                </div>
             ))}

             <button 
                onClick={prevBanner}
                className="absolute left-2 sm:left-4 top-[30%] z-20 p-2 rounded-full hover:bg-white/20 hover:backdrop-blur-sm focus:outline-none opacity-0 group-hover:opacity-100 transition-opacity"
             >
                <ChevronLeftIcon className="h-8 w-8 sm:h-10 sm:w-10 text-white drop-shadow-lg" />
             </button>
             <button 
                onClick={nextBanner}
                className="absolute right-2 sm:right-4 top-[30%] z-20 p-2 rounded-full hover:bg-white/20 hover:backdrop-blur-sm focus:outline-none opacity-0 group-hover:opacity-100 transition-opacity"
             >
                <ChevronRightIcon className="h-8 w-8 sm:h-10 sm:w-10 text-white drop-shadow-lg" />
             </button>
         </div>

         {/* Widgets */}
         <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-20 sm:-mt-32 md:-mt-60 pb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <HomeWidget title="Shop gifts by price" linkTo="/products" linkText="See all offers">
                    <WidgetQuadGrid 
                        items={under25} 
                        titleMap={{
                            [under25[0]?.id]: "Under $25",
                            [under25[1]?.id]: "Under $25",
                            [under25[2]?.id]: "Under $25",
                            [under25[3]?.id]: "Deals"
                        }}
                    />
                </HomeWidget>

                <HomeWidget title="Fashion trends you like" linkTo="/products/fashion" linkText="Explore more">
                    <WidgetQuadGrid items={fashionItems} />
                </HomeWidget>

                <HomeWidget title="Updates for elevated spaces" linkTo="/products/home & living" linkText="Shop home products">
                    <WidgetQuadGrid items={homeItems} />
                </HomeWidget>

                <HomeWidget title="Big deals. Bigger surprises." linkTo={`/product/${bigDeal.id}`} linkText="Shop Black Friday deals">
                     <div className="h-full flex flex-col">
                        <div className="flex-grow relative bg-white dark:bg-gray-700 overflow-hidden mb-2 rounded-sm">
                             <img 
                                src={getOptimizedImageUrl(bigDeal.images[0].image_url, 500)} 
                                alt={bigDeal.title} 
                                loading="lazy"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-sm">
                                {bigDeal.discount_pct}% off
                            </span>
                            <span className="text-red-600 font-bold text-sm">Deal</span>
                        </div>
                        <p className="text-sm mt-1 truncate">{bigDeal.title}</p>
                     </div>
                </HomeWidget>
            </div>
         </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12 space-y-12">
        
        {/* Featured Collection (Water Products) - Renamed to "Trending Collection" */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 shadow-sm rounded-lg">
             <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                    Trending Collection
                </h2>
                <Link to="/products" className="text-sm font-medium text-primary-600 hover:text-primary-500 flex items-center">
                    See more <ChevronRightIcon className="h-4 w-4 ml-1"/>
                </Link>
            </div>
            {loading ? <Spinner /> : (
                <div className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hide">
                    {trending.length > 0 ? trending.map(product => (
                        <div key={product.id} className="min-w-[200px] md:min-w-[240px]">
                            <ProductCard product={product} />
                        </div>
                    )) : (
                        <div className="text-gray-500">No trending products found.</div>
                    )}
                </div>
            )}
        </div>

        {/* Standard Grid: Recommended */}
        <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Recommended for You</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                 {allProducts.filter((_, i) => i % 2 === 0).slice(0, 8).map(product => (
                      <ProductCard key={`rec-${product.id}`} product={product} />
                 ))}
            </div>
        </div>

        {/* Category Rows */}
        {categorySections.map((section) => (
             <div key={section.name} className="py-4">
                 <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                        {section.name}
                        <Link to={`/products/${section.name}`} className="text-sm font-normal text-primary-600 hover:underline">
                            Shop now
                        </Link>
                    </h2>
                 </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {section.products.map(product => (
                        <ProductCard key={`cat-${section.name}-${product.id}`} product={product} />
                    ))}
                 </div>
             </div>
        ))}
        
        {/* Pre-Footer */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8 pb-4 text-center">
             <div className="inline-block bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 max-w-2xl w-full">
                <p className="text-sm mb-2 text-gray-600 dark:text-gray-300">See personalized recommendations</p>
                <Link to="/auth" className="inline-block w-64 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-1.5 rounded-md text-sm shadow-sm transition-colors mb-2">
                    Sign in
                </Link>
                <div className="text-xs">
                    New customer? <Link to="/auth" className="text-primary-600 hover:underline">Start here.</Link>
                </div>
             </div>
        </div>

      </div>
    </div>
  );
};

export default HomePage;