
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
      "fullName": `${data.first_name} ${data.last_name}`,
      "email": data.email,
      "coworking_name": data.coworking_name,
      
      // Scores et recommandations
      "global_score": data.global_score,
      "global_level": data.global_level,
      "global_recommendation": data.global_recommendation,
      
      "acquisition_score": data.acquisition_score,
      "acquisition_level": data.acquisition_level,
      "acquisition_recommendation": data.acquisition_recommendation,
      
      "activation_score": data.activation_score,
      "activation_level": data.activation_level,
      "activation_recommendation": data.activation_recommendation,
      
      "retention_score": data.retention_score,
      "retention_level": data.retention_level,
      "retention_recommendation": data.retention_recommendation,
      
      "revenus_score": data.revenus_score,
      "revenus_level": data.revenus_level,
      "revenus_recommendation": data.revenus_recommendation,
      
      "recommandation_score": data.recommandation_score,
      "recommandation_level": data.recommandation_level,
      "recommandation_recommendation": data.recommandation_recommendation,
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
    const responseText = await baserowResponse.text()
    console.log('Raw Baserow response:', responseText)
    
    // Try to parse the response as JSON if possible
    let responseData
    try {
      responseData = JSON.parse(responseText)
      console.log(`Baserow API response (${baserowResponse.status}):`, JSON.stringify(responseData, null, 2))
    } catch (e) {
      console.log('Response is not JSON:', responseText)
    }

    // Check for errors
    if (!baserowResponse.ok) {
      throw new Error(`Baserow API error (${baserowResponse.status}): ${responseText}`)
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
