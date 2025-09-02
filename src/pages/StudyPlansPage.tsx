import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { studyPlans } from '../data/studyContent';
import { downloadStudyPlanPDF } from '../utils/pdfGenerator';
import { 
  Calendar, 
  Clock, 
  Download, 
  Play, 
  CheckCircle,
  BookOpen,
  Target,
  TrendingUp,
  ChevronDown,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';

export const StudyPlansPage: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<6 | 8 | 12>(8);
  const [expandedComponents, setExpandedComponents] = useState<Record<string, boolean>>({});

  const currentPlan = studyPlans[selectedPlan];

  const handleDownloadPDF = async () => {
    await downloadStudyPlanPDF(currentPlan);
  };

  const toggleComponent = (component: string) => {
    setExpandedComponents(prev => ({
      ...prev,
      [component]: !prev[component]
    }));
  };

  // Function to render tasks with proper formatting for nested items
  const renderTasks = (tasks: string[]) => {
    return tasks.map((task, index) => {
      // Check if task contains nested items (has \n    •)
      if (task.includes('\n    • ')) {
        const [mainTask, ...nestedTasks] = task.split('\n    • ');
        return (
          <li key={index} className="mb-2">
            <span className="text-gray-700" dangerouslySetInnerHTML={{ __html: mainTask }}></span>
            <ul className="mt-1 ml-6 space-y-1">
              {nestedTasks.map((nestedTask, nestedIndex) => (
                <li key={nestedIndex} className="text-sm text-gray-600 flex items-start">
                  <span className="text-[#10ac69] mr-2 mt-1">•</span>
                  <span dangerouslySetInnerHTML={{ __html: nestedTask }}></span>
                </li>
              ))}
            </ul>
          </li>
        );
      } else {
        return (
          <li key={index} className="text-gray-700 mb-1" dangerouslySetInnerHTML={{ __html: task }}>
          </li>
        );
      }
    });
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
          <h1 className="text-3xl font-bold text-[#3b3b3b] mb-2">Plans d'étude</h1>
          <p className="text-gray-600">
            Organisez votre préparation à l'examen FIC® avec nos plans d'étude structurés
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
                  const plan = studyPlans[weeks as 6|8|12];
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
              <div className="mb-6">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-[#3b3b3b] mb-2">
                    {currentPlan?.title || ''}
                  </h3>
                  <p className="text-gray-600">{currentPlan?.description}</p>
                </div>
                <div className="flex justify-center sm:justify-end">
                  <Button onClick={handleDownloadPDF}>
                    <Download className="h-4 w-4 mr-2" />
                    Télécharger PDF
                  </Button>
                </div>
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
                    <div className="mb-2">
                      {/* Week number and chapter info - stacked on mobile */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mb-3 sm:mb-0">
                        <div className="flex items-center space-x-3 mb-2 sm:mb-0">
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
                      </div>
                      
                      {/* Hours - right-aligned on desktop, left-aligned on mobile */}
                      <div className="flex justify-start sm:justify-end">
                        <div className="text-sm text-[#10ac69] font-medium bg-green-50 px-2 py-1 rounded-full">
                          {week.hours}
                        </div>
                      </div>
                    </div>
                    {week.tasks?.length ? (
                      <ul className="mt-2 text-sm text-gray-700 list-disc ml-6 space-y-1">
                        {renderTasks(week.tasks)}
                      </ul>
                    ) : null}
                  </div>
                ))}
              </div>
            </Card>

            {/* How to Succeed Section */}
            <Card className="mb-8">
              <h3 className="text-xl font-semibold text-[#3b3b3b] mb-4">Comment réussir l'examen FIC® ?</h3>
              <p className="text-md text-gray-700 mb-3">Bien qu'il existe de nombreuses méthodes pour se préparer à un examen, certaines composantes de votre préparation sont essentielles.</p>
              <p className="text-md text-gray-700 mb-3">Voici les ingrédients clés de toute préparation efficace au FIC®.</p>
              <ul className="text-gray-700 space-y-2 ml-7 mb-3">
                <li>1. Lecture du manuel</li>
                <li>2. Étude contextuelle approfondie</li>
                <li>3. Répétition espacée</li>
                <li>4. Questions pratiques</li>
              </ul>
              <p className="text-md text-gray-700 mb-3">Il existe d'autres outils comme la prise de notes, la retranscription, ou l'enseignement qui peuvent être efficaces mais les 4 ingrédients mentionnés ci-haut constituent la base de votre régime d'étude.</p>
              
              <h4 className="font-semibold text-[#3b3b3b] mb-3 flex items-center">Composantes du plan d'étude</h4>
              <p className="text-md text-gray-700 mb-3">Le plan d'étude est conçu pour vous aider à réussir l'examen FIC®. Il est basé sur les composantes essentielles de toute préparation efficace au FIC®.</p>
              <p className="text-md text-gray-700 mb-3">Voici quelques explications sur ces composantes :</p>
              
              {/* Accordion Components */}
              <div className="space-y-3">
                {/* Lecture du manuel */}
                <div className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => toggleComponent('lecture')}
                    className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50"
                  >
                    <span className="font-semibold text-[#3b3b3b]">Lecture du manuel</span>
                    {expandedComponents['lecture'] ? (
                      <ChevronDown className="h-5 w-5 text-[#10ac69]" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-[#10ac69]" />
                    )}
                  </button>
                  {expandedComponents['lecture'] && (
                    <div className="px-4 pb-4">
                      <p className="text-md text-gray-700 mb-3">Il y a deux types de lecture: la lecture rapide et la lecture approfondie.</p>
                      <p className="text-md text-gray-700 mb-3">La lecture rapide est ce qu'on appelle souvent la "lecture en diagonale" ou vous lisez rapidement les titres et sections pour avoir une idée générale de quoi le chapitre parle et du niveau de difficulté et votre niveau de familiarité avec les concepts. Il s'agit d'une technique simple qui permet de préparer le cerveau à la matière. Ça donne aussi une idée de l'étendue du chapitre.</p>
                      <p className="text-md text-gray-700 mb-3">Lorsque vous faite votre lecture rapide, essayez de repérer les sujets que vous connaissez déjà et les sujets propice à un "deep dive"</p>
                      <p className="text-md text-gray-700 mb-3">La seconde lecture est la lecture approfondie. Vous prenez votre temps pour prendre des notes et rechercher le vocabulaire que vous ne comprenez pas. Si vous voulez relire le chapitre 2 fois vous pouvez également. Nous recommandons ici de porter une attention particulière aux détails tels que les encadrés "le saviez-vous" ainsi que les statistiques, données historiques ou exemples pratiques qui ressortent souvent à l'examen.</p>
                    </div>
                  )}
                </div>

                {/* Deep dive */}
                <div className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => toggleComponent('deepdive')}
                    className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50"
                  >
                    <span className="font-semibold text-[#3b3b3b]">Deep dive</span>
                    {expandedComponents['deepdive'] ? (
                      <ChevronDown className="h-5 w-5 text-[#10ac69]" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-[#10ac69]" />
                    )}
                  </button>
                  {expandedComponents['deepdive'] && (
                    <div className="px-4 pb-4">
                      <p className="text-md text-gray-700 mb-3">C'est une recherche en profondeur sur un sujet ou concept précis du manuel. C'est simple, vous ne pouvez pas passer cet examen en vous fiant uniquement au manuel, à moins d'avoir déjà une solide connaissance des marchés financiers. C'est une erreur que beaucoup de gens font: ils basent leur étude seulement sur le livre. C'est pour ça que nous recommandons de choisir quelques sujets à chaque chapitre et de faire des recherches supplémentaires. Pour chercher des informations vous pouvez utiliser ChatGPT, Google, Youtube ou n'importe quel moteur de recherche. Pour avoir des informations additionnelles sur un sujet, nous recommandons de poser des questions.</p>
                      <p className="text-md text-gray-700 mb-3">Le sujet du deep dive doit être un sujet spécifique et non "les obligations" par exemple car c'est trop vague. Un exemple serait plutôt "les actions privilégiées au Canada". Voici quelques exemples de questions pour débuter votre deep dive mais utilisez votre curiosité:</p>
                      <ul className="text-gray-700 space-y-2 ml-7 mb-3">
                        <li>- Comment fonctionnent les actions privilégiées ?</li>
                        <li>- L'histoire ou l'évolution des actions privilégiées au Canada et USA ?</li>
                        <li>- Qui utilise les actions privilégiées et quelles sont les plus populaires ?</li>
                        <li>- Pourquoi les entreprises émettent les actions privilégiées et quel genre de sociétés en émettent ?</li>
                      </ul>
                    </div>
                  )}
                </div>

                {/* Flashcards */}
                <div className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => toggleComponent('flashcards')}
                    className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50"
                  >
                    <span className="font-semibold text-[#3b3b3b]">Flashcards (cartes mémoire)</span>
                    {expandedComponents['flashcards'] ? (
                      <ChevronDown className="h-5 w-5 text-[#10ac69]" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-[#10ac69]" />
                    )}
                  </button>
                  {expandedComponents['flashcards'] && (
                    <div className="px-4 pb-4">
                      <p className="text-md text-gray-700 mb-3">Il s'agit soit des flashcards que nous offrons ou encore des flashcards en carton que vous créez vous même. C'est la technique qui est probablement la plus efficace pour pratiquer votre répétition espacée.</p>
                    </div>
                  )}
                </div>

                {/* Quiz et examens pratique */}
                <div className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => toggleComponent('quiz')}
                    className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50"
                  >
                    <span className="font-semibold text-[#3b3b3b]">Quiz et examens pratique</span>
                    {expandedComponents['quiz'] ? (
                      <ChevronDown className="h-5 w-5 text-[#10ac69]" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-[#10ac69]" />
                    )}
                  </button>
                  {expandedComponents['quiz'] && (
                    <div className="px-4 pb-4">
                      <p className="text-md text-gray-700 mb-3">Les quiz et examens pratique sont un moyen efficace de tester vos connaissances et de vous préparer à l'examen. Ils vous permettent de repérer vos points faibles et de les corriger.</p>
                    </div>
                  )}
                </div>
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
                  <div style={{padding:'56.25% 0 0 0',position:'relative'}}>
                    <iframe 
                      src="https://player.vimeo.com/video/742803331?h=6ee185c7af&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" 
                      frameBorder="0" 
                      allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
                      referrerPolicy="strict-origin-when-cross-origin" 
                      style={{position:'absolute',top:0,left:0,width:'100%',height:'100%'}} 
                      title="Stratégies &amp; Tactiques - FIC"
                    ></iframe>
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
                    <li>• Révisez de façon aléatoire au lieu de réviser les chapitres dans l'ordre</li>
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
                  <div className="text-2xl font-bold text-[#10ac69]">92%</div>
                  <div className="text-sm text-gray-600">Taux de réussite</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-[#10ac69]">45%</div>
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