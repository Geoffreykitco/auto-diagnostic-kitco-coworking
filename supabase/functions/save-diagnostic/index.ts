
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Parse and validate input data
    const data = await req.json()
    console.log('Received diagnostic data:', JSON.stringify(data, null, 2))

    // Verify token exists
    const baserowToken = Deno.env.get('BASEROW_TOKEN')
    console.log('Baserow token present:', !!baserowToken)
    
    if (!baserowToken) {
      throw new Error('BASEROW_TOKEN is not configured in environment variables')
    }

    // Formater les données pour Baserow en respectant exactement les noms des colonnes
    const baserowData = {
      "Name": `${data.first_name} ${data.last_name}`,
      "Email": data.email,
      "Nom coworking": data.coworking_name,
      
      // Informations
      "info_anciennete": Array.isArray(data.answers?.informations?.[0]?.value) 
        ? data.answers.informations[0].value[0] 
        : data.answers?.informations?.[0]?.value,
      "info_type_bureaux": Array.isArray(data.answers?.informations?.[1]?.value) 
        ? data.answers.informations[1].value 
        : [],
      "info_type_abonnements": Array.isArray(data.answers?.informations?.[2]?.value) 
        ? data.answers.informations[2].value 
        : [],
      "info_statut_espace": Array.isArray(data.answers?.informations?.[3]?.value) 
        ? data.answers.informations[3].value[0] 
        : data.answers?.informations?.[3]?.value,
      "info_superficie": Array.isArray(data.answers?.informations?.[4]?.value) 
        ? data.answers.informations[4].value[0] 
        : data.answers?.informations?.[4]?.value,
      "info_concurrence": Array.isArray(data.answers?.informations?.[5]?.value) 
        ? data.answers.informations[5].value[0] 
        : data.answers?.informations?.[5]?.value,
      "info_capacite": Array.isArray(data.answers?.informations?.[6]?.value) 
        ? data.answers.informations[6].value[0] 
        : data.answers?.informations?.[6]?.value,
      "info_ville": data.answers?.informations?.[7]?.value,
      "info_horaires": Array.isArray(data.answers?.informations?.[8]?.value) 
        ? data.answers.informations[8].value[0] 
        : data.answers?.informations?.[8]?.value,
      "info_remplissage": data.answers?.informations?.[9]?.value,
      "info_type_clientele": Array.isArray(data.answers?.informations?.[10]?.value) 
        ? data.answers.informations[10].value 
        : [],
      "info_services_proposes": Array.isArray(data.answers?.informations?.[11]?.value) 
        ? data.answers.informations[11].value 
        : [],

      // Scores et recommandations
      "Note Acquisition": data.acquisition_score,
      "Niveau Acquisition": data.acquisition_level,
      "Texte Acquisition": data.acquisition_recommendation,
      
      "Note Activation": data.activation_score,
      "Niveau Activation": data.activation_level,
      "Texte Activation": data.activation_recommendation,
      
      "Note Rétention": data.retention_score,
      "Niveau Rétention": data.retention_level,
      "Texte Rétention": data.retention_recommendation,
      
      "Note Revenus": data.revenus_score,
      "Niveau Revenus": data.revenus_level,
      "Texte Revenus": data.revenus_recommendation,
      
      "Note Recommandation": data.recommandation_score,
      "Niveau Recommandation": data.recommandation_level,
      "Texte Recommandation": data.recommandation_recommendation,
      
      "Notre score global": data.global_score,
      "Niveau score global": data.global_level,
      "Texte score global": data.global_recommendation,
    }

    console.log('Données formatées pour Baserow:', JSON.stringify(baserowData, null, 2))

    // Make request to Baserow
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

    // Parse response
    const responseData = await baserowResponse.json()
    console.log(`Baserow API response (${baserowResponse.status}):`, JSON.stringify(responseData, null, 2))

    // Check for errors
    if (!baserowResponse.ok) {
      throw new Error(`Baserow API error (${baserowResponse.status}): ${JSON.stringify(responseData)}`)
    }

    // Return success response
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
    // Log detailed error information
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      cause: error.cause
    })

    // Return error response
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
