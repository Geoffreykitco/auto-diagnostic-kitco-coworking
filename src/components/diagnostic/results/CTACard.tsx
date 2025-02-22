
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
    const formattedAnswers: Record<string, any> = {};

    Object.entries(answers).forEach(([section, sectionAnswers]) => {
      if (section === 'recommandation') {
        formattedAnswers.rec_recommandation_spontanee = sectionAnswers[0]?.value;
        formattedAnswers.rec_programme_parrainage = sectionAnswers[1]?.value;
        formattedAnswers.rec_utilisation_avis = sectionAnswers[2]?.value;
        formattedAnswers.rec_participation_communication = sectionAnswers[3]?.value;
        formattedAnswers.rec_creation_contenu = sectionAnswers[4]?.value;
      } 
      else if (section === 'acquisition') {
        formattedAnswers.acq_canaux_utilises = sectionAnswers[0]?.value;
        formattedAnswers.acq_frequence_actions = sectionAnswers[1]?.value;
        formattedAnswers.acq_offre_decouverte = sectionAnswers[2]?.value;
        formattedAnswers.acq_suivi_prospects = sectionAnswers[3]?.value;
        formattedAnswers.acq_avis_clients = sectionAnswers[4]?.value;
      }
      else if (section === 'activation') {
        formattedAnswers.act_decouverte_espace = sectionAnswers[0]?.value;
        formattedAnswers.act_processus_onboarding = sectionAnswers[1]?.value;
        formattedAnswers.act_clartes_offres = sectionAnswers[2]?.value;
        formattedAnswers.act_relance_prospects = sectionAnswers[3]?.value;
        formattedAnswers.act_action_decision = sectionAnswers[4]?.value;
      }
      else if (section === 'retention') {
        formattedAnswers.ret_frequentation_reguliere = sectionAnswers[0]?.value;
        formattedAnswers.ret_programme_fidelite = sectionAnswers[1]?.value;
        formattedAnswers.ret_organisation_evenements = sectionAnswers[2]?.value;
        formattedAnswers.ret_retours_membres = sectionAnswers[3]?.value;
        formattedAnswers.ret_amelioration_experience = sectionAnswers[4]?.value;
      }
      else if (section === 'revenus') {
        formattedAnswers.rev_source_revenus = sectionAnswers[0]?.value;
        formattedAnswers.rev_rentabilite_offres = sectionAnswers[1]?.value;
        formattedAnswers.rev_utilisation_crm = sectionAnswers[2]?.value;
        formattedAnswers.rev_optimisation_conversion = sectionAnswers[3]?.value;
        formattedAnswers.rev_nouvelles_sources = sectionAnswers[4]?.value;
      }
      else if (section === 'informations') {
        formattedAnswers.info_anciennete = sectionAnswers[0]?.value;
        formattedAnswers.info_type_bureaux = sectionAnswers[1]?.value;
        formattedAnswers.info_type_abonnement = sectionAnswers[2]?.value;
        formattedAnswers.info_statut = sectionAnswers[3]?.value;
        formattedAnswers.info_superficie = sectionAnswers[4]?.value;
        formattedAnswers.info_concurrence = sectionAnswers[5]?.value;
        formattedAnswers.info_capacite = sectionAnswers[6]?.value;
        formattedAnswers.info_ville = sectionAnswers[7]?.value;
        formattedAnswers.info_horaires = sectionAnswers[8]?.value;
        formattedAnswers.info_remplissage = sectionAnswers[9]?.value;
        formattedAnswers.info_type_clientele = sectionAnswers[10]?.value;
        formattedAnswers.info_services = sectionAnswers[11]?.value;
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

