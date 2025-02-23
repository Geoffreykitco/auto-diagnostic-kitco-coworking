
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { corsHeaders } from '../_shared/cors.ts'

console.log("Fonction save-diagnostic initialisée")

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log("=== DÉBUT DU TRAITEMENT DE LA REQUÊTE ===")
    const payload = await req.json()
    console.log("Données reçues du frontend:", JSON.stringify(payload, null, 2))

    const BASEROW_TOKEN = Deno.env.get('BASEROW_TOKEN')
    if (!BASEROW_TOKEN) {
      throw new Error("Configuration manquante : BASEROW_TOKEN")
    }

    // Test du token Baserow
    console.log("=== TEST DE L'AUTHENTIFICATION BASEROW ===")
    const testResponse = await fetch('https://api.baserow.io/api/database/tables/', {
      headers: {
        'Authorization': `Token ${BASEROW_TOKEN}`
      }
    })
    console.log("Test d'authentification Baserow:", testResponse.status)
    if (!testResponse.ok) {
      throw new Error(`Erreur d'authentification Baserow: ${testResponse.status}`)
    }

    console.log("=== ENVOI DES DONNÉES À BASEROW ===")
    const baserowResponse = await fetch(
      'https://api.baserow.io/api/database/rows/table/252224/?user_field_names=true',
      {
        method: 'POST',
        headers: {
          'Authorization': `Token ${BASEROW_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }
    )

    console.log("Status Baserow:", baserowResponse.status)
    const baserowData = await baserowResponse.json()
    console.log("Réponse Baserow:", JSON.stringify(baserowData, null, 2))

    if (!baserowResponse.ok) {
      throw new Error(`Erreur Baserow: ${baserowResponse.status} - ${JSON.stringify(baserowData)}`)
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        data: baserowData
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error("=== ERREUR ===")
    console.error(error.message)
    
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    )
  }
})
