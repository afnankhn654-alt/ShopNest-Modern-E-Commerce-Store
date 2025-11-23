
import React, { createContext, useContext, ReactNode, useCallback, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { CartItem, Product, Variant } from '../types';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, variant: Variant, quantity: number) => void;
  removeFromCart: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('cart', []);

  const addToCart = useCallback((product: Product, variant: Variant, quantity: number) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.variant.variant_id === variant.variant_id);
      if (existingItem) {
        return prevItems.map(item =>
          item.variant.variant_id === variant.variant_id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { product, variant, quantity }];
    });
  }, [setCartItems]);

  const removeFromCart = useCallback((variantId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.variant.variant_id !== variantId));
  }, [setCartItems]);

  const updateQuantity = useCallback((variantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(variantId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.variant.variant_id === variantId ? { ...item, quantity } : item
      )
    );
  }, [setCartItems, removeFromCart]);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, [setCartItems]);

  const cartCount = useMemo(() => cartItems.reduce((count, item) => count + item.quantity, 0), [cartItems]);
  const cartTotal = useMemo(() => cartItems.reduce((total, item) => total + item.variant.price * item.quantity, 0), [cartItems]);

  const value = useMemo(() => ({ 
    cartItems, 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    cartCount, 
    cartTotal 
  }), [cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal]);

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
