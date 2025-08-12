import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { useFlashcard } from '../../contexts/FlashcardContext';
import { Flashcard } from '../../types/flashcard';
import { 
  Brain, 
  Trash2, 
  AlertTriangle,
  Eye,
  EyeOff
} from 'lucide-react';

export const FlashcardManager: React.FC = () => {
  const { flashcards, deleteFlashcard, deleteAllFlashcards } = useFlashcard();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [showDeleteAllConfirm, setShowDeleteAllConfirm] = useState(false);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const handleDeleteFlashcard = (cardId: string) => {
    deleteFlashcard(cardId);
    setShowDeleteConfirm(null);
  };

  const handleDeleteAll = () => {
    deleteAllFlashcards();
    setShowDeleteAllConfirm(false);
  };

  // Grouper les flashcards par chapitre
  const flashcardsByChapter = flashcards.reduce((acc, card) => {
    if (!acc[card.chapter]) {
      acc[card.chapter] = [];
    }
    acc[card.chapter].push(card);
    return acc;
  }, {} as Record<number, Flashcard[]>);

  const chapters = Object.keys(flashcardsByChapter)
    .map(Number)
    .sort((a, b) => a - b);

  return (
    <div className="space-y-6">
      {/* Header avec actions globales */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-[#3b3b3b]">
            Gestion des Cartes Mémoire
          </h3>
          {flashcards.length > 0 && (
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
              {flashcards.length}
            </div>
            <div className="text-gray-600">Cartes totales</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-[#10ac69]">
              {chapters.length}
            </div>
            <div className="text-gray-600">Chapitres</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-[#10ac69]">
              {new Set(flashcards.map(card => card.category)).size}
            </div>
            <div className="text-gray-600">Catégories</div>
          </div>
        </div>
      </Card>

      {/* Cartes par chapitre */}
      {chapters.length > 0 ? (
        chapters.map((chapter) => (
          <Card key={chapter}>
            <h4 className="font-semibold text-[#3b3b3b] mb-4">
              Chapitre {chapter} ({flashcardsByChapter[chapter].length} cartes)
            </h4>
            <div className="space-y-3">
              {flashcardsByChapter[chapter].map((card) => (
                <div key={card.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1">
                      <Brain className="h-6 w-6 text-[#10ac69]" />
                      <div className="flex-1">
                        <h5 className="font-medium text-[#3b3b3b]">
                          {card.front.substring(0, 80)}
                          {card.front.length > 80 && '...'}
                        </h5>
                        <p className="text-sm text-gray-500">
                          Catégorie: {card.category}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setExpandedCard(
                          expandedCard === card.id ? null : card.id
                        )}
                      >
                        {expandedCard === card.id ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowDeleteConfirm(card.id)}
                        className="text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Contenu détaillé */}
                  {expandedCard === card.id && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h6 className="font-medium text-[#3b3b3b] mb-2">Question (Recto):</h6>
                          <div className="bg-blue-50 p-3 rounded text-sm">
                            {card.front}
                          </div>
                        </div>
                        <div>
                          <h6 className="font-medium text-[#3b3b3b] mb-2">Réponse (Verso):</h6>
                          <div className="bg-green-50 p-3 rounded text-sm">
                            {card.back}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        ))
      ) : (
        <Card className="text-center py-12">
          <Brain className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-500 mb-2">
            Aucune carte mémoire importée
          </h3>
          <p className="text-gray-400">
            Importez des cartes mémoire via l'onglet "Cartes mémoire" ci-dessus.
          </p>
        </Card>
      )}

      {/* Modal de confirmation - Supprimer une carte */}
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
              Êtes-vous sûr de vouloir supprimer cette carte mémoire ? 
              Cette action est irréversible.
            </p>
            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(null)}
              >
                Annuler
              </Button>
              <Button
                onClick={() => handleDeleteFlashcard(showDeleteConfirm)}
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
                Supprimer toutes les cartes
              </h3>
            </div>
            <p className="text-gray-600 mb-6">
              Êtes-vous sûr de vouloir supprimer TOUTES les cartes mémoire ? 
              Cette action supprimera définitivement toutes les cartes importées.
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