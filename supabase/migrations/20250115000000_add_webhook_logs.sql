/*
  # Table pour les logs de webhooks

  1. Nouvelle table
    - `webhook_logs` - Historique des webhooks envoyés pour audit et debugging

  2. Sécurité
    - RLS activé
    - Politiques pour les admins uniquement
*/

-- Table des logs de webhooks
CREATE TABLE IF NOT EXISTS webhook_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE,
  webhook_type text NOT NULL,
  payload jsonb NOT NULL,
  response_status integer,
  response_data jsonb,
  sent_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Activer RLS
ALTER TABLE webhook_logs ENABLE ROW LEVEL SECURITY;

-- Politiques pour webhook_logs (admins et service role)
CREATE POLICY "webhook_logs_admin_read" ON webhook_logs
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.is_admin = true
    )
  );

CREATE POLICY "webhook_logs_admin_insert" ON webhook_logs
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.is_admin = true
    )
  );

-- Politique pour permettre au service role d'insérer des logs
CREATE POLICY "webhook_logs_service_role_insert" ON webhook_logs
  FOR INSERT TO service_role
  WITH CHECK (true);

-- Politique pour permettre au service role de lire les logs
CREATE POLICY "webhook_logs_service_role_read" ON webhook_logs
  FOR SELECT TO service_role
  USING (true);

-- Index pour les performances
CREATE INDEX IF NOT EXISTS webhook_logs_order_id_idx ON webhook_logs(order_id);
CREATE INDEX IF NOT EXISTS webhook_logs_webhook_type_idx ON webhook_logs(webhook_type);
CREATE INDEX IF NOT EXISTS webhook_logs_sent_at_idx ON webhook_logs(sent_at);
