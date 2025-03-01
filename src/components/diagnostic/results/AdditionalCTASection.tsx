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

  // Récupérer l'ancienneté
  const ancienneteOption = answers?.informations?.[0]?.value;
  let anciennete = "1 à 3 ans";
  if (typeof ancienneteOption === 'number') {
    switch (ancienneteOption) {
      case 0:
        anciennete = "moins de 6 mois";
        break;
      case 1:
        anciennete = "6 mois à 1 an";
        break;
      case 2:
        anciennete = "1 à 3 ans";
        break;
      case 3:
        anciennete = "plus de 3 ans";
        break;
      default:
        anciennete = "1 à 3 ans";
    }
  }

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
          <h3 className="text-xl font-bold mb-4 text-black text-left py-0 md:text-lg">Vous avez indiqué que votre espace de coworking dispose d'un taux de remplissage moyen de {remplissagePercent}%.
          </h3>
          
          <p className="mb-4 text-left text-black text-sm">L'analyse comparative de vos données avec l'étude 2024 du Synaphe (Syndicat coworking) révèle que les espaces similaires au vôtre obtiennent un taux de remplissage supérieur de 19% en moyenne.</p>
          
          <p className="mb-4 text-left text-black text-sm">L'étude porte sur des espaces présentant 4 caractéristiques suivantes :</p>
          
          <ul className="list-disc pl-5 mb-4 text-left text-black text-sm">
            <li>Une ancienneté de {anciennete}</li>
            <li>Une superficie de {superficie} m²</li>
            <li>Une capacité d'accueil de {capacite} coworkers</li>
            <li>Une localisation dans des villes comparables à {ville}</li>
          </ul>
          
          <p className="text-gray-600 mb-6 text-left text-xs">Des recommandations adaptées à votre contexte permettraient d'augmenter significativement votre taux de remplissage.</p>
          
          <div>
            <Button onClick={() => setOpen(true)} className="bg-[#9F5F56] text-white hover:bg-[#9F5F56]/90 transition-colors my-0 py-[25px] px-[25px] text-center rounded-md text-base">Recevoir l'intégralité de mon audit en PDF</Button>
          </div>
        </div>
        
        {/* Colonne de droite (image) */}
        <div className="bg-[#0B1A17] flex items-center justify-center">
          <img src="/lovable-uploads/ba562fd9-da38-4ce5-8df0-507a7e54bcc8.png" alt="Logo KITCO - Auto-diagnostic des coworkings" className="w-full h-full object-contain" />
        </div>
      </div>
    </motion.div>;
};