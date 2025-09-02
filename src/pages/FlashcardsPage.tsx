import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useFlashcard } from '../contexts/FlashcardContext';
import { Flashcard } from '../types/flashcard';
import { 
  Brain, 
  Shuffle, 
  BookOpen, 
  ArrowRight, 
  ArrowLeft,
  Eye,
  SkipForward,
  RotateCcw
} from 'lucide-react';

export const FlashcardsPage: React.FC = () => {
  const { 
    flashcards, 
    getFlashcardsByChapter,
    getAllFlashcards,
    shuffleArray 
  } = useFlashcard();
  
  const [selectedMode, setSelectedMode] = useState<'chapter' | 'random' | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<number>(1);
  const [currentCards, setCurrentCards] = useState<Flashcard[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [studyStarted, setStudyStarted] = useState(false);

  // Démarrer une session d'étude
  const startStudySession = () => {
    let cards: Flashcard[] = [];
    
    if (selectedMode === 'chapter') {
      cards = getFlashcardsByChapter(selectedChapter);
    } else {
      cards = getAllFlashcards();
    }
    
    // Mélanger les cartes
    const shuffledCards = shuffleArray(cards);
    setCurrentCards(shuffledCards);
    setCurrentCardIndex(0);
    setShowAnswer(false);
    setStudyStarted(true);
  };

  // Carte suivante
  const nextCard = () => {
    if (currentCardIndex < currentCards.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
      setShowAnswer(false);
    }
  };

  // Carte précédente
  const previousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(prev => prev - 1);
      setShowAnswer(false);
    }
  };

  // Passer la question (même que nextCard mais avec intention différente)
  const skipCard = () => {
    nextCard();
  };

  // Recommencer la session
  const restartSession = () => {
    setStudyStarted(false);
    setCurrentCards([]);
    setCurrentCardIndex(0);
    setShowAnswer(false);
  };

  const currentCard = currentCards[currentCardIndex];
  const isLastCard = currentCardIndex === currentCards.length - 1;
  const isFirstCard = currentCardIndex === 0;

  // Grouper les flashcards par chapitre pour l'affichage
  const flashcardsByChapter = flashcards.reduce((acc, card) => {
    if (!acc[card.chapter]) {
      acc[card.chapter] = [];
    }
    acc[card.chapter].push(card);
    return acc;
  }, {} as Record<number, Flashcard[]>);

  const availableChapters = Object.keys(flashcardsByChapter)
    .map(Number)
    .sort((a, b) => a - b);

  if (flashcards.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center py-12">
            <Brain className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-500 mb-2">
              Aucune carte mémoire disponible
            </h3>
            <p className="text-gray-400 mb-4">
              Importez des cartes mémoire via la page d'administration.
            </p>
            <Link to="/admin">
              <Button>Aller à l'administration</Button>
            </Link>
          </Card>
        </div>
      </div>
    );
  }

  // Vue de la session d'étude
  if (studyStarted && currentCard) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header de la session */}
          <Card className="mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-xl font-bold text-[#3b3b3b]">
                  {selectedMode === 'chapter' 
                    ? `Chapitre ${selectedChapter} - Cartes mémoire`
                    : 'Mode aléatoire - Tous les chapitres'
                  }
                </h1>
                <p className="text-gray-600">
                  Carte {currentCardIndex + 1} sur {currentCards.length}
                </p>
              </div>
              <Button variant="outline" onClick={restartSession}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Recommencer
              </Button>
            </div>
            
            {/* Barre de progression */}
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-[#10ac69] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentCardIndex + 1) / currentCards.length) * 100}%` }}
                />
              </div>
            </div>
          </Card>

          {/* Carte actuelle */}
          <Card className="mb-6 min-h-[400px] flex flex-col justify-center">
            <div className="text-center">
              <div className="mb-4">
                <span className="inline-block bg-[#10ac69] text-white px-3 py-1 rounded-full text-sm">
                  Chapitre {currentCard.chapter} • {currentCard.category}
                </span>
              </div>
              
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-[#3b3b3b] mb-6">
                  {currentCard.front}
                </h2>
                
                {showAnswer && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 mt-6">
                    <h3 className="text-lg font-medium text-green-800 mb-2">Réponse :</h3>
                    <p className="text-green-700">{currentCard.back}</p>
                  </div>
                )}
              </div>

              {/* Boutons d'action */}
              <div className="flex justify-center space-x-4">
                {!showAnswer ? (
                  <>
                    <Button onClick={() => setShowAnswer(true)} size="lg">
                      <Eye className="h-4 w-4 mr-2" />
                      Afficher la réponse
                    </Button>
                    <Button 
                      variant="ghost" 
                      onClick={skipCard}
                      className="text-gray-500"
                    >
                      <SkipForward className="h-4 w-4 mr-2" />
                      Passer
                    </Button>
                  </>
                ) : (
                  <div className="space-x-4">
                    {!isLastCard ? (
                      <Button onClick={nextCard} size="lg">
                        Carte suivante
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    ) : (
                      <Button onClick={restartSession} size="lg">
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Session terminée - Recommencer
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Navigation */}
          <Card>
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={previousCard}
                disabled={isFirstCard}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Précédente
              </Button>

              <div className="text-sm text-gray-600">
                {currentCardIndex + 1} / {currentCards.length}
              </div>

              <Button
                variant="outline"
                onClick={nextCard}
                disabled={isLastCard}
              >
                Suivante
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Vue de sélection du mode
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/dashboard" className="inline-flex items-center text-[#10ac69] hover:text-[#0e9558] mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour au tableau de bord
          </Link>
          <h1 className="text-3xl font-bold text-[#3b3b3b] mb-2">Cartes mémoire</h1>
          <p className="text-gray-600">
            Mémorisez efficacement les concepts clés avec nos cartes interactives
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Modes d'étude */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-[#3b3b3b] mb-6">
              Choisissez votre mode d'étude
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Mode par chapitre */}
              <Card 
                hover 
                className={`cursor-pointer border-2 ${
                  selectedMode === 'chapter' 
                    ? 'border-[#10ac69] bg-green-50' 
                    : 'border-gray-200'
                }`}
              >
                <div className="text-center" onClick={() => setSelectedMode('chapter')}>
                  <BookOpen className="h-12 w-12 text-[#10ac69] mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-[#3b3b3b] mb-2">
                    Par chapitre
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Étudiez les cartes d'un chapitre spécifique
                  </p>
                </div>
              </Card>

              {/* Mode aléatoire */}
              <Card 
                hover 
                className={`cursor-pointer border-2 ${
                  selectedMode === 'random' 
                    ? 'border-[#10ac69] bg-green-50' 
                    : 'border-gray-200'
                }`}
              >
                <div className="text-center" onClick={() => setSelectedMode('random')}>
                  <Shuffle className="h-12 w-12 text-[#10ac69] mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-[#3b3b3b] mb-2">
                    Mode aléatoire
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Mélange de toutes les cartes disponibles
                  </p>
                </div>
              </Card>
            </div>

            {/* Sélection du chapitre */}
            {selectedMode === 'chapter' && (
              <Card className="mb-6">
                <h3 className="font-semibold text-[#3b3b3b] mb-4">
                  Sélectionnez un chapitre
                </h3>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                  {availableChapters.map((chapter) => (
                    <Button
                      key={chapter}
                      variant={selectedChapter === chapter ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedChapter(chapter)}
                      className="text-center"
                    >
                      Ch. {chapter}
                      <div className="text-xs opacity-75">
                        ({flashcardsByChapter[chapter].length})
                      </div>
                    </Button>
                  ))}
                </div>
              </Card>
            )}

            {/* Bouton de démarrage */}
            {selectedMode && (
              <Card>
                <div className="text-center">
                  <h3 className="font-semibold text-[#3b3b3b] mb-4">
                    Prêt à commencer ?
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {selectedMode === 'chapter' 
                      ? `${getFlashcardsByChapter(selectedChapter).length} cartes du chapitre ${selectedChapter}`
                      : `${getAllFlashcards().length} cartes de tous les chapitres`
                    }
                  </p>
                  <Button onClick={startStudySession} size="lg">
                    <Brain className="h-4 w-4 mr-2" />
                    Commencer l'étude
                  </Button>
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Statistiques */}
            <Card>
              <h3 className="font-semibold text-[#3b3b3b] mb-4">Statistiques</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total des cartes</span>
                  <span className="font-semibold text-[#10ac69]">
                    {flashcards.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Chapitres disponibles</span>
                  <span className="font-semibold text-[#10ac69]">
                    {availableChapters.length}
                  </span>
                </div>
              </div>
            </Card>

            {/* Aperçu des chapitres */}
            <Card>
              <h3 className="font-semibold text-[#3b3b3b] mb-4">
                Cartes par chapitre
              </h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {availableChapters.map((chapter) => (
                  <div key={chapter} className="flex justify-between items-center py-1">
                    <span className="text-sm text-gray-600">Chapitre {chapter}</span>
                    <span className="text-sm font-medium text-[#3b3b3b]">
                      {flashcardsByChapter[chapter].length} cartes
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Conseils */}
            <Card>
              <h3 className="font-semibold text-[#3b3b3b] mb-4">Conseils d'étude</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Lisez attentivement la question avant de révéler la réponse</li>
                <li>• Essayez de répondre mentalement avant de voir la réponse</li>
                <li>• Utilisez le mode aléatoire pour tester vos connaissances globales</li>
                <li>• Répétez les cartes difficiles plusieurs fois</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};