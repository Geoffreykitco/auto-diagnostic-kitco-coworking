
import { motion } from "framer-motion";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuditForm } from "@/hooks/use-audit-form";
import { MainContent } from "./content/MainContent";
import { calculateSectionLevel, getGlobalMessage, getSectionMessage } from "@/utils/scoreCalculator";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface CTACardProps {
  globalScore: number;
  sectionScores: Record<string, number>;
  answers: Record<string, Record<number, { value: string | number | number[] | null; score: number }>>;
}

export const CTACard = ({ globalScore, sectionScores, answers }: CTACardProps) => {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const formatAnswersForSubmission = (answers: Record<string, Record<number, { value: string | number | number[] | null; score: number }>>) => {
    // Création d'un objet pour stocker les réponses formatées
    const formattedAnswers: Record<string, any> = {};

    // Formatage spécifique pour chaque section
    Object.entries(answers).forEach(([section, sectionAnswers]) => {
      // Si c'est la section recommandation
      if (section === 'recommandation') {
        formattedAnswers.recommandation_q1 = sectionAnswers[0]?.value;
        formattedAnswers.recommandation_q2 = sectionAnswers[1]?.value;
        formattedAnswers.recommandation_q3 = sectionAnswers[2]?.value;
        formattedAnswers.recommandation_q4 = sectionAnswers[3]?.value;
        formattedAnswers.recommandation_q5 = sectionAnswers[4]?.value;
      } 
      // Même principe pour les autres sections
      else if (section === 'acquisition') {
        formattedAnswers.acquisition_q1 = sectionAnswers[0]?.value;
        formattedAnswers.acquisition_q2 = sectionAnswers[1]?.value;
        formattedAnswers.acquisition_q3 = sectionAnswers[2]?.value;
        formattedAnswers.acquisition_q4 = sectionAnswers[3]?.value;
        formattedAnswers.acquisition_q5 = sectionAnswers[4]?.value;
      }
      else if (section === 'activation') {
        formattedAnswers.activation_q1 = sectionAnswers[0]?.value;
        formattedAnswers.activation_q2 = sectionAnswers[1]?.value;
        formattedAnswers.activation_q3 = sectionAnswers[2]?.value;
        formattedAnswers.activation_q4 = sectionAnswers[3]?.value;
        formattedAnswers.activation_q5 = sectionAnswers[4]?.value;
      }
      else if (section === 'retention') {
        formattedAnswers.retention_q1 = sectionAnswers[0]?.value;
        formattedAnswers.retention_q2 = sectionAnswers[1]?.value;
        formattedAnswers.retention_q3 = sectionAnswers[2]?.value;
        formattedAnswers.retention_q4 = sectionAnswers[3]?.value;
        formattedAnswers.retention_q5 = sectionAnswers[4]?.value;
      }
      else if (section === 'revenus') {
        formattedAnswers.revenus_q1 = sectionAnswers[0]?.value;
        formattedAnswers.revenus_q2 = sectionAnswers[1]?.value;
        formattedAnswers.revenus_q3 = sectionAnswers[2]?.value;
        formattedAnswers.revenus_q4 = sectionAnswers[3]?.value;
        formattedAnswers.revenus_q5 = sectionAnswers[4]?.value;
      }
      else if (section === 'informations') {
        formattedAnswers.informations_ville = sectionAnswers[0]?.value;
        formattedAnswers.informations_date = sectionAnswers[1]?.value;
        formattedAnswers.informations_remplissage = sectionAnswers[2]?.value;
      }
    });

    console.log('Réponses formatées:', formattedAnswers);
    return formattedAnswers;
  };

  const handleSubmit = async (formData: {
    firstName: string;
    lastName: string;
    coworkingName: string;
    email: string;
  }) => {
    try {
      console.log('Début de la soumission du formulaire');
      
      const globalLevel = calculateSectionLevel(globalScore);
      const globalRecommendation = getGlobalMessage(globalScore);

      const formattedAnswers = formatAnswersForSubmission(answers);

      const diagnosticData = {
        created_at: new Date().toISOString(),
        first_name: formData.firstName,
        last_name: formData.lastName,
        coworking_name: formData.coworkingName,
        email: formData.email,
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

      console.log('Données formatées pour envoi:', diagnosticData);

      const { data, error } = await supabase.functions.invoke('save-diagnostic', {
        body: diagnosticData
      });

      if (error) {
        console.error('Erreur lors de l\'envoi:', error);
        const errorMessage = error.message || 'Une erreur est survenue lors de l\'envoi';
        toast({
          title: "Erreur",
          description: errorMessage,
          variant: "destructive",
        });
        return;
      }

      if (!data?.success) {
        console.error('Erreur de réponse:', data);
        throw new Error(data?.error || 'Échec de l\'enregistrement des résultats');
      }

      setOpen(false);
      toast({
        title: "Envoi réussi !",
        description: `Votre audit personnalisé a été envoyé à l'adresse ${formData.email}`,
      });

    } catch (error) {
      console.error('Error saving form results:', error);
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Une erreur est survenue lors de l'envoi du formulaire",
        variant: "destructive",
      });
    }
  };

  const {
    fullName,
    setFullName,
    coworkingName,
    setCoworkingName,
    email,
    setEmail,
    isSubmitting,
    handleFormSubmit
  } = useAuditForm({
    onSubmit: handleSubmit
  });

  const formProps = {
    fullName,
    setFullName,
    coworkingName,
    setCoworkingName,
    email,
    setEmail,
    isSubmitting,
    handleFormSubmit
  };

  if (isMobile) {
    return (
      <div className="bg-white w-full max-w-full overflow-x-hidden">
        <MainContent
          open={open}
          setOpen={setOpen}
          formProps={formProps}
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white"
    >
      <MainContent
        open={open}
        setOpen={setOpen}
        formProps={formProps}
      />
    </motion.div>
  );
};

