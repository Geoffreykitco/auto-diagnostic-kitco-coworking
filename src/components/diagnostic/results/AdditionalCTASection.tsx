import { motion } from "framer-motion";
import { useState } from "react";
import { CoworkingStats } from "./CoworkingStats";
import { CTAButton } from "./CTAButton";
import { FormSubmissionHandler } from "./FormSubmissionHandler";
import { AuditFormDialog } from "./AuditFormDialog";
interface AdditionalCTASectionProps {
  globalScore: number;
  sectionScores: Record<string, number>;
  answers: Record<string, Record<number, {
    value: string | number | number[] | null;
    score: number;
  }>>;
}
export const AdditionalCTASection = ({
  globalScore,
  sectionScores,
  answers
}: AdditionalCTASectionProps) => {
  const [open, setOpen] = useState(false);

  // Extract values from the answers
  const remplissageValue = answers?.informations?.[9]?.value || 0;
  const remplissagePercent = typeof remplissageValue === 'number' ? remplissageValue : 0;
  const ancienneteOption = answers?.informations?.[0]?.value;
  const superficieOption = answers?.informations?.[4]?.value;
  const capaciteOption = answers?.informations?.[6]?.value;
  // Convert ville to string to match the expected type in CoworkingStats
  const ville = String(answers?.informations?.[7]?.value || "votre ville");
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.5
  }} className="bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden">
      <div className="grid md:grid-cols-2 gap-0">
        <div className="p-4 md:p-8 flex flex-col justify-center">
          <CoworkingStats remplissagePercent={remplissagePercent} ancienneteOption={ancienneteOption} superficieOption={superficieOption} capaciteOption={capaciteOption} ville={ville} />
          
          <CTAButton onClick={() => setOpen(true)} />
          
          <p className="text-gray-600 mt-2 text-left text-xs my-0">
            Des recommandations adaptées à votre contexte permettraient d'augmenter significativement votre taux de remplissage.
          </p>
          
          <FormSubmissionHandler globalScore={globalScore} sectionScores={sectionScores} answers={answers}>
            {formProps => <AuditFormDialog open={open} onOpenChange={newOpen => {
            if (!newOpen && formProps.isSubmitting) return;
            setOpen(newOpen);
          }} formProps={formProps} />}
          </FormSubmissionHandler>
        </div>
        
        <div className="bg-[#0B1A17] md:bg-transparent flex items-center justify-center">
          <img src="/lovable-uploads/ba562fd9-da38-4ce5-8df0-507a7e54bcc8.png" alt="Logo KITCO - Auto-diagnostic des coworkings" className="w-full h-full object-contain" />
        </div>
      </div>
    </motion.div>;
};