import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Flashcard } from '../types/flashcard';

export const useFlashcardData = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadFlashcards = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: supabaseError } = await supabase
        .from('flashcards')
        .select('*')
        .order('chapter', { ascending: true });

      if (supabaseError) {
        throw supabaseError;
      }

      const formattedFlashcards: Flashcard[] = (data || []).map(card => ({
        id: card.id,
        front: card.front,
        back: card.back,
        chapter: card.chapter,
        category: card.category,
        created_at: card.created_at
      }));

      setFlashcards(formattedFlashcards);
    } catch (err) {
      console.error('Error loading flashcards:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      setFlashcards([]);
    } finally {
      setLoading(false);
    }
  };

  const addFlashcards = async (newFlashcards: Omit<Flashcard, 'id' | 'created_at'>[]) => {
    try {
      setError(null);

      const flashcardsToInsert = newFlashcards.map(flashcard => ({
        id: flashcard.id,
        front: flashcard.front,
        back: flashcard.back,
        chapter: flashcard.chapter,
        category: flashcard.category
      }));

      const { data, error: supabaseError } = await supabase
        .from('flashcards')
        .upsert(flashcardsToInsert)
        .select();

      if (supabaseError) {
        throw supabaseError;
      }

      if (data) {
        await loadFlashcards();
      }
    } catch (err) {
      console.error('Error adding flashcards:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    }
  };

  const deleteFlashcard = async (id: string) => {
    try {
      setError(null);

      const { error: supabaseError } = await supabase
        .from('flashcards')
        .delete()
        .eq('id', id);

      if (supabaseError) {
        throw supabaseError;
      }

      setFlashcards(prev => prev.filter(flashcard => flashcard.id !== id));
    } catch (err) {
      console.error('Error deleting flashcard:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    }
  };

  const deleteAllFlashcards = async () => {
    try {
      setError(null);

      const { error: supabaseError } = await supabase
        .from('flashcards')
        .delete()
        .neq('id', '');

      if (supabaseError) {
        throw supabaseError;
      }

      setFlashcards([]);
    } catch (err) {
      console.error('Error deleting all flashcards:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    }
  };

  useEffect(() => {
    loadFlashcards();
  }, []);

  return {
    flashcards,
    loading,
    error,
    addFlashcards,
    deleteFlashcard,
    deleteAllFlashcards,
    refreshFlashcards: loadFlashcards
  };
};