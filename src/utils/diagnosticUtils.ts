
import { sections } from "@/data/sections";

export const calculateSectionScore = (answers: Record<number, number>, sectionName: string) => {
  if (!answers || !sections[sectionName]) return 0;
  const sectionQuestions = sections[sectionName].questions;
  if (sectionName === 'informations') return 0;
  let maxPoints = 0;
  sectionQuestions.forEach(question => {
    if (question.type === 'multiple') {
      maxPoints += question.options.reduce((sum, opt) => sum + opt.points, 0);
    } else if (question.type === 'single') {
      maxPoints += Math.max(...question.options.map(opt => opt.points));
    }
  });
  const totalPoints = Object.values(answers).reduce((sum: number, points: number) => sum + points, 0);
  return maxPoints > 0 ? totalPoints / maxPoints * 100 : 0;
};

export const getSectionLevel = (score: number) => {
  if (score >= 80) return "Avancé ⚡️";
  if (score >= 50) return "Intermédiaire 😬";
  return "Débutant ❌";
};

export const getSectionAnalysis = (section: string, score: number) => {
  const analysisMap = {
    acquisition: {
      high: "Votre stratégie d'acquisition est efficace. Continuez à expérimenter et à optimiser vos canaux pour maximiser votre visibilité.",
      medium: "Vous avez une bonne base, mais certaines opportunités sont sous-exploitées. Augmentez la fréquence de vos actions marketing.",
      low: "Votre acquisition est faible. Travaillez votre présence en ligne et mettez en place des campagnes marketing ciblées."
    },
    activation: {
      high: "Vos visiteurs deviennent facilement membres. Continuez à fluidifier votre parcours utilisateur.",
      medium: "Des améliorations peuvent être apportées dans l'accompagnement des prospects.",
      low: "Votre taux de conversion est trop bas. Identifiez et réduisez les freins à l'adhésion."
    },
    retention: {
      high: "Vos membres sont fidèles. Capitalisez sur cette communauté forte pour développer votre notoriété.",
      medium: "Votre rétention est correcte mais pourrait être optimisée avec des initiatives communautaires.",
      low: "Vos membres partent trop vite. Travaillez votre engagement client et votre offre de services."
    },
    revenus: {
      high: "Votre monétisation est optimisée. Continuez à diversifier vos sources de revenus.",
      medium: "Vous avez des opportunités d'amélioration sur la gestion et l'optimisation des prix.",
      low: "Votre business model manque de robustesse. Identifiez de nouvelles sources de revenus."
    },
    recommandation: {
      high: "Votre coworking est bien recommandé. Encouragez encore plus vos membres à devenir ambassadeurs.",
      medium: "Vous avez quelques recommandations, mais votre programme de parrainage pourrait être amélioré.",
      low: "Peu ou pas de recommandations. Travaillez votre programme de fidélisation et d'engagement."
    }
  };

  const analysis = analysisMap[section as keyof typeof analysisMap];
  if (!analysis) return "";

  if (score >= 80) return analysis.high;
  if (score >= 50) return analysis.medium;
  return analysis.low;
};

export const getGlobalAnalysis = (score: number) => {
  if (score >= 80) {
    return "Votre coworking est performant et bien optimisé ! Vous avez une stratégie claire et structurée qui fonctionne. Continuez à affiner vos actions et explorez de nouvelles opportunités pour aller encore plus loin.";
  }
  if (score >= 50) {
    return "Bon niveau, mais plusieurs axes d'amélioration restent possibles. Vous avez déjà des bases solides, mais certains aspects nécessitent plus d'optimisation. Concentrez-vous sur vos faiblesses pour progresser vers un modèle plus performant.";
  }
  return "Votre coworking présente des marges de progression importantes. Des actions structurées sont nécessaires pour améliorer votre acquisition, fidélisation et monétisation. Mettez en place un plan d'action clair pour corriger vos points faibles et garantir une croissance durable.";
};
