// Flashcard Types - Centralized type definitions
export interface Flashcard {
  id: string;
  front: string;
  back: string;
  chapter: number;
  category: string;
  created_at?: string;
}

export interface FlashcardContextState {
  flashcards: Flashcard[];
  loading: boolean;
  error: string | null;
}

export interface FlashcardContextActions {
  addFlashcards: (flashcards: Omit<Flashcard, 'id' | 'created_at'>[]) => Promise<void>;
  deleteFlashcard: (id: string) => Promise<void>;
  deleteAllFlashcards: () => Promise<void>;
  refreshFlashcards: () => Promise<void>;
}

export interface FlashcardContextValue extends FlashcardContextState, FlashcardContextActions {
  getFlashcardsByChapter: (chapter: number) => Flashcard[];
  getAllFlashcards: () => Flashcard[];
  getChaptersWithFlashcards: () => number[];
  shuffleArray: <T>(array: T[]) => T[];
}

export interface FlashcardProviderProps {
  children: React.ReactNode;
}