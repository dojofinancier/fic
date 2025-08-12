import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useQuiz } from '../contexts/QuizContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  BookOpen, 
  Clock, 
  Brain, 
  MessageCircle, 
  Calendar,
  BarChart3,
  Trophy,
  AlertCircle
} from 'lucide-react';
import { supabase } from '../lib/supabase';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { getStats } = useQuiz();
  const quizStats = getStats();

  const [loading, setLoading] = useState<boolean>(true);
  const [results, setResults] = useState<Array<any>>([]);

  useEffect(() => {
    let isMounted = true;
    const fetchResults = async () => {
      if (!user?.id) return;
      setLoading(true);
      const { data, error } = await supabase
        .from('quiz_results')
        .select('quiz_id, score, total_questions, time_spent, completed_at')
        .eq('user_id', user.id)
        .order('completed_at', { ascending: false })
        .limit(100);
      if (error) {
        console.warn('Dashboard: quiz_results fetch error', error);
        if (isMounted) setResults([]);
      } else if (isMounted) {
        setResults(data || []);
      }
      if (isMounted) setLoading(false);
    };
    fetchResults();
    return () => { isMounted = false; };
  }, [user?.id]);

  const toPercent = (score: number, total?: number | null) => {
    if (total && total > 0 && score <= total) return Math.round((score / total) * 100);
    return Math.round(score);
  };

  const getChapterLabel = (quizId: string) => {
    // Try to extract a number from ids like "quiz-chapter-3"; otherwise show the raw id
    const match = quizId.match(/(\d+)/);
    return match ? `Chapitre ${match[1]}` : quizId;
  };

  const derived = useMemo(() => {
    if (!results || results.length === 0) {
      return {
        chaptersCompleted: 0,
        totalChapters: quizStats.totalChapters || 0,
        averageScore: 0,
        studyStreak: 0,
        timeStudiedHours: 0,
        recentActivity: [] as Array<{ title: string; score: number | null; date: string }>,
        upcomingTasks: [] as string[],
      };
    }

    // Average score
    const percents = results.map(r => toPercent(r.score, r.total_questions));
    const averageScore = Math.round(percents.reduce((a, b) => a + b, 0) / percents.length);

    // Chapters completed (best >= 70%)
    const bestByQuiz = new Map<string, number>();
    for (const r of results) {
      const p = toPercent(r.score, r.total_questions);
      const prev = bestByQuiz.get(r.quiz_id) ?? -1;
      if (p > prev) bestByQuiz.set(r.quiz_id, p);
    }
    const chaptersCompleted = Array.from(bestByQuiz.values()).filter(p => p >= 70).length;
    const totalChapters = quizStats.totalChapters || bestByQuiz.size;

    // Study streak (consecutive days with activity up to today)
    const daySet = new Set<string>();
    results.forEach(r => {
      const d = new Date(r.completed_at);
      const key = d.toISOString().slice(0, 10); // YYYY-MM-DD (UTC)
      daySet.add(key);
    });
    let streak = 0;
    let cursor = new Date();
    for (let i = 0; i < 60; i++) { // cap to 60 days
      const key = cursor.toISOString().slice(0, 10);
      if (daySet.has(key)) {
        streak += 1;
        cursor.setUTCDate(cursor.getUTCDate() - 1);
      } else {
        break;
      }
    }

    // Study time (last 7 days, hours)
    const now = Date.now();
    const weekAgo = now - 7 * 24 * 60 * 60 * 1000;
    const minutes7d = results
      .filter(r => new Date(r.completed_at).getTime() >= weekAgo)
      .reduce((sum, r) => sum + (r.time_spent || 0), 0);
    const timeStudiedHours = Math.round((minutes7d / 60) * 10) / 10; // 1 decimal

    // Recent activity (last 3)
    const recentActivity = results.slice(0, 3).map(r => ({
      title: `${getChapterLabel(r.quiz_id)}`,
      score: toPercent(r.score, r.total_questions),
      date: new Date(r.completed_at).toLocaleDateString('fr-CA', { year: 'numeric', month: 'short', day: 'numeric' })
    }));

    // Upcoming tasks (max 4): low scoring chapters first, then stale chapters, then fallback
    const tasks: string[] = [];
    const low = Array.from(bestByQuiz.entries()).filter(([, p]) => p < 70).map(([id]) => id);
    low.slice(0, 4).forEach(id => tasks.push(`Refaire ${getChapterLabel(id)}`));
    if (tasks.length < 4) {
      // Stale chapters: last attempt older than 14 days
      const lastAttemptByQuiz = new Map<string, number>();
      for (const r of results) {
        const t = new Date(r.completed_at).getTime();
        const prev = lastAttemptByQuiz.get(r.quiz_id) ?? 0;
        if (t > prev) lastAttemptByQuiz.set(r.quiz_id, t);
      }
      const staleCutoff = now - 14 * 24 * 60 * 60 * 1000;
      const stale = Array.from(lastAttemptByQuiz.entries())
        .filter(([, t]) => t < staleCutoff)
        .map(([id]) => id)
        .filter(id => !tasks.some(t => t.includes(getChapterLabel(id))));
      stale.slice(0, 4 - tasks.length).forEach(id => tasks.push(`Revoir ${getChapterLabel(id)}`));
    }
    // Fill remaining slots with the two specific actions
    if (tasks.length < 4) tasks.push('Réviser les cartes mémoires');
    if (tasks.length < 4) tasks.push('Faire un examen pratique');

    return {
      chaptersCompleted,
      totalChapters,
      averageScore,
      studyStreak: streak,
      timeStudiedHours,
      recentActivity,
      upcomingTasks: tasks.slice(0, 4),
    };
  }, [results, quizStats.totalChapters]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#3b3b3b] mb-2">
            Bon retour, {user.name} !
          </h1>
          <p className="text-gray-600">
            Continuez votre parcours de préparation à l'examen FIC
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="text-center">
            <BookOpen className="h-8 w-8 text-[#10ac69] mx-auto mb-2" />
            <div className="text-2xl font-bold text-[#3b3b3b] mb-1">
              {derived.chaptersCompleted}/{derived.totalChapters}
            </div>
            <div className="text-sm text-gray-600">Chapitres complétés</div>
          </Card>
          
          <Card className="text-center">
            <Trophy className="h-8 w-8 text-[#10ac69] mx-auto mb-2" />
            <div className="text-2xl font-bold text-[#3b3b3b] mb-1">
              {derived.averageScore}%
            </div>
            <div className="text-sm text-gray-600">Score moyen</div>
          </Card>
          
          <Card className="text-center">
            <BarChart3 className="h-8 w-8 text-[#10ac69] mx-auto mb-2" />
            <div className="text-2xl font-bold text-[#3b3b3b] mb-1">
              {derived.studyStreak}
            </div>
            <div className="text-sm text-gray-600">Série de jours</div>
          </Card>
          
          <Card className="text-center">
            <Clock className="h-8 w-8 text-[#10ac69] mx-auto mb-2" />
            <div className="text-2xl font-bold text-[#3b3b3b] mb-1">
              {derived.timeStudiedHours}h
            </div>
            <div className="text-sm text-gray-600">Temps d'étude</div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Learning Tools */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-[#3b3b3b] mb-6">Outils d'apprentissage</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link to="/quizzes">
                <Card hover className="text-center">
                  <BookOpen className="h-12 w-12 text-[#10ac69] mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-[#3b3b3b] mb-2">Quiz par chapitre</h3>
                  <p className="text-gray-600 text-sm">Testez vos connaissances avec des quiz interactifs</p>
                </Card>
              </Link>

              <Link to="/practice-exams">
                <Card hover className="text-center">
                  <Clock className="h-12 w-12 text-[#10ac69] mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-[#3b3b3b] mb-2">Examens pratiques</h3>
                  <p className="text-gray-600 text-sm">Simulez l'expérience d'examen réel</p>
                </Card>
              </Link>

              <Link to="/flashcards">
                <Card hover className="text-center">
                  <Brain className="h-12 w-12 text-[#10ac69] mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-[#3b3b3b] mb-2">Cartes mémoire</h3>
                  <p className="text-gray-600 text-sm">Mémorisez efficacement les concepts clés</p>
                </Card>
              </Link>

              <Link to="/ai-tutor">
                <Card hover className="text-center">
                  <MessageCircle className="h-12 w-12 text-[#10ac69] mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-[#3b3b3b] mb-2">Tuteur IA</h3>
                  <p className="text-gray-600 text-sm">Obtenez de l'aide et des explications instantanées</p>
                </Card>
              </Link>

              <Link to="/study-plans">
                <Card hover className="text-center">
                  <Calendar className="h-12 w-12 text-[#10ac69] mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-[#3b3b3b] mb-2">Plans d'étude</h3>
                  <p className="text-gray-600 text-sm">Organisez votre horaire d'apprentissage</p>
                </Card>
              </Link>

              <Link to="/study-notes">
                <Card hover className="text-center">
                  <BarChart3 className="h-12 w-12 text-[#10ac69] mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-[#3b3b3b] mb-2">Notes d'étude</h3>
                  <p className="text-gray-600 text-sm">Notes détaillées par chapitre</p>
                </Card>
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <Card>
              <h3 className="text-lg font-semibold text-[#3b3b3b] mb-4">Activité récente</h3>
              <div className="space-y-3">
                {derived.recentActivity.length === 0 && (
                  <div className="text-sm text-gray-500">Aucune activité récente</div>
                )}
                {derived.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div>
                      <div className="font-medium text-sm text-[#3b3b3b]">{activity.title}</div>
                      <div className="text-xs text-gray-500">{activity.date}</div>
                    </div>
                    {activity.score !== null && activity.score !== undefined && (
                      <div className="text-sm font-medium text-[#10ac69]">
                        {activity.score}%
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Upcoming Tasks */}
            <Card>
              <h3 className="text-lg font-semibold text-[#3b3b3b] mb-4">Tâches à venir</h3>
              <div className="space-y-2">
                {derived.upcomingTasks.map((task, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-gray-300 text-[#10ac69] focus:ring-[#10ac69]" />
                    <span className="text-sm text-gray-700">{task}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};