import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';
import { Question, Quiz, QuizResult } from '../types';

interface QuizContextType {
  questions: Question[];
  quizzes: Quiz[];
  quizResults: QuizResult[];
  loading: boolean;
  addQuestions: (newQuestions: Question[]) => Promise<void>;
  generateQuizzes: () => void;
  addQuizResult: (result: Omit<QuizResult, 'id' | 'userId'>) => Promise<void>;
  deleteQuiz: (quizId: string) => Promise<void>;
  deleteAllQuizzes: () => Promise<void>;
  getStats: () => {
    chaptersCompleted: number;
    totalChapters: number;
    averageScore: number;
    studyStreak: number;
    timeStudied: number;
  };
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};

export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadData();
    } else {
      setQuestions([]);
      setQuizzes([]);
      setQuizResults([]);
      setLoading(false);
    }
  }, [user]);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Charger les questions
      const { data: questionsData, error: questionsError } = await supabase
        .from('questions')
        .select('*')
        .order('chapter', { ascending: true });

      if (questionsError) throw questionsError;

      const formattedQuestions: Question[] = questionsData.map(q => ({
        id: q.id,
        question: q.question,
        options: q.options,
        correctAnswer: q.correct_answer,
        explanation: q.explanation,
        chapter: q.chapter,
        type: q.type as 'quiz' | 'exam'
      }));

      setQuestions(formattedQuestions);
      generateQuizzesFromQuestions(formattedQuestions);

      // Charger les résultats de quiz
      const { data: resultsData, error: resultsError } = await supabase
        .from('quiz_results')
        .select('*')
        .eq('user_id', user.id)
        .order('completed_at', { ascending: false });

      if (resultsError) throw resultsError;

      const formattedResults: QuizResult[] = resultsData.map(r => ({
        id: r.id,
        quizId: r.quiz_id,
        userId: r.user_id,
        score: r.score,
        totalQuestions: r.total_questions,
        completedAt: new Date(r.completed_at),
        timeSpent: r.time_spent
      }));

      setQuizResults(formattedResults);
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
    } finally {
      setLoading(false);
    }
  };

  const addQuestions = async (newQuestions: Question[]) => {
    try {
      const questionsToInsert = newQuestions.map(q => ({
        id: q.id,
        question: q.question,
        options: q.options,
        correct_answer: q.correctAnswer,
        explanation: q.explanation,
        chapter: q.chapter,
        type: q.type || 'quiz'
      }));

      const { error } = await supabase
        .from('questions')
        .upsert(questionsToInsert);

      if (error) throw error;

      // Recharger les données
      await loadData();
    } catch (error) {
      console.error('Erreur lors de l\'ajout des questions:', error);
      throw error;
    }
  };

  const generateQuizzesFromQuestions = (questionsToUse: Question[]) => {
    const generatedQuizzes: Quiz[] = [];
    
    // Grouper les questions par chapitre et type
    const questionsByChapter = questionsToUse.reduce((acc, question) => {
      const key = `${question.chapter}-${question.type || 'quiz'}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(question);
      return acc;
    }, {} as Record<string, Question[]>);

    // Créer des quiz pour chaque groupe
    Object.entries(questionsByChapter).forEach(([key, chapterQuestions]) => {
      const [chapterStr, type] = key.split('-');
      const chapter = parseInt(chapterStr);
      
      if ((type === 'quiz' || !type) && chapter > 0) {
        generatedQuizzes.push({
          id: `quiz-chapter-${chapter}`,
          title: `Chapitre ${chapter} : Quiz`,
          chapter,
          type: 'quiz',
          questions: chapterQuestions
        });
      } else if (type === 'exam') {
        generatedQuizzes.push({
          id: `exam-practice-${Date.now()}`,
          title: 'Examen pratique',
          chapter: 0,
          type: 'exam',
          questions: chapterQuestions,
          timeLimit: 180
        });
      }
    });

    setQuizzes(generatedQuizzes);
  };

  const generateQuizzes = () => {
    generateQuizzesFromQuestions(questions);
  };

  const addQuizResult = async (result: Omit<QuizResult, 'id' | 'userId'>) => {
    if (!user) return;

    try {
      const withRetry = async <T,>(fn: () => Promise<{ data: any; error: any }>, attempts = 3, baseDelayMs = 500): Promise<T> => {
        let lastError: any;
        for (let attempt = 1; attempt <= attempts; attempt++) {
          const { data, error } = await fn();
          if (!error) return data as T;
          lastError = error;
          const delay = baseDelayMs * Math.pow(2, attempt - 1);
          await new Promise((r) => setTimeout(r, delay));
        }
        throw lastError;
      };

      const data = await withRetry<any>(() =>
        supabase
          .from('quiz_results')
          .insert({
            user_id: user.id,
            quiz_id: result.quizId,
            score: result.score,
            total_questions: result.totalQuestions,
            time_spent: result.timeSpent,
            completed_at: result.completedAt.toISOString()
          })
          .select()
          .single()
      );

      const newResult: QuizResult = {
        id: data.id,
        quizId: data.quiz_id,
        userId: data.user_id,
        score: data.score,
        totalQuestions: data.total_questions,
        completedAt: new Date(data.completed_at),
        timeSpent: data.time_spent
      };

      setQuizResults(prev => [newResult, ...prev]);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du résultat:', error);
      throw error;
    }
  };

  const deleteQuiz = async (quizId: string) => {
    try {
      // Supprimer les questions associées au quiz
      const quizToDelete = quizzes.find(q => q.id === quizId);
      if (quizToDelete) {
        const questionIdsToDelete = quizToDelete.questions.map(q => q.id);
        
        const { error: questionsError } = await supabase
          .from('questions')
          .delete()
          .in('id', questionIdsToDelete);

        if (questionsError) throw questionsError;
      }

      // Supprimer les résultats associés
      const { error: resultsError } = await supabase
        .from('quiz_results')
        .delete()
        .eq('quiz_id', quizId);

      if (resultsError) throw resultsError;

      // Recharger les données
      await loadData();
    } catch (error) {
      console.error('Erreur lors de la suppression du quiz:', error);
      throw error;
    }
  };

  const deleteAllQuizzes = async () => {
    try {
      // Supprimer toutes les questions
      const { error: questionsError } = await supabase
        .from('questions')
        .delete()
        .neq('id', ''); // Supprimer tout

      if (questionsError) throw questionsError;

      // Supprimer tous les résultats
      const { error: resultsError } = await supabase
        .from('quiz_results')
        .delete()
        .eq('user_id', user?.id);

      if (resultsError) throw resultsError;

      // Réinitialiser les états locaux
      setQuestions([]);
      setQuizzes([]);
      setQuizResults([]);
    } catch (error) {
      console.error('Erreur lors de la suppression de tous les quiz:', error);
      throw error;
    }
  };

  const getStats = () => {
    const completedChapters = new Set<number>();
    let totalScore = 0;
    let totalQuizzes = 0;
    let totalTimeStudied = 0;

    quizResults.forEach(result => {
      const quiz = quizzes.find(q => q.id === result.quizId);
      if (quiz && quiz.chapter > 0) {
        // Considérer un chapitre comme complété si score >= 70%
        if (result.score >= 70) {
          completedChapters.add(quiz.chapter);
        }
      }
      totalScore += result.score;
      totalQuizzes++;
      totalTimeStudied += result.timeSpent;
    });

    return {
      chaptersCompleted: completedChapters.size,
      totalChapters: 18,
      averageScore: totalQuizzes > 0 ? Math.round(totalScore / totalQuizzes) : 0,
      studyStreak: 7, // TODO: Calculer basé sur les dates
      timeStudied: Math.round(totalTimeStudied / 3600) // Convertir en heures
    };
  };

  return (
    <QuizContext.Provider value={{ 
      questions, 
      quizzes, 
      quizResults, 
      loading,
      addQuestions, 
      generateQuizzes, 
      addQuizResult, 
      deleteQuiz,
      deleteAllQuizzes,
      getStats 
    }}>
      {children}
    </QuizContext.Provider>
  );
};