
import { ResultsAnalysis } from "@/components/diagnostic/ResultsAnalysis";
import { sections } from "@/data/sections";

const mockAnswers = {
  informations: {
    0: 2,
    1: [0, 1],
    2: [0, 1],
    3: 1,
    4: 2,
    5: 1,
    6: 2,
    7: "Paris",
    8: "9h-19h",
    9: 75,
    10: [0, 1],
    11: [0, 1, 2]
  },
  acquisition: {
    0: 4,
    1: 3,
    2: 2,
    3: 4,
    4: 3
  },
  activation: {
    0: 2,
    1: 3,
    2: 4,
    3: 3,
    4: 2
  },
  retention: {
    0: 4,
    1: 4,
    2: 3,
    3: 2,
    4: 3
  },
  revenus: {
    0: 3,
    1: 2,
    2: 4,
    3: 3,
    4: 2
  },
  recommandation: {
    0: 4,
    1: 3,
    2: 2,
    3: 4,
    4: 3
  }
};

const mockData = {
  first_name: "John",
  last_name: "Doe",
  email: "john.doe@example.com",
  coworking_name: "Coworking Test",
  created_at: new Date().toISOString(),
  answers: mockAnswers,
  sections,
  global_score: 32,
  global_level: "débutant",
  global_recommendation: "Votre espace de coworking a besoin d'améliorations significatives...",
  acquisition_score: 36,
  acquisition_level: "débutant",
  acquisition_recommendation: "Votre stratégie d'acquisition est à renforcer...",
  activation_score: 28,
  activation_level: "débutant",
  activation_recommendation: "Votre processus d'activation nécessite une restructuration...",
  retention_score: 32,
  retention_level: "débutant",
  retention_recommendation: "Votre rétention mérite plus d'attention...",
  revenus_score: 31,
  revenus_level: "débutant",
  revenus_recommendation: "Vos revenus peuvent être optimisés...",
  recommandation_score: 32,
  recommandation_level: "débutant",
  recommandation_recommendation: "Le bouche à oreille est à développer..."
};

export const ResultsPreview = () => {
  return <ResultsAnalysis answers={mockAnswers} formData={mockData} />;
};
