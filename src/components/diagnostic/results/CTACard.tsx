
import { motion } from "framer-motion";
import { Award, ArrowRight } from "lucide-react";
import { AuditForm } from "../sections/AuditForm";
import { useToast } from "@/hooks/use-toast";

interface CTACardProps {
  globalScore: number;
}

export const CTACard = ({
  globalScore
}: CTACardProps) => {
  const { toast } = useToast();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-[#0B1A17] to-[#132720] text-white rounded-lg p-8 shadow-xl border border-[#1d3832]/20"
    >
      <div className="space-y-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <Award className="w-8 h-8 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-emerald-400 mb-2">
              Passez à l'action maintenant
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Transformez ces insights en résultats concrets. Notre expert analysera en détail votre diagnostic et vous proposera un plan d'action personnalisé.
            </p>
          </div>
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
        
        <div className="text-xs text-gray-400 mt-4 italic">
          Réponse garantie sous 24h ouvrées
        </div>
      </div>
    </motion.div>
  );
};
