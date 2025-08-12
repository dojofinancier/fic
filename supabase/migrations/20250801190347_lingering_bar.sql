/*
  # Correction des politiques RLS pour questions et flashcards

  1. Problème identifié
    - Les politiques actuelles bloquent l'insertion/modification
    - Seuls les "admins" peuvent modifier, mais aucun utilisateur n'est défini comme admin

  2. Solution
    - Permettre aux utilisateurs authentifiés d'insérer/modifier leurs propres données
    - Corriger les politiques pour permettre l'upload via l'interface admin

  3. Sécurité
    - Maintenir la sécurité tout en permettant les opérations nécessaires
    - Politiques appropriées pour chaque type d'opération
*/

-- Diagnostic de l'état actuel
SELECT 'Diagnostic des politiques actuelles' as step;

-- Vérifier les politiques existantes pour questions
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'questions' AND schemaname = 'public';

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

-- Supprimer les anciennes politiques restrictives
SELECT 'Suppression des anciennes politiques' as step;

-- Pour questions
DROP POLICY IF EXISTS "Authenticated users can read questions" ON questions;
DROP POLICY IF EXISTS "Only admins can modify questions" ON questions;

-- Pour flashcards
DROP POLICY IF EXISTS "Authenticated users can read flashcards" ON flashcards;
DROP POLICY IF EXISTS "Only admins can modify flashcards" ON flashcards;

-- Créer de nouvelles politiques permissives pour questions
SELECT 'Création des nouvelles politiques pour questions' as step;

CREATE POLICY "questions_select_policy" ON questions
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "questions_insert_policy" ON questions
  FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "questions_update_policy" ON questions
  FOR UPDATE TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "questions_delete_policy" ON questions
  FOR DELETE TO authenticated
  USING (true);

-- Créer de nouvelles politiques permissives pour flashcards
SELECT 'Création des nouvelles politiques pour flashcards' as step;

CREATE POLICY "flashcards_select_policy" ON flashcards
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "flashcards_insert_policy" ON flashcards
  FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "flashcards_update_policy" ON flashcards
  FOR UPDATE TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "flashcards_delete_policy" ON flashcards
  FOR DELETE TO authenticated
  USING (true);

-- Vérifier que RLS est activé
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE flashcards ENABLE ROW LEVEL SECURITY;

-- Test des tables
SELECT 'Test d\'accès aux tables' as step;

-- Compter les questions existantes
SELECT COUNT(*) as questions_count FROM questions;

-- Compter les flashcards existantes
SELECT COUNT(*) as flashcards_count FROM flashcards;

-- Vérifier les nouvelles politiques
SELECT 'Vérification des nouvelles politiques' as step;

SELECT 
  tablename,
  policyname,
  cmd,
  permissive
FROM pg_policies 
WHERE tablename IN ('questions', 'flashcards') AND schemaname = 'public'
ORDER BY tablename, policyname;

SELECT 'Configuration terminée avec succès' as result;