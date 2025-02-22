
import { corsHeaders } from '../_shared/cors.ts'

Deno.serve(async (req) => {
  console.log('=== DÉBUT DE LA FONCTION ===');

  try {
    console.log('Méthode:', req.method);

    if (req.method === 'OPTIONS') {
      return new Response('ok', { headers: corsHeaders })
    }

    console.log('Lecture du body...');
    const payload = await req.json();
    console.log('Contenu du payload:', JSON.stringify(payload, null, 2));

    // Test minimal de réponse
    return new Response(
      JSON.stringify({ 
        success: true,
        received: payload 
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    )

  } catch (error) {
    console.error('=== ERREUR ===');
    console.error('Type:', error.name);
    console.error('Message:', error.message);
    console.error('Stack:', error.stack);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message,
        errorType: error.name
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
