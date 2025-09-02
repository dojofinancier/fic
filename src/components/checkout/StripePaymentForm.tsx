import React, { useState } from 'react';
import {
  useStripe,
  useElements,
  CardElement,
  Elements
} from '@stripe/react-stripe-js';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { Lock, CreditCard } from 'lucide-react';

const CARD_ELEMENT_OPTIONS = {
  hidePostalCode: true,
  disableLink: true, // This disables the autofill link
  style: {
    base: {
      color: '#424770',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4'
      }
    },
    invalid: {
      color: '#9e2146',
      iconColor: '#9e2146'
    }
  }
};

interface StripePaymentFormProps {
  billingInfo: {
    email: string;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    postalCode: string;
    province: string;
  };
  password: string;
  confirmPassword: string;
  setAccountError: (error: string) => void;
  onSuccess: () => void;
  onError: (error: string) => void;
  refreshUserProfile: () => Promise<void>;
}

const PaymentForm: React.FC<StripePaymentFormProps> = ({ 
  billingInfo, 
  password,
  confirmPassword,
  setAccountError,
  onSuccess, 
  onError,
  refreshUserProfile
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user, register } = useAuth();
  const { 
    total, 
    subtotal, 
    discountAmount, 
    coupon, 
    items,
    clearCart 
  } = useCart();
  
  const [processing, setProcessing] = useState(false);

  const createAccount = async () => {
    console.log('🔐 Création du compte utilisateur...');
    setAccountError('');
    
    // Validation
    if (!password || !confirmPassword) {
      setAccountError('Mot de passe requis');
      return false;
    }
    
    if (password !== confirmPassword) {
      setAccountError('Les mots de passe ne correspondent pas');
      return false;
    }
    
    if (password.length < 6) {
      setAccountError('Le mot de passe doit contenir au moins 6 caractères');
      return false;
    }
    
    try {
      await register(
        billingInfo.email, 
        password, 
        `${billingInfo.firstName} ${billingInfo.lastName}`
      );
      
      console.log('✅ Compte créé avec succès');
      // Attendre que le contexte Auth soit mis à jour
      await new Promise(resolve => setTimeout(resolve, 2000));
      return true;
    } catch (error) {
      console.error('❌ Erreur création compte:', error);
      setAccountError(error instanceof Error ? error.message : 'Erreur lors de la création du compte');
      return false;
    }
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log('🚀 Début du processus de paiement');

    if (!stripe || !elements) {
      console.error('❌ Stripe ou Elements non chargé');
      onError('Stripe n\'est pas encore chargé');
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      console.error('❌ Élément de carte non trouvé');
      onError('Élément de carte non trouvé');
      return;
    }

    setProcessing(true);
    console.log('⏳ Processing activé');

    try {
      // Créer le compte si c'est un nouvel utilisateur
      if (!user) {
        console.log('👤 Utilisateur non connecté, création du compte...');
        const accountCreated = await createAccount();
        if (!accountCreated) {
          console.error('❌ Échec de la création du compte');
          setProcessing(false);
          return;
        }
        
        console.log('✅ Compte créé, vérification de la session...');
        
        // Vérifier la session Supabase pour obtenir l'utilisateur
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) {
          console.error('❌ Session non trouvée après création du compte');
          onError('Erreur lors de la création du compte - session non trouvée');
          setProcessing(false);
          return;
        }
        
        console.log('✅ Session confirmée:', session.user.id);
      }
      
      // Obtenir l'ID utilisateur (soit du contexte, soit de la session)
      const { data: { session } } = await supabase.auth.getSession();
      const userId = user?.id || session?.user?.id;
      
      if (!userId) {
        console.error('❌ Impossible d\'obtenir l\'ID utilisateur');
        onError('Erreur d\'authentification');
        setProcessing(false);
        return;
      }
      
      console.log('✅ ID utilisateur confirmé:', userId);
      
      // 1. Créer la commande dans Supabase
      console.log('📝 Création de la commande dans Supabase...');
      const orderData = {
        user_id: userId,
        subtotal: subtotal,
        discount_amount: discountAmount,
        total: total,
        coupon_id: coupon?.id || null,
        status: 'pending'
      };
      console.log('📋 Données de commande:', orderData);

      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert(orderData)
        .select()
        .single();

      if (orderError) {
        console.error('❌ Erreur création commande:', orderError);
        throw orderError;
      }
      console.log('✅ Commande créée:', order);

      // 2. Créer le PaymentIntent côté serveur
      console.log('💳 Appel de l\'Edge Function create-payment-intent...');
      
      const paymentData = {
        amount: Math.round(total * 100), // Stripe utilise les centimes
        currency: 'cad',
        orderId: order.id,
        customerEmail: billingInfo.email,
        customerName: `${billingInfo.firstName} ${billingInfo.lastName}`
      };
      console.log('📋 Données PaymentIntent:', paymentData);
      
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-payment-intent`;
      console.log('🌐 URL de l\'API:', apiUrl);
      
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      console.log('📡 Statut de la réponse:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Erreur HTTP de l\'Edge Function:', response.status, errorText);
        throw new Error(`Erreur serveur: ${response.status} - ${errorText}`);
      }
      
      const responseData = await response.json();
      console.log('📨 Réponse complète de l\'Edge Function:', responseData);
      
      const { clientSecret, error: intentError } = responseData;
      
      if (intentError) {
        console.error('❌ Erreur PaymentIntent:', intentError);
        throw new Error(intentError);
      }
      
      if (!clientSecret) {
        console.error('❌ ClientSecret manquant dans la réponse');
        throw new Error('ClientSecret manquant');
      }
      
      console.log('✅ ClientSecret reçu');

      // 3. Confirmer le paiement avec Stripe
      console.log('💳 Confirmation du paiement avec Stripe...');
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: `${billingInfo.firstName} ${billingInfo.lastName}`,
              email: billingInfo.email,
              address: {
                line1: billingInfo.address,
                city: billingInfo.city,
                postal_code: billingInfo.postalCode,
                state: billingInfo.province,
                country: 'CA'
              }
            }
          }
        }
      );

      if (stripeError) {
        console.error('❌ Erreur Stripe:', stripeError);
        throw new Error(stripeError.message);
      }

      console.log('💳 PaymentIntent status:', paymentIntent?.status);
      if (paymentIntent?.status === 'succeeded') {
        // Paiement réussi - le webhook met à jour has_access côté serveur
        console.log('🎉 Paiement réussi! Attente de la mise à jour du webhook...');

        try {
          // Poller Supabase jusqu'à 10 fois (≈ 20s) pour attendre has_access = true
          const { data: { session } } = await supabase.auth.getSession();
          const currentUserId = session?.user?.id || user?.id;
          if (!currentUserId) {
            throw new Error('Session utilisateur introuvable après paiement');
          }

          let granted = false;
          for (let attempt = 1; attempt <= 10; attempt++) {
            console.log(`🔎 Vérification de l'accès (essai ${attempt}/10)...`);
            const { data: profile, error: profileErr } = await supabase
              .from('users')
              .select('has_access')
              .eq('id', currentUserId)
              .single();

            if (profileErr) {
              console.warn('⚠️ Erreur de lecture du profil pendant le polling:', profileErr);
            } else if (profile?.has_access) {
              console.log('✅ Accès détecté, mise à jour du contexte...');
              granted = true;
              break;
            }
            // Attendre 2s avant nouvel essai
            await new Promise(res => setTimeout(res, 2000));
          }

          // Rafraîchir le contexte auth pour refléter has_access
          try {
            await refreshUserProfile();
          } catch (e) {
            console.warn('⚠️ Rafraîchissement du profil non critique a échoué:', e);
          }

          if (granted) {
            console.log('🚀 Accès confirmé. Nettoyage du panier et redirection.');
            clearCart();
            onSuccess();
          } else {
            console.error('⏳ Webhook n\'a pas mis à jour l\'accès dans le délai imparti');
            onError('Le paiement a réussi mais la confirmation d\'accès tarde. Réessayez dans quelques secondes ou contactez le support.');
          }
        } catch (pollErr) {
          console.error('💥 Erreur pendant l\'attente du webhook:', pollErr);
          onError('Erreur lors de la finalisation du paiement. Veuillez réessayer.');
        }
      } else {
        console.error('❌ PaymentIntent status inattendu:', paymentIntent?.status);
        throw new Error(`Statut de paiement inattendu: ${paymentIntent?.status}`);
      }
    } catch (error) {
      console.error('💥 Erreur de paiement:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erreur de paiement inconnue';
      console.error('📢 Message d\'erreur final:', errorMessage);
      onError(errorMessage);
    } finally {
      console.log('🏁 Fin du processus de paiement');
      setProcessing(false);
    }
  };

  return (
    <Card>
      <h2 className="text-xl font-semibold text-[#3b3b3b] mb-6">
        <CreditCard className="inline h-5 w-5 mr-2" />
        Informations de paiement
      </h2>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-2">
          <Lock className="h-5 w-5 text-blue-600" />
          <span className="text-sm text-blue-800">
            Paiement sécurisé traité par Stripe. Vos informations de carte de crédit ne sont jamais stockées sur nos serveurs.
          </span>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-sm font-medium text-[#3b3b3b] mb-2">
            Informations de carte de crédit
          </label>
          <div className="p-4 border border-gray-300 rounded-lg">
            <CardElement options={CARD_ELEMENT_OPTIONS} />
          </div>
        </div>
        
        <Button 
          type="submit" 
          disabled={!stripe || processing}
          className="w-full"
          size="lg"
        >
          {processing 
            ? (!user ? 'Création du compte et paiement...' : 'Traitement en cours...') 
            : `${!user ? 'Créer le compte et payer' : 'Payer'} ${total.toFixed(2)} $ CAD`
          }
        </Button>
      </form>
    </Card>
  );
};

// Wrapper avec Elements provider
export const StripePaymentForm: React.FC<StripePaymentFormProps> = (props) => {
  return (
    <PaymentForm {...props} />
  );
};