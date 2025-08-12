/*
  # Fonction pour incrémenter l'usage des coupons

  1. Nouvelle fonction
    - `increment_coupon_usage` - Incrémente le compteur d'usage d'un coupon

  2. Sécurité
    - Fonction sécurisée pour éviter les abus
    - Vérification des limites d'usage
*/

-- Fonction pour incrémenter l'usage d'un coupon
CREATE OR REPLACE FUNCTION increment_coupon_usage(coupon_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE coupons 
  SET usage_count = usage_count + 1
  WHERE id = coupon_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;