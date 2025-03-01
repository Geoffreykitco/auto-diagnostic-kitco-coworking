
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface AdditionalCTASectionProps {
  globalScore: number;
  sectionScores: Record<string, number>;
  answers: Record<string, Record<number, { value: string | number | number[] | null; score: number }>>;
}

export const AdditionalCTASection = ({ globalScore, answers }: AdditionalCTASectionProps) => {
  const [open, setOpen] = useState(false);
  
  // Récupérer le taux de remplissage depuis les réponses
  const remplissageValue = answers?.informations?.[9]?.value || 0;
  const remplissagePercent = typeof remplissageValue === 'number' ? remplissageValue : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden"
    >
      <div className="grid md:grid-cols-2 gap-0" style={{ maxHeight: "70%" }}>
        {/* Colonne de gauche (texte) */}
        <div className="p-4 md:p-6 flex flex-col justify-center">
          <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
            Améliorez votre taux de remplissage
          </h3>
          
          <p className="text-gray-700 mb-3 text-sm md:text-base">
            Aujourd'hui, le % de remplissage de votre espace de coworking est de {remplissagePercent}%. 
            En suivant scrupuleusement cette méthode, mon espace de coworking dispose d'un taux de 
            remplissage moyen de 86%.
          </p>
          
          <p className="text-gray-600 mb-4 text-sm md:text-base">
            Nos experts peuvent vous aider à mettre en place une stratégie efficace pour optimiser
            l'occupation de votre espace et maximiser vos revenus.
          </p>
          
          <div>
            <Button 
              onClick={() => setOpen(true)} 
              className="bg-[#0B1A17] text-white px-5 py-1.5 rounded-md hover:bg-[#132721] transition-colors text-sm"
            >
              Recevoir mon plan d'action personnalisé
            </Button>
          </div>
        </div>
        
        {/* Colonne de droite (image) */}
        <div className="bg-[#0B1A17] flex items-center justify-center" style={{ height: "200px" }}>
          <img 
            src="/lovable-uploads/de408d12-d8ae-4da7-ba81-00ff18253eac.png" 
            alt="Logo KITCO - Des coworkings bien pensés" 
            className="w-full h-full object-contain p-4"
          />
        </div>
      </div>
    </motion.div>
  );
};
