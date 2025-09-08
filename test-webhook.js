// Test script for make-webhook function
// Replace the values below with your actual order data from the database

const testWebhook = async () => {
  const payload = {
    orderId: "ad702c0a-4269-4143-ac9c-07b7ab8771c1",
    userId: "198a179d-8752-41e9-b7a3-8145f03a7b62",  
    userEmail: "YOUR_EMAIL_HERE", // You need to get this from the users table
    userName: "YOUR_NAME_HERE", // You need to get this from the users table
    productId: "full-access",
    productName: "Plan d'accès complet",
    productPrice: 2.00, // This was your subtotal
    totalAmount: 2.00, // This was your total
    discountAmount: 0.00, // This was your discount_amount
    couponCode: null, // No coupon was used (coupon_id is null)
    paymentIntentId: "pi_3S57HHIhKdQmGgG41MlXvagu",
    purchaseDate: "2025-09-08T15:46:46.325565Z" // Converted from your created_at
  };

  const response = await fetch('https://YOUR_PROJECT_REF.supabase.co/functions/v1/make-webhook', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_ANON_KEY',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
  });

  const result = await response.text();
  console.log('Response status:', response.status);
  console.log('Response body:', result);
};

// Run the test
testWebhook().catch(console.error);
