
import { ResultsAnalysis } from "@/components/diagnostic/ResultsAnalysis";
import { sections } from "@/data/sections";

const mockAnswers: Record<string, Record<number, { value: string | number | number[] | null; score: number }>> = {
  informations: {
    0: { value: 1, score: 0 },
    1: { value: [1, 2], score: 0 },
    2: { value: [2, 3], score: 0 },
    3: { value: 2, score: 0 },
    4: { value: 1, score: 0 },
    5: { value: 2, score: 0 },
    6: { value: 1, score: 0 },
    7: { value: "Lyon", score: 0 },
    8: { value: "8h-20h", score: 0 },
    9: { value: 85, score: 0 },
    10: { value: [1, 2], score: 0 },
    11: { value: [0, 2, 3], score: 0 }
  },
  acquisition: {
    0: { value: 5, score: 12 },
    1: { value: 4, score: 10 },
    2: { value: 3, score: 7 },
    3: { value: 5, score: 12 },
    4: { value: 4, score: 10 }
  },
  activation: {
    0: { value: 3, score: 7 },
    1: { value: 4, score: 10 },
    2: { value: 5, score: 12 },
    3: { value: 4, score: 10 },
    4: { value: 3, score: 7 }
  },
  retention: {
    0: { value: 5, score: 12 },
    1: { value: 5, score: 12 },
    2: { value: 4, score: 10 },
    3: { value: 3, score: 7 },
    4: { value: 4, score: 10 }
  },
  revenus: {
    0: { value: 4, score: 10 },
    1: { value: 3, score: 7 },
    2: { value: 5, score: 12 },
    3: { value: 4, score: 10 },
    4: { value: 3, score: 7 }
  },
  recommandation: {
    0: { value: 5, score: 12 },
    1: { value: 4, score: 10 },
    2: { value: 3, score: 7 },
    3: { value: 5, score: 12 },
    4: { value: 4, score: 10 }
  }
};

const mockData = {
  first_name: "Marie",
  last_name: "Dupont",
  email: "marie.dupont@coworking.fr",
  coworking_name: "L'Espace Créatif",
  created_at: new Date().toISOString(),
  answers: mockAnswers,
  sections,
  global_score: 75,
  global_level: "intermédiaire",
  global_recommendation: "Votre espace de coworking montre un bon potentiel avec plusieurs points forts, mais certains aspects peuvent encore être optimisés pour maximiser votre succès.",
  acquisition_score: 82,
  acquisition_level: "avancé",
  acquisition_recommendation: "Votre stratégie d'acquisition est solide. Pour progresser davantage, concentrez-vous sur l'optimisation de vos canaux les plus performants.",
  activation_score: 72,
  activation_level: "intermédiaire",
  activation_recommendation: "Votre processus d'activation fonctionne bien mais peut être amélioré pour convertir plus efficacement vos prospects.",
  retention_score: 80,
  retention_level: "avancé",
  retention_recommendation: "Excellente rétention ! Continuez à enrichir l'expérience de vos membres pour maintenir ce niveau.",
  revenus_score: 70,
  revenus_level: "intermédiaire",
  revenus_recommendation: "Vos revenus sont satisfaisants mais il existe des opportunités d'optimisation, notamment dans la diversification de vos sources de revenus.",
  recommandation_score: 78,
  recommandation_level: "intermédiaire",
  recommandation_recommendation: "Le bouche à oreille fonctionne bien. Envisagez un programme de parrainage pour amplifier ces recommandations."
};

export const ResultsPreview = () => {
  return <ResultsAnalysis answers={mockAnswers} formData={mockData} />;
};
