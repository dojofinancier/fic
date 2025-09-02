import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
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
  description: 'Accès complet à tous les outils d\'apprentissage FIC®',
  price: PRODUCT_PRICE,
  quantity: 1
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

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
        // Récupérer les détails complets du coupon
        const { data: couponData, error: couponError } = await supabase
          .from('coupons')
          .select('*')
          .eq('id', validation.id)
          .single();

        if (!couponError && couponData) {
          setCoupon(couponData);
        }
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

  // Load cart from localStorage on initialization
  useEffect(() => {
    try {
      console.log('🛒 CartContext: Loading cart from localStorage...');
      
      // Load cart items
      const savedItems = localStorage.getItem('cartItems');
      if (savedItems) {
        const parsedItems = JSON.parse(savedItems);
        if (Array.isArray(parsedItems)) {
          console.log('🛒 CartContext: Restored cart items:', parsedItems);
          setItems(parsedItems);
        }
      } else {
        console.log('🛒 CartContext: No saved cart items found');
      }

      // Load coupon
      const savedCoupon = localStorage.getItem('coupon');
      if (savedCoupon) {
        const parsedCoupon = JSON.parse(savedCoupon);
        if (parsedCoupon && typeof parsedCoupon === 'object') {
          console.log('🛒 CartContext: Restored coupon:', parsedCoupon);
          setCoupon(parsedCoupon);
        }
      } else {
        console.log('🛒 CartContext: No saved coupon found');
      }
    } catch (error) {
      console.error('❌ CartContext: Error loading cart from localStorage:', error);
      // Clear corrupted data
      localStorage.removeItem('cartItems');
      localStorage.removeItem('coupon');
    } finally {
      setIsInitialized(true);
      console.log('🛒 CartContext: Initialization complete');
    }
  }, []);

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    if (isInitialized) {
      try {
        console.log('🛒 CartContext: Saving cart items to localStorage:', items);
        localStorage.setItem('cartItems', JSON.stringify(items));
      } catch (error) {
        console.error('❌ CartContext: Error saving cart to localStorage:', error);
      }
    }
  }, [items, isInitialized]);

  // Save coupon to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      try {
        if (coupon) {
          console.log('🛒 CartContext: Saving coupon to localStorage:', coupon);
          localStorage.setItem('coupon', JSON.stringify(coupon));
        } else {
          console.log('🛒 CartContext: Removing coupon from localStorage');
          localStorage.removeItem('coupon');
        }
      } catch (error) {
        console.error('❌ CartContext: Error saving coupon to localStorage:', error);
      }
    }
  }, [coupon, isInitialized]);

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