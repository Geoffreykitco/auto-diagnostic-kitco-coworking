
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const getSectionAnswer = (data: any, section: string, questionIndex: number) => {
  const answer = data.answers?.[section]?.[questionIndex]
  if (!answer) return null
  
  if (Array.isArray(answer.value)) {
    return answer.value.map(index => data.sections[section].questions[questionIndex].options[index].label).join(', ')
  } else if (typeof answer.value === 'number') {
    return data.sections[section].questions[questionIndex].options[answer.value].label
  }
  return answer.value
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const data = await req.json()
    console.log('Received diagnostic data:', JSON.stringify(data, null, 2))

    const baserowToken = Deno.env.get('BASEROW_TOKEN')
    console.log('Baserow token present:', !!baserowToken)
    
    if (!baserowToken) {
      throw new Error('BASEROW_TOKEN is not configured in environment variables')
    }

    // Récupération des réponses de la section informations
    const ouverture = getSectionAnswer(data, 'informations', 0)
    const typesBureaux = getSectionAnswer(data, 'informations', 1)
    const typesAbonnements = getSectionAnswer(data, 'informations', 2)
    const statut = getSectionAnswer(data, 'informations', 3)
    const superficie = getSectionAnswer(data, 'informations', 4)
    const concurrence = getSectionAnswer(data, 'informations', 5)
    const capacite = getSectionAnswer(data, 'informations', 6)
    const ville = getSectionAnswer(data, 'informations', 7)
    const horaires = getSectionAnswer(data, 'informations', 8)
    const tauxRemplissage = getSectionAnswer(data, 'informations', 9)
    const typeClientele = getSectionAnswer(data, 'informations', 10)
    const services = getSectionAnswer(data, 'informations', 11)

    // Acquisition
    const acq_canaux = getSectionAnswer(data, 'acquisition', 0)
    const acq_frequence = getSectionAnswer(data, 'acquisition', 1)
    const acq_offre_decouverte = getSectionAnswer(data, 'acquisition', 2)
    const acq_suivi_prospects = getSectionAnswer(data, 'acquisition', 3)
    const acq_avis_clients = getSectionAnswer(data, 'acquisition', 4)

    // Activation
    const act_visite = getSectionAnswer(data, 'activation', 0)
    const act_onboarding = getSectionAnswer(data, 'activation', 1)
    const act_offres = getSectionAnswer(data, 'activation', 2)
    const act_relance = getSectionAnswer(data, 'activation', 3)
    const act_conversion = getSectionAnswer(data, 'activation', 4)

    // Rétention
    const ret_regularite = getSectionAnswer(data, 'retention', 0)
    const ret_fidelite = getSectionAnswer(data, 'retention', 1)
    const ret_evenements = getSectionAnswer(data, 'retention', 2)
    const ret_feedback = getSectionAnswer(data, 'retention', 3)
    const ret_experience = getSectionAnswer(data, 'retention', 4)

    // Revenus
    const rev_sources = getSectionAnswer(data, 'revenus', 0)
    const rev_rentabilite = getSectionAnswer(data, 'revenus', 1)
    const rev_crm = getSectionAnswer(data, 'revenus', 2)
    const rev_conversion = getSectionAnswer(data, 'revenus', 3)
    const rev_nouveaux = getSectionAnswer(data, 'revenus', 4)

    // Recommandation
    const rec_spontane = getSectionAnswer(data, 'recommandation', 0)
    const rec_parrainage = getSectionAnswer(data, 'recommandation', 1)
    const rec_avis = getSectionAnswer(data, 'recommandation', 2)
    const rec_communication = getSectionAnswer(data, 'recommandation', 3)
    const rec_contenu = getSectionAnswer(data, 'recommandation', 4)

    const baserowData = {
      "fullName": `${data.first_name} ${data.last_name}`,
      "email": data.email,
      "coworking_name": data.coworking_name,
      
      // Informations générales
      "anciennete": ouverture,
      "types_bureaux": typesBureaux,
      "types_abonnements": typesAbonnements,
      "statut_propriete": statut,
      "superficie": superficie,
      "concurrence": concurrence,
      "capacite": capacite,
      "ville": ville,
      "horaires": horaires,
      "taux_remplissage": tauxRemplissage,
      "type_clientele": typeClientele,
      "services": services,
      
      // Scores et recommandations globales
      "global_score": data.global_score,
      "global_level": data.global_level,
      "global_recommendation": data.global_recommendation,
      
      // Acquisition
      "acquisition_score": data.acquisition_score,
      "acquisition_level": data.acquisition_level,
      "acquisition_recommendation": data.acquisition_recommendation,
      "acq_canaux": acq_canaux,
      "acq_frequence": acq_frequence,
      "acq_offre_decouverte": acq_offre_decouverte,
      "acq_suivi_prospects": acq_suivi_prospects,
      "acq_avis_clients": acq_avis_clients,
      
      // Activation
      "activation_score": data.activation_score,
      "activation_level": data.activation_level,
      "activation_recommendation": data.activation_recommendation,
      "act_visite": act_visite,
      "act_onboarding": act_onboarding,
      "act_offres": act_offres,
      "act_relance": act_relance,
      "act_conversion": act_conversion,
      
      // Rétention
      "retention_score": data.retention_score,
      "retention_level": data.retention_level,
      "retention_recommendation": data.retention_recommendation,
      "ret_regularite": ret_regularite,
      "ret_fidelite": ret_fidelite,
      "ret_evenements": ret_evenements,
      "ret_feedback": ret_feedback,
      "ret_experience": ret_experience,
      
      // Revenus
      "revenus_score": data.revenus_score,
      "revenus_level": data.revenus_level,
      "revenus_recommendation": data.revenus_recommendation,
      "rev_sources": rev_sources,
      "rev_rentabilite": rev_rentabilite,
      "rev_crm": rev_crm,
      "rev_conversion": rev_conversion,
      "rev_nouveaux": rev_nouveaux,
      
      // Recommandation
      "recommandation_score": data.recommandation_score,
      "recommandation_level": data.recommandation_level,
      "recommandation_recommendation": data.recommandation_recommendation,
      "rec_spontane": rec_spontane,
      "rec_parrainage": rec_parrainage,
      "rec_avis": rec_avis,
      "rec_communication": rec_communication,
      "rec_contenu": rec_contenu,
    }

    console.log('Données formatées pour Baserow:', JSON.stringify(baserowData, null, 2))

    const baserowResponse = await fetch(
      'https://api.baserow.io/api/database/rows/table/451692/?user_field_names=true',
      {
        method: 'POST',
        headers: {
          'Authorization': `Token ${baserowToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(baserowData)
      }
    )

    const responseText = await baserowResponse.text()
    console.log('Raw Baserow response:', responseText)
    
    let responseData
    try {
      responseData = JSON.parse(responseText)
      console.log(`Baserow API response (${baserowResponse.status}):`, JSON.stringify(responseData, null, 2))
    } catch (e) {
      console.log('Response is not JSON:', responseText)
    }

    if (!baserowResponse.ok) {
      throw new Error(`Baserow API error (${baserowResponse.status}): ${responseText}`)
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        data: responseData 
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )

  } catch (error) {
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      cause: error.cause
    })

    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        details: error.toString()
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        }, 
        status: 500 
      }
    )
  }
})
