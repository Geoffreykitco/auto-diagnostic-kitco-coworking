
import { motion } from "framer-motion";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuditForm } from "@/hooks/use-audit-form";
import { MainContent } from "./content/MainContent";
import { useSupabaseSubscription } from "@/hooks/diagnostic/use-supabase-subscription";
import { useCtaFormSubmit } from "@/hooks/diagnostic/use-cta-form-submit";

interface CTACardProps {
  globalScore: number;
  sectionScores: Record<string, number>;
  answers: Record<string, Record<number, { value: string | number | number[] | null; score: number }>>;
}

export const CTACard = ({ globalScore, sectionScores, answers }: CTACardProps) => {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  
  // Use the Supabase subscription hook
  useSupabaseSubscription();

  // Use the form submission hook
  const { handleSubmit } = useCtaFormSubmit({
    globalScore,
    sectionScores,
    answers,
    onSuccess: () => setOpen(false)
  });

  // Use the audit form hook with our submission handler
  const formProps = useAuditForm({
    onSubmit: handleSubmit
  });

  // Render mobile version
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

  // Render desktop version
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
