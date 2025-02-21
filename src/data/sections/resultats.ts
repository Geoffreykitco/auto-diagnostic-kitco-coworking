
import { Question } from "@/components/diagnostic/question/types";

export const resultatsSection = {
  title: "Résultats de votre diagnostic",
  description: "Voici une analyse détaillée de vos résultats avec nos recommandations pour chaque section.",
  questions: [] as readonly Question[],
  isResultSection: true,
  videoUrl: "https://www.loom.com/embed/0d1b47c4a5cf430da88b8932a83d88fa",
  recommendations: {
    global: {
      beginner: "Votre espace de coworking a besoin d'améliorations significatives. Concentrez-vous sur l'acquisition et l'activation des membres.",
      intermediate: "Votre espace montre un bon potentiel. Optimisez vos processus pour passer au niveau supérieur.",
      advanced: "Excellent travail ! Votre espace est très performant. Continuez d'innover pour maintenir cette dynamique."
    },
    sections: {
      acquisition: {
        beginner: "Diversifiez vos canaux d'acquisition et renforcez votre présence en ligne.",
        intermediate: "Optimisez vos canaux existants et testez de nouvelles stratégies marketing.",
        advanced: "Maintenez votre stratégie d'acquisition tout en explorant de nouveaux marchés."
      },
      activation: {
        beginner: "Structurez votre processus d'onboarding et simplifiez l'inscription des nouveaux membres.",
        intermediate: "Personnalisez davantage l'expérience d'accueil et réduisez les frictions.",
        advanced: "Perfectionnez votre processus d'activation en utilisant les retours des membres."
      },
      retention: {
        beginner: "Mettez en place un programme de fidélisation et améliorez l'expérience membre.",
        intermediate: "Renforcez l'engagement communautaire et développez les services additionnels.",
        advanced: "Innovez dans vos programmes de fidélisation et l'animation de la communauté."
      },
      revenus: {
        beginner: "Optimisez votre modèle économique et diversifiez vos sources de revenus.",
        intermediate: "Affinez votre pricing et développez des services complémentaires.",
        advanced: "Explorez de nouvelles opportunités de revenus tout en optimisant l'existant."
      },
      recommandation: {
        beginner: "Encouragez les avis positifs et mettez en place un programme de parrainage.",
        intermediate: "Développez votre programme d'ambassadeurs et valorisez les témoignages.",
        advanced: "Maximisez le bouche-à-oreille et capitalisez sur votre communauté."
      }
    }
  }
} as const;
