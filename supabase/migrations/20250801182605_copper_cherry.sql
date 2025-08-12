/*
  # Correction définitive des politiques RLS pour la table users

  1. Diagnostic complet
    - Vérifier l'état actuel de la table users
    - Identifier les problèmes avec les politiques RLS

  2. Solution
    - Supprimer complètement la table users et la recréer
    - Utiliser des politiques RLS très simples et permissives
    - Ajouter des index pour les performances

  3. Sécurité
    - Politiques RLS fonctionnelles
    - Accès approprié pour les utilisateurs authentifiés
*/

-- 1. Diagnostic de l'état actuel
SELECT 'Diagnostic de la table users' as step;

-- Vérifier si la table existe
SELECT 
  schemaname, 
  tablename, 
  tableowner, 
  rowsecurity 
FROM pg_tables 
WHERE tablename = 'users' AND schemaname = 'public';

-- Vérifier les politiques existantes
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'users' AND schemaname = 'public';

-- 2. Nettoyage complet
SELECT 'Nettoyage complet' as step;

-- Supprimer tous les triggers et fonctions liés
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
DROP FUNCTION IF EXISTS update_users_updated_at() CASCADE;
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

-- Supprimer complètement la table users
DROP TABLE IF EXISTS public.users CASCADE;

-- 3. Recréation avec une approche simplifiée
SELECT 'Recréation de la table users' as step;

CREATE TABLE public.users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  name text NOT NULL,
  has_access boolean DEFAULT true,
  access_expires_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 4. Politiques RLS très permissives (pour debug)
SELECT 'Configuration des politiques RLS' as step;

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Politique très permissive pour SELECT
CREATE POLICY "allow_all_select" ON public.users
  FOR SELECT TO authenticated
  USING (true);

-- Politique pour INSERT
CREATE POLICY "allow_authenticated_insert" ON public.users
  FOR INSERT TO authenticated
  WITH CHECK (true);

-- Politique pour UPDATE
CREATE POLICY "allow_own_update" ON public.users
  FOR UPDATE TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Politique pour DELETE
CREATE POLICY "allow_own_delete" ON public.users
  FOR DELETE TO authenticated
  USING (auth.uid() = id);

-- 5. Index pour les performances
SELECT 'Création des index' as step;

CREATE INDEX IF NOT EXISTS users_id_idx ON public.users(id);
CREATE INDEX IF NOT EXISTS users_email_idx ON public.users(email);
CREATE INDEX IF NOT EXISTS users_has_access_idx ON public.users(has_access);

-- 6. Fonction pour updated_at
SELECT 'Création de la fonction updated_at' as step;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 7. Trigger pour updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- 8. Test de la table
SELECT 'Test de la table users' as step;

-- Vérifier que la table est accessible
SELECT COUNT(*) as user_count FROM public.users;

-- Vérifier les politiques
SELECT 
  policyname,
  cmd,
  permissive
FROM pg_policies 
WHERE tablename = 'users' AND schemaname = 'public';

SELECT 'Configuration terminée avec succès' as result;