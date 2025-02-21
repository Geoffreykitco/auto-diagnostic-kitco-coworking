
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { AuditForm } from "../sections/AuditForm";
import { ArrowRight } from "lucide-react";

interface CTACardProps {
  globalScore: number;
}

export const CTACard = ({
  globalScore
}: CTACardProps) => {
  const { toast } = useToast();

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg p-6 border border-gray-200 shadow-lg h-full"
    >
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold text-primary mb-3 text-2xl text-center">Envie d'augmenter le taux de remplissage de votre coworking ? </h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-4 text-center">-Vous avez maintenant une vision claire de la performance de votre espace de coworking.
Transformez ces insights en résultats concrets. </p>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-md text-sm transition-colors">
            Recevoir mon audit et mon plan d'action
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="relative pt-8">
          {/* Ligne verticale de la timeline */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary/20"></div>
          
          {/* Étapes de la timeline */}
          {[
            "J'identifie mes axes d'améliorations",
            "Je réalise un plan d'action",
            "Je passe à l'action",
            "Je développe mon coworking"
          ].map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4 mb-6 last:mb-0"
            >
              {/* Point de la timeline */}
              <div className="relative">
                <div className="w-2.5 h-2.5 rounded-full bg-primary">
                  <div className="absolute w-5 h-5 rounded-full bg-primary/20 -m-1.25 animate-pulse"></div>
                </div>
              </div>
              
              {/* Texte de l'étape */}
              <p className="text-sm text-gray-700 font-medium">
                {step}
              </p>
            </motion.div>
          ))}
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
  );
};
