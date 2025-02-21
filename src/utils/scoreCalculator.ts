
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

const SCORE_THRESHOLDS = {
  INTERMEDIATE: 50,
  ADVANCED: 75
};

const SECTION_WEIGHTS: SectionWeight = {
  acquisition: 0.25,
  activation: 0.25,
  retention: 0.20,
  revenus: 0.15,
  recommandation: 0.15
};

export const calculateSectionLevel = (score: number, maxScore: number): ScoreLevel => {
  const percentage = (score / maxScore) * 100;
  
  if (percentage >= SCORE_THRESHOLDS.ADVANCED) {
    return 'avancé';
  } else if (percentage >= SCORE_THRESHOLDS.INTERMEDIATE) {
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
  sectionAnswers: Record<number, { value: string | number | number[] | null; score: number }>,
  maxPossibleScore: number
): SectionScore => {
  const totalScore = Object.values(sectionAnswers).reduce((sum, answer) => sum + answer.score, 0);
  const level = calculateSectionLevel(totalScore, maxPossibleScore);

  return {
    score: totalScore,
    level,
    message: getSectionMessage(sectionAnswers.toString(), level)
  };
};

export const getMaxSectionScore = (options: readonly { points: number }[]): number => {
  return options.reduce((sum, option) => sum + option.points, 0);
};

export const calculateGlobalScore = (sectionScores: Record<string, number>, sectionMaxScores: Record<string, number>): number => {
  let weightedScore = 0;

  Object.entries(sectionScores).forEach(([section, score]) => {
    const maxScore = sectionMaxScores[section];
    if (maxScore && maxScore > 0) {
      const sectionPercentage = (score / maxScore) * 100;
      const weight = SECTION_WEIGHTS[section as keyof SectionWeight] || 0;
      weightedScore += sectionPercentage * weight;
    }
  });

  return Math.round(weightedScore);
};

export const getGlobalScoreLevel = (globalScore: number): ScoreLevel => {
  if (globalScore >= SCORE_THRESHOLDS.ADVANCED) {
    return 'avancé';
  } else if (globalScore >= SCORE_THRESHOLDS.INTERMEDIATE) {
    return 'intermédiaire';
  }
  return 'débutant';
};

export const getGlobalMessage = (globalScore: number): string => {
  const level = getGlobalScoreLevel(globalScore);
  
  const messages = {
    débutant: "Votre espace de coworking a besoin d'amélioration dans plusieurs domaines clés. Concentrez-vous d'abord sur l'acquisition et l'activation de nouveaux membres.",
    intermédiaire: "Votre espace de coworking est sur la bonne voie. Continuez à optimiser vos processus et à développer votre communauté.",
    avancé: "Félicitations ! Votre espace de coworking est très performant. Maintenez ce niveau d'excellence et innovez continuellement."
  };

  return messages[level];
};
