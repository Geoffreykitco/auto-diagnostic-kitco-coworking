
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const data = await req.json()
    console.log('Received diagnostic data:', data)

    const baserowToken = Deno.env.get('BASEROW_TOKEN')
    if (!baserowToken) {
      throw new Error('Baserow token not configured')
    }

    // Map data to Baserow field names
    const baserowData = {
      "Name": data.fullName,
      "Email": data.email,
      "Nom coworking": data.coworking_name,
      "Notre score global": data.global_score,
      "Niveau score global": data.global_level,
      "Texte score global": data.global_recommendation,
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
      "Texte Recommandation": data.recommandation_recommendation
    }

    console.log('Sending to Baserow:', baserowData)

    const response = await fetch('https://api.baserow.io/api/database/rows/table/451692/?user_field_names=true', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${baserowToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(baserowData)
    })

    const responseData = await response.json()
    console.log('Baserow response:', responseData)

    if (!response.ok) {
      console.error('Baserow error:', responseData)
      throw new Error('Failed to save diagnostic data')
    }

    return new Response(
      JSON.stringify({ success: true, data: responseData }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error:', error.message)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
