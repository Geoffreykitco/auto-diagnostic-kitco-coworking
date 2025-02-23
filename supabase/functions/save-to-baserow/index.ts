
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
    console.log('Début du traitement de la requête save-to-baserow');
    const diagnosticData = await req.json();
    console.log('Données reçues:', diagnosticData);

    // Formater les réponses pour Baserow
    const baserowData = {
      first_name: diagnosticData.first_name,
      last_name: diagnosticData.last_name,
      coworking_name: diagnosticData.coworking_name,
      email: diagnosticData.email,
      created_at: diagnosticData.created_at,
      global_score: diagnosticData.global_score,
      global_level: diagnosticData.global_level,
      global_recommendation: diagnosticData.global_recommendation,
      // Scores par section
      acquisition_score: diagnosticData.acquisition_score,
      activation_score: diagnosticData.activation_score,
      retention_score: diagnosticData.retention_score,
      revenus_score: diagnosticData.revenus_score,
      recommandation_score: diagnosticData.recommandation_score,
      // Niveaux par section
      acquisition_level: diagnosticData.acquisition_level,
      activation_level: diagnosticData.activation_level,
      retention_level: diagnosticData.retention_level,
      revenus_level: diagnosticData.revenus_level,
      recommandation_level: diagnosticData.recommandation_level,
      // Recommandations par section
      acquisition_recommendation: diagnosticData.acquisition_recommendation,
      activation_recommendation: diagnosticData.activation_recommendation,
      retention_recommendation: diagnosticData.retention_recommendation,
      revenus_recommendation: diagnosticData.revenus_recommendation,
      recommandation_recommendation: diagnosticData.recommandation_recommendation,
      ...diagnosticData
    };

    console.log('Données formatées pour Baserow:', baserowData);

    // Récupérer le token Baserow depuis les variables d'environnement
    const BASEROW_TOKEN = Deno.env.get('BASEROW_TOKEN');
    if (!BASEROW_TOKEN) {
      throw new Error('BASEROW_TOKEN non défini');
    }

    // URL mise à jour avec l'ID de la base et de la table
    const baserowUrl = `https://api.baserow.io/api/database/rows/table/451692/?user_field_names=true&database_id=185511`;
    console.log('URL Baserow:', baserowUrl);

    // Envoyer les données à Baserow
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
      console.error('Réponse Baserow:', errorText);
      throw new Error(`Erreur Baserow: ${baserowResponse.status} - ${errorText}`);
    }

    const responseData = await baserowResponse.json();
    console.log('Réponse Baserow réussie:', responseData);

    return new Response(JSON.stringify({ success: true, data: responseData }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Erreur:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
})
