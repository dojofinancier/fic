import { loadStripe } from '@stripe/stripe-js';

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

if (!stripePublishableKey) {
  console.error('❌ VITE_STRIPE_PUBLISHABLE_KEY is not defined! Stripe will not work.');
  console.error('❌ Please create a .env file with VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key');
} else {
  console.log('✅ Stripe publishable key found:', stripePublishableKey.substring(0, 10) + '...');
}

export const stripePromise = loadStripe(stripePublishableKey);

// Add error handling for Stripe loading
stripePromise.then(
  (stripe) => {
    if (stripe) {
      console.log('✅ Stripe loaded successfully');
    } else {
      console.error('❌ Stripe failed to load');
    }
  },
  (error) => {
    console.error('❌ Error loading Stripe:', error);
  }
);

// Import product configuration
import { PRODUCTS } from '../config/products';

// For backward compatibility - use the full access product price
export const PRODUCT_PRICE = PRODUCTS['full-access'].price;

export const formatPrice = (amount: number): string => {
  return new Intl.NumberFormat('fr-CA', {
    style: 'currency',
    currency: 'CAD'
  }).format(amount);
};