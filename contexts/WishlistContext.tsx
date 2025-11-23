
import React, { createContext, useContext, ReactNode, useCallback, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { Product } from '../types';

interface WishlistContextType {
  wishlistItems: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useLocalStorage<Product[]>('wishlist', []);

  const addToWishlist = useCallback((product: Product) => {
    setWishlistItems(prevItems => {
      if (prevItems.find(item => item.id === product.id)) {
        return prevItems; // Already in wishlist
      }
      return [...prevItems, product];
    });
  }, [setWishlistItems]);

  const removeFromWishlist = useCallback((productId: string) => {
    setWishlistItems(prevItems => prevItems.filter(item => item.id !== productId));
  }, [setWishlistItems]);

  const isInWishlist = useCallback((productId: string) => {
    return wishlistItems.some(item => item.id === productId);
  }, [wishlistItems]);

  const wishlistCount = wishlistItems.length;

  const value = useMemo(() => ({ 
    wishlistItems, 
    addToWishlist, 
    removeFromWishlist, 
    isInWishlist, 
    wishlistCount 
  }), [wishlistItems, addToWishlist, removeFromWishlist, isInWishlist, wishlistCount]);

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
