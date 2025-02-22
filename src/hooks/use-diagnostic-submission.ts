
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
      console.log('Début de la soumission du formulaire');
      
      const { globalScore, sectionScores, answers } = diagnosticData;
      const globalLevel = calculateSectionLevel(globalScore);
      const globalRecommendation = getGlobalMessage(globalScore);

      const formattedAnswers = formatAnswersForSubmission(answers);

      // Séparer le nom complet en prénom et nom
      const [firstName = '', lastName = ''] = formData.fullName.split(' ');

      const payload = {
        first_name: firstName,
        last_name: lastName,
        email: formData.email,
        coworking_name: formData.coworkingName,
        answers: formattedAnswers,
        global_score: globalScore,
        global_level: globalLevel,
        global_recommendation: globalRecommendation,
        acquisition_score: sectionScores.acquisition || 0,
        acquisition_level: calculateSectionLevel(sectionScores.acquisition || 0),
        acquisition_recommendation: getSectionMessage('acquisition', calculateSectionLevel(sectionScores.acquisition || 0)),
        activation_score: sectionScores.activation || 0,
        activation_level: calculateSectionLevel(sectionScores.activation || 0),
        activation_recommendation: getSectionMessage('activation', calculateSectionLevel(sectionScores.activation || 0)),
        retention_score: sectionScores.retention || 0,
        retention_level: calculateSectionLevel(sectionScores.retention || 0),
        retention_recommendation: getSectionMessage('retention', calculateSectionLevel(sectionScores.retention || 0)),
        revenus_score: sectionScores.revenus || 0,
        revenus_level: calculateSectionLevel(sectionScores.revenus || 0),
        revenus_recommendation: getSectionMessage('revenus', calculateSectionLevel(sectionScores.revenus || 0)),
        recommandation_score: sectionScores.recommandation || 0,
        recommandation_level: calculateSectionLevel(sectionScores.recommandation || 0),
        recommandation_recommendation: getSectionMessage('recommandation', calculateSectionLevel(sectionScores.recommandation || 0))
      };

      console.log('Données formatées pour envoi:', payload);

      const { data, error } = await supabase.functions.invoke('save-diagnostic', {
        body: payload
      });

      if (error) {
        console.error('Erreur lors de l\'envoi:', error);
        throw new Error(error.message || 'Une erreur est survenue lors de l\'envoi');
      }

      if (!data?.success) {
        console.error('Erreur de réponse:', data);
        throw new Error(data?.error || 'Échec de l\'enregistrement des résultats');
      }

      toast({
        title: "Envoi réussi !",
        description: `Votre audit personnalisé a été envoyé à l'adresse ${formData.email}`,
      });

      return true;
    } catch (error) {
      console.error('Error saving form results:', error);
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Une erreur est survenue lors de l'envoi du formulaire",
        variant: "destructive",
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
