
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

console.log("Fonction save-diagnostic initialisée")

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log("=== DÉBUT DU TRAITEMENT DE LA REQUÊTE ===")
    const payload = await req.json()
    console.log("Données reçues:", JSON.stringify(payload, null, 2))

    const BASEROW_TOKEN = Deno.env.get('BASEROW_TOKEN')
    if (!BASEROW_TOKEN) {
      console.error("Token Baserow manquant")
      throw new Error("Configuration manquante : BASEROW_TOKEN")
    }
    console.log("Token Baserow trouvé")

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

    console.log("Status code Baserow:", baserowResponse.status)
    const baserowData = await baserowResponse.json()
    console.log("Réponse Baserow:", JSON.stringify(baserowData, null, 2))

    if (!baserowResponse.ok) {
      throw new Error(`Erreur Baserow: ${baserowResponse.status} - ${JSON.stringify(baserowData)}`)
    }

    console.log("=== FIN DU TRAITEMENT - SUCCÈS ===")
    return new Response(
      JSON.stringify({ success: true, data: baserowData }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error("=== ERREUR LORS DU TRAITEMENT ===")
    console.error(error.message)
    console.error(error.stack)
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})
