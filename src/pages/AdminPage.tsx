import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { CSVImport } from '../components/admin/CSVImport';
import { StudyContentManager } from '../components/admin/StudyContentManager';
import { QuizManager } from '../components/admin/QuizManager';
import { FlashcardManager } from '../components/admin/FlashcardManager';
import { CouponManager } from '../components/admin/CouponManager';
import { useQuiz } from '../contexts/QuizContext';
import { useFlashcard } from '../contexts/FlashcardContext';
import { Question, Flashcard } from '../types';
import { 
  Upload, 
  BookOpen, 
  Brain, 
  Database,
  FileText,
  BarChart3,
  Settings,
  Tag
} from 'lucide-react';

export const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'questions' | 'flashcards' | 'manage-quiz' | 'manage-flashcards' | 'coupons' | 'study-content' | 'stats'>('questions');
  const { user } = useAuth();
  const { questions, addQuestions } = useQuiz();
  const { flashcards, addFlashcards } = useFlashcard();

  const handleQuestionsImport = (data: Question[] | Flashcard[]) => {
    console.log('Handling questions import:', data);
    addQuestions(data as Question[]);
  };

  const handleFlashcardsImport = (data: Question[] | Flashcard[]) => {
    addFlashcards(data as Flashcard[]);
    console.log('Flashcards importées:', data);
  };

  const tabs = [
    { id: 'questions', label: 'Questions', icon: BookOpen },
    { id: 'flashcards', label: 'Cartes mémoire', icon: Brain },
    { id: 'manage-quiz', label: 'Gérer Quiz', icon: Settings },
    { id: 'manage-flashcards', label: 'Gérer Cartes', icon: Brain },
    { id: 'coupons', label: 'Coupons', icon: Tag },
    { id: 'study-content', label: 'Notes & Plans', icon: FileText },
    { id: 'stats', label: 'Statistiques', icon: BarChart3 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#3b3b3b] mb-2">
            Administration - Le Dojo Financier
          </h1>
          <p className="text-gray-600">
            Gérez le contenu et les données de la plateforme
          </p>
        </div>

        {/* Navigation Tabs */}
        <Card className="mb-8">
          <div className="flex space-x-1">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'primary' : 'ghost'}
                onClick={() => setActiveTab(tab.id as any)}
                className="flex items-center space-x-2"
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </Button>
            ))}
          </div>
        </Card>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'questions' && (
              <CSVImport
                type="questions"
                onImportComplete={handleQuestionsImport}
              />
            )}
            
            {activeTab === 'flashcards' && (
              <CSVImport
                type="flashcards"
                onImportComplete={handleFlashcardsImport}
              />
            )}
            
            {activeTab === 'manage-quiz' && (
              <QuizManager />
            )}
            
            {activeTab === 'manage-flashcards' && (
              <FlashcardManager />
            )}
            
            {activeTab === 'coupons' && (
              <CouponManager />
            )}
            
            {activeTab === 'stats' && (
              <Card>
                <h3 className="text-lg font-semibold text-[#3b3b3b] mb-4">
                  Statistiques de la plateforme
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-[#10ac69]">
                      {questions.length}
                    </div>
                    <div className="text-gray-600">Questions importées</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-[#10ac69]">
                      {flashcards.length}
                    </div>
                    <div className="text-gray-600">Cartes mémoire importées</div>
                  </div>
                </div>
              </Card>
            )}

            {activeTab === 'study-content' && (
              <StudyContentManager />
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <h3 className="font-semibold text-[#3b3b3b] mb-4">Aperçu rapide</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Database className="h-4 w-4 text-[#10ac69]" />
                    <span className="text-sm text-gray-600">Questions</span>
                  </div>
                  <span className="font-medium text-[#3b3b3b]">
                    {questions.length}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Brain className="h-4 w-4 text-[#10ac69]" />
                    <span className="text-sm text-gray-600">Flashcards</span>
                  </div>
                  <span className="font-medium text-[#3b3b3b]">
                    {flashcards.length}
                  </span>
                </div>
              </div>
            </Card>

            {/* Recent Imports */}
            <Card>
              <h3 className="font-semibold text-[#3b3b3b] mb-4">Imports récents</h3>
              <div className="space-y-2 text-sm text-gray-600">
                {questions.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <Upload className="h-4 w-4 text-green-500" />
                    <span>{questions.length} questions importées</span>
                  </div>
                )}
                {flashcards.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <Upload className="h-4 w-4 text-green-500" />
                    <span>{flashcards.length} flashcards importées</span>
                  </div>
                )}
                {questions.length === 0 && flashcards.length === 0 && (
                  <p className="text-gray-500 italic">Aucun import récent</p>
                )}
              </div>
            </Card>

            {/* Help */}
            <Card>
              <h3 className="font-semibold text-[#3b3b3b] mb-4">Aide</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-start space-x-2">
                  <FileText className="h-4 w-4 text-[#10ac69] mt-0.5" />
                  <div>
                    <p className="font-medium">Format CSV</p>
                    <p>Utilisez les modèles fournis pour un import réussi</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};