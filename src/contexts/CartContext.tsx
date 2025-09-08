import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem, Coupon, CouponValidation } from '../types/payment';
import { supabase } from '../lib/supabase';
import { PRODUCT_PRICE } from '../lib/stripe';

interface CartContextType {
  items: CartItem[];
  coupon: Coupon | null;
  subtotal: number;
  discountAmount: number;
  total: number;
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  applyCoupon: (code: string) => Promise<CouponValidation>;
  removeCoupon: () => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Produit par défaut (accès complet)
const DEFAULT_PRODUCT: CartItem = {
  id: 'full-access',
  name: 'Plan d\'accès complet',
  description: 'Accès complet à tous les outils d\'apprentissage FIC',
  price: PRODUCT_PRICE,
  quantity: 1
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [coupon, setCoupon] = useState<Coupon | null>(null);

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = coupon ? (subtotal * coupon.discount_percent) / 100 : 0;
  const total = subtotal - discountAmount;

  const addItem = (item: CartItem) => {
    setItems(prev => {
      const existingItem = prev.find(i => i.id === item.id);
      if (existingItem) {
        return prev.map(i => 
          i.id === item.id 
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, item];
    });
  };

  const removeItem = (itemId: string) => {
    setItems(prev => prev.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    setItems(prev => 
      prev.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const applyCoupon = async (code: string): Promise<CouponValidation> => {
    try {
      const { data, error } = await supabase
        .rpc('validate_coupon', { coupon_code: code });

      if (error) throw error;

      const validation = data[0] as CouponValidation;
      
      if (validation.is_valid && validation.id) {
        // Create coupon object from validation data instead of querying the table
        const couponData: Coupon = {
          id: validation.id,
          code: validation.code,
          discount_percent: validation.discount_percent,
          is_active: true, // If validation passed, it's active
          usage_limit: null, // We don't have this info from validation
          usage_count: 0, // We don't have this info from validation
          expires_at: null, // We don't have this info from validation
          created_by: null, // We don't have this info from validation
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        setCoupon(couponData);
      }

      return validation;
    } catch (error) {
      console.error('Erreur lors de la validation du coupon:', error);
      return {
        code,
        discount_percent: 0,
        is_valid: false,
        message: 'Erreur lors de la validation du coupon'
      };
    }
  };

  const removeCoupon = () => {
    setCoupon(null);
  };

  const clearCart = () => {
    setItems([]);
    setCoupon(null);
  };

  return (
    <CartContext.Provider value={{
      items,
      coupon,
      subtotal,
      discountAmount,
      total,
      addItem,
      removeItem,
      updateQuantity,
      applyCoupon,
      removeCoupon,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};