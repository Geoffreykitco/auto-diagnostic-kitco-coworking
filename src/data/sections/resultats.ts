
import { Question } from "@/components/diagnostic/question/types";

export const resultatsSection = {
  title: "Résultats de votre diagnostic",
  description: "Voici une vidéo qui explique en détail comment interpréter vos résultats.",
  questions: [] as Question[],
  isResultSection: true,
  videoUrl: "https://www.loom.com/embed/0d1b47c4a5cf430da88b8932a83d88fa"
} as const;
