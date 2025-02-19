
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

export const sections: Record<string, Section> = {
  informations: informationsSection,
  acquisition: acquisitionSection,
  activation: activationSection,
  retention: retentionSection,
  revenus: revenusSection,
  recommandation: recommandationSection,
  resultats: resultatsSection
};
