import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useQuiz } from '../contexts/QuizContext';
import { useAuth } from '../contexts/AuthContext';
import { BookOpen, Clock, Trophy, ArrowRight, ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';

export const QuizzesPage: React.FC = () => {
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const { quizzes } = useQuiz();
  const { user } = useAuth();
  const [quizResults, setQuizResults] = useState<Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const chapterQuizzes = quizzes.filter(quiz => quiz.type === 'quiz');

  // Fetch quiz results when component mounts
  useEffect(() => {
    const fetchQuizResults = async () => {
      if (!user?.id) return;
      
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('quiz_results')
          .select('quiz_id, score')
          .eq('user_id', user.id);
        
        if (error) {
          console.warn('QuizzesPage: quiz_results fetch error', error);
          setQuizResults([]);
        } else {
          console.log('QuizzesPage: Raw quiz results data:', data);
          setQuizResults(data || []);
        }
      } catch (error) {
        console.error('Error fetching quiz results:', error);
        setQuizResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizResults();
  }, [user?.id]);

  // Calculate best score for a specific quiz
  const getBestScore = (quizId: string) => {
    const results = quizResults.filter(result => result.quiz_id === quizId);
    if (results.length === 0) return null;
    
    // Find the result with the highest score (score is already a percentage)
    let bestScore = 0;
    
    for (const result of results) {
      if (result.score !== null && result.score !== undefined) {
        // Score is already a percentage, just use it directly
        if (result.score > bestScore) {
          bestScore = result.score;
        }
      }
    }
    
    return bestScore > 0 ? Math.round(bestScore) : null;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/dashboard" className="inline-flex items-center text-[#10ac69] hover:text-[#0e9558] mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour au tableau de bord
          </Link>
          <h1 className="text-3xl font-bold text-[#3b3b3b] mb-2">Quiz et examens pratiques</h1>
          <p className="text-gray-600">Testez vos connaissances et préparez-vous à l'examen FIC®</p>
        </div>

        {/* Chapter Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedChapter === null ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setSelectedChapter(null)}
            >
              Tous les chapitres
            </Button>
            {Array.from({ length: 18 }, (_, i) => i + 1).map((chapter) => (
              <Button
                key={chapter}
                variant={selectedChapter === chapter ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setSelectedChapter(chapter)}
              >
                Chapitre {chapter}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chapter Quizzes */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-[#3b3b3b] mb-6">Quiz par chapitre (sans limite de temps)</h2>
            {chapterQuizzes.length === 0 ? (
              <Card className="text-center py-12">
                <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-500 mb-2">Aucun quiz disponible</h3>
                <p className="text-gray-400 mb-4">
                  Importez des questions via la page d'administration pour créer des quiz.
                </p>
                <Link to="/admin">
                  <Button>Aller à l'administration</Button>
                </Link>
              </Card>
            ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {chapterQuizzes
                .filter(quiz => selectedChapter === null || quiz.chapter === selectedChapter)
                .map((quiz) => (
                  <Card key={quiz.id} hover>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <BookOpen className="h-8 w-8 text-[#10ac69]" />
                        <div>
                          <h3 className="font-semibold text-[#3b3b3b]">{quiz.title}</h3>
                          <p className="text-sm text-gray-500">Chapitre {quiz.chapter}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Questions</div>
                        <div className="font-semibold text-[#3b3b3b]">{quiz.questions.length}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Trophy className="h-4 w-4" />
                          <span>
                            Meilleur : {loading ? '...' : (() => {
                              const bestScore = getBestScore(quiz.id);
                              return bestScore !== null ? `${bestScore}%` : 'NA';
                            })()}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <Link to={`/quiz/${quiz.id}`}>
                      <Button className="w-full">
                        Commencer le quiz
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </Card>
                ))}
            </div>
            )}
          </div>

          {/* Practice Exams Sidebar */}
          <div className="space-y-6">
            {/* Quick Access to Practice Exams */}
            <Card>
              <h3 className="font-semibold text-[#3b3b3b] mb-4">Examens pratiques</h3>
              <p className="text-sm text-gray-600 mb-4">
                Testez-vous dans des conditions d'examen réel avec chronométrage de 3 heures.
              </p>
              <Link to="/practice-exams">
                <Button className="w-full">
                  Voir les examens pratiques
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </Card>

            {/* Study Tips */}
            <Card className="mt-6">
              <h3 className="font-semibold text-[#3b3b3b] mb-3">Conseils d'étude</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Complétez les quiz de chapitre avant les examens pratiques</li>
                <li>• Révisez les explications pour les réponses incorrectes</li>
                <li>• Passez les examens pratiques dans des conditions chronométrées</li>
                <li>• Concentrez-vous sur les chapitres avec des scores plus faibles</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};