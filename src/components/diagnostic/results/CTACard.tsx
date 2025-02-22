import { motion } from "framer-motion";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import { AuditFormContent } from "../sections/audit/AuditFormContent";
import { useAuditForm } from "@/hooks/use-audit-form";

interface CTACardProps {
  globalScore: number;
}

export const CTACard = ({
  globalScore
}: CTACardProps) => {
  const {
    toast
  } = useToast();
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
      toast({
        title: "Formulaire envoyé !",
        description: "Vous recevrez une réponse par email dans les plus brefs délais.",
        duration: 3000
      });
      setOpen(false);
    } catch (error) {
      console.error('Error saving form results:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi du formulaire.",
        duration: 3000
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
    handleSubmit: handleFormSubmit
  } = useAuditForm({
    onSubmit: handleSubmit
  });

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await handleFormSubmit(e);
    if (success) {
      setOpen(false);
    }
  };

  return <motion.div 
    initial={{ opacity: 0, y: 20 }} 
    animate={{ opacity: 1, y: 0 }} 
    transition={{ duration: 0.5 }} 
    className="bg-white"
  >
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-medium text-gray-900">
          Envie d'augmenter le taux de remplissage de votre coworking ?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Vous avez maintenant une vision claire de la performance de votre espace de coworking. Transformez ces insights en résultats concrets.
        </p>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button className="mt-6 bg-[#0B1A17] text-white px-8 py-3 rounded-lg hover:bg-[#132721] transition-colors duration-200">
              Recevoir mon audit et mon plan d'action
            </button>
          </DialogTrigger>

          <DialogContent className={`${isMobile ? 'h-screen w-screen !m-0 !p-0 !inset-0 !translate-x-0 !translate-y-0 !max-w-none !w-full' : 'sm:max-w-[900px]'}`}>
            <div className="flex flex-col md:flex-row w-full h-full">
              {!isMobile && <div className="w-full md:w-1/2 relative">
                  <img src="/lovable-uploads/22e7f2d0-f84d-4adc-a5cb-21d985f09ac0.png" alt="Espace de coworking" className="w-full h-full object-cover rounded-l-lg absolute inset-0" loading="lazy" />
                </div>}
              <div className={`w-full md:w-1/2 p-4 md:p-6 ${isMobile ? 'h-full overflow-y-auto' : ''} flex flex-col`}>
                <div className="mb-6">
                  <h3 className="text-lg md:text-xl font-semibold text-[#0B1A17] mb-2">
                    Optimisez le taux de remplissage de votre coworking
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base">Recevez lees résultats détaillés du dignostic et passez à l'action.</p>
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

        <p className="text-sm text-gray-500 italic mt-4">
          Réponse garantie sous 24h ouvrées
        </p>
      </div>
    </div>
  </motion.div>;
};
