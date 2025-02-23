
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { calculateSectionLevel, getGlobalMessage, getSectionMessage } from "@/utils/scoreCalculator";
import { formatAnswersForSubmission } from "@/utils/formatDiagnosticAnswers";

interface FormData {
  fullName: string;
  email: string;
  coworkingName: string;
}

interface DiagnosticData {
  globalScore: number;
  sectionScores: Record<string, number>;
  answers: Record<string, Record<number, { value: string | number | number[] | null; score: number }>>;
}

export const useDiagnosticSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (formData: FormData, diagnosticData: DiagnosticData) => {
    try {
      setIsSubmitting(true);
      console.log('=== DÉBUT SOUMISSION DIAGNOSTIC ===');
      
      const { globalScore, sectionScores, answers } = diagnosticData;
      const globalLevel = calculateSectionLevel(globalScore);
      const globalRecommendation = getGlobalMessage(globalScore);

      // Validation des données de base
      if (!formData.email || !formData.fullName || !formData.coworkingName) {
        throw new Error("Veuillez remplir tous les champs du formulaire");
      }

      // Séparer le nom complet en prénom et nom
      const [firstName = '', lastName = ''] = formData.fullName.split(' ');

      // Formater les réponses pour Baserow
      const formattedAnswers = formatAnswersForSubmission(answers);

      const payload = {
        first_name: firstName,
        last_name: lastName,
        email: formData.email,
        coworking_name: formData.coworkingName,
        global_score: globalScore.toString(),
        global_level: globalLevel,
        global_recommendation: globalRecommendation,
        acquisition_score: sectionScores.acquisition?.toString() || "0",
        acquisition_level: calculateSectionLevel(sectionScores.acquisition || 0),
        acquisition_recommendation: getSectionMessage('acquisition', calculateSectionLevel(sectionScores.acquisition || 0)),
        activation_score: sectionScores.activation?.toString() || "0",
        activation_level: calculateSectionLevel(sectionScores.activation || 0),
        activation_recommendation: getSectionMessage('activation', calculateSectionLevel(sectionScores.activation || 0)),
        retention_score: sectionScores.retention?.toString() || "0",
        retention_level: calculateSectionLevel(sectionScores.retention || 0),
        retention_recommendation: getSectionMessage('retention', calculateSectionLevel(sectionScores.retention || 0)),
        revenus_score: sectionScores.revenus?.toString() || "0",
        revenus_level: calculateSectionLevel(sectionScores.revenus || 0),
        revenus_recommendation: getSectionMessage('revenus', calculateSectionLevel(sectionScores.revenus || 0)),
        recommandation_score: sectionScores.recommandation?.toString() || "0",
        recommandation_level: calculateSectionLevel(sectionScores.recommandation || 0),
        recommandation_recommendation: getSectionMessage('recommandation', calculateSectionLevel(sectionScores.recommandation || 0)),
        ...formattedAnswers // Ajout des réponses formatées
      };

      console.log('=== ENVOI DU PAYLOAD À LA FONCTION EDGE ===');
      console.log('Payload:', payload);

      const { data, error } = await supabase.functions.invoke('save-diagnostic', {
        body: payload
      });

      console.log('Réponse de la fonction Edge:', { data, error });

      if (error || !data?.success) {
        throw new Error(error?.message || data?.error || 'Une erreur est survenue lors de l\'envoi');
      }

      toast({
        title: "Envoi réussi ! 🎉",
        description: `Votre audit personnalisé a été envoyé à l'adresse ${formData.email}`,
        duration: 5000,
      });

      return true;
    } catch (error) {
      console.error('=== ERREUR DÉTAILLÉE ===');
      console.error('Type d\'erreur:', error instanceof Error ? 'Error' : typeof error);
      console.error('Message d\'erreur:', error instanceof Error ? error.message : error);
      
      toast({
        title: "Erreur lors de l'envoi",
        description: error instanceof Error ? error.message : "Une erreur inattendue est survenue",
        variant: "destructive",
        duration: 5000,
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    handleSubmit
  };
};
