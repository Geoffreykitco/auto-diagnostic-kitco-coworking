
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data = await req.json();
    console.log('Received data:', data);

    // Formatage des données pour Baserow
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
      
      // Ajout des réponses aux questions
      // Informations générales
      duree_ouverture: formatAnswer(data.answers?.informations?.[0]),
      types_bureaux: formatMultipleAnswer(data.answers?.informations?.[1]),
      types_abonnements: formatMultipleAnswer(data.answers?.informations?.[2]),
      statut_espace: formatAnswer(data.answers?.informations?.[3]),
      superficie: formatAnswer(data.answers?.informations?.[4]),
      concurrence: formatAnswer(data.answers?.informations?.[5]),
      capacite: formatAnswer(data.answers?.informations?.[6]),
      ville: formatAnswer(data.answers?.informations?.[7]),
      horaires: formatAnswer(data.answers?.informations?.[8]),
      taux_remplissage: formatAnswer(data.answers?.informations?.[9]),
      type_clientele: formatMultipleAnswer(data.answers?.informations?.[10]),
      services: formatMultipleAnswer(data.answers?.informations?.[11]),

      // Acquisition
      canaux_acquisition: formatMultipleAnswer(data.answers?.acquisition?.[0]),
      frequence_actions: formatAnswer(data.answers?.acquisition?.[1]),
      offre_decouverte: formatAnswer(data.answers?.acquisition?.[2]),
      suivi_prospects: formatAnswer(data.answers?.acquisition?.[3]),
      avis_clients: formatAnswer(data.answers?.acquisition?.[4]),

      // Activation
      decouverte_espace: formatAnswer(data.answers?.activation?.[0]),
      processus_onboarding: formatAnswer(data.answers?.activation?.[1]),
      clarte_offres: formatAnswer(data.answers?.activation?.[2]),
      relance_prospects: formatAnswer(data.answers?.activation?.[3]),
      facilitation_decision: formatAnswer(data.answers?.activation?.[4]),

      // Rétention
      retour_regulier: formatAnswer(data.answers?.retention?.[0]),
      programme_fidelite: formatAnswer(data.answers?.retention?.[1]),
      organisation_evenements: formatAnswer(data.answers?.retention?.[2]),
      collecte_avis: formatAnswer(data.answers?.retention?.[3]),
      amelioration_experience: formatAnswer(data.answers?.retention?.[4]),

      // Revenus
      sources_revenus: formatMultipleAnswer(data.answers?.revenus?.[0]),
      suivi_rentabilite: formatAnswer(data.answers?.revenus?.[1]),
      utilisation_crm: formatAnswer(data.answers?.revenus?.[2]),
      optimisation_conversion: formatAnswer(data.answers?.revenus?.[3]),
      developpement_revenus: formatAnswer(data.answers?.revenus?.[4]),

      // Recommandation
      recommandation_spontanee: formatAnswer(data.answers?.recommandation?.[0]),
      programme_parrainage: formatAnswer(data.answers?.recommandation?.[1]),
      utilisation_avis: formatAnswer(data.answers?.recommandation?.[2]),
      participation_communication: formatAnswer(data.answers?.recommandation?.[3]),
      incitation_contenu: formatAnswer(data.answers?.recommandation?.[4])
    };

    console.log('Formatted data for Baserow:', baserowData);

    // Envoi à Baserow avec l'ID correct de la table
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

function formatMultipleAnswer(answer: any): string {
  if (!answer?.value) return '';
  if (Array.isArray(answer.value)) {
    return answer.value.join(', ');
  }
  return answer.value.toString();
}

function formatAnswer(answer: any): string {
  if (!answer?.value) return '';
  return answer.value.toString();
}
