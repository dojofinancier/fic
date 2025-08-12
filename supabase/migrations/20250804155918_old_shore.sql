/*
  # Système de paiement et coupons

  1. Nouvelles tables
    - `coupons` - Codes de réduction créés par les admins
    - `orders` - Commandes des utilisateurs
    - `payments` - Historique des paiements Stripe

  2. Sécurité
    - RLS activé sur toutes les tables
    - Politiques appropriées pour admins et utilisateurs
*/

-- Table des coupons
CREATE TABLE IF NOT EXISTS coupons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  discount_percent integer NOT NULL CHECK (discount_percent > 0 AND discount_percent <= 100),
  is_active boolean DEFAULT true,
  usage_limit integer,
  usage_count integer DEFAULT 0,
  expires_at timestamptz,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table des commandes
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'cancelled', 'failed')),
  subtotal decimal(10,2) NOT NULL,
  discount_amount decimal(10,2) DEFAULT 0,
  total decimal(10,2) NOT NULL,
  coupon_id uuid REFERENCES coupons(id) ON DELETE SET NULL,
  stripe_payment_intent_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table des paiements
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE,
  stripe_payment_intent_id text NOT NULL,
  amount decimal(10,2) NOT NULL,
  status text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Activer RLS
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Politiques pour coupons
CREATE POLICY "coupons_read_all" ON coupons
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "coupons_admin_manage" ON coupons
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- Politiques pour orders
CREATE POLICY "orders_read_own" ON orders
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "orders_insert_own" ON orders
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "orders_update_own" ON orders
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Politiques pour payments
CREATE POLICY "payments_read_own" ON payments
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = payments.order_id 
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "payments_insert_system" ON payments
  FOR INSERT TO authenticated
  WITH CHECK (true);

-- Index pour les performances
CREATE INDEX IF NOT EXISTS coupons_code_idx ON coupons(code);
CREATE INDEX IF NOT EXISTS coupons_active_idx ON coupons(is_active);
CREATE INDEX IF NOT EXISTS orders_user_id_idx ON orders(user_id);
CREATE INDEX IF NOT EXISTS orders_status_idx ON orders(status);
CREATE INDEX IF NOT EXISTS payments_order_id_idx ON payments(order_id);

-- Triggers pour updated_at
CREATE TRIGGER update_coupons_updated_at
  BEFORE UPDATE ON coupons
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Fonction pour valider un coupon
CREATE OR REPLACE FUNCTION validate_coupon(coupon_code text)
RETURNS TABLE(
  id uuid,
  code text,
  discount_percent integer,
  is_valid boolean,
  message text
) AS $$
DECLARE
  coupon_record RECORD;
BEGIN
  SELECT * INTO coupon_record
  FROM coupons c
  WHERE c.code = coupon_code;
  
  IF NOT FOUND THEN
    RETURN QUERY SELECT 
      NULL::uuid, 
      coupon_code, 
      0, 
      false, 
      'Code coupon invalide'::text;
    RETURN;
  END IF;
  
  -- Vérifier si le coupon est actif
  IF NOT coupon_record.is_active THEN
    RETURN QUERY SELECT 
      coupon_record.id, 
      coupon_record.code, 
      coupon_record.discount_percent, 
      false, 
      'Code coupon désactivé'::text;
    RETURN;
  END IF;
  
  -- Vérifier la date d'expiration
  IF coupon_record.expires_at IS NOT NULL AND coupon_record.expires_at < now() THEN
    RETURN QUERY SELECT 
      coupon_record.id, 
      coupon_record.code, 
      coupon_record.discount_percent, 
      false, 
      'Code coupon expiré'::text;
    RETURN;
  END IF;
  
  -- Vérifier la limite d'utilisation
  IF coupon_record.usage_limit IS NOT NULL AND coupon_record.usage_count >= coupon_record.usage_limit THEN
    RETURN QUERY SELECT 
      coupon_record.id, 
      coupon_record.code, 
      coupon_record.discount_percent, 
      false, 
      'Code coupon épuisé'::text;
    RETURN;
  END IF;
  
  -- Coupon valide
  RETURN QUERY SELECT 
    coupon_record.id, 
    coupon_record.code, 
    coupon_record.discount_percent, 
    true, 
    'Code coupon valide'::text;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;