import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { supabase } from '../../lib/supabase';
import { Coupon } from '../../types/payment';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Tag, 
  Plus, 
  Trash2, 
  Edit, 
  Eye, 
  EyeOff,
  Calendar,
  Users,
  Percent
} from 'lucide-react';

export const CouponManager: React.FC = () => {
  const { user } = useAuth();
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  
  const [formData, setFormData] = useState({
    code: '',
    discount_percent: 10,
    usage_limit: '',
    expires_at: ''
  });

  useEffect(() => {
    console.log('CouponManager: Component mounted, user:', user);
    if (user) {
      console.log('CouponManager: User is admin:', user.isAdmin);
      console.log('CouponManager: User ID:', user.id);
      console.log('CouponManager: User email:', user.email);
      loadCoupons();
    } else {
      console.log('CouponManager: No user found');
    }
  }, [user]);

  const loadCoupons = async () => {
    try {
      console.log('CouponManager: Loading coupons...');
      
      // First, let's check if the user is actually an admin in the database
      if (user) {
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('id, email, is_admin')
          .eq('id', user.id)
          .single();
        
        if (userError) {
          console.error('CouponManager: Error checking user admin status:', userError);
        } else {
          console.log('CouponManager: User admin status from DB:', userData);
        }
      }
      
      const { data, error } = await supabase
        .from('coupons')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('CouponManager: Error loading coupons:', error);
        throw error;
      }
      console.log('CouponManager: Coupons loaded successfully:', data);
      setCoupons(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des coupons:', error);
      alert(`Erreur lors du chargement des coupons: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      console.log('CouponManager: Submitting coupon data:', formData);
      const couponData = {
        code: formData.code.toUpperCase(),
        discount_percent: formData.discount_percent,
        usage_limit: formData.usage_limit ? parseInt(formData.usage_limit) : null,
        expires_at: formData.expires_at || null,
        is_active: true
      };

      if (editingCoupon) {
        console.log('CouponManager: Updating coupon:', editingCoupon.id);
        const { error } = await supabase
          .from('coupons')
          .update(couponData)
          .eq('id', editingCoupon.id);

        if (error) {
          console.error('CouponManager: Error updating coupon:', error);
          throw error;
        }
        console.log('CouponManager: Coupon updated successfully');
      } else {
        console.log('CouponManager: Creating new coupon');
        const { error } = await supabase
          .from('coupons')
          .insert(couponData);

        if (error) {
          console.error('CouponManager: Error creating coupon:', error);
          throw error;
        }
        console.log('CouponManager: Coupon created successfully');
      }

      // Reset form
      setFormData({
        code: '',
        discount_percent: 10,
        usage_limit: '',
        expires_at: ''
      });
      setShowCreateForm(false);
      setEditingCoupon(null);
      
      // Reload coupons
      loadCoupons();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du coupon:', error);
      alert(`Erreur lors de la sauvegarde du coupon: ${error.message}`);
    }
  };

  const handleEdit = (coupon: Coupon) => {
    setEditingCoupon(coupon);
    setFormData({
      code: coupon.code,
      discount_percent: coupon.discount_percent,
      usage_limit: coupon.usage_limit?.toString() || '',
      expires_at: coupon.expires_at ? coupon.expires_at.split('T')[0] : ''
    });
    setShowCreateForm(true);
  };

  const handleToggleActive = async (coupon: Coupon) => {
    try {
      console.log('CouponManager: Toggling active status for coupon:', coupon.id, 'from', coupon.is_active, 'to', !coupon.is_active);
      const { error } = await supabase
        .from('coupons')
        .update({ is_active: !coupon.is_active })
        .eq('id', coupon.id);

      if (error) {
        console.error('CouponManager: Error toggling coupon active status:', error);
        throw error;
      }
      console.log('CouponManager: Coupon active status updated successfully');
      loadCoupons();
    } catch (error) {
      console.error('Erreur lors de la mise à jour du coupon:', error);
      alert(`Erreur lors de la mise à jour du coupon: ${error.message}`);
    }
  };

  const handleDelete = async (couponId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce coupon ?')) return;
    
    try {
      console.log('CouponManager: Deleting coupon:', couponId);
      const { error } = await supabase
        .from('coupons')
        .delete()
        .eq('id', couponId);

      if (error) {
        console.error('CouponManager: Error deleting coupon:', error);
        throw error;
      }
      console.log('CouponManager: Coupon deleted successfully');
      loadCoupons();
    } catch (error) {
      console.error('Erreur lors de la suppression du coupon:', error);
      alert(`Erreur lors de la suppression du coupon: ${error.message}`);
    }
  };

  const resetForm = () => {
    setFormData({
      code: '',
      discount_percent: 10,
      usage_limit: '',
      expires_at: ''
    });
    setShowCreateForm(false);
    setEditingCoupon(null);
  };

  if (loading) {
    return (
      <Card>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#10ac69] mx-auto"></div>
          <p className="mt-2 text-gray-600">Chargement des coupons...</p>
        </div>
      </Card>
    );
  }

  if (!user || !user.isAdmin) {
    return (
      <Card>
        <div className="text-center py-8">
          <p className="text-red-600">Accès refusé. Vous devez être administrateur pour gérer les coupons.</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-[#3b3b3b]">Gestion des coupons</h3>
            <p className="text-gray-600">Créez et gérez les codes de réduction</p>
          </div>
          <Button onClick={() => setShowCreateForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Nouveau coupon
          </Button>
        </div>
      </Card>

      {/* Create/Edit Form */}
      {showCreateForm && (
        <Card>
          <h4 className="text-lg font-semibold text-[#3b3b3b] mb-4">
            {editingCoupon ? 'Modifier le coupon' : 'Créer un nouveau coupon'}
          </h4>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Code coupon"
                value={formData.code}
                onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value.toUpperCase() }))}
                placeholder="ex: WELCOME20"
                required
              />
              
              <Input
                label="Pourcentage de réduction"
                type="number"
                min="1"
                max="100"
                value={formData.discount_percent}
                onChange={(e) => setFormData(prev => ({ ...prev, discount_percent: parseInt(e.target.value) }))}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Limite d'utilisation (optionnel)"
                type="number"
                min="1"
                value={formData.usage_limit}
                onChange={(e) => setFormData(prev => ({ ...prev, usage_limit: e.target.value }))}
                placeholder="Laissez vide pour illimité"
              />
              
              <Input
                label="Date d'expiration (optionnel)"
                type="date"
                value={formData.expires_at}
                onChange={(e) => setFormData(prev => ({ ...prev, expires_at: e.target.value }))}
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button type="button" variant="outline" onClick={resetForm}>
                Annuler
              </Button>
              <Button type="submit">
                {editingCoupon ? 'Mettre à jour' : 'Créer le coupon'}
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Coupons List */}
      <Card>
        <h4 className="text-lg font-semibold text-[#3b3b3b] mb-4">Coupons existants</h4>
        
        {coupons.length === 0 ? (
          <div className="text-center py-8">
            <Tag className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Aucun coupon créé</p>
          </div>
        ) : (
          <div className="space-y-4">
            {coupons.map((coupon) => (
              <div key={coupon.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg ${coupon.is_active ? 'bg-green-100' : 'bg-gray-100'}`}>
                      <Tag className={`h-5 w-5 ${coupon.is_active ? 'text-green-600' : 'text-gray-400'}`} />
                    </div>
                    
                    <div>
                      <div className="flex items-center space-x-2">
                        <h5 className="font-semibold text-[#3b3b3b]">{coupon.code}</h5>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          coupon.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {coupon.is_active ? 'Actif' : 'Inactif'}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        <div className="flex items-center space-x-1">
                          <Percent className="h-4 w-4" />
                          <span>{coupon.discount_percent}% de réduction</span>
                        </div>
                        
                        {coupon.usage_limit && (
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4" />
                            <span>{coupon.usage_count}/{coupon.usage_limit} utilisations</span>
                          </div>
                        )}
                        
                        {coupon.expires_at && (
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>Expire le {new Date(coupon.expires_at).toLocaleDateString('fr-CA')}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleActive(coupon)}
                      title={coupon.is_active ? 'Désactiver' : 'Activer'}
                    >
                      {coupon.is_active ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(coupon)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(coupon.id)}
                      className="text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};