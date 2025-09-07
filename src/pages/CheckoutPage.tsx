import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { StripePaymentForm } from '../components/checkout/StripePaymentForm';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { formatPrice, stripePromise } from '../lib/stripe';
import { supabase } from '../lib/supabase';
import { 
  CreditCard, 
  Lock, 
  CheckCircle, 
  Tag, 
  XCircle,
  ArrowLeft
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, register, refreshUserProfile } = useAuth();
  const { 
    items, 
    coupon, 
    subtotal, 
    discountAmount, 
    total, 
    applyCoupon, 
    removeCoupon,
    clearCart 
  } = useCart();
  
  const [loading, setLoading] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponMessage, setCouponMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [paymentError, setPaymentError] = useState<string>('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isNewUser, setIsNewUser] = useState(!user);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accountError, setAccountError] = useState('');
  
  // Informations de facturation
  const [billingInfo, setBillingInfo] = useState({
    email: user?.email || '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    province: ''
  });

  useEffect(() => {
    console.log('🛒 CheckoutPage: Items changed:', items);
    if (items.length === 0 && !paymentSuccess) {
      console.log('🛒 CheckoutPage: No items in cart, redirecting to cart');
      navigate('/cart');
      return;
    }
  }, [items, navigate, paymentSuccess]);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    
    setCouponLoading(true);
    setCouponMessage(null);
    
    try {
      const validation = await applyCoupon(couponCode.trim().toUpperCase());
      
      if (validation.is_valid) {
        setCouponMessage({ type: 'success', text: validation.message });
        setCouponCode('');
      } else {
        setCouponMessage({ type: 'error', text: validation.message });
      }
    } catch (error) {
      setCouponMessage({ type: 'error', text: 'Erreur lors de l\'application du coupon' });
    } finally {
      setCouponLoading(false);
    }
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    setCouponMessage(null);
  };

  const handleCreateAccount = async () => {
    if (!isNewUser) return true;
    
    setAccountError('');
    
    // Validation
    if (!billingInfo.email || !password || !confirmPassword) {
      setAccountError('Tous les champs sont requis');
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
      setIsNewUser(false);
      return true;
    } catch (error) {
      setAccountError(error instanceof Error ? error.message : 'Erreur lors de la création du compte');
      return false;
    }
  };
  const handlePaymentSuccess = () => {
    setPaymentSuccess(true);
    navigate('/dashboard');
  };

  const handleFreeOrder = async () => {
    setLoading(true);
    setPaymentError('');
    
    try {
      let userId = user?.id;
      
      // Create account if user doesn't exist (same as regular orders)
      if (!user) {
        console.log('👤 Création du compte utilisateur...');
        try {
          await register(
            billingInfo.email, 
            password, 
            `${billingInfo.firstName} ${billingInfo.lastName}`
          );
          
          // Wait for the auth state to update
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          // Get the current user after registration
          const { data: { user: newUser } } = await supabase.auth.getUser();
          userId = newUser?.id;
          
          if (!userId) {
            // Try to get user from session as fallback
            const { data: { session } } = await supabase.auth.getSession();
            userId = session?.user?.id;
          }
          
          if (!userId) {
            throw new Error('Impossible de récupérer l\'ID utilisateur après la création du compte');
          }
          
          console.log('✅ Compte utilisateur créé:', userId);
        } catch (registerError) {
          console.error('❌ Erreur création compte:', registerError);
          throw new Error('Erreur lors de la création du compte: ' + (registerError instanceof Error ? registerError.message : 'Erreur inconnue'));
        }
      }
      
      if (!userId) {
        throw new Error('Aucun utilisateur identifié pour cette commande');
      }
      
      // Create the order in Supabase
      const orderData = {
        user_id: userId,
        subtotal: subtotal,
        discount_amount: discountAmount,
        total: total,
        coupon_id: coupon?.id || null,
        status: 'completed',
        stripe_payment_intent_id: 'free_order'
      };

      console.log('📝 Création de la commande avec les données:', orderData);

      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert(orderData)
        .select()
        .single();

      if (orderError) {
        console.error('❌ Erreur création commande gratuite:', orderError);
        throw orderError;
      }
      
      console.log('✅ Commande gratuite créée:', order);
      
      // Increment coupon usage if applicable
      if (coupon?.id) {
        console.log('📈 Incrémentation de l\'usage du coupon...');
        const { error: couponError } = await supabase
          .from('coupons')
          .update({ usage_count: coupon.usage_count + 1 })
          .eq('id', coupon.id);
        
        if (couponError) {
          console.error('❌ Erreur incrémentation coupon:', couponError);
          // Don't fail the order for this error
        } else {
          console.log('✅ Usage du coupon incrémenté');
        }
      }
      
      // Grant access to the user (1 year from now)
      console.log('🔓 Octroi de l\'accès à l\'utilisateur...');
      const accessExpiresAt = new Date();
      accessExpiresAt.setFullYear(accessExpiresAt.getFullYear() + 1);
      
      const { error: accessError } = await supabase
        .from('users')
        .update({ 
          has_access: true,
          access_expires_at: accessExpiresAt.toISOString()
        })
        .eq('id', userId);
      
      if (accessError) {
        console.error('❌ Erreur octroi accès:', accessError);
        // Don't fail the order for this error
      } else {
        console.log('✅ Accès octroyé à l\'utilisateur');
      }
      
      // Clear cart and navigate to dashboard (same as regular orders)
      clearCart();
      setPaymentSuccess(true);
      navigate('/dashboard');
      
    } catch (error) {
      console.error('❌ Erreur commande gratuite:', error);
      setPaymentError(error instanceof Error ? error.message : 'Erreur lors de la finalisation de la commande gratuite');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentError = (error: string) => {
    setPaymentError(error);
    setLoading(false);
  };

  const isBillingValid = billingInfo.firstName && billingInfo.lastName && 
                        billingInfo.email && billingInfo.address && 
                        billingInfo.city && billingInfo.province && 
                        billingInfo.postalCode;
                        
  const isAccountValid = user || (password && confirmPassword && password === confirmPassword);
  
  // Same validation for all orders - require both billing and account info
  const isFormValid = isBillingValid && isAccountValid;

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/cart')}
            className="flex items-center text-[#10ac69] hover:text-[#0e9558] mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour au panier
          </button>
          <h1 className="text-3xl font-bold text-[#3b3b3b] mb-2">Finaliser votre commande</h1>
          <p className="text-gray-600">Sécurisé par SSL - Vos informations sont protégées</p>
        </div>

        <div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Informations de facturation */}
            <div className="lg:col-span-2 space-y-6">
              {/* Informations personnelles */}
              <Card>
                <h2 className="text-xl font-semibold text-[#3b3b3b] mb-6">Informations de facturation</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Prénom"
                    value={billingInfo.firstName}
                    onChange={(e) => setBillingInfo(prev => ({ ...prev, firstName: e.target.value }))}
                    required
                  />
                  <Input
                    label="Nom"
                    value={billingInfo.lastName}
                    onChange={(e) => setBillingInfo(prev => ({ ...prev, lastName: e.target.value }))}
                    required
                  />
                </div>
                
                <Input
                  label="Adresse courriel"
                  type="email"
                  value={billingInfo.email}
                  onChange={(e) => setBillingInfo(prev => ({ ...prev, email: e.target.value }))}
                  required
                  disabled={!!user}
                />
                
                <Input
                  label="Adresse"
                  value={billingInfo.address}
                  onChange={(e) => setBillingInfo(prev => ({ ...prev, address: e.target.value }))}
                  required
                />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    label="Ville"
                    value={billingInfo.city}
                    onChange={(e) => setBillingInfo(prev => ({ ...prev, city: e.target.value }))}
                    required
                  />
                  <Input
                    label="Province"
                    value={billingInfo.province}
                    onChange={(e) => setBillingInfo(prev => ({ ...prev, province: e.target.value }))}
                    required
                  />
                  <Input
                    label="Code postal"
                    value={billingInfo.postalCode}
                    onChange={(e) => setBillingInfo(prev => ({ ...prev, postalCode: e.target.value }))}
                    required
                  />
                </div>
              </Card>

              {/* Création de compte pour nouveaux utilisateurs */}
              {!user && (
                <Card>
                  <h2 className="text-xl font-semibold text-[#3b3b3b] mb-6">Créer votre compte</h2>
                  <p className="text-gray-600 mb-4">
                    Un compte sera créé automatiquement pour vous donner accès à la plateforme.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Mot de passe"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Minimum 6 caractères"
                      required
                    />
                    <Input
                      label="Confirmer le mot de passe"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirmez votre mot de passe"
                      required
                    />
                  </div>
                  
                  {accountError && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <XCircle className="h-5 w-5 text-red-600" />
                        <span className="text-red-800">{accountError}</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      Vous avez déjà un compte ? 
                      <Link to="/login" className="ml-1 font-medium text-blue-600 hover:text-blue-500">
                        Connectez-vous ici
                      </Link>
                    </p>
                  </div>
                </Card>
              )}

              {/* Informations de paiement */}
              {isFormValid ? (
                <div>
                  {total === 0 ? (
                    // Commande gratuite - pas besoin de Stripe
                    <Card className="bg-green-50 border-green-200">
                      <div className="text-center py-8">
                        <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-green-800 mb-2">
                          Commande gratuite !
                        </h3>
                        <p className="text-green-600 mb-4">
                          Votre coupon de 100% de réduction a été appliqué. Aucun paiement requis.
                        </p>
                        <Button 
                          onClick={handleFreeOrder}
                          className="bg-green-600 hover:bg-green-700"
                          size="lg"
                          disabled={loading}
                        >
                          {loading ? 'Finalisation...' : 'Finaliser la commande gratuite'}
                        </Button>
                      </div>
                    </Card>
                  ) : (
                    // Commande payante - utiliser Stripe
                    <>
                      {console.log('🛒 CheckoutPage: Rendering Stripe Elements, stripePromise:', stripePromise)}
                      {stripePromise ? (
                        <Elements stripe={stripePromise}>
                          <StripePaymentForm
                            billingInfo={billingInfo}
                            password={password}
                            confirmPassword={confirmPassword}
                            setAccountError={setAccountError}
                            onSuccess={handlePaymentSuccess}
                            onError={handlePaymentError}
                            refreshUserProfile={refreshUserProfile}
                          />
                        </Elements>
                      ) : (
                    <Card className="bg-yellow-50 border-yellow-200">
                      <div className="text-center py-8">
                        <div className="text-yellow-500 text-6xl mb-4">⚠️</div>
                        <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                          Mode test - Stripe non configuré
                        </h3>
                        <p className="text-yellow-600 mb-4">
                          Le système de paiement Stripe n'est pas configuré.
                        </p>
                        <div className="space-y-4">
                          <p className="text-sm text-yellow-500">
                            Pour configurer Stripe, créez un fichier .env avec:
                          </p>
                          <code className="block bg-yellow-100 p-2 rounded text-xs">
                            VITE_STRIPE_PUBLISHABLE_KEY=pk_test_votre_cle_stripe
                          </code>
                          <Button 
                            onClick={() => {
                              console.log('🛒 CheckoutPage: Test payment button clicked');
                              alert('Mode test - Paiement simulé');
                            }}
                            className="bg-yellow-600 hover:bg-yellow-700"
                          >
                            Tester le paiement (Mode test)
                          </Button>
                        </div>
                      </div>
                    </Card>
                      )}
                    </>
                  )}
                </div>
              ) : (
                <Card>
                  <div className="text-center py-8">
                    <Lock className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-500 mb-2">
                      {!isBillingValid ? 'Informations de facturation requises' : 'Mot de passe requis'}
                    </h3>
                    <p className="text-gray-400">
                      {!isBillingValid 
                        ? 'Veuillez remplir tous les champs de facturation pour continuer'
                        : 'Veuillez saisir votre mot de passe pour continuer'
                      }
                    </p>
                  </div>
                </Card>
              )}

              {/* Erreur de paiement */}
              {paymentError && (
                <Card className="bg-red-50 border-red-200">
                  <div className="flex items-center space-x-2">
                    <XCircle className="h-5 w-5 text-red-600" />
                    <span className="text-red-800">{paymentError}</span>
                  </div>
                </Card>
              )}
            </div>

            {/* Résumé de la commande */}
            <div className="space-y-6">
              {/* Articles */}
              <Card>
                <h3 className="font-semibold text-[#3b3b3b] mb-4">Votre commande</h3>
                
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <div>
                        <p className="font-medium text-[#3b3b3b]">{item.name}</p>
                        <p className="text-sm text-gray-600">Quantité: {item.quantity}</p>
                      </div>
                      <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Code coupon */}
              <Card>
                <h3 className="font-semibold text-[#3b3b3b] mb-4">Code coupon</h3>
                
                {coupon ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Tag className="h-5 w-5 text-green-600" />
                        <span className="font-medium text-green-800">{coupon.code}</span>
                        <span className="text-sm text-green-600">(-{coupon.discount_percent}%)</span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={handleRemoveCoupon}
                        className="text-red-600 hover:bg-red-50"
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Code coupon"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        onClick={handleApplyCoupon}
                        disabled={!couponCode.trim() || couponLoading}
                        size="sm"
                      >
                        {couponLoading ? 'Vérification...' : 'Appliquer'}
                      </Button>
                    </div>
                    
                    {couponMessage && (
                      <div className={`flex items-center space-x-2 text-sm ${
                        couponMessage.type === 'success' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {couponMessage.type === 'success' ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <XCircle className="h-4 w-4" />
                        )}
                        <span>{couponMessage.text}</span>
                      </div>
                    )}
                  </div>
                )}
              </Card>

              {/* Total */}
              <Card>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sous-total</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Réduction ({coupon?.discount_percent}%)</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-xl font-bold">
                      <span>Total</span>
                      <span className="text-[#10ac69]">{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-center mt-6">
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                    <Lock className="h-4 w-4" />
                    <span>Paiement sécurisé SSL</span>
                  </div>
                </div>
              </Card>

              {/* Garantie */}
              <Card className="bg-green-50 border-green-200">
                <div className="text-center">
                  <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-green-900 mb-2">Garantie 30 jours</h4>
                  <p className="text-sm text-green-800">
                    Satisfait ou remboursé. Aucune question posée.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};