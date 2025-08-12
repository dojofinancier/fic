import React, { useEffect, useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { supabase } from '../lib/supabase';
import { 
  Calendar, 
  Clock, 
  Download, 
  Play, 
  CheckCircle,
  BookOpen,
  Target,
  TrendingUp
} from 'lucide-react';

export const StudyPlansPage: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<6 | 8 | 12>(8);
  const [plans, setPlans] = useState<Record<6|8|12, { id: string; title: string; description?: string; totalHours?: string; dailyCommitment?: string; pdfUrl?: string; schedule: { week: number; chapters: string; focus?: string; hours?: string; tasks: string[] }[] }>>({} as any);

  useEffect(() => {
    const load = async () => {
      const { data: plansData } = await supabase.from('study_plans').select('*');
      const result: any = {};
      for (const p of plansData || []) {
        const { data: weeksData } = await supabase
          .from('study_plan_weeks')
          .select('*')
          .eq('plan_id', p.id)
          .order('week_number');
        result[p.weeks] = {
          id: p.id,
          title: p.title,
          description: p.description ?? undefined,
          totalHours: p.total_hours ?? undefined,
          dailyCommitment: p.daily_commitment ?? undefined,
          pdfUrl: p.pdf_path ? supabase.storage.from('study-assets').getPublicUrl(p.pdf_path).data.publicUrl : undefined,
          schedule: (weeksData || []).map((w: any) => ({
            week: w.week_number,
            chapters: w.chapters,
            focus: w.focus ?? undefined,
            hours: w.hours ?? undefined,
            tasks: w.tasks || [],
          }))
        };
      }
      setPlans(result);
    };
    load();
  }, []);

  const currentPlan = plans[selectedPlan];

  // PDF download is provided via stored url when available

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#3b3b3b] mb-2">Plans d'étude</h1>
          <p className="text-gray-600">
            Organisez votre préparation à l'examen FIC avec nos plans d'étude structurés
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Plan Selection */}
          <div className="lg:col-span-3">
            {/* Plan Selector */}
            <Card className="mb-8">
              <h2 className="text-xl font-semibold text-[#3b3b3b] mb-6">
                Choisissez votre plan d'étude
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[6,8,12].map((weeks) => {
                  const plan = plans[weeks as 6|8|12];
                  return (
                    <button
                      key={weeks}
                      onClick={() => setSelectedPlan(weeks as 6 | 8 | 12)}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                        selectedPlan === (weeks as 6|8|12)
                          ? 'border-[#10ac69] bg-green-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <Calendar className="h-5 w-5 text-[#10ac69]" />
                        <span className="font-semibold text-[#3b3b3b]">{weeks} semaines</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{plan?.description || 'Plan d\'étude'}</p>
                      <div className="text-xs text-gray-500">
                        {plan?.dailyCommitment || '-'} • {plan?.totalHours || '-'}
                      </div>
                    </button>
                  );
                })}
              </div>
            </Card>

            {/* Selected Plan Details */}
            <Card className="mb-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-[#3b3b3b] mb-2">
                    {currentPlan?.title || ''}
                  </h3>
                  <p className="text-gray-600">{currentPlan?.description}</p>
                </div>
                <Button onClick={() => currentPlan?.pdfUrl && (window.location.href = currentPlan.pdfUrl!)}>
                  <Download className="h-4 w-4 mr-2" />
                  Télécharger PDF
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Clock className="h-6 w-6 text-[#10ac69] mx-auto mb-2" />
                  <div className="font-semibold text-[#3b3b3b]">{currentPlan?.totalHours}</div>
                  <div className="text-sm text-gray-600">Total d'étude</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Target className="h-6 w-6 text-[#10ac69] mx-auto mb-2" />
                  <div className="font-semibold text-[#3b3b3b]">{currentPlan?.dailyCommitment}</div>
                  <div className="text-sm text-gray-600">Par jour</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-[#10ac69] mx-auto mb-2" />
                  <div className="font-semibold text-[#3b3b3b]">{selectedPlan} semaines</div>
                  <div className="text-sm text-gray-600">Durée totale</div>
                </div>
              </div>

              {/* Schedule */}
              <div className="space-y-4">
                <h4 className="font-semibold text-[#3b3b3b]">Calendrier détaillé</h4>
                {currentPlan?.schedule?.map((week, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-[#10ac69] text-white rounded-full flex items-center justify-center text-sm font-semibold">
                          {week.week}
                        </div>
                        <div>
                          <div className="font-medium text-[#3b3b3b]">
                            Semaine {week.week} - Chapitres {week.chapters}
                          </div>
                          <div className="text-sm text-gray-600">{week.focus}</div>
                        </div>
                      </div>
                      <div className="text-sm text-[#10ac69] font-medium">{week.hours}</div>
                    </div>
                    {week.tasks?.length ? (
                      <ul className="mt-2 text-sm text-gray-700 list-disc ml-6 space-y-1">
                        {week.tasks.map((t, i) => (
                          <li key={i}>{t}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ))}
              </div>
            </Card>

            {/* Study Strategies */}
            <Card>
              <h3 className="text-xl font-semibold text-[#3b3b3b] mb-6">
                Stratégies et tactiques d'étude
              </h3>
              
              {/* Video Section */}
              <div className="mb-8">
                <div className="bg-gray-900 rounded-lg overflow-hidden mb-4">
                  <div className="aspect-video flex items-center justify-center">
                    <div className="text-center text-white">
                      <Play className="h-16 w-16 mx-auto mb-4 opacity-75" />
                      <p className="text-lg mb-2">Stratégies d'étude pour l'examen FIC</p>
                      <p className="text-sm opacity-75">Vidéo de formation - 15 minutes</p>
                      {/* Remplacez par l'iframe Vimeo réel */}
                      <div className="mt-4">
                        <iframe
                          src="https://player.vimeo.com/video/YOUR_VIDEO_ID"
                          width="100%"
                          height="100%"
                          frameBorder="0"
                          allow="autoplay; fullscreen; picture-in-picture"
                          allowFullScreen
                          title="Stratégies d'étude FIC"
                          className="hidden"
                        ></iframe>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Cette vidéo couvre les meilleures pratiques pour étudier efficacement et maximiser votre temps de préparation.
                </p>
              </div>

              {/* Study Strategies Text */}
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-[#3b3b3b] mb-3 flex items-center">
                    <CheckCircle className="h-5 w-5 text-[#10ac69] mr-2" />
                    Techniques de mémorisation
                  </h4>
                  <ul className="text-gray-700 space-y-2 ml-7">
                    <li>• Utilisez la répétition espacée pour retenir les concepts clés</li>
                    <li>• Créez des associations mentales entre les nouveaux concepts et vos connaissances existantes</li>
                    <li>• Pratiquez la récupération active en vous testant régulièrement</li>
                    <li>• Utilisez les cartes mémoire pour les définitions et formules importantes</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-[#3b3b3b] mb-3 flex items-center">
                    <CheckCircle className="h-5 w-5 text-[#10ac69] mr-2" />
                    Organisation de l'étude
                  </h4>
                  <ul className="text-gray-700 space-y-2 ml-7">
                    <li>• Établissez un horaire d'étude fixe et respectez-le</li>
                    <li>• Alternez entre différents types de matériel (lecture, quiz, vidéos)</li>
                    <li>• Prenez des pauses régulières (technique Pomodoro recommandée)</li>
                    <li>• Créez un environnement d'étude sans distractions</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-[#3b3b3b] mb-3 flex items-center">
                    <CheckCircle className="h-5 w-5 text-[#10ac69] mr-2" />
                    Préparation à l'examen
                  </h4>
                  <ul className="text-gray-700 space-y-2 ml-7">
                    <li>• Complétez au moins 3 examens pratiques complets</li>
                    <li>• Analysez vos erreurs et révisez les concepts mal compris</li>
                    <li>• Pratiquez la gestion du temps avec des sessions chronométrées</li>
                    <li>• Révisez les chapitres les plus importants la semaine précédant l'examen</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-[#3b3b3b] mb-3 flex items-center">
                    <CheckCircle className="h-5 w-5 text-[#10ac69] mr-2" />
                    Conseils pour le jour de l'examen
                  </h4>
                  <ul className="text-gray-700 space-y-2 ml-7">
                    <li>• Arrivez tôt et apportez tous les documents requis</li>
                    <li>• Lisez attentivement chaque question avant de répondre</li>
                    <li>• Gérez votre temps : environ 1 minute par question</li>
                    <li>• Si vous hésitez, éliminez les réponses évidemment incorrectes</li>
                    <li>• Révisez vos réponses si le temps le permet</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <h3 className="font-semibold text-[#3b3b3b] mb-4">Statistiques de réussite</h3>
              <div className="space-y-4">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-[#10ac69]">94%</div>
                  <div className="text-sm text-gray-600">Taux de réussite</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-[#10ac69]">85%</div>
                  <div className="text-sm text-gray-600">Suivent un plan</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-[#10ac69]">8 sem</div>
                  <div className="text-sm text-gray-600">Plan le plus populaire</div>
                </div>
              </div>
            </Card>

            {/* Resources */}
            <Card>
              <h3 className="font-semibold text-[#3b3b3b] mb-4">Ressources complémentaires</h3>
              <div className="space-y-3">
                <a href="/flashcards" className="flex items-center space-x-2 text-[#10ac69] hover:text-[#0e9558]">
                  <BookOpen className="h-4 w-4" />
                  <span className="text-sm">Cartes mémoire</span>
                </a>
                <a href="/quizzes" className="flex items-center space-x-2 text-[#10ac69] hover:text-[#0e9558]">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm">Quiz par chapitre</span>
                </a>
                <a href="/practice-exams" className="flex items-center space-x-2 text-[#10ac69] hover:text-[#0e9558]">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">Examens pratiques</span>
                </a>
              </div>
            </Card>

            {/* Tips */}
            <Card>
              <h3 className="font-semibold text-[#3b3b3b] mb-4">Conseils rapides</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Étudiez à la même heure chaque jour</li>
                <li>• Utilisez plusieurs types de ressources</li>
                <li>• Testez-vous régulièrement</li>
                <li>• Rejoignez un groupe d'étude</li>
                <li>• Restez motivé avec des objectifs courts</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};