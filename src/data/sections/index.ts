
import { informationsSection } from './informations';
import { acquisitionSection } from './acquisition';
import { activationSection } from './activation';
import { retentionSection } from './retention';
import { revenusSection } from './revenus';
import { recommandationSection } from './recommandation';
import { resultatsSection } from './resultats';
import { Question } from '@/components/diagnostic/question/types';

export interface Section {
  readonly title: string;
  readonly description: string;
  readonly questions: readonly Question[];
}

// Cast chaque section comme Section pour assurer la compatibilité des types
export const sections: Record<string, Section> = {
  informations: informationsSection as Section,
  acquisition: acquisitionSection as Section,
  activation: activationSection as Section,
  retention: retentionSection as Section,
  revenus: revenusSection as Section,
  recommandation: recommandationSection as Section,
  resultats: resultatsSection as Section
} as const;
