/*
  # Schéma initial pour Le Dojo Financier

  1. Nouvelles tables
    - `users` - Profils utilisateurs étendus
    - `questions` - Questions pour quiz et examens
    - `flashcards` - Cartes mémoire
    - `quiz_results` - Résultats des quiz

  2. Sécurité
    - RLS activé sur toutes les tables
    - Politiques pour l'accès utilisateur approprié
*/

-- Table des utilisateurs étendus
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  has_access boolean DEFAULT false,
  access_expires_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table des questions
CREATE TABLE IF NOT EXISTS questions (
  id text PRIMARY KEY,
  question text NOT NULL,
  options text[] NOT NULL,
  correct_answer integer NOT NULL CHECK (correct_answer >= 0 AND correct_answer <= 3),
  explanation text NOT NULL,
  chapter integer NOT NULL CHECK (chapter >= 0 AND chapter <= 18),
  type text NOT NULL DEFAULT 'quiz' CHECK (type IN ('quiz', 'exam')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table des flashcards
CREATE TABLE IF NOT EXISTS flashcards (
  id text PRIMARY KEY,
  front text NOT NULL,
  back text NOT NULL,
  chapter integer NOT NULL CHECK (chapter >= 1 AND chapter <= 18),
  category text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table des résultats de quiz
CREATE TABLE IF NOT EXISTS quiz_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  quiz_id text NOT NULL,
  score integer NOT NULL CHECK (score >= 0 AND score <= 100),
  total_questions integer NOT NULL CHECK (total_questions > 0),
  time_spent integer NOT NULL CHECK (time_spent >= 0),
  completed_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Activer RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE flashcards ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;

-- Politiques pour users
CREATE POLICY "Users can read own profile"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update own profile"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = id::text);

-- Politiques pour questions (lecture seule pour utilisateurs authentifiés)
CREATE POLICY "Authenticated users can read questions"
  ON questions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Only admins can modify questions"
  ON questions
  FOR ALL
  TO authenticated
  USING (false);

-- Politiques pour flashcards (lecture seule pour utilisateurs authentifiés)
CREATE POLICY "Authenticated users can read flashcards"
  ON flashcards
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Only admins can modify flashcards"
  ON flashcards
  FOR ALL
  TO authenticated
  USING (false);

-- Politiques pour quiz_results
CREATE POLICY "Users can read own quiz results"
  ON quiz_results
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own quiz results"
  ON quiz_results
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Fonction pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers pour updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_questions_updated_at
  BEFORE UPDATE ON questions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_flashcards_updated_at
  BEFORE UPDATE ON flashcards
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();