// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from 'npm:@supabase/supabase-js@2'
import Stripe from 'npm:stripe@12.0.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, stripe-signature',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

// This is needed in order to use the Web Crypto API in Deno.
const cryptoProvider = Stripe.createSubtleCryptoProvider()

console.log('Stripe Webhook Function booted!')

Deno.serve(async (request) => {
  // Handle CORS preflight requests
  if (request.method === 'OPTIONS') {
    console.log('🔧 CORS preflight request received')
    return new Response('ok', { 
      headers: corsHeaders,
      status: 200 
    })
  }

  const signature = request.headers.get('Stripe-Signature')

  try {
    console.log('🔔 Webhook reçu')
    console.log('📋 Headers:', Object.fromEntries(request.headers.entries()))
    
    const body = await request.text()
    console.log('📋 Body length:', body.length)
    
    const stripeApiKey = Deno.env.get('STRIPE_API_KEY')
    if (!stripeApiKey) {
      console.error('❌ STRIPE_API_KEY manquant')
      throw new Error('STRIPE_API_KEY is not configured')
    }
    
    const stripe = new Stripe(stripeApiKey, {
      apiVersion: '2025-07-30.basil',
      httpClient: Stripe.createFetchHttpClient(),
    })

    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SIGNING_SECRET')
    if (!webhookSecret) {
      console.error('❌ STRIPE_WEBHOOK_SIGNING_SECRET manquant')
      throw new Error('STRIPE_WEBHOOK_SIGNING_SECRET is not set')
    }

    console.log('✅ Secrets trouvés, construction de l\'événement webhook...')
    const receivedEvent = await stripe.webhooks.constructEventAsync(
      body, 
      signature!, 
      webhookSecret, 
      undefined, 
      cryptoProvider
    )
    console.log('✅ Événement webhook:', receivedEvent.type, 'ID:', receivedEvent.id)

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    switch (receivedEvent.type) {
      case 'payment_intent.succeeded': {
        console.log('💰 Traitement payment_intent.succeeded')
        const paymentIntent = receivedEvent.data.object as Stripe.PaymentIntent
        const orderId = paymentIntent.metadata.orderId
        console.log('📋 Order ID:', orderId)

        if (orderId) {
          // Mettre à jour la commande
          console.log('📝 Mise à jour de la commande...')
          const { error: orderError } = await supabase
            .from('orders')
            .update({ 
              status: 'completed',
              stripe_payment_intent_id: paymentIntent.id 
            })
            .eq('id', orderId)

          if (orderError) {
            console.error('❌ Erreur mise à jour commande:', orderError)
            throw orderError
          }
          
          console.log('✅ Commande mise à jour avec succès')

          // Récupérer la commande pour obtenir l'user_id
          console.log('🔍 Récupération des détails de la commande...')
          const { data: order, error: fetchError } = await supabase
            .from('orders')
            .select('user_id, coupon_id')
            .eq('id', orderId)
            .single()

          if (fetchError) {
            console.error('❌ Erreur récupération commande:', fetchError)
            throw fetchError
          }
          
          console.log('✅ Détails commande récupérés:', order)

          // Donner l'accès à l'utilisateur
          console.log('🔓 Attribution de l\'accès à l\'utilisateur...')
          
          // Try direct SQL query to bypass RLS
          const { error: accessError } = await supabase
            .rpc('update_user_access', { user_id: order.user_id })

          if (accessError) {
            console.error('❌ Erreur mise à jour accès:', accessError)
            // Fallback to direct update
            const { error: fallbackError } = await supabase
              .from('users')
              .update({ has_access: true })
              .eq('id', order.user_id)
            
            if (fallbackError) {
              console.error('❌ Erreur fallback mise à jour accès:', fallbackError)
              throw fallbackError
            }
          }
          
          console.log('✅ Accès accordé à l\'utilisateur')

          // Incrémenter l'usage du coupon si applicable
          if (order.coupon_id) {
            console.log('🎫 Incrémentation du coupon...')
            const { error: couponError } = await supabase
              .rpc('increment_coupon_usage', { coupon_id: order.coupon_id })

            if (couponError) {
              console.error('❌ Erreur mise à jour coupon:', couponError)
            } else {
              console.log('✅ Coupon mis à jour avec succès')
            }
          }

          // Enregistrer le paiement
          console.log('💾 Enregistrement du paiement...')
          const { error: paymentError } = await supabase
            .from('payments')
            .insert({
              order_id: orderId,
              stripe_payment_intent_id: paymentIntent.id,
              amount: paymentIntent.amount / 100, // Convertir centimes en dollars
              status: paymentIntent.status
            })

          if (paymentError) {
            console.error('❌ Erreur enregistrement paiement:', paymentError)
          } else {
            console.log('✅ Paiement enregistré avec succès')
          }

          // Make.com integration removed as per request
        }
        break
      }

      case 'payment_intent.payment_failed': {
        console.log('❌ Traitement payment_intent.payment_failed')
        const paymentIntent = receivedEvent.data.object as Stripe.PaymentIntent
        const orderId = paymentIntent.metadata.orderId
        console.log('📋 Order ID (échec):', orderId)

        if (orderId) {
          // Mettre à jour la commande comme échouée
          console.log('📝 Mise à jour commande comme échouée...')
          const { error } = await supabase
            .from('orders')
            .update({ 
              status: 'failed',
              stripe_payment_intent_id: paymentIntent.id 
            })
            .eq('id', orderId)

          if (error) {
            console.error('❌ Erreur mise à jour commande échouée:', error)
          } else {
            console.log('✅ Commande marquée comme échouée')
          }
        }
        break
      }

      default:
        console.log(`ℹ️ Événement non géré: ${receivedEvent.type}`)
    }

    return new Response(JSON.stringify({ 
      received: true,
      eventType: receivedEvent.type,
      eventId: receivedEvent.id 
    }), {
      headers: { 
        ...corsHeaders,
        'Content-Type': 'application/json' 
      },
      status: 200,
    })
  } catch (err) {
    console.error('💥 Erreur webhook:', err)
    return new Response(
      JSON.stringify({ 
        error: 'Webhook handler failed',
        message: err.message 
      }),
      {
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        },
        status: 400,
      }
    )
  }
})