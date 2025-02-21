
import { Question } from "@/components/diagnostic/question/types";
import { informationsSection } from "./informations";
import { acquisitionSection } from "./acquisition";
import { activationSection } from "./activation";
import { retentionSection } from "./retention";
import { revenusSection } from "./revenus";
import { recommandationSection } from "./recommandation";
import { resultatsSection } from "./resultats";

export interface Section {
  title: string;
  description: string;
  questions: readonly Question[];
  isResultSection?: boolean;
  videoUrl?: string;
  recommendations?: {
    global: {
      beginner: string;
      intermediate: string;
      advanced: string;
    };
    sections: {
      [key: string]: {
        beginner: string;
        intermediate: string;
        advanced: string;
      };
    };
  };
}

export const sections = {
  informations: informationsSection,
  acquisition: acquisitionSection,
  activation: activationSection,
  retention: retentionSection,
  revenus: revenusSection,
  recommandation: recommandationSection,
  resultats: resultatsSection
} as const;
