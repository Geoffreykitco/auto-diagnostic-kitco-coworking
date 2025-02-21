
export type ScoreLevel = 'débutant' | 'intermédiaire' | 'avancé';

interface SectionScore {
  level: ScoreLevel;
  message: string;
  score: number;
}

interface SectionWeight {
  acquisition: 0.25;
  activation: 0.25;
  retention: 0.20;
  revenus: 0.15;
  recommandation: 0.15;
}

export interface Answer {
  value: string | number | number[] | null;
  score: number;
}

const SCORE_THRESHOLDS = {
  INTERMEDIATE: 50,
  ADVANCED: 80
};

const SECTION_WEIGHTS: SectionWeight = {
  acquisition: 0.25,
  activation: 0.25,
  retention: 0.20,
  revenus: 0.15,
  recommandation: 0.15
};

export const calculateSectionLevel = (score: number): ScoreLevel => {
  if (score >= SCORE_THRESHOLDS.ADVANCED) {
    return 'avancé';
  } else if (score >= SCORE_THRESHOLDS.INTERMEDIATE) {
    return 'intermédiaire';
  }
  return 'débutant';
};

export const getSectionMessage = (section: string, level: ScoreLevel): string => {
  const messages = {
    acquisition: {
      débutant: "Votre stratégie d'acquisition est à renforcer. Concentrez-vous sur la diversification de vos canaux et l'optimisation de votre visibilité.",
      intermédiaire: "Votre approche d'acquisition est bonne mais peut être améliorée. Exploitez davantage vos canaux les plus performants.",
      avancé: "Excellente stratégie d'acquisition ! Continuez à innover et à optimiser vos processus."
    },
    activation: {
      débutant: "Votre processus d'activation nécessite une restructuration. Focalisez-vous sur l'expérience des premiers jours de vos membres.",
      intermédiaire: "Votre activation est efficace mais peut être optimisée. Travaillez sur la personnalisation de l'expérience d'accueil.",
      avancé: "Votre processus d'activation est très performant ! Maintenez cette qualité d'expérience."
    },
    retention: {
      débutant: "Votre rétention mérite plus d'attention. Mettez en place des actions pour fidéliser vos membres.",
      intermédiaire: "Votre stratégie de rétention est correcte. Renforcez l'engagement de votre communauté.",
      avancé: "Excellente rétention ! Vos membres sont fidèles et engagés."
    },
    revenus: {
      débutant: "Vos revenus peuvent être optimisés. Diversifiez vos sources de revenus et ajustez votre pricing.",
      intermédiaire: "Votre modèle économique est stable. Explorez de nouvelles opportunités de revenus.",
      avancé: "Votre modèle économique est très performant ! Continuez d'innover."
    },
    recommandation: {
      débutant: "Le bouche à oreille est à développer. Encouragez vos membres à devenir vos ambassadeurs.",
      intermédiaire: "Votre communauté commence à vous recommander. Structurez votre programme d'ambassadeurs.",
      avancé: "Excellent niveau de recommandation ! Vos membres sont vos meilleurs ambassadeurs."
    }
  };

  return messages[section as keyof typeof messages]?.[level] || 
    "Continuez à améliorer cette dimension de votre espace.";
};

export const calculateSectionScore = (
  answers: Record<number, Answer>,
  maxPossibleScore: number,
  section: string
): SectionScore => {
  const totalScore = Object.values(answers).reduce((sum, answer) => sum + answer.score, 0);
  const normalizedScore = Math.min(Math.round((totalScore / maxPossibleScore) * 100), 100);
  const level = calculateSectionLevel(normalizedScore);
  
  return {
    score: normalizedScore,
    level,
    message: getSectionMessage(section, level)
  };
};

export const getMaxSectionScore = (questions: readonly { question: string; options: readonly { points: number }[] }[]): number => {
  return questions.reduce((sum, question) => {
    const maxPoints = Math.max(...question.options.map(option => option.points));
    return sum + maxPoints;
  }, 0);
};

export const calculateGlobalScore = (sectionScores: Record<string, number>): number => {
  let weightedScore = 0;

  Object.entries(SECTION_WEIGHTS).forEach(([section, weight]) => {
    const sectionScore = sectionScores[section] || 0;
    weightedScore += sectionScore * weight;
  });

  return Math.min(Math.round(weightedScore), 100);
};

export const getGlobalMessage = (globalScore: number): string => {
  const level = calculateSectionLevel(globalScore);
  
  const messages = {
    débutant: "Votre espace de coworking a besoin d'améliorations significatives pour assurer sa croissance. Priorisez Acquisition et Activation.",
    intermédiaire: "Votre coworking est sur une bonne dynamique. Optimisez vos stratégies pour passer à un niveau supérieur.",
    avancé: "Votre coworking fonctionne très bien, mais des marges de progression existent pour aller encore plus loin."
  };

  return messages[level];
};
