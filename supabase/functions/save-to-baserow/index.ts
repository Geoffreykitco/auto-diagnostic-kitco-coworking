
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('=== Début du traitement de la requête save-to-baserow ===');
    const diagnosticData = await req.json();
    console.log('Données brutes reçues:', {
      ...diagnosticData,
      answers: 'Masqué pour la lisibilité'
    });

    // Préparation des données de base pour Baserow
    const baserowData = {
      // Informations de base
      first_name: diagnosticData.first_name,
      last_name: diagnosticData.last_name,
      coworking_name: diagnosticData.coworking_name,
      email: diagnosticData.email,
      created_at: diagnosticData.created_at,
      
      // Scores globaux
      global_score: diagnosticData.global_score,
      global_level: diagnosticData.global_level,
      
      // Scores par section (uniquement les valeurs numériques)
      acquisition_score: Number(diagnosticData.acquisition_score) || 0,
      activation_score: Number(diagnosticData.activation_score) || 0,
      retention_score: Number(diagnosticData.retention_score) || 0,
      revenus_score: Number(diagnosticData.revenus_score) || 0,
      recommandation_score: Number(diagnosticData.recommandation_score) || 0,
    };

    console.log('=== Données formatées pour Baserow ===');
    console.log('Format:', baserowData);

    // Récupération du token Baserow
    const BASEROW_TOKEN = Deno.env.get('BASEROW_TOKEN');
    if (!BASEROW_TOKEN) {
      throw new Error('BASEROW_TOKEN non défini');
    }

    const baserowUrl = `https://api.baserow.io/api/database/rows/table/451692/?user_field_names=true`;
    console.log('URL Baserow:', baserowUrl);

    // Envoi à Baserow
    console.log('=== Tentative d\'envoi à Baserow ===');
    const baserowResponse = await fetch(baserowUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${BASEROW_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(baserowData)
    });

    // Gestion de la réponse
    if (!baserowResponse.ok) {
      const errorText = await baserowResponse.text();
      console.error('=== Erreur Baserow ===');
      console.error('Status:', baserowResponse.status);
      console.error('Réponse:', errorText);
      throw new Error(`Erreur Baserow: ${baserowResponse.status} - ${errorText}`);
    }

    const responseData = await baserowResponse.json();
    console.log('=== Succès ===');
    console.log('Réponse Baserow:', responseData);

    return new Response(JSON.stringify({ success: true, data: responseData }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('=== Erreur générale ===');
    console.error('Type:', error instanceof Error ? 'Error' : typeof error);
    console.error('Details:', error);
    
    return new Response(JSON.stringify({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Erreur inconnue' 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
})
