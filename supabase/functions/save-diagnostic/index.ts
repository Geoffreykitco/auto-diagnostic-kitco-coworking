
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

    console.log('Préparation de la requête Baserow...');

    // Préparation des données pour Baserow - on s'assure que toutes les valeurs sont des strings
    const baserowData = {
      fullName: `${payload.first_name} ${payload.last_name}`.trim(),
      email: String(payload.email),
      coworking_name: String(payload.coworking_name),
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
      acq_canaux_utilises: String(payload.answers.acq_canaux_utilises || ''),
      acq_frequence_actions: String(payload.answers.acq_frequence_actions || ''),
      acq_offre_decouverte: String(payload.answers.acq_offre_decouverte || ''),
      acq_suivi_prospects: String(payload.answers.acq_suivi_prospects || ''),
      acq_avis_clients: String(payload.answers.acq_avis_clients || ''),
      act_decouverte_espace: String(payload.answers.act_decouverte_espace || ''),
      act_processus_onboarding: String(payload.answers.act_processus_onboarding || ''),
      act_clartes_offres: String(payload.answers.act_clartes_offres || ''),
      act_relance_prospects: String(payload.answers.act_relance_prospects || ''),
      act_action_decision: String(payload.answers.act_action_decision || ''),
      ret_frequentation_reguliere: String(payload.answers.ret_frequentation_reguliere || ''),
      ret_programme_fidelite: String(payload.answers.ret_programme_fidelite || ''),
      ret_organisation_evenements: String(payload.answers.ret_organisation_evenements || ''),
      ret_retours_membres: String(payload.answers.ret_retours_membres || ''),
      ret_amelioration_experience: String(payload.answers.ret_amelioration_experience || ''),
      rev_source_revenus: String(payload.answers.rev_source_revenus || ''),
      rev_rentabilite_offres: String(payload.answers.rev_rentabilite_offres || ''),
      rev_utilisation_crm: String(payload.answers.rev_utilisation_crm || ''),
      rev_optimisation_conversion: String(payload.answers.rev_optimisation_conversion || ''),
      rev_nouvelles_sources: String(payload.answers.rev_nouvelles_sources || ''),
      rec_recommandation_spontanee: String(payload.answers.rec_recommandation_spontanee || ''),
      rec_programme_parrainage: String(payload.answers.rec_programme_parrainage || ''),
      rec_utilisation_avis: String(payload.answers.rec_utilisation_avis || ''),
      rec_participation_communication: String(payload.answers.rec_participation_communication || ''),
      rec_creation_contenu: String(payload.answers.rec_creation_contenu || ''),
      global_score: String(payload.global_score || '0'),
      global_level: String(payload.global_level || ''),
      global_recommendation: String(payload.global_recommendation || ''),
      acquisition_score: String(payload.acquisition_score || '0'),
      acquisition_level: String(payload.acquisition_level || ''),
      acquisition_recommendation: String(payload.acquisition_recommendation || ''),
      activation_score: String(payload.activation_score || '0'),
      activation_level: String(payload.activation_level || ''),
      activation_recommendation: String(payload.activation_recommendation || ''),
      retention_score: String(payload.retention_score || '0'),
      retention_level: String(payload.retention_level || ''),
      retention_recommendation: String(payload.retention_recommendation || ''),
      revenus_score: String(payload.revenus_score || '0'),
      revenus_level: String(payload.revenus_level || ''),
      revenus_recommendation: String(payload.revenus_recommendation || ''),
      recommandation_score: String(payload.recommandation_score || '0'),
      recommandation_level: String(payload.recommandation_level || ''),
      recommandation_recommendation: String(payload.recommandation_recommendation || '')
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
      console.error('Erreur Baserow:', responseData);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: `Erreur Baserow: ${JSON.stringify(responseData)}` 
        }),
        { 
          status: 200, // On renvoie 200 même en cas d'erreur Baserow
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
        status: 200, // On renvoie 200 même en cas d'erreur
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  }
});
