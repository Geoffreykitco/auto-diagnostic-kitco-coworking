import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { corsHeaders } from '../_shared/cors.ts'

console.log('Hello from save-to-baserow!')

interface DiagnosticData {
  first_name: string
  last_name: string
  coworking_name: string
  email: string
  global_score: number
  global_level: string
  acquisition_score?: number
  activation_score?: number
  retention_score?: number
  revenus_score?: number
  recommandation_score?: number
  // ... et tous les champs de réponses formatés
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const BASEROW_TOKEN = Deno.env.get('BASEROW_TOKEN')
    if (!BASEROW_TOKEN) {
      throw new Error('BASEROW_TOKEN is required')
    }

    const data: DiagnosticData = await req.json()
    console.log('Received diagnostic data:', data)

    // Format data for Baserow
    const baserowData = {
      "Prénom": data.first_name,
      "Nom": data.last_name,
      "Espace de coworking": data.coworking_name,
      "Email": data.email,
      "Score Global": data.global_score,
      "Niveau Global": data.global_level,
      "Score Acquisition": data.acquisition_score,
      "Score Activation": data.activation_score,
      "Score Rétention": data.retention_score,
      "Score Revenus": data.revenus_score,
      "Score Recommandation": data.recommandation_score,
      "Date de diagnostic": new Date().toISOString(),
    }

    // Send to Baserow - Replace TABLE_ID with your actual table ID
    const TABLE_ID = '188869' // ID de la table Baserow
    const response = await fetch(`https://api.baserow.io/api/database/rows/table/${TABLE_ID}/?user_field_names=true`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${BASEROW_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(baserowData)
    })

    if (!response.ok) {
      throw new Error(`Baserow API error: ${response.status} ${response.statusText}`)
    }

    const result = await response.json()
    console.log('Successfully sent to Baserow:', result)

    return new Response(
      JSON.stringify({ success: true, message: 'Data sent to Baserow' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
