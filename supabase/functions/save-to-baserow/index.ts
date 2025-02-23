
import { serve } from 'https://deno.fresh.run/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Mapping des indices de questions vers les noms de champs pour chaque section
const FIELD_MAPPINGS = {
  informations: {
    0: 'info_anciennete',
    1: 'info_type_bureaux',
    2: 'info_type_abonnements',
    3: 'info_statut',
    4: 'info_superficie',
    5: 'info_concurrence',
    6: 'info_capacite',
    7: 'info_ville',
    8: 'info_horaires',
    9: 'info_remplissage',
    10: 'info_type_clientele',
    11: 'info_services'
  },
  acquisition: {
    0: 'acq_canaux_utilises',
    1: 'acq_frequence_actions',
    2: 'acq_offre_decouverte',
    3: 'acq_suivi_prospects',
    4: 'acq_avis_clients'
  },
  activation: {
    0: 'act_decouverte_espace',
    1: 'act_processus_onboarding',
    2: 'act_clartes_offres',
    3: 'act_relance_prospects',
    4: 'act_action_decision'
  },
  retention: {
    0: 'ret_frequentation_reguliere',
    1: 'ret_programme_fidelite',
    2: 'ret_organisation_evenements',
    3: 'ret_retours_membres',
    4: 'ret_amelioration_experience'
  },
  revenus: {
    0: 'rev_source_revenus',
    1: 'rev_rentabilite_offres',
    2: 'rev_utilisation_crm',
    3: 'rev_optimisation_conversion',
    4: 'rev_nouvelles_sources'
  },
  recommandation: {
    0: 'rec_recommandation_spontanee',
    1: 'rec_programme_parrainage',
    2: 'rec_utilisation_avis',
    3: 'rec_participation_communication',
    4: 'rec_creation_contenu'
  }
} as const;

const formatAnswersForBaserow = (answers: Record<string, Record<number, { value: string | number | number[] | null; score: number }>>) => {
  const formattedAnswers: Record<string, any> = {};

  // Formatage des réponses par section
  Object.entries(answers).forEach(([sectionKey, sectionAnswers]) => {
    if (sectionKey in FIELD_MAPPINGS) {
      Object.entries(sectionAnswers).forEach(([questionIndex, answer]) => {
        const fieldName = FIELD_MAPPINGS[sectionKey as keyof typeof FIELD_MAPPINGS][Number(questionIndex)];
        if (fieldName) {
          const value = Array.isArray(answer.value) 
            ? answer.value.join(', ') // Si c'est un tableau, on le joint avec des virgules
            : answer.value?.toString() || ''; // Sinon on convertit en string
          formattedAnswers[fieldName] = value;
        }
      });
    }
  });

  return formattedAnswers;
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Début du traitement de la requête save-to-baserow');
    const diagnosticData = await req.json();
    console.log('Données reçues:', diagnosticData);

    // Formater les réponses pour Baserow
    const baserowData = {
      first_name: diagnosticData.first_name,
      last_name: diagnosticData.last_name,
      coworking_name: diagnosticData.coworking_name,
      email: diagnosticData.email,
      created_at: diagnosticData.created_at,
      global_score: diagnosticData.global_score,
      global_level: diagnosticData.global_level,
      global_recommendation: diagnosticData.global_recommendation,
      // Scores par section
      acquisition_score: diagnosticData.acquisition_score,
      activation_score: diagnosticData.activation_score,
      retention_score: diagnosticData.retention_score,
      revenus_score: diagnosticData.revenus_score,
      recommandation_score: diagnosticData.recommandation_score,
      // Niveaux par section
      acquisition_level: diagnosticData.acquisition_level,
      activation_level: diagnosticData.activation_level,
      retention_level: diagnosticData.retention_level,
      revenus_level: diagnosticData.revenus_level,
      recommandation_level: diagnosticData.recommandation_level,
      // Recommandations par section
      acquisition_recommendation: diagnosticData.acquisition_recommendation,
      activation_recommendation: diagnosticData.activation_recommendation,
      retention_recommendation: diagnosticData.retention_recommendation,
      revenus_recommendation: diagnosticData.revenus_recommendation,
      recommandation_recommendation: diagnosticData.recommandation_recommendation,
      // Réponses formatées
      ...formatAnswersForBaserow(diagnosticData.answers)
    };

    console.log('Données formatées pour Baserow:', baserowData);

    // Récupérer le token Baserow depuis les variables d'environnement
    const BASEROW_TOKEN = Deno.env.get('BASEROW_TOKEN');
    if (!BASEROW_TOKEN) {
      throw new Error('BASEROW_TOKEN non défini');
    }

    // Envoyer les données à Baserow
    const baserowResponse = await fetch('https://api.baserow.io/api/database/rows/table/451692/?user_field_names=true', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${BASEROW_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(baserowData)
    });

    if (!baserowResponse.ok) {
      console.error('Erreur Baserow:', await baserowResponse.text());
      throw new Error(`Erreur lors de l'envoi à Baserow: ${baserowResponse.statusText}`);
    }

    console.log('Données envoyées avec succès à Baserow');

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Erreur:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
})

