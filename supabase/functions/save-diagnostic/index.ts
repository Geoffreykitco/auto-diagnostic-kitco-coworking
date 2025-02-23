
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { corsHeaders } from '../_shared/cors.ts'

console.log("Fonction save-diagnostic initialisée")

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log("=== DÉBUT DU TRAITEMENT DE LA REQUÊTE ===")
    const payload = await req.json()
    console.log("Données reçues du frontend:", JSON.stringify(payload, null, 2))

    const BASEROW_TOKEN = Deno.env.get('BASEROW_TOKEN')
    if (!BASEROW_TOKEN) {
      console.error("Token Baserow manquant")
      throw new Error("Configuration manquante : BASEROW_TOKEN")
    }
    console.log("Token Baserow trouvé:", BASEROW_TOKEN.substring(0, 5) + "...")

    // Log de la requête avant envoi à Baserow
    console.log("=== DÉTAILS DE LA REQUÊTE BASEROW ===")
    console.log("URL:", 'https://api.baserow.io/api/database/rows/table/252224/?user_field_names=true')
    console.log("Headers:", {
      'Authorization': `Token ${BASEROW_TOKEN.substring(0, 5)}...`,
      'Content-Type': 'application/json'
    })
    console.log("Payload envoyé à Baserow:", JSON.stringify(payload, null, 2))

    const baserowResponse = await fetch(
      'https://api.baserow.io/api/database/rows/table/252224/?user_field_names=true',
      {
        method: 'POST',
        headers: {
          'Authorization': `Token ${BASEROW_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      }
    )

    console.log("=== RÉPONSE BASEROW DÉTAILLÉE ===")
    console.log("Status code:", baserowResponse.status)
    console.log("Status text:", baserowResponse.statusText)
    console.log("Headers:", Object.fromEntries(baserowResponse.headers.entries()))
    
    const baserowData = await baserowResponse.json()
    console.log("Corps de la réponse:", JSON.stringify(baserowData, null, 2))

    if (!baserowResponse.ok) {
      console.error("=== ERREUR BASEROW DÉTAILLÉE ===")
      console.error("Status:", baserowResponse.status)
      console.error("Message:", baserowData)
      console.error("Payload qui a causé l'erreur:", payload)
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        data: baserowData,
        debug: {
          status: baserowResponse.status,
          headers: Object.fromEntries(baserowResponse.headers.entries())
        }
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json'
        },
        status: 200 
      }
    )

  } catch (error) {
    console.error("=== ERREUR DÉTAILLÉE ===")
    console.error("Type:", error.constructor.name)
    console.error("Message:", error.message)
    console.error("Stack:", error.stack)
    
    return new Response(
      JSON.stringify({ 
        success: true,
        error: error.message,
        errorType: error.constructor.name
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json'
        },
        status: 200
      }
    )
  }
})
