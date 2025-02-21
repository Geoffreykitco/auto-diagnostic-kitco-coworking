
import { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
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

export const AuditForm = ({ onSubmit }: AuditFormProps) => {
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
  } = useAuditForm({ onSubmit });

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

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg p-4 md:p-8 space-y-6 shadow-lg max-w-2xl mx-auto"
        role="region"
        aria-label="Formulaire d'audit de coworking"
      >
        <AuditHeader />

        <Dialog open={open} onOpenChange={handleOpenChange}>
          <DialogTrigger asChild>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-3 md:py-4 px-6 md:px-8 rounded-lg shadow-md transition-all duration-200 text-sm md:text-base"
              aria-label="Ouvrir le formulaire d'audit"
            >
              Recevez votre audit et découvrez votre feuille de route personnalisée
            </motion.button>
          </DialogTrigger>

          <DialogContent 
            className={`${isMobile ? 'h-screen w-screen !m-0 !p-0 !inset-0 !translate-x-0 !translate-y-0 !max-w-none !w-full' : 'sm:max-w-[900px]'}`}
            aria-label="Formulaire de demande d'audit"
          >
            <div className="flex flex-col md:flex-row w-full h-full">
              {!isMobile && (
                <div className="w-full md:w-1/2 relative">
                  <img
                    src="/lovable-uploads/22e7f2d0-f84d-4adc-a5cb-21d985f09ac0.png"
                    alt="Espace de coworking"
                    className="w-full h-full object-cover rounded-l-lg absolute inset-0"
                    loading="lazy"
                  />
                </div>
              )}
              <div className={`w-full md:w-1/2 p-4 md:p-6 ${isMobile ? 'h-full overflow-y-auto' : ''} flex flex-col`}>
                <div className="mb-6">
                  <h3 className="text-lg md:text-xl font-semibold text-primary mb-2">
                    Optimisez le taux de remplissage de votre coworking
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base">
                    Vous avez maintenant une vision claire de la performance de votre espace de coworking.
                  </p>
                </div>

                <AuditFormContent
                  fullName={fullName}
                  coworkingName={coworkingName}
                  email={email}
                  isSubmitting={isSubmitting}
                  onFullNameChange={setFullName}
                  onCoworkingNameChange={setCoworkingName}
                  onEmailChange={setEmail}
                  onSubmit={handleSubmitForm}
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>
    </AnimatePresence>
  );
};
