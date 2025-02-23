
import { corsHeaders } from '../_shared/cors.ts'

Deno.serve(async (req) => {
  console.log('=== DÉBUT DE LA FONCTION ===');

  try {
    if (req.method === 'OPTIONS') {
      return new Response('ok', { headers: corsHeaders })
    }

    const payload = await req.json();
    console.log('Payload reçu:', JSON.stringify(payload, null, 2));

    // Récupération du token Baserow depuis les variables d'environnement
    const BASEROW_TOKEN = Deno.env.get('BASEROW_TOKEN');
    if (!BASEROW_TOKEN) {
      throw new Error('Token Baserow non configuré');
    }

    console.log('Préparation de la requête Baserow...');

    // Préparation des données pour Baserow
    const baserowData = {
      fullName: payload.first_name + ' ' + payload.last_name,
      email: payload.email,
      coworking_name: payload.coworking_name,
      info_anciennete: payload.answers.info_anciennete,
      info_type_bureaux: payload.answers.info_type_bureaux,
      info_type_abonnement: payload.answers.info_type_abonnement,
      info_statut: payload.answers.info_statut,
      info_superficie: payload.answers.info_superficie,
      info_concurrence: payload.answers.info_concurrence,
      info_capacite: payload.answers.info_capacite,
      info_ville: payload.answers.info_ville,
      info_horaires: payload.answers.info_horaires,
      info_remplissage: payload.answers.info_remplissage,
      info_type_clientele: payload.answers.info_type_clientele,
      info_services: payload.answers.info_services,
      acq_canaux_utilises: payload.answers.acq_canaux_utilises,
      acq_frequence_actions: payload.answers.acq_frequence_actions,
      acq_offre_decouverte: payload.answers.acq_offre_decouverte,
      acq_suivi_prospects: payload.answers.acq_suivi_prospects,
      acq_avis_clients: payload.answers.acq_avis_clients,
      act_decouverte_espace: payload.answers.act_decouverte_espace,
      act_processus_onboarding: payload.answers.act_processus_onboarding,
      act_clartes_offres: payload.answers.act_clartes_offres,
      act_relance_prospects: payload.answers.act_relance_prospects,
      act_action_decision: payload.answers.act_action_decision,
      ret_frequentation_reguliere: payload.answers.ret_frequentation_reguliere,
      ret_programme_fidelite: payload.answers.ret_programme_fidelite,
      ret_organisation_evenements: payload.answers.ret_organisation_evenements,
      ret_retours_membres: payload.answers.ret_retours_membres,
      ret_amelioration_experience: payload.answers.ret_amelioration_experience,
      rev_source_revenus: payload.answers.rev_source_revenus,
      rev_rentabilite_offres: payload.answers.rev_rentabilite_offres,
      rev_utilisation_crm: payload.answers.rev_utilisation_crm,
      rev_optimisation_conversion: payload.answers.rev_optimisation_conversion,
      rev_nouvelles_sources: payload.answers.rev_nouvelles_sources,
      rec_recommandation_spontanee: payload.answers.rec_recommandation_spontanee,
      rec_programme_parrainage: payload.answers.rec_programme_parrainage,
      rec_utilisation_avis: payload.answers.rec_utilisation_avis,
      rec_participation_communication: payload.answers.rec_participation_communication,
      rec_creation_contenu: payload.answers.rec_creation_contenu,
      global_score: payload.global_score,
      global_level: payload.global_level,
      global_recommendation: payload.global_recommendation,
      acquisition_score: payload.acquisition_score,
      acquisition_level: payload.acquisition_level,
      acquisition_recommendation: payload.acquisition_recommendation,
      activation_score: payload.activation_score,
      activation_level: payload.activation_level,
      activation_recommendation: payload.activation_recommendation,
      retention_score: payload.retention_score,
      retention_level: payload.retention_level,
      retention_recommendation: payload.retention_recommendation,
      revenus_score: payload.revenus_score,
      revenus_level: payload.revenus_level,
      revenus_recommendation: payload.revenus_recommendation,
      recommandation_score: payload.recommandation_score,
      recommandation_level: payload.recommandation_level,
      recommandation_recommendation: payload.recommandation_recommendation
    };

    console.log('Données formatées pour Baserow:', JSON.stringify(baserowData, null, 2));

    // Envoi à Baserow
    console.log('Envoi à Baserow...');
    const baserowResponse = await fetch(
      'https://api.baserow.io/api/database/rows/table/138039/?user_field_names=true',
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
      throw new Error(`Erreur Baserow: ${await baserowResponse.text()}`);
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
        error: error.message 
      }),
      { 
        status: 400,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  }
});
