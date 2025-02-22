
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
      const shouldClose = window.confirm("Voulez-vous vraiment fermer ? Vos données seront perdues.");
      if (shouldClose) {
        resetForm();
        setOpen(false);
      }
    } else {
      setOpen(newOpen);
    }
  };

  const handleSubmitForm = async (e: React.FormEvent): Promise<boolean> => {
    e.preventDefault();
    try {
      await handleSubmit(e);
      setOpen(false);
      return true;
    } catch (error) {
      console.error("Error submitting form:", error);
      return false;
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
              className="w-full bg-[#0B1A17] hover:bg-[#132721] text-white font-semibold py-3 md:py-4 px-6 md:px-8 rounded-lg shadow-md transition-all duration-200 text-sm md:text-base"
              aria-label="Ouvrir le formulaire d'audit"
            >
              Recevez votre audit et découvrez votre feuille de route personnalisée
            </motion.button>
          </DialogTrigger>

          <DialogContent 
            className={`${isMobile ? 'h-screen w-screen !m-0 !p-0 !inset-0 !translate-x-0 !translate-y-0 !max-w-none !w-full' : 'sm:max-w-[900px]'} bg-transparent`}
          >
            <div className="flex flex-col md:flex-row w-full h-full bg-white overflow-hidden rounded-lg">
              <div className="w-full md:w-1/2 h-full">
                <img
                  src="/lovable-uploads/c6f25897-c1f1-44a7-b3cc-49493e48f1b1.png"
                  alt="Personnes travaillant dans un espace de coworking"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className={`w-full md:w-1/2 p-4 md:p-8 flex flex-col ${isMobile ? 'h-full overflow-y-auto' : ''}`}>
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold text-[#0B1A17] mb-2">
                    Optimisez le taux de remplissage de votre coworking
                  </h3>
                  <p className="text-gray-600 text-base">
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
