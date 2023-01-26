export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      companies: {
        Row: {
          created_at: string | null
          id: string
          line: string | null
          max: string | null
          min_period: string | null
          name_child: string | null
          name_parent: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          line?: string | null
          max?: string | null
          min_period?: string | null
          name_child?: string | null
          name_parent?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          line?: string | null
          max?: string | null
          min_period?: string | null
          name_child?: string | null
          name_parent?: string | null
        }
      }
      contracts: {
        Row: {
          company_id: string | null
          completed: boolean
          created_at: string | null
          end_date: string
          id: string
          number_id: string | null
          start_date: string
          user_id: string | null
        }
        Insert: {
          company_id?: string | null
          completed?: boolean
          created_at?: string | null
          end_date?: string
          id?: string
          number_id?: string | null
          start_date?: string
          user_id?: string | null
        }
        Update: {
          company_id?: string | null
          completed?: boolean
          created_at?: string | null
          end_date?: string
          id?: string
          number_id?: string | null
          start_date?: string
          user_id?: string | null
        }
      }
      costs: {
        Row: {
          contrast_id: string | null
          cost1: number
          cost2: number
          created_at: string | null
          id: string
        }
        Insert: {
          contrast_id?: string | null
          cost1?: number
          cost2?: number
          created_at?: string | null
          id?: string
        }
        Update: {
          contrast_id?: string | null
          cost1?: number
          cost2?: number
          created_at?: string | null
          id?: string
        }
      }
      numbers: {
        Row: {
          created_at: string | null
          id: string
          sub_user_id: string | null
          tel: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          sub_user_id?: string | null
          tel?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          sub_user_id?: string | null
          tel?: string | null
          user_id?: string | null
        }
      }
      subusers: {
        Row: {
          created_at: string
          id: string
          name: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          user_id?: string | null
        }
      }
      todos: {
        Row: {
          completed: boolean
          created_at: string
          id: string
          title: string | null
          user_id: string | null
        }
        Insert: {
          completed?: boolean
          created_at?: string
          id?: string
          title?: string | null
          user_id?: string | null
        }
        Update: {
          completed?: boolean
          created_at?: string
          id?: string
          title?: string | null
          user_id?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
