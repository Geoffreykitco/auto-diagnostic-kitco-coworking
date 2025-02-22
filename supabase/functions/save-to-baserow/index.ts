
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data = await req.json();
    console.log('Received data:', data);

    const baserowData = {
      first_name: data.first_name,
      last_name: data.last_name,
      coworking_name: data.coworking_name,
      email: data.email,
      global_score: data.global_score,
      global_level: data.global_level,
      global_recommendation: data.global_recommendation,
      // Scores par section
      acquisition_score: data.acquisition_score,
      acquisition_level: data.acquisition_level,
      acquisition_recommendation: data.acquisition_recommendation,
      activation_score: data.activation_score,
      activation_level: data.activation_level,
      activation_recommendation: data.activation_recommendation,
      retention_score: data.retention_score,
      retention_level: data.retention_level,
      retention_recommendation: data.retention_recommendation,
      revenus_score: data.revenus_score,
      revenus_level: data.revenus_level,
      revenus_recommendation: data.revenus_recommendation,
      recommandation_score: data.recommandation_score,
      recommandation_level: data.recommandation_level,
      recommandation_recommendation: data.recommandation_recommendation,
      
      // Section Informations
      info_anciennete: getOptionLabel(data.answers?.informations?.[0]),
      info_type_bureaux: getMultipleOptionLabels(data.answers?.informations?.[1]),
      info_type_abonnements: getMultipleOptionLabels(data.answers?.informations?.[2]),
      info_statut: getOptionLabel(data.answers?.informations?.[3]),
      info_superficie: getOptionLabel(data.answers?.informations?.[4]),
      info_concurrence: getOptionLabel(data.answers?.informations?.[5]),
      info_capacite: getOptionLabel(data.answers?.informations?.[6]),
      info_ville: formatAnswer(data.answers?.informations?.[7]),
      info_horaires: getOptionLabel(data.answers?.informations?.[8]),
      info_remplissage: formatAnswer(data.answers?.informations?.[9]),
      info_type_clientele: getMultipleOptionLabels(data.answers?.informations?.[10]),
      info_services: getMultipleOptionLabels(data.answers?.informations?.[11]),

      // Section Acquisition
      acq_canaux_utilises: getMultipleOptionLabels(data.answers?.acquisition?.[0]),
      acq_frequence_actions: getOptionLabel(data.answers?.acquisition?.[1]),
      acq_offre_decouverte: getOptionLabel(data.answers?.acquisition?.[2]),
      acq_suivi_prospects: getOptionLabel(data.answers?.acquisition?.[3]),
      acq_avis_clients: getOptionLabel(data.answers?.acquisition?.[4]),

      // Section Activation
      act_decouverte_espace: getOptionLabel(data.answers?.activation?.[0]),
      act_processus_onboarding: getOptionLabel(data.answers?.activation?.[1]),
      act_clartes_offres: getOptionLabel(data.answers?.activation?.[2]),
      act_relance_prospects: getOptionLabel(data.answers?.activation?.[3]),
      act_action_decision: getOptionLabel(data.answers?.activation?.[4]),

      // Section Rétention
      ret_frequentation_reguliere: getOptionLabel(data.answers?.retention?.[0]),
      ret_programme_fidelite: getOptionLabel(data.answers?.retention?.[1]),
      ret_organisation_evenements: getOptionLabel(data.answers?.retention?.[2]),
      ret_retours_membres: getOptionLabel(data.answers?.retention?.[3]),
      ret_amelioration_experience: getOptionLabel(data.answers?.retention?.[4]),

      // Section Revenus
      rev_source_revenus: getMultipleOptionLabels(data.answers?.revenus?.[0]),
      rev_rentabilite_offres: getOptionLabel(data.answers?.revenus?.[1]),
      rev_utilisation_crm: getOptionLabel(data.answers?.revenus?.[2]),
      rev_optimisation_conversion: getOptionLabel(data.answers?.revenus?.[3]),
      rev_nouvelles_sources: getOptionLabel(data.answers?.revenus?.[4]),

      // Section Recommandation
      rec_recommandation_spontanee: getOptionLabel(data.answers?.recommandation?.[0]),
      rec_programme_parrainage: getOptionLabel(data.answers?.recommandation?.[1]),
      rec_utilisation_avis: getOptionLabel(data.answers?.recommandation?.[2]),
      rec_participation_communication: getOptionLabel(data.answers?.recommandation?.[3]),
      rec_creation_contenu: getOptionLabel(data.answers?.recommandation?.[4])
    };

    console.log('Formatted data for Baserow:', baserowData);

    const baserowResponse = await fetch(
      'https://api.baserow.io/api/database/rows/table/451692/?user_field_names=true',
      {
        method: 'POST',
        headers: {
          'Authorization': `Token ${Deno.env.get('BASEROW_TOKEN')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(baserowData),
      }
    );

    if (!baserowResponse.ok) {
      const errorText = await baserowResponse.text();
      console.error('Baserow error response:', errorText);
      throw new Error(`Failed to save to Baserow: ${baserowResponse.status} ${errorText}`);
    }

    const responseData = await baserowResponse.json();
    console.log('Baserow response:', responseData);

    return new Response(
      JSON.stringify({ success: true, data: responseData }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        },
        status: 500
      }
    );
  }
});

function getOptionLabel(answer: any): string {
  if (!answer?.value) return '';
  // Si la valeur est un index numérique, on récupère le label correspondant
  if (typeof answer.value === 'number' && answer.options) {
    return answer.options[answer.value]?.label || '';
  }
  return answer.value.toString();
}

function getMultipleOptionLabels(answer: any): string {
  if (!answer?.value || !Array.isArray(answer.value)) return '';
  // Pour les réponses multiples, on récupère les labels des options sélectionnées
  return answer.value
    .map(index => answer.options?.[index]?.label || '')
    .filter(Boolean)
    .join(', ');
}

function formatAnswer(answer: any): string {
  if (!answer?.value) return '';
  return answer.value.toString();
}
