
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

        <DialogContent className="bg-white p-0 overflow-hidden sm:max-w-[900px] rounded-lg">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2">
              <img
                src="/lovable-uploads/0b00eed1-89bc-4729-b0a4-9ec9c7c0f30a.png"
                alt="Personnes collaborant dans un espace de coworking"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="w-full md:w-1/2 p-8">
              <div>
                <h2 className="text-2xl font-medium mb-2">
                  Optimisez le taux de remplissage de votre coworking
                </h2>
                <p className="text-gray-600 mb-8">
                  Vous avez maintenant une vision claire de la performance de votre espace de coworking.
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block mb-2">Prénom et nom</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Pour faire connaissance :)"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2">Nom du coworking</label>
                  <input
                    type="text"
                    value={coworkingName}
                    onChange={(e) => setCoworkingName(e.target.value)}
                    placeholder="Pour en savoir plus sur votre espace"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Pour vous envoyer le rapport"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    required
                  />
                </div>

                <button
                  onClick={(e) => handleFormSubmit(e)}
                  disabled={isSubmitting}
                  className="w-full bg-[#0B1A17] text-white py-4 rounded-lg font-medium hover:bg-[#132721] transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "Envoi en cours..." : "Finaliser"}
                </button>
              </div>
            </div>
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white"
    >
      <Content />
    </motion.div>
  );
};
