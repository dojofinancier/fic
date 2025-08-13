import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storageKey: 'df_auth_token'
  },
  global: {
    headers: {
      'X-Client-Info': 'df-web-app'
    }
  }
});

// Types pour TypeScript
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          has_access: boolean
          is_admin: boolean
          access_expires_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          has_access?: boolean
          is_admin?: boolean
          access_expires_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          has_access?: boolean
          is_admin?: boolean
          access_expires_at?: string | null
          updated_at?: string
        }
      }
      questions: {
        Row: {
          id: string
          question: string
          options: string[]
          correct_answer: number
          explanation: string
          chapter: number
          type: 'quiz' | 'exam'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          question: string
          options: string[]
          correct_answer: number
          explanation: string
          chapter: number
          type?: 'quiz' | 'exam'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          question?: string
          options?: string[]
          correct_answer?: number
          explanation?: string
          chapter?: number
          type?: 'quiz' | 'exam'
          updated_at?: string
        }
      }
      flashcards: {
        Row: {
          id: string
          front: string
          back: string
          chapter: number
          category: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          front: string
          back: string
          chapter: number
          category: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          front?: string
          back?: string
          chapter?: number
          category?: string
          updated_at?: string
        }
      }
      quiz_results: {
        Row: {
          id: string
          user_id: string
          quiz_id: string
          score: number
          total_questions: number
          time_spent: number
          completed_at: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          quiz_id: string
          score: number
          total_questions: number
          time_spent: number
          completed_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          quiz_id?: string
          score?: number
          total_questions?: number
          time_spent?: number
          completed_at?: string
        }
      }
      study_notes: {
        Row: {
          id: string
          chapter: number
          title: string
          sections: unknown
          pdf_path: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          chapter: number
          title: string
          sections?: unknown
          pdf_path?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          chapter?: number
          title?: string
          sections?: unknown
          pdf_path?: string | null
          updated_at?: string
        }
      }
      study_plans: {
        Row: {
          id: string
          weeks: 6 | 8 | 12
          title: string
          description: string | null
          total_hours: string | null
          daily_commitment: string | null
          pdf_path: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          weeks: 6 | 8 | 12
          title: string
          description?: string | null
          total_hours?: string | null
          daily_commitment?: string | null
          pdf_path?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          weeks?: 6 | 8 | 12
          title?: string
          description?: string | null
          total_hours?: string | null
          daily_commitment?: string | null
          pdf_path?: string | null
          updated_at?: string
        }
      }
      study_plan_weeks: {
        Row: {
          id: string
          plan_id: string
          week_number: number
          chapters: string
          focus: string | null
          hours: string | null
          tasks: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          plan_id: string
          week_number: number
          chapters: string
          focus?: string | null
          hours?: string | null
          tasks?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          plan_id?: string
          week_number?: number
          chapters?: string
          focus?: string | null
          hours?: string | null
          tasks?: string[]
          updated_at?: string
        }
      }
    }
  }
}