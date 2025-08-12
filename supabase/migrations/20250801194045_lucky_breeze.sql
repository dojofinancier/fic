/*
  # Système d'administration - Version corrigée

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

-- Diagnostic de l'état actuel
SELECT 'Diagnostic de l''état actuel' as step;

-- Vérifier si la colonne is_admin existe déjà
SELECT 
  column_name, 
  data_type, 
  is_nullable, 
  column_default
FROM information_schema.columns 
WHERE table_name = 'users' 
  AND table_schema = 'public' 
  AND column_name = 'is_admin';

-- Ajouter le champ is_admin à la table users s'il n'existe pas
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'users' 
      AND table_schema = 'public' 
      AND column_name = 'is_admin'
  ) THEN
    ALTER TABLE public.users ADD COLUMN is_admin boolean DEFAULT false;
    RAISE NOTICE 'Colonne is_admin ajoutée à la table users';
  ELSE
    RAISE NOTICE 'Colonne is_admin existe déjà';
  END IF;
END $$;

-- Créer un index pour les performances
CREATE INDEX IF NOT EXISTS users_is_admin_idx ON public.users(is_admin);

-- Supprimer les anciennes politiques pour questions
SELECT 'Mise à jour des politiques pour questions' as step;

DROP POLICY IF EXISTS "questions_select_policy" ON questions;
DROP POLICY IF EXISTS "questions_insert_policy" ON questions;
DROP POLICY IF EXISTS "questions_update_policy" ON questions;
DROP POLICY IF EXISTS "questions_delete_policy" ON questions;

-- Nouvelles politiques pour questions (seuls les admins peuvent modifier)
CREATE POLICY "questions_read_all" ON questions
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "questions_admin_insert" ON questions
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND is_admin = true
    )
  );

CREATE POLICY "questions_admin_update" ON questions
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

CREATE POLICY "questions_admin_delete" ON questions
  FOR DELETE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- Supprimer les anciennes politiques pour flashcards
SELECT 'Mise à jour des politiques pour flashcards' as step;

DROP POLICY IF EXISTS "flashcards_select_policy" ON flashcards;
DROP POLICY IF EXISTS "flashcards_insert_policy" ON flashcards;
DROP POLICY IF EXISTS "flashcards_update_policy" ON flashcards;
DROP POLICY IF EXISTS "flashcards_delete_policy" ON flashcards;

-- Nouvelles politiques pour flashcards (seuls les admins peuvent modifier)
CREATE POLICY "flashcards_read_all" ON flashcards
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "flashcards_admin_insert" ON flashcards
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND is_admin = true
    )
  );

CREATE POLICY "flashcards_admin_update" ON flashcards
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

CREATE POLICY "flashcards_admin_delete" ON flashcards
  FOR DELETE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- Fonction pour promouvoir un utilisateur en admin (syntaxe corrigée)
CREATE OR REPLACE FUNCTION promote_user_to_admin(user_email text)
RETURNS boolean AS $$
DECLARE
  affected_rows integer;
BEGIN
  UPDATE public.users 
  SET is_admin = true 
  WHERE email = user_email;
  
  GET DIAGNOSTICS affected_rows = ROW_COUNT;
  
  IF affected_rows > 0 THEN
    RAISE NOTICE 'Utilisateur % promu admin avec succès', user_email;
    RETURN true;
  ELSE
    RAISE NOTICE 'Utilisateur % non trouvé', user_email;
    RETURN false;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Créer un utilisateur admin par défaut
SELECT 'Création de l''utilisateur admin par défaut' as step;

DO $$
DECLARE
  admin_exists boolean := false;
BEGIN
  -- Vérifier si un admin existe déjà
  SELECT EXISTS(
    SELECT 1 FROM public.users WHERE is_admin = true
  ) INTO admin_exists;
  
  IF NOT admin_exists THEN
    -- Essayer de créer un utilisateur admin par défaut
    BEGIN
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
    EXCEPTION
      WHEN others THEN
        RAISE NOTICE 'Impossible de créer l''utilisateur admin par défaut: %', SQLERRM;
        RAISE NOTICE 'Vous devrez promouvoir manuellement un utilisateur existant';
    END;
  ELSE
    RAISE NOTICE 'Un administrateur existe déjà';
  END IF;
END $$;

-- Fonction utilitaire pour lister les admins
CREATE OR REPLACE FUNCTION list_admins()
RETURNS TABLE(id uuid, email text, name text, created_at timestamptz) AS $$
BEGIN
  RETURN QUERY
  SELECT u.id, u.email, u.name, u.created_at
  FROM public.users u
  WHERE u.is_admin = true
  ORDER BY u.created_at;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Test final
SELECT 'Test du système admin' as step;

-- Compter les admins
SELECT COUNT(*) as admin_count FROM public.users WHERE is_admin = true;

-- Lister les admins existants
SELECT 'Admins existants:' as info;
SELECT * FROM list_admins();

-- Vérifier les politiques
SELECT 'Politiques créées:' as info;
SELECT 
  tablename,
  policyname,
  cmd
FROM pg_policies 
WHERE tablename IN ('questions', 'flashcards') 
  AND schemaname = 'public'
ORDER BY tablename, policyname;

SELECT 'Système d''administration créé avec succès!' as result;
SELECT 'Pour promouvoir un utilisateur existant, utilisez: SELECT promote_user_to_admin(''email@example.com'');' as instruction;