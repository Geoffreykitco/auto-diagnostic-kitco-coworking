
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

interface DiagnosticData {
  firstName: string;
  lastName: string;
  email: string;
  coworkingName: string;
  answers: {
    informations: Record<number, { value: string | number | number[] | null; score: number }>;
    acquisition: Record<number, { value: string | number | number[] | null; score: number }>;
    activation: Record<number, { value: string | number | number[] | null; score: number }>;
    retention: Record<number, { value: string | number | number[] | null; score: number }>;
    revenus: Record<number, { value: string | number | number[] | null; score: number }>;
    recommandation: Record<number, { value: string | number | number[] | null; score: number }>;
  };
  globalScore: number;
  sectionScores: {
    acquisition: number;
    activation: number;
    retention: number;
    revenus: number;
    recommandation: number;
  };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const BASEROW_TOKEN = Deno.env.get('BASEROW_TOKEN');
    if (!BASEROW_TOKEN) {
      throw new Error('BASEROW_TOKEN is not set');
    }

    const { data } = await req.json() as { data: DiagnosticData };
    console.log('Received diagnostic data:', data);

    // Formatage des données pour Baserow
    const baserowData = {
      // Informations générales
      "prenom": data.firstName,
      "nom": data.lastName,
      "email": data.email,
      "nom_espace": data.coworkingName,
      "date_diagnostic": new Date().toISOString(),
      
      // Scores globaux
      "score_global": data.globalScore,
      "score_acquisition": data.sectionScores.acquisition,
      "score_activation": data.sectionScores.activation,
      "score_retention": data.sectionScores.retention,
      "score_revenus": data.sectionScores.revenus,
      "score_recommandation": data.sectionScores.recommandation,

      // Réponses aux questions d'information
      "info_anciennete": getInformationValue(data.answers.informations[0]),
      "info_surface": getInformationValue(data.answers.informations[4]),
      "info_capacite": getInformationValue(data.answers.informations[5]),
      "info_occupation": getInformationValue(data.answers.informations[9]),
      
      // Scores détaillés
      "detail_acquisition": JSON.stringify(data.answers.acquisition),
      "detail_activation": JSON.stringify(data.answers.activation),
      "detail_retention": JSON.stringify(data.answers.retention),
      "detail_revenus": JSON.stringify(data.answers.revenus),
      "detail_recommandation": JSON.stringify(data.answers.recommandation),
    };

    console.log('Formatted data for Baserow:', baserowData);

    // Envoi à Baserow avec l'ID correct de la table
    const baserowResponse = await fetch(
      'https://api.baserow.io/api/database/rows/table/451692/?user_field_names=true',
      {
        method: 'POST',
        headers: {
          'Authorization': `Token ${BASEROW_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(baserowData),
      }
    );

    if (!baserowResponse.ok) {
      const errorData = await baserowResponse.text();
      console.error('Baserow Error:', errorData);
      throw new Error(`Baserow request failed: ${baserowResponse.statusText}`);
    }

    const responseData = await baserowResponse.json();
    console.log('Baserow response:', responseData);

    return new Response(
      JSON.stringify({ success: true, message: "Diagnostic data saved successfully" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});

// Fonction utilitaire pour obtenir la valeur des questions informatives
function getInformationValue(answer: { value: string | number | number[] | null; score: number } | undefined): string {
  if (!answer || answer.value === null) return '';
  if (Array.isArray(answer.value)) return answer.value.join(', ');
  return answer.value.toString();
}
