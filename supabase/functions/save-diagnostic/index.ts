
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
    const diagnosticData = await req.json()
    console.log('Received diagnostic data:', diagnosticData)

    const baserowToken = Deno.env.get('BASEROW_TOKEN')
    if (!baserowToken) {
      throw new Error('Baserow token not configured')
    }

    const response = await fetch('https://api.baserow.io/api/database/rows/table/451692/?user_field_names=true', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${baserowToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(diagnosticData)
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Baserow error:', errorData)
      throw new Error('Failed to save diagnostic data')
    }

    const data = await response.json()
    console.log('Baserow response:', data)

    return new Response(
      JSON.stringify({ success: true, data }),
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
