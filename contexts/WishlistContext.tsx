import React, { createContext, useContext, ReactNode, useCallback, useMemo, useState, useEffect } from 'react';
import { Product, StoredWishlistItem } from '../types';
import { useAuth } from './AuthContext';
import { useUserData } from '../services/userDataService';
import { products as allProducts } from '../data/products';
import { useCart } from './CartContext'; // To access modal controls

type PendingAction = {
  type: 'ADD_TO_WISHLIST';
  product: Product;
} | null;

interface WishlistContextType {
  wishlistItems: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  addToGuestWishlist: (product: Product) => void;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const { user, loading: authLoading } = useAuth();
  const { getUserData, updateUserWishlist } = useUserData();
  const { addToCart: triggerAuthPromptModal, getPendingAction: getCartPendingAction, executePendingAction: executeCartAction, clearPendingAction: clearCartAction } = useCart();
  const [pendingWishlistAction, setPendingWishlistAction] = useState<PendingAction>(null);


  const debounce = (func: Function, delay: number) => {
    let timeout: ReturnType<typeof setTimeout>;
    return (...args: any) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };
  const debouncedUpdateUserWishlist = useCallback(debounce(updateUserWishlist, 1500), []);


  useEffect(() => {
    const syncWishlist = async () => {
      if (user) {
        // User logged in
        const localGuestWishlist = JSON.parse(localStorage.getItem('guest_wishlist') || '[]') as StoredWishlistItem[];
        localStorage.removeItem('guest_wishlist');
        
        const userData = await getUserData(user.id);
        const remoteWishlist = userData?.wishlist || [];
        
        // Merge (simple union, remove duplicates)
        const mergedStoredWishlist = [...new Set([...remoteWishlist, ...localGuestWishlist])];
        
        const hydratedWishlist = hydrateWishlist(mergedStoredWishlist);
        setWishlistItems(hydratedWishlist);
        
        if (localGuestWishlist.length > 0) {
            await updateUserWishlist(user.id, mergedStoredWishlist);
        }

      } else {
        // Guest
        const localGuestWishlist = JSON.parse(localStorage.getItem('guest_wishlist') || '[]') as StoredWishlistItem[];
        setWishlistItems(hydrateWishlist(localGuestWishlist));
      }
    };
    if (!authLoading) {
      syncWishlist();
    }
  }, [user, authLoading]);

  // Handle executing pending actions after successful login
  useEffect(() => {
    if (user && !authLoading) {
        if(pendingWishlistAction) {
            addToWishlist(pendingWishlistAction.product);
            setPendingWishlistAction(null);
        }
        // Also check if there was a cart action that triggered the login
        if (getCartPendingAction()) {
            executeCartAction();
            clearCartAction();
        }
    }
  }, [user, authLoading, pendingWishlistAction]);


  const hydrateWishlist = (storedWishlist: StoredWishlistItem[]): Product[] => {
    return storedWishlist.map(productId => allProducts.find(p => p.id === productId)).filter((p): p is Product => p !== undefined);
  };
  
  const deHydrateWishlist = (wishlist: Product[]): StoredWishlistItem[] => {
    return wishlist.map(p => p.id);
  };

  const handleGuestWishlistUpdate = (newItems: Product[]) => {
      setWishlistItems(newItems);
      localStorage.setItem('guest_wishlist', JSON.stringify(deHydrateWishlist(newItems)));
  };

  const addToGuestWishlist = (product: Product) => {
    setWishlistItems(prevItems => {
        if (prevItems.some(item => item.id === product.id)) {
            return prevItems;
        }
        const newItems = [...prevItems, product];
        handleGuestWishlistUpdate(newItems);
        return newItems;
    });
  };

  const handleUserWishlistUpdate = (newItems: Product[]) => {
      setWishlistItems(newItems);
      if (user) {
          debouncedUpdateUserWishlist(user.id, deHydrateWishlist(newItems));
      }
  };

  const addToWishlist = useCallback((product: Product) => {
    if (!user) {
      setPendingWishlistAction({ type: 'ADD_TO_WISHLIST', product });
      triggerAuthPromptModal(product, product.variants[0], 0);
      return
    }

    const updater = (prevItems: Product[]) => {
        if (prevItems.find(item => item.id === product.id)) return prevItems;
        return [...prevItems, product];
    };
    handleUserWishlistUpdate(updater(wishlistItems));

  }, [user, wishlistItems, triggerAuthPromptModal]);


  const removeFromWishlist = useCallback((productId: string) => {
    const updater = (prevItems: Product[]) => prevItems.filter(item => item.id !== productId);
    if(user) {
        handleUserWishlistUpdate(updater(wishlistItems));
    } else {
        handleGuestWishlistUpdate(updater(wishlistItems));
    }
  }, [user, wishlistItems]);

  const isInWishlist = useCallback((productId: string) => {
    return wishlistItems.some(item => item.id === productId);
  }, [wishlistItems]);

  const wishlistCount = wishlistItems.length;
  
  const value = useMemo(() => ({ 
    wishlistItems, 
    addToWishlist, 
    removeFromWishlist, 
    isInWishlist, 
    wishlistCount,
    addToGuestWishlist
  }), [wishlistItems, addToWishlist, removeFromWishlist, isInWishlist, wishlistCount, addToGuestWishlist]);


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