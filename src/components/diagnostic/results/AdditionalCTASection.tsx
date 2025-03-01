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

  // Récupérer les données depuis les réponses
  const remplissageValue = answers?.informations?.[9]?.value || 0;
  const remplissagePercent = typeof remplissageValue === 'number' ? remplissageValue : 0;

  // Récupérer la superficie
  const superficieOption = answers?.informations?.[4]?.value;
  let superficie = "300 à 600";
  if (typeof superficieOption === 'number') {
    switch (superficieOption) {
      case 0:
        superficie = "moins de 100";
        break;
      case 1:
        superficie = "100 à 300";
        break;
      case 2:
        superficie = "300 à 600";
        break;
      case 3:
        superficie = "plus de 600";
        break;
      default:
        superficie = "300 à 600";
    }
  }

  // Récupérer la capacité d'accueil
  const capaciteOption = answers?.informations?.[6]?.value;
  let capacite = "30 à 50";
  if (typeof capaciteOption === 'number') {
    switch (capaciteOption) {
      case 0:
        capacite = "moins de 10";
        break;
      case 1:
        capacite = "10 à 30";
        break;
      case 2:
        capacite = "30 à 50";
        break;
      case 3:
        capacite = "50 à 100";
        break;
      case 4:
        capacite = "plus de 100";
        break;
      default:
        capacite = "30 à 50";
    }
  }

  // Récupérer la ville
  const ville = answers?.informations?.[7]?.value || "votre ville";
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
          <h3 className="text-xl font-bold mb-4 text-black text-left py-0 md:text-lg">Envie d'augmenter le taux de remplissage de votre coworking ?


Analyse comparative - Performance de votre espace de coworking</h3>
          
          <p className="mb-4 text-left text-base text-gray-600">
            Vous avez indiqué que votre espace de coworking dispose d'un taux de remplissage moyen de {remplissagePercent}%.
          </p>
          
          <p className="mb-4 text-left text-black text-sm">
            Selon une étude menée en 2023, les espaces similaires au vôtre — avec une superficie de {superficie} m², 
            une capacité d'accueil de {capacite} coworkers et situés dans des villes comparables à {ville} — 
            atteignent en moyenne un taux de remplissage supérieur de 25%.
          </p>
          
          <p className="text-gray-600 mb-6 text-sm text-left">
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