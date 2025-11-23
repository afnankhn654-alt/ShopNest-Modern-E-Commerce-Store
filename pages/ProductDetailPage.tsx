import React, { useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { Product, Variant, Review } from '../types';
import { fetchProductById } from '../services/api';
import { generateReviewsForProduct, generateAISummary, getReviewAttributes } from '../services/reviewService';
import Spinner from '../components/Spinner';
import Rating from '../components/Rating';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useLocation } from '../contexts/LocationContext';
import { useLoading } from '../contexts/LoadingContext';
import { ShoppingCartIcon, StarIcon } from '@heroicons/react/24/solid';
import { HeartIcon as HeartIconOutline, EyeIcon, HandThumbUpIcon, CheckBadgeIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

const { useParams } = ReactRouterDOM as any;

const ProductDetailPage: React.FC = () => {
  const { id } = useParams() as { id: string };
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [aiSummary, setAiSummary] = useState('');
  const [reviewAttributes, setReviewAttributes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState<string>('');
  const [prevImage, setPrevImage] = useState<string>('');
  const [liveViewers, setLiveViewers] = useState(0); // Social Proof
  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { formatPrice } = useLocation();
  const { startLoading, stopLoading } = useLoading();

  // Social Proof Effect
  useEffect(() => {
    // Randomize initial viewers between 12 and 45
    setLiveViewers(Math.floor(Math.random() * 33) + 12);
    
    // Fluctuate viewers
    const interval = setInterval(() => {
        setLiveViewers(prev => {
            const change = Math.floor(Math.random() * 5) - 2; // -2 to +2
            return Math.max(5, prev + change);
        });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      startLoading();
      setLoading(true);
      try {
        const data = await fetchProductById(id);
        if (data) {
          setProduct(data);
          setSelectedVariant(data.variants[0] || null);
          const initialImg = data.images[0]?.image_url || '';
          setMainImage(initialImg);
          setPrevImage(initialImg);

          // Generate Reviews dynamically based on the product
          const generatedReviews = generateReviewsForProduct(data);
          setReviews(generatedReviews);
          setAiSummary(generateAISummary(data));
          setReviewAttributes(getReviewAttributes(data));
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
        stopLoading();
      }
    };
    loadProduct();
  }, [id, startLoading, stopLoading]);

  const handleImageChange = (newUrl: string) => {
    if (newUrl === mainImage) return;
    setPrevImage(mainImage);
    setMainImage(newUrl);
  };

  const handleAddToCart = () => {
    if (product && selectedVariant) {
      addToCart(product, selectedVariant, quantity);
      alert(`${quantity} of ${product.title} (${Object.values(selectedVariant.options).join(', ')}) added to cart!`);
    }
  };
  
  const handleWishlistToggle = () => {
    if (product) {
        if (isInWishlist(product.id)) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    }
  };

  // Helper to calculate percentage for rating bars
  const getPercentage = (rating: number) => {
    if (reviews.length === 0) return 0;
    const count = reviews.filter(r => r.rating === rating).length;
    // Boost the visual representation of 5 stars for the "Amazon effect" if empty/low data
    if (count === 0 && rating === Math.round(product?.rating || 0)) return 10; 
    return (count / reviews.length) * 100;
  };

  if (loading) return <Spinner />;
  if (!product) return <div className="text-center py-10">Product not found.</div>;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* --- Product Main Section --- */}
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-lg p-4 md:p-8 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div>
            <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden mb-4 relative">
              {/* Previous Image (Background for overlay effect) */}
              {prevImage && (
                <img 
                  src={prevImage} 
                  alt="Product view background" 
                  className="absolute inset-0 w-full h-full object-cover" 
                />
              )}
              {/* Main Image (Foreground with Animation) */}
              <img 
                key={mainImage} 
                src={mainImage} 
                alt={product.title} 
                className="absolute inset-0 w-full h-full object-cover animate-slide-up z-10" 
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  type="button"
                  key={index}
                  onClick={() => handleImageChange(image.image_url)}
                  className={`aspect-square bg-gray-100 dark:bg-gray-700 rounded-md overflow-hidden ring-2 transition-all duration-200 ${
                    mainImage === image.image_url 
                      ? 'ring-primary-500 scale-95 opacity-100' 
                      : 'ring-transparent hover:ring-primary-300 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={image.image_url} alt={image.alt_text} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="flex justify-between items-start">
               <div>
                  <p className="text-sm font-semibold text-primary-600 dark:text-primary-400">{product.brand}</p>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mt-1">{product.title}</h1>
               </div>
               
               {/* Live Viewers Indicator */}
               <div className="flex items-center space-x-1 text-red-500 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-full animate-pulse">
                  <EyeIcon className="h-4 w-4" />
                  <span className="text-xs font-bold">{liveViewers} viewing</span>
               </div>
            </div>

            <div className="mt-4">
              <Rating rating={product.rating} reviews_count={product.reviews_count} />
            </div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">{product.long_description}</p>
            
            <div className="my-6">
              <span className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                  {selectedVariant ? formatPrice(selectedVariant.price) : formatPrice(product.final_price)}
              </span>
              {product.discount_pct > 0 && <span className="ml-3 text-lg text-gray-500 line-through">{formatPrice(product.price)}</span>}
            </div>

            {/* Variants */}
            {product.variants.length > 1 && (
              <div className="space-y-4">
                {Object.keys(product.variants[0].options).map(optionKey => (
                  <div key={optionKey}>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-200 capitalize">{optionKey}</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {[...new Set(product.variants.map(v => v.options[optionKey as keyof typeof v.options]))].map(optionValue => (
                         <button
                           key={optionValue}
                           onClick={() => {
                             const newVariant = product.variants.find(v => v.options[optionKey as keyof typeof v.options] === optionValue) || product.variants[0];
                             setSelectedVariant(newVariant);
                           }}
                           className={`px-4 py-2 text-sm rounded-full border-2 ${selectedVariant?.options[optionKey as keyof typeof selectedVariant.options] === optionValue ? 'border-primary-500 bg-primary-50 text-primary-600 dark:bg-primary-900/50 dark:text-primary-300' : 'border-gray-300 dark:border-gray-600'}`}
                         >
                           {optionValue}
                         </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch gap-4">
              <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md justify-between sm:justify-start">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-4 py-2 text-lg font-bold">-</button>
                <span className="px-4 py-2 text-lg">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="px-4 py-2 text-lg font-bold">+</button>
              </div>
              <button
                onClick={handleAddToCart}
                className="w-full sm:flex-1 bg-primary-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors duration-300 flex items-center justify-center space-x-2 shadow-lg shadow-primary-500/30"
              >
                <ShoppingCartIcon className="h-5 w-5" />
                <span>Add to Cart</span>
              </button>
              <button
                  onClick={handleWishlistToggle}
                  className="p-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 hover:border-red-500 hover:text-red-500 dark:hover:border-red-400 dark:hover:text-red-400 transition-colors"
                  aria-label="Add to wishlist"
              >
                  {isInWishlist(product.id) ? (
                      <HeartIconSolid className="h-6 w-6 text-red-500" />
                  ) : (
                      <HeartIconOutline className="h-6 w-6" />
                  )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- Product Information / Technical Details Section --- */}
      {product.specs && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 md:p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6">Product information</h2>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden max-w-4xl">
                <div className="bg-gray-100 dark:bg-gray-700/50 px-6 py-3 font-bold border-b border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100">
                    Technical Details
                </div>
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {Object.entries(product.specs).map(([key, value]) => (
                        <div key={key} className="grid grid-cols-1 md:grid-cols-2">
                            <div className="px-6 py-3 bg-gray-50 dark:bg-gray-800/30 text-gray-600 dark:text-gray-400 font-medium text-sm">
                                {key}
                            </div>
                            <div className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 text-sm">
                                {value}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      )}

      {/* --- CUSTOMER REVIEWS SECTION --- */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 md:p-8" id="reviews">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Stats & Breakdown (3 cols) */}
          <div className="lg:col-span-4">
             <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center text-yellow-400">
                    {[1, 2, 3, 4, 5].map((s) => (
                        <StarIcon key={s} className={`h-6 w-6 ${Math.round(product.rating) >= s ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} />
                    ))}
                </div>
                <span className="text-xl font-bold">{product.rating} out of 5</span>
             </div>
             <p className="text-gray-500 dark:text-gray-400 mb-6">{product.reviews_count.toLocaleString()} global ratings</p>
             
             {/* Rating Bars */}
             <div className="space-y-3 mb-8">
                {[5, 4, 3, 2, 1].map((stars) => {
                    const pct = getPercentage(stars);
                    
                    return (
                        <div key={stars} className="flex items-center text-sm group cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded px-1 -mx-1">
                            <span className="w-12 font-medium text-primary-600 dark:text-primary-400 whitespace-nowrap">{stars} star</span>
                            <div className="flex-1 h-5 mx-3 bg-gray-200 dark:bg-gray-700 rounded-sm overflow-hidden shadow-inner">
                                <div 
                                    className="h-full bg-yellow-400 border-r border-yellow-500 rounded-r-sm transition-all duration-500 ease-out" 
                                    style={{ width: `${pct}%` }}
                                ></div>
                            </div>
                            <span className="w-10 text-right text-gray-500 dark:text-gray-400">{Math.round(pct)}%</span>
                        </div>
                    );
                })}
             </div>

             <div className="border-t border-b border-gray-200 dark:border-gray-700 py-6 mb-6">
                <h3 className="font-bold mb-2">Review this product</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Share your thoughts with other customers</p>
                <button className="w-full border border-gray-300 dark:border-gray-600 py-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 font-medium transition-colors">
                    Write a customer review
                </button>
             </div>
          </div>

          {/* Right Column: AI Summary, Tags, Gallery, Reviews List (8 cols) */}
          <div className="lg:col-span-8">
             
             {/* AI Summary Box */}
             <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-lg mb-8 border border-gray-100 dark:border-gray-700">
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                    Customers say
                    <span className="flex items-center gap-1 bg-green-100 text-green-800 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">
                      <SparklesIcon className="h-3 w-3" />
                      AI Generated
                    </span>
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed italic">
                    "{aiSummary}"
                </p>
                <p className="text-xs text-gray-400 mt-2 text-right">Generated from the text of customer reviews</p>
             </div>

             {/* Interest Tags */}
             <div className="mb-8">
                 <p className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">Select to learn more</p>
                 <div className="flex flex-wrap gap-2">
                     {reviewAttributes.map((attr, idx) => (
                         <button key={idx} className="px-3 py-1.5 rounded-full border border-gray-300 dark:border-gray-600 text-sm hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all flex items-center gap-1 group bg-white dark:bg-gray-800">
                             {attr}
                             <CheckBadgeIcon className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary-500" />
                         </button>
                     ))}
                 </div>
             </div>

             {/* Review Image Gallery (Only show if there are images) */}
             {reviews.some(r => r.images && r.images.length > 0) && (
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-lg">Reviews with images</h3>
                        <button className="text-primary-600 text-sm font-medium hover:underline">See all photos</button>
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                        {reviews.filter(r => r.images).slice(0, 6).map((review) => (
                            <div key={`img-${review.id}`} className="flex-shrink-0 w-32 h-32 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 cursor-pointer hover:opacity-90 relative group">
                                <img 
                                    src={review.images![0]} 
                                    alt="User Review" 
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                            </div>
                        ))}
                    </div>
                </div>
             )}

             {/* Main Review Feed */}
             <div className="space-y-8">
                 <div className="flex items-center justify-between">
                     <h3 className="font-bold text-lg">Top reviews from United States</h3>
                     <select className="bg-transparent text-sm border-none focus:ring-0 cursor-pointer text-gray-500 font-medium">
                         <option>Top reviews</option>
                         <option>Most recent</option>
                     </select>
                 </div>

                 {reviews.map((review) => (
                     <div key={review.id} className="border-b border-gray-100 dark:border-gray-800 pb-6 last:border-0 animate-fade-in">
                         {/* Author Line */}
                         <div className="flex items-center gap-2 mb-2">
                             <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-bold text-gray-500 overflow-hidden">
                                 {review.avatar ? <img src={review.avatar} alt={review.author} /> : review.author.charAt(0)}
                             </div>
                             <span className="font-medium text-sm text-gray-900 dark:text-gray-100">{review.author}</span>
                         </div>
                         
                         {/* Rating & Title */}
                         <div className="flex items-center gap-2 mb-2">
                             <div className="flex text-yellow-400">
                                 {[...Array(5)].map((_, i) => (
                                     <StarIcon key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} />
                                 ))}
                             </div>
                             <span className="font-bold text-sm text-gray-900 dark:text-white">{review.title}</span>
                         </div>
                         
                         {/* Metadata */}
                         <div className="text-xs text-gray-500 dark:text-gray-400 mb-3 flex flex-wrap items-center gap-2">
                             <span>Reviewed in {review.location} on {review.date}</span>
                             {review.variant_name && <span className="border-l border-gray-300 pl-2 text-gray-400">{review.variant_name}</span>}
                             {review.verified && (
                                <span className="text-primary-600 dark:text-primary-400 font-bold border-l border-gray-300 pl-2 flex items-center gap-1">
                                    Verified Purchase
                                </span>
                             )}
                         </div>

                         {/* Content */}
                         <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4">
                             {review.content}
                         </p>

                         {/* Review Images */}
                         {review.images && (
                             <div className="flex gap-2 mb-4">
                                 {review.images.map((img, idx) => (
                                     <img key={idx} src={img} alt="Review attachment" className="w-24 h-24 object-cover rounded-md cursor-pointer hover:opacity-80 border border-gray-200 dark:border-gray-700" />
                                 ))}
                             </div>
                         )}

                         {/* Helpful Buttons */}
                         <div className="flex items-center gap-4">
                             <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 border border-gray-200 dark:border-gray-700 px-4 py-1.5 rounded-full bg-white dark:bg-gray-800 shadow-sm transition-all hover:shadow hover:border-gray-300">
                                 <HandThumbUpIcon className="h-4 w-4" />
                                 Helpful {review.helpful_count > 0 && <span>({review.helpful_count})</span>}
                             </button>
                             <button className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:underline">Report</button>
                         </div>
                     </div>
                 ))}
                 
                 <div className="pt-4">
                     <button className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1">
                         See more reviews <span className="text-lg">›</span>
                     </button>
                 </div>
             </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;