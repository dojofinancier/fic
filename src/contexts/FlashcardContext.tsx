import React, { createContext, useContext } from 'react';
import { useFlashcardData } from '../hooks/useFlashcardData';
import { 
  FlashcardContextValue, 
  FlashcardProviderProps,
  Flashcard 
} from '../types/flashcard';

// Create context with undefined default
const FlashcardContext = createContext<FlashcardContextValue | undefined>(undefined);

// Custom hook to use flashcard context
export const useFlashcard = (): FlashcardContextValue => {
  const context = useContext(FlashcardContext);
  
  if (context === undefined) {
    throw new Error('useFlashcard must be used within a FlashcardProvider');
  }
  
  return context;
};

// Utility functions
const getFlashcardsByChapter = (flashcards: Flashcard[], chapter: number): Flashcard[] => {
  return flashcards.filter(flashcard => flashcard.chapter === chapter);
};

const getAllFlashcards = (flashcards: Flashcard[]): Flashcard[] => {
  return flashcards;
};

const getChaptersWithFlashcards = (flashcards: Flashcard[]): number[] => {
  const chapters = [...new Set(flashcards.map(flashcard => flashcard.chapter))];
  return chapters.sort((a, b) => a - b);
};

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Provider component
export const FlashcardProvider: React.FC<FlashcardProviderProps> = ({ children }) => {
  const {
    flashcards,
    loading,
    error,
    addFlashcards,
    deleteFlashcard,
    deleteAllFlashcards,
    refreshFlashcards
  } = useFlashcardData();

  const contextValue: FlashcardContextValue = {
    // State
    flashcards,
    loading,
    error,
    
    // Actions
    addFlashcards,
    deleteFlashcard,
    deleteAllFlashcards,
    refreshFlashcards,
    
    // Utility functions
    getFlashcardsByChapter: (chapter: number) => getFlashcardsByChapter(flashcards, chapter),
    getAllFlashcards: () => getAllFlashcards(flashcards),
    getChaptersWithFlashcards: () => getChaptersWithFlashcards(flashcards),
    shuffleArray
  };

  return (
    <FlashcardContext.Provider value={contextValue}>
      {children}
    </FlashcardContext.Provider>
  );
};