// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import Stripe from 'npm:stripe@12.0.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

// This is needed in order to use the Web Crypto API in Deno.
const cryptoProvider = Stripe.createSubtleCryptoProvider()

console.log('Create Payment Intent Function booted!')

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log('🔧 CORS preflight request received')
    return new Response('ok', { 
      headers: corsHeaders,
      status: 200 
    })
  }

  try {
    console.log('🚀 Début de create-payment-intent')
    console.log('📋 Method:', req.method)
    console.log('📋 Headers:', Object.fromEntries(req.headers.entries()))
    
    const stripeApiKey = Deno.env.get('STRIPE_API_KEY')
    if (!stripeApiKey) {
      console.error('❌ STRIPE_API_KEY manquant')
      throw new Error('STRIPE_API_KEY is not configured')
    }
    
    console.log('✅ STRIPE_API_KEY trouvé')
    
    const stripe = new Stripe(stripeApiKey, {
      apiVersion: '2025-07-30.basil',
      httpClient: Stripe.createFetchHttpClient(),
    })
    
    console.log('✅ Stripe initialisé avec la nouvelle API')

    const requestBody = await req.json()
    console.log('📨 Données reçues:', requestBody)
    
    const { amount, currency, orderId, customerEmail, customerName } = requestBody

    // Validation des données
    if (!amount || !currency || !orderId) {
      console.error('❌ Données manquantes:', { amount, currency, orderId })
      throw new Error('Données manquantes: amount, currency ou orderId')
    }

    console.log('✅ Validation des données réussie')

    // Créer le PaymentIntent
    console.log('💳 Création du PaymentIntent...')
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), // S'assurer que c'est un entier
      currency: currency.toLowerCase(),
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        orderId: orderId.toString(),
        customerEmail: customerEmail || '',
        customerName: customerName || '',
      },
    })
    
    console.log('✅ PaymentIntent créé avec succès:', paymentIntent.id)

    const response = {
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id 
    }
    
    console.log('📤 Réponse envoyée:', response)

    return new Response(
      JSON.stringify(response),
      {
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        },
        status: 200,
      },
    )
  } catch (error) {
    console.error('💥 Erreur dans create-payment-intent:', error)
    console.error('📋 Stack trace:', error.stack)
    
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Erreur inconnue lors de la création du PaymentIntent',
        details: error.stack
      }),
      {
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        },
        status: 400,
      },
    )
  }
})