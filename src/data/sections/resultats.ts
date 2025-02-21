
import { calculateSectionScore, getMaxSectionScore } from "@/utils/scoreCalculator";
import { Question } from "@/components/diagnostic/question/types";

export const resultatsSection = {
  title: "Résultats de votre diagnostic",
  description: "Voici l'analyse complète de votre espace de coworking basée sur vos réponses.",
  questions: [] as Question[],
  isResultSection: true
} as const;
