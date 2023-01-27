export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName: string
          query: string
          variables: Json
          extensions: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
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
      profiles: {
        Row: {
          avatar_url: string | null
          id: string
          name: string | null
          updated_at: string
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          id: string
          name?: string | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          id?: string
          name?: string | null
          updated_at?: string
          website?: string | null
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
  storage: {
    Tables: {
      buckets: {
        Row: {
          created_at: string | null
          id: string
          name: string
          owner: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id: string
          name: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          path_tokens: string[] | null
          updated_at: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      extension: {
        Args: { name: string }
        Returns: string
      }
      filename: {
        Args: { name: string }
        Returns: string
      }
      foldername: {
        Args: { name: string }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: { size: number; bucket_id: string }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits: number
          levels: number
          offsets: number
          search: string
          sortcolumn: string
          sortorder: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}
