import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { useQuiz } from '../../contexts/QuizContext';
import { 
  BookOpen, 
  Clock, 
  Trash2, 
  AlertTriangle,
  Eye,
  EyeOff
} from 'lucide-react';

export const QuizManager: React.FC = () => {
  const { quizzes, deleteQuiz, deleteAllQuizzes } = useQuiz();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [showDeleteAllConfirm, setShowDeleteAllConfirm] = useState(false);
  const [expandedQuiz, setExpandedQuiz] = useState<string | null>(null);

  const handleDeleteQuiz = (quizId: string) => {
    deleteQuiz(quizId);
    setShowDeleteConfirm(null);
  };

  const handleDeleteAll = () => {
    deleteAllQuizzes();
    setShowDeleteAllConfirm(false);
  };

  const chapterQuizzes = quizzes.filter(quiz => quiz.type === 'quiz');
  const practiceExams = quizzes.filter(quiz => quiz.type === 'exam');

  return (
    <div className="space-y-6">
      {/* Header avec actions globales */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-[#3b3b3b]">
            Gestion des Quiz et Examens
          </h3>
          {quizzes.length > 0 && (
            <Button
              variant="outline"
              onClick={() => setShowDeleteAllConfirm(true)}
              className="text-red-600 border-red-300 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Tout supprimer
            </Button>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-[#10ac69]">
              {chapterQuizzes.length}
            </div>
            <div className="text-gray-600">Quiz par chapitre</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-[#10ac69]">
              {practiceExams.length}
            </div>
            <div className="text-gray-600">Examens pratiques</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-[#10ac69]">
              {quizzes.reduce((total, quiz) => total + quiz.questions.length, 0)}
            </div>
            <div className="text-gray-600">Questions totales</div>
          </div>
        </div>
      </Card>

      {/* Quiz par chapitre */}
      {chapterQuizzes.length > 0 && (
        <Card>
          <h4 className="font-semibold text-[#3b3b3b] mb-4">Quiz par chapitre</h4>
          <div className="space-y-3">
            {chapterQuizzes.map((quiz) => (
              <div key={quiz.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <BookOpen className="h-6 w-6 text-[#10ac69]" />
                    <div>
                      <h5 className="font-medium text-[#3b3b3b]">{quiz.title}</h5>
                      <p className="text-sm text-gray-500">
                        {quiz.questions.length} questions • Chapitre {quiz.chapter}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setExpandedQuiz(
                        expandedQuiz === quiz.id ? null : quiz.id
                      )}
                    >
                      {expandedQuiz === quiz.id ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowDeleteConfirm(quiz.id)}
                      className="text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {/* Questions détaillées */}
                {expandedQuiz === quiz.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h6 className="font-medium text-[#3b3b3b] mb-3">Questions :</h6>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {quiz.questions.slice(0, 5).map((question, index) => (
                        <div key={question.id} className="text-sm bg-gray-50 p-2 rounded">
                          <strong>Q{index + 1}:</strong> {question.question.substring(0, 100)}
                          {question.question.length > 100 && '...'}
                        </div>
                      ))}
                      {quiz.questions.length > 5 && (
                        <div className="text-sm text-gray-500 italic">
                          ... et {quiz.questions.length - 5} autres questions
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Examens pratiques */}
      {practiceExams.length > 0 && (
        <Card>
          <h4 className="font-semibold text-[#3b3b3b] mb-4">Examens pratiques</h4>
          <div className="space-y-3">
            {practiceExams.map((exam) => (
              <div key={exam.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-6 w-6 text-[#10ac69]" />
                    <div>
                      <h5 className="font-medium text-[#3b3b3b]">{exam.title}</h5>
                      <p className="text-sm text-gray-500">
                        {exam.questions.length} questions • {exam.timeLimit} minutes
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setExpandedQuiz(
                        expandedQuiz === exam.id ? null : exam.id
                      )}
                    >
                      {expandedQuiz === exam.id ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowDeleteConfirm(exam.id)}
                      className="text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {/* Questions détaillées */}
                {expandedQuiz === exam.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h6 className="font-medium text-[#3b3b3b] mb-3">Questions :</h6>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {exam.questions.slice(0, 5).map((question, index) => (
                        <div key={question.id} className="text-sm bg-gray-50 p-2 rounded">
                          <strong>Q{index + 1}:</strong> {question.question.substring(0, 100)}
                          {question.question.length > 100 && '...'}
                        </div>
                      ))}
                      {exam.questions.length > 5 && (
                        <div className="text-sm text-gray-500 italic">
                          ... et {exam.questions.length - 5} autres questions
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Message si aucun quiz */}
      {quizzes.length === 0 && (
        <Card className="text-center py-12">
          <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-500 mb-2">
            Aucun quiz importé
          </h3>
          <p className="text-gray-400">
            Importez des questions via les onglets ci-dessus pour créer des quiz.
          </p>
        </Card>
      )}

      {/* Modal de confirmation - Supprimer un quiz */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="max-w-md w-full mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="h-6 w-6 text-red-500" />
              <h3 className="text-lg font-semibold text-[#3b3b3b]">
                Confirmer la suppression
              </h3>
            </div>
            <p className="text-gray-600 mb-6">
              Êtes-vous sûr de vouloir supprimer ce quiz ? Cette action est irréversible 
              et supprimera également toutes les questions et résultats associés.
            </p>
            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(null)}
              >
                Annuler
              </Button>
              <Button
                onClick={() => handleDeleteQuiz(showDeleteConfirm)}
                className="bg-red-600 hover:bg-red-700"
              >
                Supprimer
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Modal de confirmation - Supprimer tout */}
      {showDeleteAllConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="max-w-md w-full mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="h-6 w-6 text-red-500" />
              <h3 className="text-lg font-semibold text-[#3b3b3b]">
                Supprimer tous les quiz
              </h3>
            </div>
            <p className="text-gray-600 mb-6">
              Êtes-vous sûr de vouloir supprimer TOUS les quiz et examens ? 
              Cette action supprimera définitivement toutes les questions, quiz et résultats.
            </p>
            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowDeleteAllConfirm(false)}
              >
                Annuler
              </Button>
              <Button
                onClick={handleDeleteAll}
                className="bg-red-600 hover:bg-red-700"
              >
                Tout supprimer
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};