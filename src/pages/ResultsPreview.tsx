
import { ResultsAnalysis } from "@/components/diagnostic/ResultsAnalysis";
import { sections } from "@/data/sections";

const mockAnswers = {
  informations: {
    0: { value: 2, score: 0 },
    1: { value: [0, 1], score: 0 },
    2: { value: [0, 1], score: 0 },
    3: { value: 1, score: 0 },
    4: { value: 2, score: 0 },
    5: { value: 1, score: 0 },
    6: { value: 2, score: 0 },
    7: { value: "Paris", score: 0 },
    8: { value: "9h-19h", score: 0 },
    9: { value: 75, score: 0 },
    10: { value: [0, 1], score: 0 },
    11: { value: [0, 1, 2], score: 0 }
  },
  acquisition: {
    0: { value: 4, score: 4 },
    1: { value: 3, score: 3 },
    2: { value: 2, score: 2 },
    3: { value: 4, score: 4 },
    4: { value: 3, score: 3 }
  },
  activation: {
    0: { value: 2, score: 2 },
    1: { value: 3, score: 3 },
    2: { value: 4, score: 4 },
    3: { value: 3, score: 3 },
    4: { value: 2, score: 2 }
  },
  retention: {
    0: { value: 4, score: 4 },
    1: { value: 4, score: 4 },
    2: { value: 3, score: 3 },
    3: { value: 2, score: 2 },
    4: { value: 3, score: 3 }
  },
  revenus: {
    0: { value: 3, score: 3 },
    1: { value: 2, score: 2 },
    2: { value: 4, score: 4 },
    3: { value: 3, score: 3 },
    4: { value: 2, score: 2 }
  },
  recommandation: {
    0: { value: 4, score: 4 },
    1: { value: 3, score: 3 },
    2: { value: 2, score: 2 },
    3: { value: 4, score: 4 },
    4: { value: 3, score: 3 }
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
