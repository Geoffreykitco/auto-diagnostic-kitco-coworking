export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      leads_auto_diag_coworking: {
        Row: {
          acq_avis_clients: string | null
          acq_canaux_utilises: string | null
          acq_frequence_actions: string | null
          acq_offre_decouverte: string | null
          acq_suivi_prospects: string | null
          acquisition_level: string | null
          acquisition_recommendation: string | null
          acquisition_score: number | null
          act_action_decision: string | null
          act_clartes_offres: string | null
          act_decouverte_espace: string | null
          act_processus_onboarding: string | null
          act_relance_prospects: string | null
          activation_level: string | null
          activation_recommendation: string | null
          activation_score: number | null
          answers: Json | null
          coworking_name: string
          created_at: string
          email: string
          first_name: string
          global_level: string
          global_recommendation: string | null
          global_score: number
          id: number
          info_anciennete: string | null
          info_capacite: string | null
          info_concurrence: string | null
          info_horaires: string | null
          info_remplissage: string | null
          info_services: string | null
          info_statut: string | null
          info_superficie: string | null
          info_type_abonnements: string | null
          info_type_bureaux: string | null
          info_type_clientele: string | null
          info_ville: string | null
          last_name: string
          rec_creation_contenu: string | null
          rec_participation_communication: string | null
          rec_programme_parrainage: string | null
          rec_recommandation_spontanee: string | null
          rec_utilisation_avis: string | null
          recommandation_level: string | null
          recommandation_recommendation: string | null
          recommandation_score: number | null
          ret_amelioration_experience: string | null
          ret_frequentation_reguliere: string | null
          ret_organisation_evenements: string | null
          ret_programme_fidelite: string | null
          ret_retours_membres: string | null
          retention_level: string | null
          retention_recommendation: string | null
          retention_score: number | null
          rev_nouvelles_sources: string | null
          rev_optimisation_conversion: string | null
          rev_rentabilite_offres: string | null
          rev_source_revenus: string | null
          rev_utilisation_crm: string | null
          revenus_level: string | null
          revenus_recommendation: string | null
          revenus_score: number | null
        }
        Insert: {
          acq_avis_clients?: string | null
          acq_canaux_utilises?: string | null
          acq_frequence_actions?: string | null
          acq_offre_decouverte?: string | null
          acq_suivi_prospects?: string | null
          acquisition_level?: string | null
          acquisition_recommendation?: string | null
          acquisition_score?: number | null
          act_action_decision?: string | null
          act_clartes_offres?: string | null
          act_decouverte_espace?: string | null
          act_processus_onboarding?: string | null
          act_relance_prospects?: string | null
          activation_level?: string | null
          activation_recommendation?: string | null
          activation_score?: number | null
          answers?: Json | null
          coworking_name: string
          created_at?: string
          email: string
          first_name: string
          global_level: string
          global_recommendation?: string | null
          global_score: number
          id?: number
          info_anciennete?: string | null
          info_capacite?: string | null
          info_concurrence?: string | null
          info_horaires?: string | null
          info_remplissage?: string | null
          info_services?: string | null
          info_statut?: string | null
          info_superficie?: string | null
          info_type_abonnements?: string | null
          info_type_bureaux?: string | null
          info_type_clientele?: string | null
          info_ville?: string | null
          last_name: string
          rec_creation_contenu?: string | null
          rec_participation_communication?: string | null
          rec_programme_parrainage?: string | null
          rec_recommandation_spontanee?: string | null
          rec_utilisation_avis?: string | null
          recommandation_level?: string | null
          recommandation_recommendation?: string | null
          recommandation_score?: number | null
          ret_amelioration_experience?: string | null
          ret_frequentation_reguliere?: string | null
          ret_organisation_evenements?: string | null
          ret_programme_fidelite?: string | null
          ret_retours_membres?: string | null
          retention_level?: string | null
          retention_recommendation?: string | null
          retention_score?: number | null
          rev_nouvelles_sources?: string | null
          rev_optimisation_conversion?: string | null
          rev_rentabilite_offres?: string | null
          rev_source_revenus?: string | null
          rev_utilisation_crm?: string | null
          revenus_level?: string | null
          revenus_recommendation?: string | null
          revenus_score?: number | null
        }
        Update: {
          acq_avis_clients?: string | null
          acq_canaux_utilises?: string | null
          acq_frequence_actions?: string | null
          acq_offre_decouverte?: string | null
          acq_suivi_prospects?: string | null
          acquisition_level?: string | null
          acquisition_recommendation?: string | null
          acquisition_score?: number | null
          act_action_decision?: string | null
          act_clartes_offres?: string | null
          act_decouverte_espace?: string | null
          act_processus_onboarding?: string | null
          act_relance_prospects?: string | null
          activation_level?: string | null
          activation_recommendation?: string | null
          activation_score?: number | null
          answers?: Json | null
          coworking_name?: string
          created_at?: string
          email?: string
          first_name?: string
          global_level?: string
          global_recommendation?: string | null
          global_score?: number
          id?: number
          info_anciennete?: string | null
          info_capacite?: string | null
          info_concurrence?: string | null
          info_horaires?: string | null
          info_remplissage?: string | null
          info_services?: string | null
          info_statut?: string | null
          info_superficie?: string | null
          info_type_abonnements?: string | null
          info_type_bureaux?: string | null
          info_type_clientele?: string | null
          info_ville?: string | null
          last_name?: string
          rec_creation_contenu?: string | null
          rec_participation_communication?: string | null
          rec_programme_parrainage?: string | null
          rec_recommandation_spontanee?: string | null
          rec_utilisation_avis?: string | null
          recommandation_level?: string | null
          recommandation_recommendation?: string | null
          recommandation_score?: number | null
          ret_amelioration_experience?: string | null
          ret_frequentation_reguliere?: string | null
          ret_organisation_evenements?: string | null
          ret_programme_fidelite?: string | null
          ret_retours_membres?: string | null
          retention_level?: string | null
          retention_recommendation?: string | null
          retention_score?: number | null
          rev_nouvelles_sources?: string | null
          rev_optimisation_conversion?: string | null
          rev_rentabilite_offres?: string | null
          rev_source_revenus?: string | null
          rev_utilisation_crm?: string | null
          revenus_level?: string | null
          revenus_recommendation?: string | null
          revenus_score?: number | null
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
