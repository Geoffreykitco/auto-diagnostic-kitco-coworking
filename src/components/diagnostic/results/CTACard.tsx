
import { motion } from "framer-motion";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuditForm } from "@/hooks/use-audit-form";
import { MainContent } from "./content/MainContent";

interface CTACardProps {
  globalScore: number;
}

export const CTACard = ({ globalScore }: CTACardProps) => {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  const handleSubmit = async (formData: {
    firstName: string;
    lastName: string;
    coworkingName: string;
    email: string;
  }) => {
    try {
      const diagnosticData = {
        created_at: new Date().toISOString(),
        first_name: formData.firstName,
        last_name: formData.lastName,
        coworking_name: formData.coworkingName,
        email: formData.email,
        global_score: globalScore
      };

      const response = await fetch('https://api.baserow.io/api/database/rows/table/451692/', {
        method: 'POST',
        headers: {
          'Authorization': 'Token 185511',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(diagnosticData)
      });

      if (!response.ok) {
        throw new Error('Failed to save form results');
      }

      setOpen(false);
    } catch (error) {
      console.error('Error saving form results:', error);
    }
  };

  const formProps = useAuditForm({
    onSubmit: handleSubmit
  });

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
