
import { corsHeaders } from '../_shared/cors.ts'

Deno.serve(async (req) => {
  console.log('=== DÉBUT DE LA FONCTION ===');

  try {
    if (req.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders })
    }

    const payload = await req.json();
    console.log('Payload reçu:', JSON.stringify(payload, null, 2));

    // Récupération du token Baserow depuis les variables d'environnement
    const BASEROW_TOKEN = Deno.env.get('BASEROW_TOKEN');
    if (!BASEROW_TOKEN) {
      console.error('Token Baserow manquant');
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Configuration error: Token Baserow manquant' 
        }),
        { 
          status: 200,
          headers: { 
            ...corsHeaders,
            'Content-Type': 'application/json'
          }
        }
      );
    }

    console.log('Token Baserow présent:', !!BASEROW_TOKEN);

    // Préparation des données pour Baserow avec les noms de champs standardisés
    const baserowData = {
      name: `${payload.first_name} ${payload.last_name}`.trim(),
      email: String(payload.email),
      company: String(payload.coworking_name),
      info_anciennete: String(payload.answers.info_anciennete || ''),
      info_type_bureaux: String(payload.answers.info_type_bureaux || ''),
      info_type_abonnement: String(payload.answers.info_type_abonnement || ''),
      info_statut: String(payload.answers.info_statut || ''),
      info_superficie: String(payload.answers.info_superficie || ''),
      info_concurrence: String(payload.answers.info_concurrence || ''),
      info_capacite: String(payload.answers.info_capacite || ''),
      info_ville: String(payload.answers.info_ville || ''),
      info_horaires: String(payload.answers.info_horaires || ''),
      info_remplissage: String(payload.answers.info_remplissage || ''),
      info_type_clientele: String(payload.answers.info_type_clientele || ''),
      info_services: String(payload.answers.info_services || ''),
      acquisition_canaux: String(payload.answers.acq_canaux_utilises || ''),
      acquisition_frequence: String(payload.answers.acq_frequence_actions || ''),
      acquisition_offre: String(payload.answers.acq_offre_decouverte || ''),
      acquisition_suivi: String(payload.answers.acq_suivi_prospects || ''),
      acquisition_avis: String(payload.answers.acq_avis_clients || ''),
      activation_decouverte: String(payload.answers.act_decouverte_espace || ''),
      activation_onboarding: String(payload.answers.act_processus_onboarding || ''),
      activation_offres: String(payload.answers.act_clartes_offres || ''),
      activation_relance: String(payload.answers.act_relance_prospects || ''),
      activation_decision: String(payload.answers.act_action_decision || ''),
      retention_frequentation: String(payload.answers.ret_frequentation_reguliere || ''),
      retention_fidelite: String(payload.answers.ret_programme_fidelite || ''),
      retention_evenements: String(payload.answers.ret_organisation_evenements || ''),
      retention_retours: String(payload.answers.ret_retours_membres || ''),
      retention_amelioration: String(payload.answers.ret_amelioration_experience || ''),
      revenus_sources: String(payload.answers.rev_source_revenus || ''),
      revenus_rentabilite: String(payload.answers.rev_rentabilite_offres || ''),
      revenus_crm: String(payload.answers.rev_utilisation_crm || ''),
      revenus_conversion: String(payload.answers.rev_optimisation_conversion || ''),
      revenus_nouvelles_sources: String(payload.answers.rev_nouvelles_sources || ''),
      recommandation_spontanee: String(payload.answers.rec_recommandation_spontanee || ''),
      recommandation_parrainage: String(payload.answers.rec_programme_parrainage || ''),
      recommandation_avis: String(payload.answers.rec_utilisation_avis || ''),
      recommandation_communication: String(payload.answers.rec_participation_communication || ''),
      recommandation_contenu: String(payload.answers.rec_creation_contenu || ''),
      score_global: String(payload.global_score || '0'),
      niveau_global: String(payload.global_level || ''),
      recommendation_globale: String(payload.global_recommendation || ''),
      score_acquisition: String(payload.acquisition_score || '0'),
      niveau_acquisition: String(payload.acquisition_level || ''),
      recommendation_acquisition: String(payload.acquisition_recommendation || ''),
      score_activation: String(payload.activation_score || '0'),
      niveau_activation: String(payload.activation_level || ''),
      recommendation_activation: String(payload.activation_recommendation || ''),
      score_retention: String(payload.retention_score || '0'),
      niveau_retention: String(payload.retention_level || ''),
      recommendation_retention: String(payload.retention_recommendation || ''),
      score_revenus: String(payload.revenus_score || '0'),
      niveau_revenus: String(payload.revenus_level || ''),
      recommendation_revenus: String(payload.revenus_recommendation || ''),
      score_recommandation: String(payload.recommandation_score || '0'),
      niveau_recommandation: String(payload.recommandation_level || ''),
      recommendation_recommandation: String(payload.recommandation_recommendation || '')
    };

    console.log('=== ENVOI À BASEROW ===');
    console.log('URL:', `https://api.baserow.io/api/database/rows/table/451692/`);
    console.log('Méthode:', 'POST');
    console.log('Headers:', {
      'Authorization': 'Token [MASQUÉ]',
      'Content-Type': 'application/json'
    });
    console.log('Données:', JSON.stringify(baserowData, null, 2));

    const baserowResponse = await fetch(
      `https://api.baserow.io/api/database/rows/table/451692/`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Token ${BASEROW_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(baserowData)
      }
    );

    console.log('Status Baserow:', baserowResponse.status);
    const responseData = await baserowResponse.json();
    console.log('Réponse Baserow:', JSON.stringify(responseData, null, 2));

    if (!baserowResponse.ok) {
      const errorMessage = responseData.error || 'Erreur inconnue';
      const detailMessage = responseData.detail || '';
      console.error('Erreur Baserow:', { error: errorMessage, detail: detailMessage });
      
      if (errorMessage === 'ERROR_NO_PERMISSION_TO_TABLE') {
        return new Response(
          JSON.stringify({ 
            success: false, 
            error: 'Le token Baserow n\'a pas les permissions nécessaires pour accéder à la table. Veuillez vérifier les droits du token.' 
          }),
          { 
            status: 200,
            headers: { 
              ...corsHeaders,
              'Content-Type': 'application/json'
            }
          }
        );
      }
      
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: `Erreur Baserow: ${errorMessage}. ${detailMessage}` 
        }),
        { 
          status: 200,
          headers: { 
            ...corsHeaders,
            'Content-Type': 'application/json'
          }
        }
      );
    }

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
    console.error('=== ERREUR ===');
    console.error('Type:', error.name);
    console.error('Message:', error.message);
    console.error('Stack:', error.stack);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: `Erreur serveur: ${error.message}` 
      }),
      { 
        status: 200,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  }
});
