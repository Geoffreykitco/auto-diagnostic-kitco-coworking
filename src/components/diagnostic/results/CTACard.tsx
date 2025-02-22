
import { motion } from "framer-motion";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuditForm } from "@/hooks/use-audit-form";
import { MainContent } from "./content/MainContent";
import { calculateSectionLevel, getGlobalMessage, getSectionMessage } from "@/utils/scoreCalculator";

interface CTACardProps {
  globalScore: number;
  sectionScores: Record<string, number>;
}

export const CTACard = ({ globalScore, sectionScores }: CTACardProps) => {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  const handleSubmit = async (formData: {
    firstName: string;
    lastName: string;
    coworkingName: string;
    email: string;
  }) => {
    try {
      const globalLevel = calculateSectionLevel(globalScore);
      const globalRecommendation = getGlobalMessage(globalScore);

      const diagnosticData = {
        created_at: new Date().toISOString(),
        first_name: formData.firstName,
        last_name: formData.lastName,
        coworking_name: formData.coworkingName,
        email: formData.email,

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

      console.log('Données envoyées à Baserow:', diagnosticData);

      const response = await fetch('https://api.baserow.io/api/database/rows/table/451692/?user_field_names=true', {
        method: 'POST',
        headers: {
          'Authorization': 'Token xqPtH7BlwDujEpikYwtSj-gAhYcNm3skIARBax3kLH0',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(diagnosticData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Erreur Baserow:', errorData);
        throw new Error('Failed to save form results');
      }

      const responseData = await response.json();
      console.log('Réponse Baserow:', responseData);

      setOpen(false);
    } catch (error) {
      console.error('Error saving form results:', error);
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
