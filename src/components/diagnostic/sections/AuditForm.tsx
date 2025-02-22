
import { motion, AnimatePresence } from 'framer-motion';
import { useAuditForm } from "@/hooks/use-audit-form";
import { AuditHeader } from "./audit/AuditHeader";
import { useState } from "react";

interface AuditFormProps {
  onSubmit: (formData: {
    firstName: string;
    lastName: string;
    coworkingName: string;
    email: string;
  }) => Promise<void>;
}

export const AuditForm = ({
  onSubmit
}: AuditFormProps) => {
  const [open, setOpen] = useState(false);

  const {
    fullName,
    setFullName,
    coworkingName,
    setCoworkingName,
    email,
    setEmail,
    isSubmitting,
    resetForm
  } = useAuditForm({
    onSubmit
  });

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen && (fullName || coworkingName || email)) {
      const shouldClose = window.confirm("Voulez-vous vraiment fermer ? Vos données seront perdues.");
      if (shouldClose) {
        resetForm();
        setOpen(false);
      }
    } else {
      setOpen(newOpen);
    }
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg p-4 md:p-8 space-y-6 shadow-lg max-w-2xl mx-auto"
      >
        <AuditHeader />
      </motion.div>
    </AnimatePresence>
  );
};
