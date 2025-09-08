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

          // Déclencher le webhook Make.com de manière asynchrone
          console.log('🔔 Mise en file d\'attente du webhook Make.com...')
          
          // Fonction pour traiter le webhook Make.com de manière asynchrone
          const processMakeWebhook = async () => {
            try {
              console.log('🔔 Traitement du webhook Make.com...')
              
              // Récupérer les détails de la commande pour le webhook
              const { data: orderDetails, error: orderDetailsError } = await supabase
                .from('orders')
                .select('*')
                .eq('id', orderId)
                .single()

              if (orderDetailsError) {
                console.error('❌ Erreur récupération détails commande pour webhook:', orderDetailsError)
                return
              }

              // Récupérer les détails de l'utilisateur séparément
              console.log('🔍 Récupération des détails de l\'utilisateur...')
              const { data: userData, error: userError } = await supabase
                .from('users')
                .select('id, email, name')
                .eq('id', orderDetails.user_id)
                .single()

              if (userError) {
                console.error('❌ Erreur récupération utilisateur pour webhook:', userError)
                return
              }

              // Combiner les données
              const combinedOrderData = {
                ...orderDetails,
                users: userData
              }

              // Déterminer le produit basé sur le montant total
              const isPremiumPlan = combinedOrderData.total >= 600 // Plan Premium + Coaching
              const productId = isPremiumPlan ? 'premium-coaching' : 'full-access'
              
              // Product configuration (centralized)
              const PRODUCTS = {
                'full-access': {
                  name: 'Plan d\'accès complet',
                  price: 1 // Updated from centralized config
                },
                'premium-coaching': {
                  name: 'Plan Premium + Coaching', 
                  price: 627 // Updated from centralized config
                }
              }
              
              const product = PRODUCTS[productId]
              const productName = product.name
              const productPrice = product.price

              const makeWebhookPayload = {
                orderId: orderId,
                userId: combinedOrderData.user_id,
                userEmail: combinedOrderData.users.email,
                userName: combinedOrderData.users.name,
                productId: productId,
                productName: productName,
                productPrice: productPrice,
                totalAmount: combinedOrderData.total,
                discountAmount: combinedOrderData.discount_amount || 0,
                couponCode: combinedOrderData.coupon_id ? 'APPLIED' : null,
                paymentIntentId: paymentIntent.id,
                purchaseDate: new Date().toISOString()
              }

              console.log('📤 Payload Make.com webhook:', makeWebhookPayload)

              // Appeler le webhook Make.com
              const makeWebhookUrl = `${Deno.env.get('SUPABASE_URL')}/functions/v1/make-webhook`
              const makeResponse = await fetch(makeWebhookUrl, {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(makeWebhookPayload)
              })

              if (makeResponse.ok) {
                console.log('✅ Webhook Make.com déclenché avec succès')
              } else {
                const errorText = await makeResponse.text()
                console.error('❌ Erreur webhook Make.com:', makeResponse.status, errorText)
              }
            } catch (webhookError) {
              console.error('❌ Erreur déclenchement webhook Make.com:', webhookError)
            }
          }

          // Lancer le webhook Make.com de manière asynchrone (non-bloquant)
          setTimeout(processMakeWebhook, 1000) // 1 seconde de délai
          
          console.log('✅ Webhook Make.com mis en file d\'attente, traitement principal terminé')
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