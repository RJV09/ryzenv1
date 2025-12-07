export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      bot_stats: {
        Row: {
          id: string
          stat_name: string
          stat_value: number
          updated_at: string
        }
        Insert: {
          id?: string
          stat_name: string
          stat_value?: number
          updated_at?: string
        }
        Update: {
          id?: string
          stat_name?: string
          stat_value?: number
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          discord_avatar: string | null
          discord_id: string | null
          discord_username: string | null
          display_name: string | null
          email: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          discord_avatar?: string | null
          discord_id?: string | null
          discord_username?: string | null
          display_name?: string | null
          email?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          discord_avatar?: string | null
          discord_id?: string | null
          discord_username?: string | null
          display_name?: string | null
          email?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          created_at: string
          discord_username: string | null
          id: string
          is_approved: boolean
          name: string
          rating: number
          review_text: string
          server_name: string | null
          show_discord_username: boolean | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          discord_username?: string | null
          id?: string
          is_approved?: boolean
          name: string
          rating: number
          review_text: string
          server_name?: string | null
          show_discord_username?: boolean | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          discord_username?: string | null
          id?: string
          is_approved?: boolean
          name?: string
          rating?: number
          review_text?: string
          server_name?: string | null
          show_discord_username?: boolean | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      server_configs: {
        Row: {
          antinuke_enabled: boolean | null
          antinuke_punishment: string | null
          automod_delete_invites: boolean | null
          automod_delete_links: boolean | null
          automod_delete_spam: boolean | null
          automod_enabled: boolean | null
          created_at: string
          guild_icon: string | null
          guild_id: string
          guild_name: string
          id: string
          invite_log_channel_id: string | null
          invite_tracker_enabled: boolean | null
          log_channel_create: boolean | null
          log_channel_delete: boolean | null
          log_member_join: boolean | null
          log_member_leave: boolean | null
          log_message_delete: boolean | null
          log_message_edit: boolean | null
          log_role_create: boolean | null
          log_role_delete: boolean | null
          logs_channel_id: string | null
          logs_enabled: boolean | null
          max_bans: number | null
          max_channels_delete: number | null
          max_roles_delete: number | null
          prefix: string | null
          timezone: string | null
          updated_at: string
          user_id: string
          welcome_channel_id: string | null
          welcome_enabled: boolean | null
          welcome_message: string | null
        }
        Insert: {
          antinuke_enabled?: boolean | null
          antinuke_punishment?: string | null
          automod_delete_invites?: boolean | null
          automod_delete_links?: boolean | null
          automod_delete_spam?: boolean | null
          automod_enabled?: boolean | null
          created_at?: string
          guild_icon?: string | null
          guild_id: string
          guild_name: string
          id?: string
          invite_log_channel_id?: string | null
          invite_tracker_enabled?: boolean | null
          log_channel_create?: boolean | null
          log_channel_delete?: boolean | null
          log_member_join?: boolean | null
          log_member_leave?: boolean | null
          log_message_delete?: boolean | null
          log_message_edit?: boolean | null
          log_role_create?: boolean | null
          log_role_delete?: boolean | null
          logs_channel_id?: string | null
          logs_enabled?: boolean | null
          max_bans?: number | null
          max_channels_delete?: number | null
          max_roles_delete?: number | null
          prefix?: string | null
          timezone?: string | null
          updated_at?: string
          user_id: string
          welcome_channel_id?: string | null
          welcome_enabled?: boolean | null
          welcome_message?: string | null
        }
        Update: {
          antinuke_enabled?: boolean | null
          antinuke_punishment?: string | null
          automod_delete_invites?: boolean | null
          automod_delete_links?: boolean | null
          automod_delete_spam?: boolean | null
          automod_enabled?: boolean | null
          created_at?: string
          guild_icon?: string | null
          guild_id?: string
          guild_name?: string
          id?: string
          invite_log_channel_id?: string | null
          invite_tracker_enabled?: boolean | null
          log_channel_create?: boolean | null
          log_channel_delete?: boolean | null
          log_member_join?: boolean | null
          log_member_leave?: boolean | null
          log_message_delete?: boolean | null
          log_message_edit?: boolean | null
          log_role_create?: boolean | null
          log_role_delete?: boolean | null
          logs_channel_id?: string | null
          logs_enabled?: boolean | null
          max_bans?: number | null
          max_channels_delete?: number | null
          max_roles_delete?: number | null
          prefix?: string | null
          timezone?: string | null
          updated_at?: string
          user_id?: string
          welcome_channel_id?: string | null
          welcome_enabled?: boolean | null
          welcome_message?: string | null
        }
        Relationships: []
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
