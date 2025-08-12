-- Diagnostic complet et correction de la table users
-- Exécutez cette requête dans l'éditeur SQL de Supabase

-- 1. Vérifier l'état actuel de la table users
SELECT 
  schemaname, 
  tablename, 
  tableowner, 
  hasindexes, 
  hasrules, 
  hastriggers, 
  rowsecurity 
FROM pg_tables 
WHERE tablename = 'users';

-- 2. Vérifier les politiques RLS existantes
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'users';

-- 3. Supprimer complètement la table users et tout ce qui y est lié
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();
DROP TABLE IF EXISTS public.users CASCADE;

-- 4. Recréer la table users avec une approche simplifiée
CREATE TABLE public.users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  name text NOT NULL,
  has_access boolean DEFAULT true,
  access_expires_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 5. Activer RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- 6. Créer des politiques RLS très simples
CREATE POLICY "users_select_policy" ON public.users
  FOR SELECT TO authenticated
  USING (true); -- Permettre à tous les utilisateurs authentifiés de lire

CREATE POLICY "users_insert_policy" ON public.users
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "users_update_policy" ON public.users
  FOR UPDATE TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- 7. Créer des index
CREATE INDEX users_id_idx ON public.users(id);
CREATE INDEX users_email_idx ON public.users(email);

-- 8. Fonction pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- 9. Trigger pour updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 10. Fonction pour créer automatiquement un profil utilisateur
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name, has_access)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    true
  );
  RETURN NEW;
EXCEPTION
  WHEN others THEN
    -- En cas d'erreur, on continue sans bloquer l'inscription
    RAISE LOG 'Erreur lors de la création du profil utilisateur: %', SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 11. Trigger pour créer automatiquement le profil utilisateur
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 12. Vérification finale
SELECT 'Table users créée avec succès' as status;