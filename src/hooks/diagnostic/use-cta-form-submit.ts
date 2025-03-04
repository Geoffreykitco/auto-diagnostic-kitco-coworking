
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { formatAnswersForSubmission } from "@/utils/formatDiagnosticAnswers";
import { calculateSectionLevel, getGlobalMessage, getSectionMessage } from "@/utils/scoreCalculator";

interface SubmitFormProps {
  globalScore: number;
  sectionScores: Record<string, number>;
  answers: Record<string, Record<number, { value: string | number | number[] | null; score: number }>>;
  onSuccess?: () => void;
}

export const useCtaFormSubmit = ({ 
  globalScore, 
  sectionScores, 
  answers,
  onSuccess 
}: SubmitFormProps) => {
  const { toast } = useToast();

  const handleSubmit = async (formData: {
    firstName: string;
    lastName: string;
    coworkingName: string;
    email: string;
  }): Promise<void> => {
    try {
      console.log('=== Début de la soumission du formulaire ===');
      
      const globalLevel = calculateSectionLevel(globalScore);
      const globalRecommendation = getGlobalMessage(globalScore);
      const formattedAnswers = formatAnswersForSubmission(answers);

      console.log('Réponses formatées:', formattedAnswers);

      const diagnosticData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        coworking_name: formData.coworkingName,
        email: formData.email,
        answers: answers,
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
        recommandation_recommendation: getSectionMessage('recommandation', calculateSectionLevel(sectionScores.recommandation || 0)),
        ...formattedAnswers
      };

      console.log('=== Envoi des données à Supabase ===');
      console.log('Données à insérer:', diagnosticData);

      const { error } = await supabase
        .from('leads_auto_diag_coworking')
        .insert(diagnosticData);

      if (error) {
        console.error('Erreur Supabase:', error);
        throw new Error(error.message);
      }

      if (onSuccess) {
        onSuccess();
      }

      toast({
        title: "Envoi réussi !",
        description: `Votre audit personnalisé a été envoyé à l'adresse ${formData.email}`,
      });

      // Remove the return true to match Promise<void> return type
    } catch (error) {
      console.error('=== Erreur lors de la soumission ===');
      console.error('Type:', error instanceof Error ? 'Error' : typeof error);
      console.error('Details:', error);
      
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Une erreur est survenue lors de l'envoi du formulaire",
        variant: "destructive",
      });

      // Remove the return false to match Promise<void> return type
    }
  };

  return { handleSubmit };
};
