
import { motion } from "framer-motion";
import { AuditForm } from "../sections/AuditForm";
import { useToast } from "@/hooks/use-toast";

interface CTACardProps {
  globalScore: number;
}

export const CTACard = ({ globalScore }: CTACardProps) => {
  const { toast } = useToast();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white"
    >
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-medium text-gray-900">
            Envie d'augmenter le taux de remplissage de votre coworking ?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Vous avez maintenant une vision claire de la performance de votre espace de coworking. Transformez ces insights en résultats concrets.
          </p>
          
          <button onClick={() => document.querySelector<HTMLButtonElement>('[data-audit-form-trigger]')?.click()} className="mt-6 bg-[#0B1A17] text-white px-8 py-3 rounded-lg hover:bg-[#132721] transition-colors duration-200">
            Recevoir mon audit et mon plan d'action
          </button>
          
          <p className="text-sm text-gray-500 italic mt-4">
            Réponse garantie sous 24h ouvrées
          </p>
        </div>
      </div>
      
      {/* Le formulaire reste invisible jusqu'à ce qu'il soit déclenché */}
      <div className="hidden">
        <AuditForm onSubmit={async (formData) => {
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
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(diagnosticData)
            });

            if (!response.ok) {
              throw new Error('Failed to save form results');
            }

            toast({
              title: "Formulaire envoyé !",
              description: "Vous recevrez une réponse par email dans les plus brefs délais.",
              duration: 3000,
            });

            console.log('Form results saved successfully');
          } catch (error) {
            console.error('Error saving form results:', error);
            toast({
              title: "Erreur",
              description: "Une erreur est survenue lors de l'envoi du formulaire.",
              duration: 3000,
            });
          }
        }} />
      </div>
    </motion.div>
  );
};
