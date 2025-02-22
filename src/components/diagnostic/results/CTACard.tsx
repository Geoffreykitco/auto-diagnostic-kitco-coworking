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
  const Content = () => <div className={`max-w-5xl mx-auto px-4 ${isMobile ? 'py-3' : 'py-8'}`}>
      <div className="text-center space-y-2">
        <h2 className="font-semibold text-gray-900 text-xl">
          {isMobile ? "Augmentez le taux de remplissage de votre coworking" : "Envie d'augmenter le taux de remplissage de votre coworking ?"}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto md:text-base text-sm">
          Vous avez maintenant une vision claire de la performance de votre espace de coworking.
        </p>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button className={`mt-2 bg-[#0B1A17] text-white px-6 py-2.5 rounded-lg text-sm md:text-base ${!isMobile && 'hover:bg-[#132721] hover:scale-[1.02] transform transition-colors duration-200'}`}>
              Recevoir mon audit et mon plan d'action
            </button>
          </DialogTrigger>

          <DialogContent className={`${isMobile ? 'h-[95vh] w-screen !m-0 !p-0 !inset-0 !translate-x-0 !translate-y-0 !max-w-none !w-full' : 'sm:max-w-[900px]'}`}>
            <div className="flex flex-col md:flex-row w-full h-full">
              <div className={`w-full ${isMobile ? 'h-full overflow-y-auto' : 'md:w-1/2'} flex flex-col`}>
                <div className="p-4">
                  <h3 className="md:text-xl font-semibold text-[#0B1A17] mb-2 text-xl text-left mx-0 py-0 my-[20px]">
                    Optimisez le taux de remplissage de votre coworking
                  </h3>
                  <p className="text-sm md:text-base text-gray-500">
                    Recevez les résultats détaillés du diagnostic et passez à l'action.
                  </p>
                </div>

                <div className="px-4 flex-1">
                  <AuditFormContent fullName={fullName} coworkingName={coworkingName} email={email} isSubmitting={isSubmitting} onFullNameChange={setFullName} onCoworkingNameChange={setCoworkingName} onEmailChange={setEmail} onSubmit={handleFormSubmit} />
                </div>

                {isMobile && <div className="w-full h-48 relative mt-4">
                    <img src="/lovable-uploads/22e7f2d0-f84d-4adc-a5cb-21d985f09ac0.png" alt="Espace de coworking" className="w-full h-full object-cover" loading="lazy" />
                  </div>}
              </div>
              
              {!isMobile && <div className="w-full md:w-1/2 relative">
                  <img src="/lovable-uploads/22e7f2d0-f84d-4adc-a5cb-21d985f09ac0.png" alt="Espace de coworking" className="w-full h-full object-cover rounded-l-lg absolute inset-0" loading="lazy" />
                </div>}
            </div>
          </DialogContent>
        </Dialog>

        <p className="font-medium mt-1 text-gray-500 text-xs">
          Nous garantissons la confidentialité de vos données.
        </p>
      </div>
    </div>;
  if (isMobile) {
    return <div className="bg-white">
      <Content />
    </div>;
  }
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.5
  }} className="bg-white">
      <Content />
    </motion.div>;
};