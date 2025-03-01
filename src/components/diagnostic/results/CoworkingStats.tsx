
import React from 'react';
import { getFormattedAnciennete, getFormattedSuperficie, getFormattedCapacite } from './utils/dataProcessing';

interface CoworkingStatsProps {
  remplissagePercent: number;
  ancienneteOption: unknown;
  superficieOption: unknown;
  capaciteOption: unknown;
  ville: string;
}

export const CoworkingStats: React.FC<CoworkingStatsProps> = ({
  remplissagePercent,
  ancienneteOption,
  superficieOption,
  capaciteOption,
  ville
}) => {
  const anciennete = getFormattedAnciennete(ancienneteOption);
  const superficie = getFormattedSuperficie(superficieOption);
  const capacite = getFormattedCapacite(capaciteOption);

  return (
    <>
      <h3 className="mb-4 text-black text-left py-0 md:text-lg text-lg font-bold break-words hyphens-auto">
        Vous avez indiqué que votre espace de coworking dispose d'un taux de remplissage moyen de {remplissagePercent}%.
      </h3>
      
      <p className="mb-4 text-left text-black text-sm">
        L'analyse comparative de vos données avec l'étude 2024 du Synaphe (Syndicat coworking) révèle que les espaces similaires au vôtre obtiennent un <span className="font-bold underline">taux de remplissage supérieur de 19% en moyenne</span>.
      </p>
      
      <p className="mb-4 text-left text-black text-sm">
        L'étude porte sur des espaces présentant 4 caractéristiques suivantes :
      </p>
      
      <ul className="list-disc pl-5 mb-4 text-left text-black text-sm space-y-1">
        <li>Une ancienneté de {anciennete}</li>
        <li>Une superficie de {superficie} m²</li>
        <li>Une capacité d'accueil de {capacite} coworkers</li>
        <li className="break-words hyphens-auto">Une localisation dans des villes comparables à {ville}</li>
      </ul>
    </>
  );
};
