import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useQuiz } from '../contexts/QuizContext';
import { Clock, Trophy, ArrowRight, AlertCircle } from 'lucide-react';

export const PracticeExamsPage: React.FC = () => {
  const { quizzes } = useQuiz();
  const practiceExams = quizzes.filter(quiz => quiz.type === 'exam');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#3b3b3b] mb-2">Examens pratiques</h1>
          <p className="text-gray-600">Simulez l'expérience d'examen FIC réel avec des conditions chronométrées</p>
        </div>

        {/* Info Banner */}
        <Card className="mb-8 bg-blue-50 border-blue-200">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Conditions d'examen réel</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Durée : 3 heures (180 minutes)</li>
                <li>• Questions mélangées de tous les chapitres</li>
                <li>• Chronométrage strict - l'examen se termine automatiquement</li>
                <li>• Résultats détaillés avec explications</li>
              </ul>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Practice Exams */}
          <div className="lg:col-span-2">
            {practiceExams.length === 0 ? (
              <Card className="text-center py-12">
                <Clock className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-500 mb-2">Aucun examen pratique disponible</h3>
                <p className="text-gray-400 mb-4">
                  Importez des questions d'examen via la page d'administration.
                </p>
                <Link to="/admin">
                  <Button>Aller à l'administration</Button>
                </Link>
              </Card>
            ) : (
            <div className="grid grid-cols-1 gap-6">
              {practiceExams.map((exam) => (
                <Card key={exam.id} hover>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Clock className="h-8 w-8 text-[#10ac69]" />
                      <div>
                        <h3 className="font-semibold text-[#3b3b3b] text-lg">{exam.title}</h3>
                        <p className="text-sm text-gray-500">Examen complet - Tous les chapitres</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#3b3b3b]">{exam.questions.length}</div>
                      <div className="text-sm text-gray-600">Questions</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#3b3b3b]">{exam.timeLimit}</div>
                      <div className="text-sm text-gray-600">Minutes</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#10ac69]">78%</div>
                      <div className="text-sm text-gray-600">Meilleur score</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#3b3b3b]">3</div>
                      <div className="text-sm text-gray-600">Tentatives</div>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 p-4 rounded-lg mb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertCircle className="h-5 w-5 text-yellow-600" />
                      <span className="font-medium text-yellow-800">Conditions d'examen</span>
                    </div>
                    <p className="text-sm text-yellow-700">
                      Cet examen simule les conditions réelles. Une fois commencé, vous ne pourrez pas 
                      mettre en pause. Assurez-vous d'avoir 3 heures disponibles.
                    </p>
                  </div>
                  
                  <Link to={`/quiz/${exam.id}`}>
                    <Button className="w-full" size="lg">
                      Commencer l'examen pratique
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </Card>
              ))}
            </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Performance Stats */}
            <Card>
              <h3 className="font-semibold text-[#3b3b3b] mb-4">Vos performances</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Score moyen</span>
                  <span className="font-semibold text-[#10ac69]">78%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Meilleur score</span>
                  <span className="font-semibold text-[#10ac69]">85%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Examens complétés</span>
                  <span className="font-semibold text-[#3b3b3b]">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Temps moyen</span>
                  <span className="font-semibold text-[#3b3b3b]">2h 45min</span>
                </div>
              </div>
            </Card>

            {/* Tips */}
            <Card>
              <h3 className="font-semibold text-[#3b3b3b] mb-4">Conseils pour l'examen</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Lisez attentivement chaque question</li>
                <li>• Gérez votre temps : ~1 minute par question</li>
                <li>• Répondez d'abord aux questions faciles</li>
                <li>• Révisez vos réponses si le temps le permet</li>
                <li>• Restez calme et concentré</li>
              </ul>
            </Card>

            {/* Recent Results */}
            <Card>
              <h3 className="font-semibold text-[#3b3b3b] mb-4">Résultats récents</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div>
                    <div className="font-medium text-sm text-[#3b3b3b]">Examen pratique 1</div>
                    <div className="text-xs text-gray-500">Il y a 2 jours</div>
                  </div>
                  <div className="text-sm font-medium text-[#10ac69]">85%</div>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div>
                    <div className="font-medium text-sm text-[#3b3b3b]">Examen pratique 1</div>
                    <div className="text-xs text-gray-500">Il y a 1 semaine</div>
                  </div>
                  <div className="text-sm font-medium text-[#10ac69]">78%</div>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <div className="font-medium text-sm text-[#3b3b3b]">Examen pratique 1</div>
                    <div className="text-xs text-gray-500">Il y a 2 semaines</div>
                  </div>
                  <div className="text-sm font-medium text-[#10ac69]">72%</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};