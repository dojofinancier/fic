export interface Coupon {
  id: string;
  code: string;
  discount_percent: number;
  is_active: boolean;
  usage_limit?: number;
  usage_count: number;
  expires_at?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  status: 'pending' | 'completed' | 'cancelled' | 'failed';
  subtotal: number;
  discount_amount: number;
  total: number;
  coupon_id?: string;
  stripe_payment_intent_id?: string;
  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: string;
  order_id: string;
  stripe_payment_intent_id: string;
  amount: number;
  status: string;
  created_at: string;
}

export interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

export interface CouponValidation {
  id?: string;
  code: string;
  discount_percent: number;
  is_valid: boolean;
  message: string;
}