
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
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-[#F2FCE2] rounded-lg p-8 border border-emerald-100 shadow-sm"
    >
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-primary mb-3">
            Passez à l'action maintenant
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            Transformez ces insights en résultats concrets. Notre expert analysera en détail votre diagnostic et vous proposera un plan d'action personnalisé.
          </p>
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
