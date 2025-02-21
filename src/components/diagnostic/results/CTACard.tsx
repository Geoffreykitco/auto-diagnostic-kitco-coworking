
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { AuditForm } from "../sections/AuditForm";

interface CTACardProps {
  globalScore: number;
}

export const CTACard = ({
  globalScore
}: CTACardProps) => {
  const { toast } = useToast();

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg p-6 border border-gray-200 shadow-lg"
      >
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-primary mb-3 text-2xl text-center">Envie d'augmenter le taux de remplissage de votre coworking ? </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4 text-center">Vous avez maintenant une vision claire de la performance de votre espace de coworking.
Transformez ces insights en résultats concrets.</p>
            <button className="px-8 py-4 bg-primary hover:bg-primary-hover text-white rounded-md text-base font-medium transition-colors">
              Recevoir mon audit et mon plan d'action
            </button>
          </div>
          
          <AuditForm onSubmit={async formData => {
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
              console.log('Form results saved successfully');
            } catch (error) {
              console.error('Error saving form results:', error);
              toast({
                title: "Erreur",
                description: "Une erreur est survenue lors de l'envoi du formulaire.",
                duration: 3000
              });
            }
          }} />
          
          <p className="text-xs text-gray-500 text-center italic">
            Réponse garantie sous 24h ouvrées
          </p>
        </div>
      </motion.div>

      {/* Timeline horizontale */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-8 relative"
      >
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-primary/20"></div>
        <div className="grid grid-cols-4 gap-4">
          {[
            "J'identifie mes axes d'améliorations",
            "Je réalise un plan d'action",
            "Je passe à l'action",
            "Je développe mon coworking"
          ].map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              className="relative flex flex-col items-center text-center"
            >
              <div className="relative z-10 mb-4">
                <div className="w-8 h-8 rounded-full bg-white border-2 border-primary flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-primary"></div>
                </div>
                <div className="absolute -inset-2 rounded-full bg-primary/5 animate-pulse"></div>
              </div>
              <p className="text-sm text-gray-700 font-medium px-2">
                {step}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  );
};
