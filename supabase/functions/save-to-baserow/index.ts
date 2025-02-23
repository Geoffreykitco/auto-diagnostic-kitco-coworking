
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
    
    // Vérifions d'abord le token
    const BASEROW_TOKEN = Deno.env.get('BASEROW_TOKEN');
    console.log('Token Baserow présent:', !!BASEROW_TOKEN);
    console.log('Token Baserow (premiers caractères):', BASEROW_TOKEN?.substring(0, 5));
    
    if (!BASEROW_TOKEN) {
      throw new Error('BASEROW_TOKEN non défini');
    }

    // Faisons d'abord une requête GET pour voir la structure
    const baserowUrl = 'https://api.baserow.io/api/database/rows/table/451692/?user_field_names=true&size=1';
    console.log('=== Vérification de la structure de la table ===');
    const structureResponse = await fetch(baserowUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${BASEROW_TOKEN}`,
      }
    });

    if (!structureResponse.ok) {
      const errorText = await structureResponse.text();
      console.error('Erreur lors de la vérification de la structure:', errorText);
      throw new Error(`Impossible d'accéder à la table: ${structureResponse.status}`);
    }

    const structureData = await structureResponse.json();
    console.log('Structure de la table:', JSON.stringify(structureData, null, 2));
    
    // Maintenant, créons les données en utilisant exactement les mêmes noms de colonnes
    const baserowData = {
      "first_name": diagnosticData.first_name,
      "last_name": diagnosticData.last_name,
      "coworking_name": diagnosticData.coworking_name,
      "email": diagnosticData.email,
      "created_at": diagnosticData.created_at,
      "global_score": diagnosticData.global_score,
      "global_level": diagnosticData.global_level,
      "acquisition_score": Number(diagnosticData.acquisition_score) || 0,
      "activation_score": Number(diagnosticData.activation_score) || 0,
      "retention_score": Number(diagnosticData.retention_score) || 0,
      "revenue_score": Number(diagnosticData.revenus_score) || 0,
      "recommendation_score": Number(diagnosticData.recommandation_score) || 0
    };

    console.log('=== Données formatées pour Baserow ===');
    console.log(JSON.stringify(baserowData, null, 2));

    // Tentative d'envoi avec les nouveaux noms de colonnes
    console.log('=== Tentative d\'envoi à Baserow ===');
    const baserowResponse = await fetch(baserowUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${BASEROW_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(baserowData)
    });

    // Logging détaillé de la réponse
    console.log('=== Détails de la réponse ===');
    console.log('Status:', baserowResponse.status);
    console.log('Headers:', JSON.stringify(Object.fromEntries(baserowResponse.headers.entries()), null, 2));

    const responseText = await baserowResponse.text();
    console.log('Réponse brute:', responseText);

    if (!baserowResponse.ok) {
      console.error('=== Erreur détaillée Baserow ===');
      try {
        const errorJson = JSON.parse(responseText);
        console.error('Erreur JSON:', JSON.stringify(errorJson, null, 2));
      } catch (e) {
        console.error('La réponse n\'est pas du JSON valide');
      }
      throw new Error(`Erreur Baserow: ${baserowResponse.status} - ${responseText}`);
    }

    const responseData = JSON.parse(responseText);
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
