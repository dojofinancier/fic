/*
  # Corriger l'accès admin aux flashcards

  1. Diagnostic
    - Vérifier les politiques actuelles pour flashcards
    - Identifier pourquoi les admins ne peuvent pas uploader

  2. Solution
    - Corriger les politiques RLS pour flashcards
    - S'assurer que les admins ont tous les droits

  3. Test
    - Vérifier que les politiques sont correctement appliquées
*/

-- Diagnostic de l'état actuel
SELECT 'Diagnostic des politiques flashcards' as step;

-- Vérifier les politiques existantes pour flashcards
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'flashcards' AND schemaname = 'public';

-- Vérifier la structure de la table flashcards
SELECT 
  column_name, 
  data_type, 
  is_nullable, 
  column_default
FROM information_schema.columns 
WHERE table_name = 'flashcards' 
  AND table_schema = 'public'
ORDER BY ordinal_position;

-- Supprimer toutes les anciennes politiques pour flashcards
SELECT 'Suppression des anciennes politiques flashcards' as step;

DROP POLICY IF EXISTS "flashcards_select_policy" ON flashcards;
DROP POLICY IF EXISTS "flashcards_insert_policy" ON flashcards;
DROP POLICY IF EXISTS "flashcards_update_policy" ON flashcards;
DROP POLICY IF EXISTS "flashcards_delete_policy" ON flashcards;
DROP POLICY IF EXISTS "flashcards_read_all" ON flashcards;
DROP POLICY IF EXISTS "flashcards_admin_insert" ON flashcards;
DROP POLICY IF EXISTS "flashcards_admin_update" ON flashcards;
DROP POLICY IF EXISTS "flashcards_admin_delete" ON flashcards;

-- Créer de nouvelles politiques pour flashcards (identiques à celles des questions)
SELECT 'Création des nouvelles politiques flashcards' as step;

-- Lecture pour tous les utilisateurs authentifiés
CREATE POLICY "flashcards_read_all" ON flashcards
  FOR SELECT TO authenticated
  USING (true);

-- Insertion pour les admins uniquement
CREATE POLICY "flashcards_admin_insert" ON flashcards
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- Mise à jour pour les admins uniquement
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

-- Suppression pour les admins uniquement
CREATE POLICY "flashcards_admin_delete" ON flashcards
  FOR DELETE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- Vérifier que RLS est activé
ALTER TABLE flashcards ENABLE ROW LEVEL SECURITY;

-- Test d'accès
SELECT 'Test d\'accès aux flashcards' as step;

-- Compter les flashcards existantes
SELECT COUNT(*) as flashcards_count FROM flashcards;

-- Vérifier les nouvelles politiques
SELECT 'Vérification des nouvelles politiques flashcards' as step;

SELECT 
  tablename,
  policyname,
  cmd,
  permissive
FROM pg_policies 
WHERE tablename = 'flashcards' AND schemaname = 'public'
ORDER BY policyname;

-- Vérifier que l'utilisateur actuel est bien admin (si connecté)
SELECT 'Vérification du statut admin' as step;

-- Cette requête ne fonctionnera que si un utilisateur est connecté
-- SELECT 
--   id, 
--   email, 
--   name, 
--   is_admin 
-- FROM public.users 
-- WHERE id = auth.uid();

-- Lister tous les admins existants
SELECT 'Liste des admins existants' as step;
SELECT * FROM list_admins();

SELECT 'Configuration des flashcards terminée avec succès' as result;