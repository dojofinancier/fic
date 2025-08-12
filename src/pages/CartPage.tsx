import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useCart } from '../contexts/CartContext';
import { formatPrice } from '../lib/stripe';
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  Tag, 
  ArrowRight,
  CheckCircle,
  XCircle
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const { 
    items, 
    coupon, 
    subtotal, 
    discountAmount, 
    total, 
    updateQuantity, 
    removeItem, 
    applyCoupon, 
    removeCoupon 
  } = useCart();
  
  const [couponCode, setCouponCode] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponMessage, setCouponMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

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

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center py-12">
            <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-[#3b3b3b] mb-4">Votre panier est vide</h2>
            <p className="text-gray-600 mb-6">
              Ajoutez l'accès complet au Dojo Financier pour commencer votre préparation à l'examen FIC.
            </p>
            <Link to="/pricing">
              <Button>Voir les options d'accès</Button>
            </Link>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#3b3b3b] mb-2">Panier d'achat</h1>
          <p className="text-gray-600">Finalisez votre commande pour accéder à tous les outils d'apprentissage</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items du panier */}
          <div className="lg:col-span-2">
            <Card>
              <h2 className="text-xl font-semibold text-[#3b3b3b] mb-6">Articles dans votre panier</h2>
              
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#3b3b3b]">{item.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                      <p className="text-lg font-bold text-[#10ac69] mt-2">{formatPrice(item.price)}</p>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      {/* Quantité */}
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      {/* Supprimer */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Résumé de la commande */}
          <div className="space-y-6">
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
                      placeholder="Entrez votre code coupon"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      className="flex-1"
                    />
                    <Button
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

            {/* Résumé des prix */}
            <Card>
              <h3 className="font-semibold text-[#3b3b3b] mb-4">Résumé de la commande</h3>
              
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
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-[#10ac69]">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>
              
              <Link to="/checkout" className="block mt-6">
                <Button className="w-full" size="lg">
                  Procéder au paiement
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </Card>

            {/* Garantie */}
            <Card className="bg-blue-50 border-blue-200">
              <div className="text-center">
                <CheckCircle className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h4 className="font-semibold text-blue-900 mb-2">Garantie de remboursement</h4>
                <p className="text-sm text-blue-800">
                  Satisfait ou remboursé sous 30 jours. Aucune question posée.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};