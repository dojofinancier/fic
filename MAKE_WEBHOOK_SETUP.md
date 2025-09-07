# Make.com Webhook Integration Setup Guide

## Overview

This integration automatically sends purchase data to Make.com whenever someone buys a product on your website. The webhook fires immediately after a successful Stripe payment and includes comprehensive user and product information.

## What Gets Sent to Make.com

When a customer completes a purchase, the following data is automatically sent to your Make.com webhook:

### User Information
- **User ID**: Unique identifier from your database
- **Email**: Customer's email address
- **Name**: Customer's full name
- **Account Status**: Whether they have access
- **Account Created Date**: When they signed up
- **Purchase Date**: When the purchase was completed

### Product Information
- **Product ID**: `full-access` or `premium-coaching`
- **Product Name**: "Plan d'accès complet" or "Plan Premium + Coaching"
- **Description**: Detailed product description
- **Price**: Product price in CAD
- **Currency**: Always "CAD"

### Order Information
- **Order ID**: Unique order identifier
- **Status**: Order status (completed)
- **Subtotal**: Amount before discounts
- **Discount Amount**: Any discount applied
- **Total**: Final amount paid
- **Coupon Code**: If a coupon was used
- **Order Date**: When the order was created

### Payment Information
- **Payment Intent ID**: Stripe payment identifier
- **Amount**: Amount paid
- **Currency**: CAD
- **Status**: Payment status

### Metadata
- **Source**: "ledojofinancier.com"
- **Webhook Version**: "1.0"
- **Timestamp**: When the webhook was sent

## Setup Instructions

### 1. Deploy the New Functions via Supabase GUI

