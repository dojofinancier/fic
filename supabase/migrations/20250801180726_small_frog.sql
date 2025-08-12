-- Corriger les politiques RLS pour la table users
-- Exécutez cette requête dans l'éditeur SQL de Supabase

-- Supprimer les anciennes politiques
DROP POLICY IF EXISTS "Users can read own profile" ON users;
DROP POLICY IF EXISTS "Users can update own profile" ON users;

-- Créer de nouvelles politiques corrigées
CREATE POLICY "Users can read own profile"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Permettre l'insertion pour les nouveaux utilisateurs
CREATE POLICY "Users can insert own profile"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Vérifier que RLS est activé
ALTER TABLE users ENABLE ROW LEVEL SECURITY;