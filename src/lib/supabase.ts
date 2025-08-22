import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      students: {
        Row: {
          id: string
          name: string
          email: string
          phone: string
          age: number
          grade: string
          address: string
          enrollment_date: string
          gpa: number | null
          status: 'studying' | 'IT' | 'non-IT'
          cross_main: 'CROSS' | 'MAIN'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone: string
          age: number
          grade: string
          address: string
          enrollment_date: string
          gpa?: number | null
          status: 'studying' | 'IT' | 'non-IT'
          cross_main: 'CROSS' | 'MAIN'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string
          age?: number
          grade?: string
          address?: string
          enrollment_date?: string
          gpa?: number | null
          status?: 'studying' | 'IT' | 'non-IT'
          cross_main?: 'CROSS' | 'MAIN'
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}