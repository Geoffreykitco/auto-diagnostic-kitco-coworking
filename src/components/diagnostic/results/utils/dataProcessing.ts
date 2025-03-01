
/**
 * Utility functions for processing diagnostic data
 */

/**
 * Extracts and formats the value for anciennete from answers
 */
export const getFormattedAnciennete = (ancienneteOption: unknown): string => {
  if (typeof ancienneteOption !== 'number') return "1 à 3 ans";
  
  switch (ancienneteOption) {
    case 0: return "moins de 6 mois";
    case 1: return "6 mois à 1 an";
    case 2: return "1 à 3 ans";
    case 3: return "plus de 3 ans";
    default: return "1 à 3 ans";
  }
};

/**
 * Extracts and formats the value for superficie from answers
 */
export const getFormattedSuperficie = (superficieOption: unknown): string => {
  if (typeof superficieOption !== 'number') return "300 à 600";
  
  switch (superficieOption) {
    case 0: return "moins de 100";
    case 1: return "100 à 300";
    case 2: return "300 à 600";
    case 3: return "plus de 600";
    default: return "300 à 600";
  }
};

/**
 * Extracts and formats the value for capacite from answers
 */
export const getFormattedCapacite = (capaciteOption: unknown): string => {
  if (typeof capaciteOption !== 'number') return "30 à 50";
  
  switch (capaciteOption) {
    case 0: return "moins de 10";
    case 1: return "10 à 30";
    case 2: return "30 à 50";
    case 3: return "50 à 100";
    case 4: return "plus de 100";
    default: return "30 à 50";
  }
};
