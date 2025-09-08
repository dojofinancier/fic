// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

console.log('Make.com Webhook Function booted!')

interface MakeWebhookPayload {
  orderId: string;
  userId: string;
  userEmail: string;
  userName: string;
  productId: string;
  productName: string;
  productPrice: number;
  totalAmount: number;
  discountAmount?: number;
  couponCode?: string;
  paymentIntentId: string;
  purchaseDate: string;
}

Deno.serve(async (request) => {
  // Handle CORS preflight requests
  if (request.method === 'OPTIONS') {
    console.log('🔧 CORS preflight request received')
    return new Response('ok', { 
      headers: corsHeaders,
      status: 200 
    })
  }

  try {
    console.log('🔔 Make.com webhook reçu')
    console.log('📋 Headers:', Object.fromEntries(request.headers.entries()))
    
    const body = await request.text()
    console.log('📋 Body length:', body.length)
    
    const payload: MakeWebhookPayload = JSON.parse(body)
    console.log('📨 Payload reçu:', payload)

    // Validation des données requises
    const requiredFields = ['orderId', 'userId', 'userEmail', 'productName', 'productPrice', 'totalAmount', 'paymentIntentId']
    const missingFields = requiredFields.filter(field => {
      const value = payload[field as keyof MakeWebhookPayload]
      return value === undefined || value === null || value === ''
    })
    
    if (missingFields.length > 0) {
      console.error('❌ Champs manquants:', missingFields)
      throw new Error(`Champs manquants: ${missingFields.join(', ')}`)
    }

    // Créer le client Supabase
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Récupérer les détails de la commande
    console.log('🔍 Récupération des détails de la commande...')
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', payload.orderId)
      .single()

    let user;
    
    if (orderError) {
      console.warn('⚠️ Commande non trouvée, utilisation des données du payload pour le test')
      // Pour les tests, utiliser les données du payload directement
      user = {
        id: payload.userId,
        email: payload.userEmail,
        name: payload.userName,
        has_access: true,
        created_at: new Date().toISOString()
      }
      
      // Créer un objet order fictif pour les tests
      const mockOrder = {
        id: payload.orderId,
        user_id: payload.userId,
        status: 'completed',
        subtotal: payload.productPrice,
        discount_amount: 0,
        total: payload.totalAmount,
        coupon_id: null,
        created_at: new Date().toISOString()
      }
      
      console.log('✅ Utilisation des données de test:', { user, order: mockOrder })
    } else {
      console.log('✅ Détails commande récupérés:', order)

      // Récupérer les détails de l'utilisateur séparément
      console.log('🔍 Récupération des détails de l\'utilisateur...')
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('id, email, name, has_access, created_at')
        .eq('id', order.user_id)
        .single()

      if (userError) {
        console.error('❌ Erreur récupération utilisateur:', userError)
        throw new Error(`Erreur récupération utilisateur: ${userError.message}`)
      }

      user = userData;
      console.log('✅ Détails utilisateur récupérés:', user)
    }

    // Product configuration (centralized - matches src/config/products.ts)
    const PRODUCTS = {
      'full-access': {
        name: 'Plan d\'accès complet',
        price: 1, // Updated from centralized config
        description: 'Accès complet à tous les outils d\'apprentissage FIC®'
      },
      'premium-coaching': {
        name: 'Plan Premium + Coaching',
        price: 627, // Updated from centralized config
        description: 'Accès complet + 6h de coaching privé avec un professionnel'
      }
    }

    // Récupérer les détails du produit
    const productDetails = PRODUCTS[payload.productId] || {
      id: payload.productId || 'unknown',
      name: payload.productName,
      price: payload.productPrice,
      description: payload.productName === 'Plan d\'accès complet' 
        ? 'Accès complet à tous les outils d\'apprentissage FIC®'
        : 'Accès complet + 6h de coaching privé avec un professionnel'
    }

    // Préparer les données pour Make.com
    const makeWebhookData = {
      // Informations utilisateur
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        hasAccess: user.has_access,
        accountCreatedAt: user.created_at,
        purchaseDate: payload.purchaseDate || new Date().toISOString()
      },
      
      // Informations produit
      product: {
        id: productDetails.id,
        name: productDetails.name,
        description: productDetails.description,
        price: productDetails.price,
        currency: 'CAD'
      },
      
      // Informations commande
      order: {
        id: order?.id || payload.orderId,
        status: order?.status || 'completed',
        subtotal: order?.subtotal || payload.productPrice,
        discountAmount: order?.discount_amount || 0,
        total: order?.total || payload.totalAmount,
        couponCode: payload.couponCode || null,
        createdAt: order?.created_at || new Date().toISOString()
      },
      
      // Informations paiement
      payment: {
        intentId: payload.paymentIntentId,
        amount: payload.totalAmount,
        currency: 'CAD',
        status: 'completed'
      },
      
      // Métadonnées
      metadata: {
        source: 'ledojofinancier.com',
        webhookVersion: '1.0',
        timestamp: new Date().toISOString()
      }
    }

    console.log('📤 Données préparées pour Make.com:', JSON.stringify(makeWebhookData, null, 2))

    // Envoyer les données à Make.com
    const makeWebhookUrl = Deno.env.get('MAKE_WEBHOOK_URL')
    let makeResponse;
    let makeResponseData = {};
    let responseStatus = 200;
    let webhookSent = false;

    if (!makeWebhookUrl) {
      console.warn('⚠️ MAKE_WEBHOOK_URL non configuré, webhook non envoyé')
      responseStatus = 200;
      webhookSent = false;
    } else {
      console.log('🌐 Envoi vers Make.com webhook...')
      makeResponse = await fetch(makeWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'LeDojoFinancier-Webhook/1.0'
        },
        body: JSON.stringify(makeWebhookData)
      })

      console.log('📡 Réponse Make.com:', makeResponse.status, makeResponse.statusText)
      responseStatus = makeResponse.status;
      webhookSent = true;
      
      if (!makeResponse.ok) {
        const errorText = await makeResponse.text()
        console.error('❌ Erreur Make.com webhook:', errorText)
        makeResponseData = { error: errorText }
        throw new Error(`Erreur Make.com webhook: ${makeResponse.status} - ${errorText}`)
      }

      makeResponseData = await makeResponse.json().catch(() => ({}))
      console.log('✅ Réponse Make.com:', makeResponseData)
    }

    // Toujours enregistrer le webhook dans la base de données pour audit
    console.log('💾 Enregistrement du webhook pour audit...')
    const { error: webhookLogError } = await supabase
      .from('webhook_logs')
      .insert({
        order_id: payload.orderId,
        webhook_type: 'make_com_purchase',
        payload: makeWebhookData,
        response_status: responseStatus,
        response_data: makeResponseData,
        sent_at: new Date().toISOString()
      })

    if (webhookLogError) {
      console.warn('⚠️ Erreur enregistrement webhook log (non critique):', webhookLogError)
    } else {
      console.log('✅ Webhook log enregistré')
    }

    return new Response(JSON.stringify({ 
      success: true,
      message: webhookSent ? 'Webhook Make.com envoyé avec succès' : 'Webhook préparé mais non envoyé (URL non configurée)',
      orderId: payload.orderId,
      webhookSent: webhookSent,
      makeResponse: makeResponseData
    }), {
      headers: { 
        ...corsHeaders,
        'Content-Type': 'application/json' 
      },
      status: 200,
    })

  } catch (error) {
    console.error('💥 Erreur webhook Make.com:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Make.com webhook failed',
        message: error.message,
        stack: error.stack
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
