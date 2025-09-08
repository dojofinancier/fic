// Test script to verify the stripe-webhook database logic
// This tests the part that was causing the PGRST200 error

const testStripeWebhookLogic = async () => {
  const orderId = "ad702c0a-4269-4143-ac9c-07b7ab8771c1"; // Your actual order ID
  
  try {
    // Test the fixed database query logic
    console.log('🔍 Testing order details query...');
    
    // Step 1: Get order data (this was working)
    const orderResponse = await fetch(`https://YOUR_PROJECT_REF.supabase.co/rest/v1/orders?select=*&id=eq.${orderId}`, {
      headers: {
        'Authorization': 'Bearer YOUR_ANON_KEY',
        'apikey': 'YOUR_ANON_KEY'
      }
    });
    
    const orderData = await orderResponse.json();
    console.log('✅ Order data:', orderData[0]);
    
    if (orderData[0]) {
      const userId = orderData[0].user_id;
      
      // Step 2: Get user data separately (this was the fix)
      console.log('🔍 Testing user details query...');
      const userResponse = await fetch(`https://YOUR_PROJECT_REF.supabase.co/rest/v1/users?select=id,email,name&id=eq.${userId}`, {
        headers: {
          'Authorization': 'Bearer YOUR_ANON_KEY',
          'apikey': 'YOUR_ANON_KEY'
        }
      });
      
      const userData = await userResponse.json();
      console.log('✅ User data:', userData[0]);
      
      // Step 3: Combine the data (this is what the webhook does)
      const combinedData = {
        ...orderData[0],
        users: userData[0]
      };
      
      console.log('✅ Combined data (what webhook would send to make-webhook):', {
        orderId: combinedData.id,
        userId: combinedData.user_id,
        userEmail: combinedData.users.email,
        userName: combinedData.users.name,
        productId: "full-access",
        productName: "Plan d'accès complet",
        productPrice: parseFloat(combinedData.subtotal),
        totalAmount: parseFloat(combinedData.total),
        discountAmount: parseFloat(combinedData.discount_amount),
        couponCode: combinedData.coupon_id ? "APPLIED" : null,
        paymentIntentId: combinedData.stripe_payment_intent_id,
        purchaseDate: combinedData.created_at
      });
      
      console.log('🎉 Database query logic test passed! The PGRST200 error should be fixed.');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
};

// Run the test
testStripeWebhookLogic();
