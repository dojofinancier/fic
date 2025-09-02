import React, { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useQuiz } from '../contexts/QuizContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  User, 
  Mail, 
  Calendar,
  Clock,
  BookOpen,
  Trophy,
  BarChart3,
  ArrowLeft,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export const AccountPage: React.FC = () => {
  const { user } = useAuth();
  const { getStats } = useQuiz();
  const quizStats = getStats();

  const [loading, setLoading] = useState<boolean>(true);
  const [results, setResults] = useState<Array<any>>([]);
  
  // Password change state
  const [showPasswordForm, setShowPasswordForm] = useState<boolean>(false);
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [passwordLoading, setPasswordLoading] = useState<boolean>(false);
  const [passwordMessage, setPasswordMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  
  // Session management state
  const [sessions, setSessions] = useState<Array<any>>([]);
  const [sessionsLoading, setSessionsLoading] = useState<boolean>(false);
  
  // Login history state
  const [loginHistory, setLoginHistory] = useState<Array<any>>([]);
  const [loginHistoryLoading, setLoginHistoryLoading] = useState<boolean>(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState<boolean>(false);
  
  // Phase 3: Advanced features state
  const [showAdvancedStats, setShowAdvancedStats] = useState<boolean>(false);

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
        console.warn('AccountPage: quiz_results fetch error', error);
        if (isMounted) setResults([]);
      } else if (isMounted) {
        setResults(data || []);
      }
      if (isMounted) setLoading(false);
    };
    fetchResults();
    return () => { isMounted = false; };
  }, [user?.id]);

  // Fetch sessions when component mounts
  useEffect(() => {
    if (user) {
      console.log('AccountPage: User data:', {
        id: user.id,
        email: user.email,
        created_at: user.created_at,
        last_sign_in_at: user.last_sign_in_at,
        type: typeof user.created_at
      });
      fetchSessions();
      fetchLoginHistory();
    }
  }, [user]);

  const toPercent = (score: number, total?: number | null) => {
    // Score is already a percentage, just return it rounded
    return Math.round(score);
  };

  const getChapterLabel = (quizId: string) => {
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
        quizCompletionRate: 0,
      };
    }

    // Average score - use best score per chapter for more accurate representation
    const bestScoresByChapter = new Map<string, number>();
    for (const r of results) {
      const p = toPercent(r.score, r.total_questions);
      const prev = bestScoresByChapter.get(r.quiz_id) ?? -1;
      if (p > prev) bestScoresByChapter.set(r.quiz_id, p);
    }
    const bestScores = Array.from(bestScoresByChapter.values());
    const averageScore = bestScores.length > 0 ? Math.round(bestScores.reduce((a, b) => a + b, 0) / bestScores.length) : 0;

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
      const key = d.toISOString().slice(0, 10);
      daySet.add(key);
    });
    let streak = 0;
    let cursor = new Date();
    for (let i = 0; i < 60; i++) {
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
    const timeStudiedHours = Math.round((minutes7d / 60) * 10) / 10;

    // Quiz completion rate
    const quizCompletionRate = totalChapters > 0 ? Math.round((chaptersCompleted / totalChapters) * 100) : 0;

    return {
      chaptersCompleted,
      totalChapters,
      averageScore,
      studyStreak: streak,
      timeStudiedHours,
      quizCompletionRate,
    };
  }, [results, quizStats.totalChapters]);

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return 'Non disponible';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Format invalide';
      
      return date.toLocaleDateString('fr-CA', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch (error) {
      console.error('Error formatting date:', dateString, error);
      return 'Format invalide';
    }
  };

  // Password change functions
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'Les mots de passe ne correspondent pas' });
      return;
    }
    
    if (newPassword.length < 6) {
      setPasswordMessage({ type: 'error', text: 'Le nouveau mot de passe doit contenir au moins 6 caractères' });
      return;
    }
    
    setPasswordLoading(true);
    setPasswordMessage(null);
    
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      
      if (error) {
        setPasswordMessage({ type: 'error', text: error.message });
      } else {
        setPasswordMessage({ type: 'success', text: 'Mot de passe mis à jour avec succès' });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setShowPasswordForm(false);
      }
    } catch (error) {
      setPasswordMessage({ type: 'error', text: 'Erreur lors de la mise à jour du mot de passe' });
    } finally {
      setPasswordLoading(false);
    }
  };

  // Session management functions
  const fetchSessions = async () => {
    setSessionsLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        // Show current session with real data
        setSessions([{
          id: 'current',
          created_at: session.created_at,
          last_activity: new Date().toISOString(),
          session_id: session.access_token.slice(-8) // Show last 8 chars of token
        }]);
      }
    } catch (error) {
      console.error('Error fetching sessions:', error);
    } finally {
      setSessionsLoading(false);
    }
  };

  const logoutFromAllDevices = async () => {
    try {
      await supabase.auth.signOut({ scope: 'global' });
      // This will redirect to login page
    } catch (error) {
      console.error('Error logging out from all devices:', error);
    }
  };

  // Enhanced logout with confirmation
  const handleLogoutFromAllDevices = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogoutFromAllDevices = async () => {
    setShowLogoutConfirm(false);
    try {
      await supabase.auth.signOut({ scope: 'global' });
      // This will redirect to login page
    } catch (error) {
      console.error('Error logging out from all devices:', error);
    }
  };

  // Login history tracking functions
  const fetchLoginHistory = async () => {
    setLoginHistoryLoading(true);
    try {
      // Get current session info
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        // For now, we'll show a simplified session history
        // In a real implementation, you'd store this in a database
        const sessionHistory = [
          {
            id: 'current',
            timestamp: session.created_at,
            status: 'active'
          }
        ];
        
        setLoginHistory(sessionHistory);
      }
    } catch (error) {
      console.error('Error fetching login history:', error);
    } finally {
      setLoginHistoryLoading(false);
    }
  };

  const revokeSession = async (sessionId: string) => {
    try {
      // If it's the current session, log out
      if (sessionId === 'current') {
        await supabase.auth.signOut();
        // This will redirect to login page
        return;
      }
      
      // For other sessions, remove from local state
      // In a real implementation with multiple sessions, you'd call an API
      setLoginHistory(prev => prev.filter(session => session.id !== sessionId));
    } catch (error) {
      console.error('Error revoking session:', error);
    }
  };





  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Accès non autorisé</h1>
            <p className="mt-2 text-gray-600">Veuillez vous connecter pour accéder à votre compte.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/dashboard" className="inline-flex items-center text-[#10ac69] hover:text-[#0e9558] mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour au tableau de bord
          </Link>
          <h1 className="text-3xl font-bold text-[#3b3b3b] mb-2">
            Mon compte
          </h1>
          <p className="text-gray-600">
            Gérez vos informations personnelles et suivez vos progrès
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-[#3b3b3b] mb-6 flex items-center">
                <User className="h-5 w-5 mr-2 text-[#10ac69]" />
                Informations personnelles
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 text-gray-400 mr-3" />
                  <div>
                    <div className="text-sm text-gray-500">Email</div>
                    <div className="font-medium text-[#3b3b3b]">{user.email}</div>
                  </div>
                </div>
                
                                 <div className="flex items-center">
                   <Calendar className="h-4 w-4 text-gray-400 mr-3" />
                   <div>
                     <div className="text-sm text-gray-500">Compte créé le</div>
                     <div className="font-medium text-[#3b3b3b]">
                       {formatDate(user.created_at)}
                     </div>
                     {user.created_at && (
                       <div className="text-xs text-gray-400">
                         Raw: {user.created_at}
                       </div>
                     )}
                   </div>
                 </div>
                 
                 <div className="flex items-center">
                   <Clock className="h-4 w-4 text-gray-400 mr-3" />
                   <div>
                     <div className="text-sm text-gray-500">Dernière connexion</div>
                     <div className="font-medium text-[#3b3b3b]">
                       {formatDate(user.last_sign_in_at)}
                     </div>
                     {user.last_sign_in_at && (
                       <div className="text-xs text-gray-400">
                         Raw: {user.last_sign_in_at}
                       </div>
                     )}
                   </div>
                 </div>
              </div>
            </Card>

            {/* Password Change */}
            <Card className="p-6 mt-6">
              <h2 className="text-xl font-semibold text-[#3b3b3b] mb-6 flex items-center">
                <Lock className="h-5 w-5 mr-2 text-[#10ac69]" />
                Sécurité
              </h2>
              
              {!showPasswordForm ? (
                <Button 
                  onClick={() => setShowPasswordForm(true)}
                  variant="outline"
                  className="w-full"
                >
                  Changer le mot de passe
                </Button>
              ) : (
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nouveau mot de passe
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#10ac69] focus:border-transparent"
                        placeholder="Nouveau mot de passe"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showNewPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirmer le mot de passe
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#10ac69] focus:border-transparent"
                        placeholder="Confirmer le mot de passe"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
                      </button>
                    </div>
                  </div>

                  {passwordMessage && (
                    <div className={`p-3 rounded-md text-sm ${
                      passwordMessage.type === 'success' 
                        ? 'bg-green-50 text-green-800 border border-green-200' 
                        : 'bg-red-50 text-red-800 border border-red-200'
                    }`}>
                      {passwordMessage.text}
                    </div>
                  )}

                  <div className="flex space-x-3">
                    <Button
                      type="submit"
                      disabled={passwordLoading}
                      className="flex-1"
                    >
                      {passwordLoading ? 'Mise à jour...' : 'Mettre à jour'}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowPasswordForm(false);
                        setCurrentPassword('');
                        setNewPassword('');
                        setConfirmPassword('');
                        setPasswordMessage(null);
                      }}
                      className="flex-1"
                    >
                      Annuler
                    </Button>
                  </div>
                </form>
              )}
            </Card>

                         
          </div>

          {/* Study Statistics */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-[#3b3b3b] mb-6 flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-[#10ac69]" />
                Statistiques d'étude
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center">
                  <BookOpen className="h-8 w-8 text-[#10ac69] mx-auto mb-2" />
                  <div className="text-2xl font-bold text-[#3b3b3b] mb-1">
                    {derived.chaptersCompleted}/{derived.totalChapters}
                  </div>
                  <div className="text-sm text-gray-600">Chapitres complétés</div>
                </div>
                
                <div className="text-center">
                  <Trophy className="h-8 w-8 text-[#10ac69] mx-auto mb-2" />
                  <div className="text-2xl font-bold text-[#3b3b3b] mb-1">
                    {derived.averageScore}%
                  </div>
                  <div className="text-sm text-gray-600">Score moyen</div>
                </div>
                
                <div className="text-center">
                  <BarChart3 className="h-8 w-8 text-[#10ac69] mx-auto mb-2" />
                  <div className="text-2xl font-bold text-[#3b3b3b] mb-1">
                    {derived.quizCompletionRate}%
                  </div>
                  <div className="text-sm text-gray-600">Taux de réussite</div>
                </div>
                
                <div className="text-center">
                  <Clock className="h-8 w-8 text-[#10ac69] mx-auto mb-2" />
                  <div className="text-2xl font-bold text-[#3b3b3b] mb-1">
                    {derived.timeStudiedHours}h
                  </div>
                  <div className="text-sm text-gray-600">Temps d'étude (7j)</div>
                </div>
              </div>
              
                             <div className="mt-6 pt-6 border-t border-gray-200">
                 <div className="text-center">
                   <Trophy className="h-8 w-8 text-[#10ac69] mx-auto mb-2" />
                   <div className="text-2xl font-bold text-[#3b3b3b] mb-1">
                     {derived.studyStreak}
                   </div>
                   <div className="text-sm text-gray-600">Série de jours d'étude</div>
                 </div>
               </div>

               {/* Advanced Analytics Toggle */}
               <div className="mt-6 pt-6 border-t border-gray-200">
                 <button
                   onClick={() => setShowAdvancedStats(!showAdvancedStats)}
                   className="w-full flex items-center justify-center text-[#10ac69] hover:text-[#0e9558] transition-colors"
                 >
                   <BarChart3 className="h-4 w-4 mr-2" />
                   {showAdvancedStats ? 'Masquer' : 'Afficher'} les statistiques avancées
                 </button>
               </div>

               {/* Advanced Analytics */}
               {showAdvancedStats && (
                 <div className="mt-6 pt-6 border-t border-gray-200">
                   <h3 className="text-lg font-semibold text-[#3b3b3b] mb-4 text-center">
                     Statistiques avancées
                   </h3>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="text-center p-3 bg-blue-50 rounded-lg">
                       <div className="text-lg font-bold text-blue-600">
                         {results.length}
                       </div>
                       <div className="text-sm text-blue-700">Quiz complétés</div>
                     </div>
                     
                     <div className="text-center p-3 bg-purple-50 rounded-lg">
                       <div className="text-lg font-bold text-purple-600">
                         {Math.round((derived.averageScore / 20) * 10) / 10}/5
                       </div>
                       <div className="text-sm text-purple-700">Note sur 5</div>
                       <div className="text-xs text-purple-600 mt-1">
                         Basé sur {derived.totalChapters} chapitre(s)
                       </div>
                     </div>
                   </div>
                   
                   <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                     <div className="text-sm text-gray-600 mb-2">Progression globale</div>
                     <div className="w-full bg-gray-200 rounded-full h-2">
                       <div
                         className="bg-[#10ac69] h-2 rounded-full transition-all duration-300"
                         style={{ width: `${derived.quizCompletionRate}%` }}
                       />
                     </div>
                                          <div className="text-xs text-gray-500 mt-1 text-center">
                       {derived.quizCompletionRate}% du programme complété
                     </div>
                   </div>
                   
                   {/* Debug Information */}
                   <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                     <div className="text-sm text-yellow-800 mb-2 font-medium">Informations sur les calculs</div>
                     <div className="text-xs text-yellow-700 space-y-1">
                       <div>Total des tentatives de quiz: {results.length}</div>
                       <div>Chapitres uniques avec quiz: {derived.totalChapters}</div>
                       <div>Chapitres complétés (≥70%): {derived.chaptersCompleted}</div>
                       <div>Score moyen basé sur: {derived.totalChapters} meilleur(s) score(s) par chapitre</div>
                     </div>
                   </div>
                                   </div>
                )}
              </Card>

              {/* Session Management */}
              <Card className="p-6 mt-6">
                <h2 className="text-xl font-semibold text-[#3b3b3b] mb-6 flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-[#10ac69]" />
                  Sessions actives
                </h2>
                
                {sessionsLoading ? (
                  <div className="text-center py-4">
                    <div className="text-gray-500">Chargement...</div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {sessions.map((session) => (
                      <div key={session.id} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium text-sm text-[#3b3b3b]">
                            Session {session.session_id}
                          </div>
                          <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                            Actif
                          </span>
                        </div>
                                                 <div className="text-xs text-gray-500 space-y-1">
                           <div>Créée le: {formatDate(session.created_at)}</div>
                           <div>Dernière activité: {formatDate(session.last_activity)}</div>
                           {session.created_at && (
                             <div className="text-xs text-gray-400">
                               Raw created: {session.created_at}
                             </div>
                           )}
                         </div>
                      </div>
                    ))}
                    
                    <Button
                      onClick={handleLogoutFromAllDevices}
                      variant="outline"
                      className="w-full text-red-600 border-red-300 hover:bg-red-50"
                    >
                      Se déconnecter de tous les appareils
                    </Button>
                  </div>
                )}
              </Card>

              {/* Login History */}
              <Card className="p-6 mt-6">
                <h2 className="text-xl font-semibold text-[#3b3b3b] mb-6 flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-[#10ac69]" />
                  Historique des connexions
                </h2>
                
                {loginHistoryLoading ? (
                  <div className="text-center py-4">
                    <div className="text-gray-500">Chargement...</div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {loginHistory.map((session) => (
                      <div key={session.id} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex-1">
                            <div className="font-medium text-sm text-[#3b3b3b]">
                              Session {session.id === 'current' ? 'actuelle' : session.id}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              session.status === 'active' 
                                ? 'text-green-600 bg-green-100' 
                                : 'text-gray-600 bg-gray-100'
                            }`}>
                              {session.status === 'active' ? 'Actif' : 'Expiré'}
                            </span>
                            {session.status !== 'active' && (
                              <Button
                                onClick={() => revokeSession(session.id)}
                                variant="outline"
                                size="sm"
                                className="text-red-600 border-red-300 hover:bg-red-50 text-xs"
                              >
                                Révoquer
                              </Button>
                            )}
                          </div>
                        </div>
                                                 <div className="text-xs text-gray-500">
                           <div>Connexion: {formatDate(session.timestamp)}</div>
                           {session.timestamp && (
                             <div className="text-xs text-gray-400">
                               Raw: {session.timestamp}
                             </div>
                           )}
                         </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>

       {/* Logout Confirmation Modal */}
       {showLogoutConfirm && (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
           <div className="bg-white rounded-lg p-6 max-w-md mx-4">
             <h3 className="text-lg font-semibold text-[#3b3b3b] mb-4">
               Confirmer la déconnexion
             </h3>
             <p className="text-gray-600 mb-6">
               Êtes-vous sûr de vouloir vous déconnecter de tous les appareils ? 
               Cette action fermera toutes vos sessions actives.
             </p>
             <div className="flex space-x-3">
               <Button
                 onClick={confirmLogoutFromAllDevices}
                 variant="outline"
                 className="flex-1 text-red-600 border-red-300 hover:bg-red-50"
               >
                 Confirmer
               </Button>
               <Button
                 onClick={() => setShowLogoutConfirm(false)}
                 className="flex-1"
               >
                 Annuler
               </Button>
             </div>
           </div>
         </div>
       )}
     </div>
   );
 };
