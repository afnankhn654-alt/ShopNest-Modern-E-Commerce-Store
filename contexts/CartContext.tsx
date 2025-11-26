import React, { createContext, useContext, ReactNode, useCallback, useMemo, useState, useEffect } from 'react';
import { CartItem, Product, Variant, StoredCartItem } from '../types';
import { useAuth } from './AuthContext';
import { useUserData } from '../services/userDataService';
import { products as allProducts } from '../data/products';

type PendingAction = {
  type: 'ADD_TO_CART';
  product: Product;
  variant: Variant;
  quantity: number;
} | null;

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, variant: Variant, quantity: number) => void;
  removeFromCart: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  isAuthPromptOpen: boolean;
  closeAuthPrompt: () => void;
  addToGuestCart: (product: Product, variant: Variant, quantity: number) => void;
  getPendingAction: () => PendingAction;
  executePendingAction: () => void;
  clearPendingAction: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { user, loading: authLoading } = useAuth();
  const { getUserData, updateUserCart } = useUserData();

  // State for auth prompt modal
  const [isAuthPromptOpen, setIsAuthPromptOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<PendingAction>(null);

  // Debounce Firestore updates
  const debounce = (func: Function, delay: number) => {
    let timeout: ReturnType<typeof setTimeout>;
    return (...args: any) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };
  const debouncedUpdateUserCart = useCallback(debounce(updateUserCart, 1500), [updateUserCart]);

  // Effect to load and merge cart on auth state change
  useEffect(() => {
    const syncCart = async () => {
      if (user) {
        // User is logged in
        const localGuestCart = JSON.parse(localStorage.getItem('guest_cart') || '[]') as StoredCartItem[];
        localStorage.removeItem('guest_cart');
        
        const userData = await getUserData(user.id);
        const remoteCart = userData?.cart || [];
        
        // Merge local guest cart with remote cart
        const mergedStoredCart = [...remoteCart];
        localGuestCart.forEach(localItem => {
          const existingIndex = mergedStoredCart.findIndex(
            remoteItem => remoteItem.variantId === localItem.variantId
          );
          if (existingIndex > -1) {
            // Item exists, update quantity (local is more recent)
            mergedStoredCart[existingIndex].quantity = localItem.quantity;
          } else {
            // New item, add it
            mergedStoredCart.push(localItem);
          }
        });
        
        // Hydrate and set state
        const hydratedCart = hydrateCart(mergedStoredCart);
        setCartItems(hydratedCart);
        
        // Update Firestore with the merged cart
        if (localGuestCart.length > 0) {
            await updateUserCart(user.id, mergedStoredCart);
        }

      } else {
        // User is a guest
        const localGuestCart = JSON.parse(localStorage.getItem('guest_cart') || '[]') as StoredCartItem[];
        setCartItems(hydrateCart(localGuestCart));
      }
    };

    if (!authLoading) {
      syncCart();
    }
  }, [user, authLoading]);
  
  const hydrateCart = (storedCart: StoredCartItem[]): CartItem[] => {
    return storedCart.map(item => {
      const product = allProducts.find(p => p.id === item.productId);
      const variant = product?.variants.find(v => v.variant_id === item.variantId);
      if (product && variant) {
        return { product, variant, quantity: item.quantity };
      }
      return null;
    }).filter((item): item is CartItem => item !== null);
  };

  const deHydrateCart = (cart: CartItem[]): StoredCartItem[] => {
    return cart.map(item => ({
      productId: item.product.id,
      variantId: item.variant.variant_id,
      quantity: item.quantity,
    }));
  };

  const handleGuestCartUpdate = (newCartItems: CartItem[]) => {
      setCartItems(newCartItems);
      localStorage.setItem('guest_cart', JSON.stringify(deHydrateCart(newCartItems)));
  };

  const addToGuestCart = (product: Product, variant: Variant, quantity: number) => {
    // Get current guest cart from localStorage, update it, and save back.
    const localGuestCart = JSON.parse(localStorage.getItem('guest_cart') || '[]') as StoredCartItem[];
    const hydrated = hydrateCart(localGuestCart);
    
    const existingItem = hydrated.find(item => item.variant.variant_id === variant.variant_id);
    let newItems;
    if (existingItem) {
      newItems = hydrated.map(item =>
        item.variant.variant_id === variant.variant_id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      newItems = [...hydrated, { product, variant, quantity }];
    }
    handleGuestCartUpdate(newItems);
  };

  const handleUserCartUpdate = (newCartItems: CartItem[]) => {
      setCartItems(newCartItems);
      if (user) {
          debouncedUpdateUserCart(user.id, deHydrateCart(newCartItems));
      }
  };

  const addToCart = useCallback((product: Product, variant: Variant, quantity: number) => {
    if (!user) {
      setPendingAction({ type: 'ADD_TO_CART', product, variant, quantity });
      setIsAuthPromptOpen(true);
      return;
    }

    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.variant.variant_id === variant.variant_id);
      let newItems;
      if (existingItem) {
        newItems = prevItems.map(item =>
          item.variant.variant_id === variant.variant_id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [...prevItems, { product, variant, quantity }];
      }
      handleUserCartUpdate(newItems);
      return newItems;
    });
  }, [user]);

  const removeFromCart = useCallback((variantId: string) => {
    const updater = (prevItems: CartItem[]) => prevItems.filter(item => item.variant.variant_id !== variantId);
    if(user) {
        setCartItems(prev => {
            const newItems = updater(prev);
            handleUserCartUpdate(newItems);
            return newItems;
        });
    } else {
        handleGuestCartUpdate(updater(cartItems));
    }
  }, [user, cartItems]);

  const updateQuantity = useCallback((variantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(variantId);
      return;
    }
    const updater = (prevItems: CartItem[]) => prevItems.map(item =>
        item.variant.variant_id === variantId ? { ...item, quantity } : item
    );

    if(user) {
        setCartItems(prev => {
            const newItems = updater(prev);
            handleUserCartUpdate(newItems);
            return newItems;
        });
    } else {
        handleGuestCartUpdate(updater(cartItems));
    }
  }, [user, cartItems, removeFromCart]);

  const clearCart = useCallback(() => {
     if(user) {
        handleUserCartUpdate([]);
     } else {
        handleGuestCartUpdate([]);
     }
  }, [user]);

  const cartCount = useMemo(() => cartItems.reduce((count, item) => count + item.quantity, 0), [cartItems]);
  const cartTotal = useMemo(() => cartItems.reduce((total, item) => total + item.variant.price * item.quantity, 0), [cartItems]);
  
  const closeAuthPrompt = () => setIsAuthPromptOpen(false);
  const getPendingAction = () => pendingAction;
  const clearPendingAction = () => setPendingAction(null);
  const executePendingAction = () => {
    if(pendingAction?.type === 'ADD_TO_CART' && pendingAction.quantity > 0) { // Ensure it's not a wishlist trigger
        const { product, variant, quantity } = pendingAction;
        // Re-call addToCart now that user is logged in
        addToCart(product, variant, quantity);
    }
  };


  const value = useMemo(() => ({ 
    cartItems, 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    cartCount, 
    cartTotal,
    isAuthPromptOpen,
    addToGuestCart,
    closeAuthPrompt,
    getPendingAction,
    executePendingAction,
    clearPendingAction
  }), [cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal, isAuthPromptOpen, addToGuestCart]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};