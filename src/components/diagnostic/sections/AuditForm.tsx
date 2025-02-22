import { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useAuditForm } from "@/hooks/use-audit-form";
import { AuditHeader } from "./audit/AuditHeader";
import { AuditFormContent } from "./audit/AuditFormContent";
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
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const {
    fullName,
    setFullName,
    coworkingName,
    setCoworkingName,
    email,
    setEmail,
    isSubmitting,
    handleSubmit,
    resetForm
  } = useAuditForm({
    onSubmit
  });
  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen && (fullName || coworkingName || email)) {
      // Attendre la confirmation avant de fermer
      const shouldClose = window.confirm("Voulez-vous vraiment fermer ? Vos données seront perdues.");
      if (shouldClose) {
        resetForm();
        setOpen(false);
      }
    } else {
      setOpen(newOpen);
    }
  };
  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await handleSubmit(e);
    if (success) {
      setOpen(false);
    }
  };
  return <AnimatePresence>
      
    </AnimatePresence>;
};