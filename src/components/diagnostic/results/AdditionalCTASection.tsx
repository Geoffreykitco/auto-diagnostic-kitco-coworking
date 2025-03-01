import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState } from "react";
interface AdditionalCTASectionProps {
  globalScore: number;
  sectionScores: Record<string, number>;
  answers: Record<string, Record<number, {
    value: string | number | number[] | null;
    score: number;
  }>>;
}
export const AdditionalCTASection = ({
  globalScore,
  answers
}: AdditionalCTASectionProps) => {
  const [open, setOpen] = useState(false);

  // Récupérer le taux de remplissage depuis les réponses
  const remplissageValue = answers?.informations?.[9]?.value || 0;
  const remplissagePercent = typeof remplissageValue === 'number' ? remplissageValue : 0;
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.5
  }} className="bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden">
      <div className="grid md:grid-cols-2 gap-0">
        {/* Colonne de gauche (texte) */}
        <div className="p-6 md:p-8 flex flex-col justify-center">
          <h3 className="text-xl md:text-2xl font-bold mb-4 text-center text-black">Envie d'augmenter le taux de remplissage de votre coworking ?
        </h3>
          
          <p className="text-gray-700 mb-4 text-center">
            Aujourd'hui, le % de remplissage de votre espace de coworking est de {remplissagePercent}%. 
            En suivant scrupuleusement cette méthode, mon espace de coworking dispose d'un taux de 
            remplissage moyen de 86%.
          </p>
          
          <p className="text-gray-600 mb-6 text-center">
            Nos experts peuvent vous aider à mettre en place une stratégie efficace pour optimiser
            l'occupation de votre espace et maximiser vos revenus.
          </p>
          
          <div>
            <Button onClick={() => setOpen(true)} className="bg-[#0B1A17] text-white px-6 py-2 rounded-md hover:bg-[#132721] transition-colors">Recevoir l'intégralité de mon audit en PDF</Button>
          </div>
        </div>
        
        {/* Colonne de droite (image) */}
        <div className="bg-[#0B1A17] flex items-center justify-center">
          <img src="/lovable-uploads/ba562fd9-da38-4ce5-8df0-507a7e54bcc8.png" alt="Logo KITCO - Auto-diagnostic des coworkings" className="w-full h-full object-contain" />
        </div>
      </div>
    </motion.div>;
};