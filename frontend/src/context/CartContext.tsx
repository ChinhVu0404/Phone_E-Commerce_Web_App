'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { cartApi, ApiError, CartItem as ApiCartItem, Product } from '../utils/api';

// Local cart item type for client-side state
export interface CartItem {
  id: number;
  product_id: number;
  quantity: number;
  product?: Product;
  // Client-side fields for local cart
  name?: string;
  price?: number;
  image_url?: string;
}

interface CartContextType {
  items: CartItem[];
  isLoading: boolean;
  error: string | null;
  addToCart: (productId: number, quantity: number, productData?: Partial<Product>) => Promise<void>;
  removeFromCart: (cartItemId: number) => Promise<void>;
  updateQuantity: (cartItemId: number, quantity: number) => Promise<void>;
  clearCart: () => void;
  refreshCart: () => Promise<void>;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [useLocalCart, setUseLocalCart] = useState(false);

  const refreshCart = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const cartItems = await cartApi.get();
      setItems(cartItems);
      setUseLocalCart(false);
    } catch (err) {
      // If backend fails, use local cart
      setUseLocalCart(true);
      if (err instanceof ApiError && err.status === 0) {
        console.warn('Backend unavailable, using local cart');
      } else {
        console.error('Failed to refresh cart:', err);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load cart on mount
  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  const addToCart = useCallback(async (productId: number, quantity: number, productData?: Partial<Product>) => {
    try {
      setIsLoading(true);
      setError(null);
      
      if (useLocalCart) {
        // Local cart mode
        setItems(prev => {
          const existing = prev.find(item => item.product_id === productId);
          if (existing) {
            return prev.map(item => 
              item.product_id === productId 
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          }
          return [...prev, {
            id: Date.now(),
            product_id: productId,
            quantity,
            name: productData?.name,
            price: productData?.price,
            image_url: productData?.image_url,
            product: productData as Product
          }];
        });
      } else {
        await cartApi.addItem({ product_id: productId, quantity });
        await refreshCart();
      }
    } catch (err) {
      // Fallback to local cart on error
      setUseLocalCart(true);
      setItems(prev => {
        const existing = prev.find(item => item.product_id === productId);
        if (existing) {
          return prev.map(item => 
            item.product_id === productId 
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [...prev, {
          id: Date.now(),
          product_id: productId,
          quantity,
          name: productData?.name,
          price: productData?.price,
          image_url: productData?.image_url,
          product: productData as Product
        }];
      });
    } finally {
      setIsLoading(false);
    }
  }, [refreshCart, useLocalCart]);

  const removeFromCart = useCallback(async (cartItemId: number) => {
    try {
      setIsLoading(true);
      setError(null);
      
      if (useLocalCart) {
        setItems(prev => prev.filter(item => item.id !== cartItemId));
      } else {
        await cartApi.removeItem(cartItemId);
        await refreshCart();
      }
    } catch (err) {
      // Fallback to local removal
      setItems(prev => prev.filter(item => item.id !== cartItemId));
    } finally {
      setIsLoading(false);
    }
  }, [refreshCart, useLocalCart]);

  const updateQuantity = useCallback(async (cartItemId: number, quantity: number) => {
    try {
      setIsLoading(true);
      setError(null);
      
      if (useLocalCart) {
        setItems(prev => prev.map(item => 
          item.id === cartItemId ? { ...item, quantity } : item
        ));
      } else {
        await cartApi.updateItem(cartItemId, quantity);
        await refreshCart();
      }
    } catch (err) {
      // Fallback to local update
      setItems(prev => prev.map(item => 
        item.id === cartItemId ? { ...item, quantity } : item
      ));
    } finally {
      setIsLoading(false);
    }
  }, [refreshCart, useLocalCart]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => {
    const price = item.product?.price || item.price || 0;
    return sum + price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isLoading,
        error,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        refreshCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