1. **Go to your Supabase Dashboard**
   - Navigate to [supabase.com](https://supabase.com) and open your project
   - Go to the "Edge Functions" section in the left sidebar

2. **Deploy the Make.com Webhook Function**
   - Click "Create a new function"
   - Name it: `make-webhook`
   - Copy the contents from `supabase/functions/make-webhook/index.ts` into the function editor
   - Click "Deploy function"

3. **Update the Stripe Webhook Function**
   - Find your existing `stripe-webhook` function in the Edge Functions list
   - Click on it to edit
   - Replace the existing code with the updated version from `supabase/functions/stripe-webhook/index.ts`
   - Click "Deploy function"

### 2. Run the Database Migration via Supabase GUI

1. **Go to the SQL Editor**
   - In your Supabase dashboard, go to "SQL Editor" in the left sidebar
   - Click "New query"

2. **Run the Migration**
   - Copy the contents from `supabase/migrations/20250115000000_add_webhook_logs.sql`
   - Paste it into the SQL editor
   - Click "Run" to execute the migration

### 3. Configure Environment Variables via Supabase GUI

1. **Go to Project Settings**
   - In your Supabase dashboard, click the gear icon (Settings) in the left sidebar
   - Go to "Edge Functions" tab

2. **Add the Environment Variable**
   - Scroll down to "Environment Variables"
   - Click "Add new variable"
   - **Name**: `MAKE_WEBHOOK_URL`
   - **Value**: `https://hook.eu1.make.com/YOUR_WEBHOOK_URL_HERE`
   - Click "Save"

Replace `YOUR_WEBHOOK_URL_HERE` with your actual Make.com webhook URL.

### 4. Get Your Make.com Webhook URL

1. Go to your Make.com scenario
2. Add a "Webhook" module
3. Copy the webhook URL provided
4. Use this URL in the environment variable above

## Example Webhook Payload

Here's what Make.com will receive when someone buys a product:

```json
{
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "customer@example.com",
    "name": "John Doe",
    "hasAccess": true,
    "accountCreatedAt": "2025-01-15T10:30:00Z",
    "purchaseDate": "2025-01-15T14:45:00Z"
  },
  "product": {
    "id": "full-access",
    "name": "Plan d'accès complet",
    "description": "Accès complet à tous les outils d'apprentissage FIC®",
    "price": 197,
    "currency": "CAD"
  },
  "order": {
    "id": "456e7890-e89b-12d3-a456-426614174001",
    "status": "completed",
    "subtotal": 197.00,
    "discountAmount": 0,
    "total": 197.00,
    "couponCode": null,
    "createdAt": "2025-01-15T14:45:00Z"
  },
  "payment": {
    "intentId": "pi_1234567890",
    "amount": 197.00,
    "currency": "CAD",
    "status": "completed"
  },
  "metadata": {
    "source": "ledojofinancier.com",
    "webhookVersion": "1.0",
    "timestamp": "2025-01-15T14:45:30Z"
  }
}
```

## Testing the Integration

### 1. Test with a Real Purchase

The easiest way to test is to make a real purchase:

1. Go to your website
2. Add a product to cart
3. Complete the checkout process
4. Check your Make.com scenario to see if the webhook was received

### 2. Test the Webhook Directly via Supabase GUI

You can test the webhook function directly using the Supabase dashboard:

1. **Go to Edge Functions**
   - In your Supabase dashboard, go to "Edge Functions"
   - Find the `make-webhook` function and click on it

2. **Use the Function Testing Interface**
   - Click on the "Invoke function" tab
   - Set the HTTP method to "POST"
   - Add the following test payload in the request body:

```json
{
  "orderId": "test-order-id",
  "userId": "test-user-id",
  "userEmail": "test@example.com",
  "userName": "Test User",
  "productId": "full-access",
  "productName": "Plan d'accès complet",
  "productPrice": 197,
  "totalAmount": 197,
  "paymentIntentId": "pi_test_123",
  "purchaseDate": "2025-01-15T14:45:00Z"
}
```

**Note**: The function will work with test data even if the order doesn't exist in your database. It will use the payload data directly for testing purposes.

3. **Run the Test**
   - Click "Invoke function" to test the webhook
   - Check the response and logs for any errors

**Alternative: Using curl (if you prefer command line)**
```bash
# Test the Make.com webhook function
curl -X POST \
  https://your-project.supabase.co/functions/v1/make-webhook \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": "test-order-id",
    "userId": "test-user-id",
    "userEmail": "test@example.com",
    "userName": "Test User",
    "productId": "full-access",
    "productName": "Plan d'\''accès complet",
    "productPrice": 197,
    "totalAmount": 197,
    "paymentIntentId": "pi_test_123",
    "purchaseDate": "2025-01-15T14:45:00Z"
  }'
```

### 3. Check Webhook Logs via Supabase GUI

You can check the webhook logs in your Supabase database:

1. **Go to the Table Editor**
   - In your Supabase dashboard, go to "Table Editor" in the left sidebar
   - Find the `webhook_logs` table and click on it

2. **View Recent Webhook Logs**
   - You'll see all webhook attempts with their status and payload data
   - Use the filters to find specific webhook types or time ranges

**Alternative: Using SQL Editor**
1. Go to "SQL Editor" in your Supabase dashboard
2. Run this query to see recent webhook logs:

```sql
SELECT * FROM webhook_logs 
ORDER BY sent_at DESC 
LIMIT 10;
```

## Troubleshooting

### Webhook Not Firing

1. **Check Environment Variables**: Ensure `MAKE_WEBHOOK_URL` is set correctly
2. **Check Function Logs**: Look at the Supabase function logs for errors
3. **Verify Stripe Webhook**: Ensure your Stripe webhook is working properly

### Webhook Firing but Make.com Not Receiving

1. **Check Make.com Webhook URL**: Verify the URL is correct and active
2. **Check Make.com Scenario**: Ensure the scenario is running and the webhook module is active
3. **Check Network**: Ensure there are no firewall issues

### Data Issues

1. **Check Database**: Verify the order and user data exists in your database
2. **Check Webhook Logs**: Look at the `webhook_logs` table for the payload that was sent
3. **Validate JSON**: Ensure the payload is valid JSON

## Monitoring

### Webhook Logs Table

The system automatically logs all webhook attempts in the `webhook_logs` table:

- **order_id**: Which order triggered the webhook
- **webhook_type**: Type of webhook (make_com_purchase)
- **payload**: Complete data sent to Make.com
- **response_status**: HTTP status code from Make.com
- **response_data**: Response from Make.com
- **sent_at**: When the webhook was sent

### Function Logs via Supabase GUI

Check the Supabase function logs for detailed debugging information:

1. **Go to Edge Functions**
   - In your Supabase dashboard, go to "Edge Functions"
   - Click on the function you want to check (`make-webhook` or `stripe-webhook`)

2. **View Function Logs**
   - Click on the "Logs" tab
   - You'll see real-time logs and any error messages
   - Use the filters to find specific log entries

**Alternative: Using CLI (if you have it installed)**
```bash
supabase functions logs make-webhook
supabase functions logs stripe-webhook
```

## Security Considerations

1. **Webhook URL**: Keep your Make.com webhook URL secure
2. **Environment Variables**: Don't expose sensitive environment variables
3. **Rate Limiting**: Make.com may have rate limits on webhooks
4. **Data Privacy**: Ensure you're only sending necessary data to Make.com

## Support

If you encounter issues:

1. Check the function logs first
2. Verify your Make.com webhook URL
3. Test with a simple payload
4. Check the webhook_logs table for debugging information

The integration is designed to be robust and will not fail your main payment process if the Make.com webhook fails.
