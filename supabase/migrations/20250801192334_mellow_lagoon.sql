/*
  # Système d'administration

  1. Modifications à la table users
    - Ajouter un champ is_admin pour identifier les administrateurs
    - Mettre à jour les politiques RLS pour les admins

  2. Sécurité
    - Seuls les admins peuvent modifier questions et flashcards
    - Les utilisateurs normaux peuvent seulement lire
    - Accès à la page admin restreint aux admins

  3. Création du premier admin
    - Créer un utilisateur admin par défaut
*/

-- Ajouter le champ is_admin à la table users
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS is_admin boolean DEFAULT false;

-- Créer un index pour les performances
CREATE INDEX IF NOT EXISTS users_is_admin_idx ON public.users(is_admin);

-- Mettre à jour les politiques RLS pour questions
DROP POLICY IF EXISTS "questions_insert_policy" ON questions;
DROP POLICY IF EXISTS "questions_update_policy" ON questions;
DROP POLICY IF EXISTS "questions_delete_policy" ON questions;

-- Nouvelles politiques pour questions (seuls les admins peuvent modifier)
CREATE POLICY "questions_insert_admin_only" ON questions
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND is_admin = true
    )
  );

CREATE POLICY "questions_update_admin_only" ON questions
  FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND is_admin = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND is_admin = true
    )
  );

CREATE POLICY "questions_delete_admin_only" ON questions
  FOR DELETE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- Mettre à jour les politiques RLS pour flashcards
DROP POLICY IF EXISTS "flashcards_insert_policy" ON flashcards;
DROP POLICY IF EXISTS "flashcards_update_policy" ON flashcards;
DROP POLICY IF EXISTS "flashcards_delete_policy" ON flashcards;

-- Nouvelles politiques pour flashcards (seuls les admins peuvent modifier)
CREATE POLICY "flashcards_insert_admin_only" ON flashcards
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND is_admin = true
    )
  );

CREATE POLICY "flashcards_update_admin_only" ON flashcards
  FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND is_admin = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND is_admin = true
    )
  );

CREATE POLICY "flashcards_delete_admin_only" ON flashcards
  FOR DELETE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- Fonction pour promouvoir un utilisateur en admin
CREATE OR REPLACE FUNCTION promote_user_to_admin(user_email text)
RETURNS boolean AS $$
DECLARE
  user_found boolean := false;
BEGIN
  UPDATE public.users 
  SET is_admin = true 
  WHERE email = user_email;
  
  GET DIAGNOSTICS user_found = FOUND;
  
  IF user_found THEN
    RAISE NOTICE 'Utilisateur % promu admin avec succès', user_email;
    RETURN true;
  ELSE
    RAISE NOTICE 'Utilisateur % non trouvé', user_email;
    RETURN false;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Créer un utilisateur admin par défaut (vous devrez changer l'email)
-- Remplacez 'admin@ledojofinancier.com' par votre email
DO $$
BEGIN
  -- Vérifier si un admin existe déjà
  IF NOT EXISTS (SELECT 1 FROM public.users WHERE is_admin = true) THEN
    -- Créer un utilisateur admin par défaut
    INSERT INTO public.users (id, email, name, has_access, is_admin)
    VALUES (
      gen_random_uuid(),
      'admin@ledojofinancier.com',
      'Administrateur',
      true,
      true
    )
    ON CONFLICT (email) DO UPDATE SET is_admin = true;
    
    RAISE NOTICE 'Utilisateur admin créé: admin@ledojofinancier.com';
  END IF;
END $$;

SELECT 'Système d''administration créé avec succès' as result;