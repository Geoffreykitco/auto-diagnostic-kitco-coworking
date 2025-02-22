
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const data = await req.json()
    console.log('Received diagnostic data:', data)

    const baserowToken = Deno.env.get('BASEROW_TOKEN')
    if (!baserowToken) {
      throw new Error('Baserow token not configured')
    }

    // Map data to Baserow field names with detailed questions
    const baserowData = {
      // Informations générales
      "Name": `${data.first_name} ${data.last_name}`,
      "Email": data.email,
      "Nom coworking": data.coworking_name,

      // Scores globaux
      "Notre score global": data.global_score,
      "Niveau score global": data.global_level,
      "Texte score global": data.global_recommendation,

      // Section Acquisition
      "Note Acquisition": data.acquisition_score,
      "Niveau Acquisition": data.acquisition_level,
      "Texte Acquisition": data.acquisition_recommendation,
      "acq_canaux_utilises": data.answers?.acquisition?.[0]?.value,
      "acq_frequence_actions": data.answers?.acquisition?.[1]?.value,
      "acq_offre_decouverte": data.answers?.acquisition?.[2]?.value,
      "acq_suivi_prospects": data.answers?.acquisition?.[3]?.value,
      "acq_avis_clients": data.answers?.acquisition?.[4]?.value,

      // Section Activation
      "Note Activation": data.activation_score,
      "Niveau Activation": data.activation_level,
      "Texte Activation": data.activation_recommendation,
      "act_decouverte_espace": data.answers?.activation?.[0]?.value,
      "act_processus_onboarding": data.answers?.activation?.[1]?.value,
      "act_clartes_offres": data.answers?.activation?.[2]?.value,
      "act_relance_prospects": data.answers?.activation?.[3]?.value,
      "act_action_decision": data.answers?.activation?.[4]?.value,

      // Section Rétention
      "Note Rétention": data.retention_score,
      "Niveau Rétention": data.retention_level,
      "Texte Rétention": data.retention_recommendation,
      "ret_frequentation_reguliere": data.answers?.retention?.[0]?.value,
      "ret_programme_fidelite": data.answers?.retention?.[1]?.value,
      "ret_organisation_evenements": data.answers?.retention?.[2]?.value,
      "ret_retours_membres": data.answers?.retention?.[3]?.value,
      "ret_amelioration_experience": data.answers?.retention?.[4]?.value,

      // Section Revenus
      "Note Revenus": data.revenus_score,
      "Niveau Revenus": data.revenus_level,
      "Texte Revenus": data.revenus_recommendation,
      "rev_source_revenus": data.answers?.revenus?.[0]?.value,
      "rev_rentabilite_offres": data.answers?.revenus?.[1]?.value,
      "rev_utilisation_crm": data.answers?.revenus?.[2]?.value,
      "rev_optimisation_conversion": data.answers?.revenus?.[3]?.value,
      "rev_nouvelles_sources": data.answers?.revenus?.[4]?.value,

      // Section Recommandation
      "Note Recommandation": data.recommandation_score,
      "Niveau Recommandation": data.recommandation_level,
      "Texte Recommandation": data.recommandation_recommendation,
      "rec_recommandation_spontanee": data.answers?.recommandation?.[0]?.value,
      "rec_programme_parrainage": data.answers?.recommandation?.[1]?.value,
      "rec_utilisation_avis": data.answers?.recommandation?.[2]?.value,
      "rec_participation_communication": data.answers?.recommandation?.[3]?.value,
      "rec_creation_contenu": data.answers?.recommandation?.[4]?.value,

      // Section Informations (optionnel, si vous voulez aussi les stocker)
      "info_anciennete": data.answers?.informations?.[0]?.value,
      "info_type_bureaux": data.answers?.informations?.[1]?.value,
      "info_type_abonnements": data.answers?.informations?.[2]?.value,
      "info_statut_espace": data.answers?.informations?.[3]?.value,
      "info_superficie": data.answers?.informations?.[4]?.value,
      "info_concurrence": data.answers?.informations?.[5]?.value,
      "info_capacite": data.answers?.informations?.[6]?.value,
      "info_ville": data.answers?.informations?.[7]?.value,
      "info_horaires": data.answers?.informations?.[8]?.value,
      "info_remplissage": data.answers?.informations?.[9]?.value,
      "info_type_clientele": data.answers?.informations?.[10]?.value,
      "info_services_proposes": data.answers?.informations?.[11]?.value
    }

    console.log('Sending to Baserow:', baserowData)

    const response = await fetch('https://api.baserow.io/api/database/rows/table/451692/?user_field_names=true', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${baserowToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(baserowData)
    })

    const responseData = await response.json()
    console.log('Baserow response:', responseData)

    if (!response.ok) {
      console.error('Baserow error:', responseData)
      throw new Error('Failed to save diagnostic data')
    }

    return new Response(
      JSON.stringify({ success: true, data: responseData }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error:', error.message)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
