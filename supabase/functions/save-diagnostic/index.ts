
import { corsHeaders } from '../_shared/cors.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const payload = await req.json()
    console.log('Données reçues:', JSON.stringify(payload, null, 2))

    // Validation basique des données requises
    const requiredFields = ['first_name', 'last_name', 'email', 'coworking_name', 'answers']
    for (const field of requiredFields) {
      if (!payload[field]) {
        throw new Error(`Le champ ${field} est manquant`)
      }
    }

    // Configuration de la requête Baserow
    const baserowToken = Deno.env.get('BASEROW_TOKEN')
    if (!baserowToken) {
      throw new Error('Token Baserow manquant')
    }

    const baserowData = {
      Prénom: payload.first_name,
      Nom: payload.last_name,
      Email: payload.email,
      "Nom du coworking": payload.coworking_name,
      "Score global": payload.global_score,
      "Niveau global": payload.global_level,
      "Recommandation globale": payload.global_recommendation,
      
      // Scores par section
      "Score Acquisition": payload.acquisition_score,
      "Score Activation": payload.activation_score,
      "Score Rétention": payload.retention_score,
      "Score Revenus": payload.revenus_score,
      "Score Recommandation": payload.recommandation_score,
      
      // Niveaux par section
      "Niveau Acquisition": payload.acquisition_level,
      "Niveau Activation": payload.activation_level,
      "Niveau Rétention": payload.retention_level,
      "Niveau Revenus": payload.revenus_level,
      "Niveau Recommandation": payload.recommandation_level,
      
      // Réponses de la section Informations
      Ancienneté: payload.answers.info_anciennete,
      "Type de bureaux": payload.answers.info_type_bureaux?.join(', ') || '',
      "Type d'abonnement": payload.answers.info_type_abonnement?.join(', ') || '',
      Statut: payload.answers.info_statut?.join(', ') || '',
      Superficie: payload.answers.info_superficie,
      Concurrence: payload.answers.info_concurrence,
      Capacité: payload.answers.info_capacite,
      Ville: payload.answers.info_ville,
      Horaires: payload.answers.info_horaires,
      "Taux de remplissage": payload.answers.info_remplissage,
      "Type de clientèle": payload.answers.info_type_clientele?.join(', ') || '',
      Services: payload.answers.info_services?.join(', ') || '',
      
      // Réponses de la section Recommandation
      "Recommandation spontanée": payload.answers.rec_recommandation_spontanee,
      "Programme de parrainage": payload.answers.rec_programme_parrainage,
      "Utilisation des avis": payload.answers.rec_utilisation_avis,
      "Participation communication": payload.answers.rec_participation_communication,
      "Création de contenu": payload.answers.rec_creation_contenu,
      
      // Réponses de la section Acquisition
      "Canaux utilisés": payload.answers.acq_canaux_utilises?.join(', ') || '',
      "Fréquence des actions": payload.answers.acq_frequence_actions,
      "Offre découverte": payload.answers.acq_offre_decouverte,
      "Suivi prospects": payload.answers.acq_suivi_prospects,
      "Avis clients": payload.answers.acq_avis_clients,
      
      // Réponses de la section Activation
      "Découverte espace": payload.answers.act_decouverte_espace,
      "Processus onboarding": payload.answers.act_processus_onboarding,
      "Clarté des offres": payload.answers.act_clartes_offres,
      "Relance prospects": payload.answers.act_relance_prospects,
      "Action décision": payload.answers.act_action_decision,
      
      // Réponses de la section Rétention
      "Fréquentation régulière": payload.answers.ret_frequentation_reguliere,
      "Programme fidélité": payload.answers.ret_programme_fidelite,
      "Organisation événements": payload.answers.ret_organisation_evenements,
      "Retours membres": payload.answers.ret_retours_membres,
      "Amélioration expérience": payload.answers.ret_amelioration_experience,
      
      // Réponses de la section Revenus
      "Sources de revenus": payload.answers.rev_source_revenus?.join(', ') || '',
      "Rentabilité offres": payload.answers.rev_rentabilite_offres,
      "Utilisation CRM": payload.answers.rev_utilisation_crm,
      "Optimisation conversion": payload.answers.rev_optimisation_conversion,
      "Nouvelles sources": payload.answers.rev_nouvelles_sources
    }

    console.log('Données formatées pour Baserow:', JSON.stringify(baserowData, null, 2))

    // Envoi à Baserow
    const baserowResponse = await fetch(
      'https://api.baserow.io/api/database/rows/table/211223/?user_field_names=true',
      {
        method: 'POST',
        headers: {
          'Authorization': `Token ${baserowToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(baserowData)
      }
    )

    if (!baserowResponse.ok) {
      const errorText = await baserowResponse.text()
      console.error('Erreur Baserow:', errorText)
      throw new Error(`Erreur Baserow: ${baserowResponse.status} ${errorText}`)
    }

    const baserowResult = await baserowResponse.json()
    console.log('Réponse Baserow:', JSON.stringify(baserowResult, null, 2))

    return new Response(
      JSON.stringify({ success: true }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    )

  } catch (error) {
    console.error('Erreur complète:', error)
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
    )
  }
})

