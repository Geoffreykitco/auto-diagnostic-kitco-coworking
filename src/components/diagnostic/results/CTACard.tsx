
import { motion } from "framer-motion";
import { Award } from "lucide-react";
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
      className="bg-[#0B1A17] text-left text-white rounded-lg p-6 shadow-lg"
    >
      <div className="flex items-center space-x-2 mb-4">
        <h3 className="font-medium">Recevoir mon audit et passer à l'action</h3>
      </div>
      
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
    </motion.div>
  );
};
