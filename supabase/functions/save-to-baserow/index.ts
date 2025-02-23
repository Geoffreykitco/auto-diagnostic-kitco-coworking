
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Gérer les requêtes CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('=== Début du traitement de la requête save-to-baserow ===');
    const diagnosticData = await req.json();
    
    // Vérification du token
    const BASEROW_TOKEN = Deno.env.get('BASEROW_TOKEN');
    if (!BASEROW_TOKEN) {
      console.error('Token Baserow manquant');
      // Retourner une réponse 200 même en cas d'erreur Baserow
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Configuration Baserow manquante'
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Préparation des données
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

    // Envoi à Baserow
    const baserowUrl = 'https://api.baserow.io/api/database/rows/table/451692/?user_field_names=true';
    console.log('=== Tentative d\'envoi à Baserow ===');
    const baserowResponse = await fetch(baserowUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${BASEROW_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(baserowData)
    });

    // Lecture de la réponse
    const responseText = await baserowResponse.text();
    console.log('Status Baserow:', baserowResponse.status);
    console.log('Réponse Baserow:', responseText);

    // Même si Baserow échoue, on continue
    if (!baserowResponse.ok) {
      console.warn('Erreur Baserow:', responseText);
      // On retourne quand même un succès pour ne pas bloquer l'utilisateur
      return new Response(JSON.stringify({ 
        success: true,
        baserowError: true,
        message: 'Les données ont été sauvegardées mais n\'ont pas pu être synchronisées avec Baserow'
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Succès complet
    return new Response(JSON.stringify({ 
      success: true,
      data: JSON.parse(responseText)
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Erreur:', error);
    // On retourne toujours un status 200
    return new Response(JSON.stringify({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    }), {
      status: 200, // Important: toujours retourner 200
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
})
