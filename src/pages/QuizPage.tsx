import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useQuiz } from '../contexts/QuizContext';
import { QuizResult } from '../types';
import { Clock, CheckCircle, XCircle, ArrowRight, ArrowLeft } from 'lucide-react';

export const QuizPage: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const { quizzes, addQuizResult } = useQuiz();
  
  const quiz = quizzes.find(q => q.id === quizId);
  const storageKey = `df_quiz_state_${quizId}`;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [startTime, setStartTime] = useState<number>(Date.now());

  // Restore state from localStorage if available
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const saved = JSON.parse(raw) as {
          currentQuestionIndex: number;
          selectedAnswers: Record<number, number>;
          startTime: number;
        };
        setCurrentQuestionIndex(saved.currentQuestionIndex || 0);
        setSelectedAnswers(saved.selectedAnswers || {});
        setStartTime(saved.startTime || Date.now());
      } else {
        setStartTime(Date.now());
      }
    } catch {
      setStartTime(Date.now());
    }
  }, [quizId]);

  // Initialize timer for exams
  useEffect(() => {
    if (quiz?.timeLimit && quiz.type === 'exam') {
      // Compute remaining time based on startTime
      const total = quiz.timeLimit * 60;
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const remaining = Math.max(0, total - elapsed);
      setTimeRemaining(remaining);
      setIsTimerActive(remaining > 0);
    }
  }, [quiz, startTime]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isTimerActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(time => {
          if (time <= 1) {
            setIsTimerActive(false);
            handleSubmitQuiz();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isTimerActive, timeRemaining]);

  if (!quiz) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center py-12">
            <h2 className="text-2xl font-bold text-[#3b3b3b] mb-4">Quiz introuvable</h2>
            <Button onClick={() => navigate('/quizzes')}>
              Retour aux quiz
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers(prev => {
      const next = { ...prev, [currentQuestionIndex]: answerIndex };
      // Persist to localStorage
      try {
        localStorage.setItem(storageKey, JSON.stringify({
          currentQuestionIndex,
          selectedAnswers: next,
          startTime,
        }));
      } catch {}
      return next;
    });
  };

  const handleNextQuestion = () => {
    if (!isLastQuestion) {
      setCurrentQuestionIndex(prev => {
        const idx = prev + 1;
        try {
          localStorage.setItem(storageKey, JSON.stringify({
            currentQuestionIndex: idx,
            selectedAnswers,
            startTime,
          }));
        } catch {}
        return idx;
      });
    }
  };

  const handlePreviousQuestion = () => {
    if (!isFirstQuestion) {
      setCurrentQuestionIndex(prev => {
        const idx = prev - 1;
        try {
          localStorage.setItem(storageKey, JSON.stringify({
            currentQuestionIndex: idx,
            selectedAnswers,
            startTime,
          }));
        } catch {}
        return idx;
      });
    }
  };

  const handleSubmitQuiz = () => {
    setIsTimerActive(false);
    
    // Calculer le score et le temps
    const score = calculateScore();
    const timeSpent = Math.round((Date.now() - startTime) / 1000); // en secondes
    const correctAnswers = quiz!.questions.filter((_, index) => 
      selectedAnswers[index] === quiz!.questions[index].correctAnswer
    ).length;

    // Sauvegarder le résultat
    const result: QuizResult = {
      id: `result-${Date.now()}`,
      quizId: quiz!.id,
      userId: 'current-user', // TODO: Utiliser l'ID utilisateur réel
      score,
      totalQuestions: quiz!.questions.length,
      completedAt: new Date(),
      timeSpent
    };

    addQuizResult(result);
    setShowResults(true);
    // Clear saved state on completion
    try { localStorage.removeItem(storageKey); } catch {}
  };

  const calculateScore = () => {
    let correct = 0;
    quiz.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / quiz.questions.length) * 100);
  };

  if (showResults) {
    const score = calculateScore();
    const correctAnswers = quiz.questions.filter((_, index) => 
      selectedAnswers[index] === quiz.questions[index].correctAnswer
    ).length;

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center py-12">
            <div className="mb-6">
              {score >= 70 ? (
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              ) : (
                <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              )}
              <h2 className="text-3xl font-bold text-[#3b3b3b] mb-2">
                Quiz terminé !
              </h2>
              <p className="text-xl text-gray-600">
                Votre score : <span className="font-bold text-[#10ac69]">{score}%</span>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#3b3b3b]">{correctAnswers}</div>
                <div className="text-gray-600">Réponses correctes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#3b3b3b]">{quiz.questions.length - correctAnswers}</div>
                <div className="text-gray-600">Réponses incorrectes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#3b3b3b]">{quiz.questions.length}</div>
                <div className="text-gray-600">Total des questions</div>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <Button onClick={() => window.location.reload()}>
                Reprendre le quiz
              </Button>
              <Button variant="outline" onClick={() => navigate('/quizzes')}>
                Retour aux quiz
              </Button>
            </div>
          </Card>

          {/* Review Answers */}
          <Card className="mt-8">
            <h3 className="text-xl font-bold text-[#3b3b3b] mb-6">Révision des réponses</h3>
            <div className="space-y-6">
              {quiz.questions.map((question, index) => {
                const userAnswer = selectedAnswers[index];
                const isCorrect = userAnswer === question.correctAnswer;
                
                return (
                  <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                    <div className="flex items-start space-x-3 mb-4">
                      {isCorrect ? (
                        <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                      ) : (
                        <XCircle className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
                      )}
                      <div className="flex-1">
                        <h4 className="font-medium text-[#3b3b3b] mb-2">
                          Question {index + 1} : {question.question}
                        </h4>
                        <div className="space-y-2">
                          {question.options.map((option, optionIndex) => (
                            <div
                              key={optionIndex}
                              className={`p-2 rounded ${
                                optionIndex === question.correctAnswer
                                  ? 'bg-green-100 border border-green-300'
                                  : optionIndex === userAnswer && !isCorrect
                                  ? 'bg-red-100 border border-red-300'
                                  : 'bg-gray-50'
                              }`}
                            >
                              {option}
                              {optionIndex === question.correctAnswer && (
                                <span className="ml-2 text-green-600 font-medium">(Correct)</span>
                              )}
                              {optionIndex === userAnswer && !isCorrect && (
                                <span className="ml-2 text-red-600 font-medium">(Votre réponse)</span>
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 p-3 bg-blue-50 rounded">
                          <p className="text-sm text-gray-700">
                            <strong>Explication :</strong> {question.explanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Card className="mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold text-[#3b3b3b]">{quiz.title}</h1>
              <p className="text-gray-600">
                Question {currentQuestionIndex + 1} sur {quiz.questions.length}
              </p>
            </div>
            {quiz.timeLimit && quiz.type === 'exam' && (
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-[#10ac69]" />
                <span className={`font-mono text-lg ${timeRemaining < 300 ? 'text-red-600' : 'text-[#3b3b3b]'}`}>
                  {formatTime(timeRemaining)}
                </span>
              </div>
            )}
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-[#10ac69] h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
              />
            </div>
          </div>
        </Card>

        {/* Question */}
        <Card className="mb-6">
          <h2 className="text-xl font-semibold text-[#3b3b3b] mb-6">
            {currentQuestion.question}
          </h2>
          
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <label
                key={index}
                className={`block p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedAnswers[currentQuestionIndex] === index
                    ? 'border-[#10ac69] bg-green-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name={`question-${currentQuestionIndex}`}
                  value={index}
                  checked={selectedAnswers[currentQuestionIndex] === index}
                  onChange={() => handleAnswerSelect(index)}
                  className="sr-only"
                />
                <span className="text-[#3b3b3b]">{option}</span>
              </label>
            ))}
          </div>
        </Card>

        {/* Navigation */}
        <Card>
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={handlePreviousQuestion}
              disabled={isFirstQuestion}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Précédent
            </Button>

            <div className="text-sm text-gray-600">
              {Object.keys(selectedAnswers).length} sur {quiz.questions.length} répondues
            </div>

            {isLastQuestion ? (
              <Button
                onClick={handleSubmitQuiz}
                disabled={Object.keys(selectedAnswers).length === 0}
              >
                Soumettre le quiz
              </Button>
            ) : (
              <Button
                onClick={handleNextQuestion}
                disabled={selectedAnswers[currentQuestionIndex] === undefined}
              >
                Suivant
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};