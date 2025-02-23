
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('=== Début du traitement de la requête save-to-baserow ===');
    const diagnosticData = await req.json();
    
    console.log('Token Baserow présent:', !!Deno.env.get('BASEROW_TOKEN'));
    
    const baserowData = {
      "Prénom": diagnosticData.first_name,
      "Nom": diagnosticData.last_name,
      "Nom du coworking": diagnosticData.coworking_name,
      "Email": diagnosticData.email,
      "Date de création": diagnosticData.created_at,
      "Score global": diagnosticData.global_score,
      "Niveau global": diagnosticData.global_level,
      "Score acquisition": Number(diagnosticData.acquisition_score) || 0,
      "Score activation": Number(diagnosticData.activation_score) || 0,
      "Score rétention": Number(diagnosticData.retention_score) || 0,
      "Score revenus": Number(diagnosticData.revenus_score) || 0,
      "Score recommandation": Number(diagnosticData.recommandation_score) || 0
    };

    console.log('=== Données formatées pour Baserow ===');
    console.log(JSON.stringify(baserowData, null, 2));

    const BASEROW_TOKEN = Deno.env.get('BASEROW_TOKEN');
    if (!BASEROW_TOKEN) {
      throw new Error('BASEROW_TOKEN non défini');
    }

    const baserowUrl = 'https://api.baserow.io/api/database/rows/table/451692/?user_field_names=true';
    console.log('URL Baserow:', baserowUrl);

    console.log('=== Tentative d\'envoi à Baserow ===');
    const baserowResponse = await fetch(baserowUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${BASEROW_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(baserowData)
    });

    if (!baserowResponse.ok) {
      const errorText = await baserowResponse.text();
      console.error('=== Erreur détaillée Baserow ===');
      console.error('Status:', baserowResponse.status);
      console.error('Headers:', JSON.stringify(Object.fromEntries(baserowResponse.headers.entries()), null, 2));
      console.error('Réponse:', errorText);
      
      throw new Error(`Erreur Baserow: ${baserowResponse.status} - ${errorText}`);
    }

    const responseData = await baserowResponse.json();
    console.log('=== Succès ===');
    console.log('Réponse Baserow:', JSON.stringify(responseData, null, 2));

    return new Response(JSON.stringify({ success: true, data: responseData }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('=== Erreur générale ===');
    console.error('Type:', error instanceof Error ? 'Error' : typeof error);
    console.error('Message:', error instanceof Error ? error.message : String(error));
    console.error('Stack:', error instanceof Error ? error.stack : 'No stack trace');
    
    return new Response(JSON.stringify({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Erreur inconnue',
      details: error instanceof Error ? error.stack : undefined
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
})
