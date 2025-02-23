
import { ResultsAnalysis } from "@/components/diagnostic/ResultsAnalysis";
import { sections } from "@/data/sections";
import { useEffect, useState } from "react";

// Fonction utilitaire pour générer un score aléatoire
const getRandomScore = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Fonction pour générer des scores aléatoires pour une section
const generateSectionScores = () => {
  return {
    0: { value: getRandomScore(3, 5), score: getRandomScore(7, 12) },
    1: { value: getRandomScore(3, 5), score: getRandomScore(7, 12) },
    2: { value: getRandomScore(3, 5), score: getRandomScore(7, 12) },
    3: { value: getRandomScore(3, 5), score: getRandomScore(7, 12) },
    4: { value: getRandomScore(3, 5), score: getRandomScore(7, 12) }
  };
};

export const ResultsPreview = () => {
  const [mockData, setMockData] = useState<any>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const acquisitionScore = Math.floor(Math.random() * (95 - 65) + 65);
      const activationScore = Math.floor(Math.random() * (95 - 65) + 65);
      const retentionScore = Math.floor(Math.random() * (95 - 65) + 65);
      const revenusScore = Math.floor(Math.random() * (95 - 65) + 65);
      const recommandationScore = Math.floor(Math.random() * (95 - 65) + 65);
      
      const globalScore = Math.floor(
        (acquisitionScore + activationScore + retentionScore + revenusScore + recommandationScore) / 5
      );

      const getLevel = (score: number) => {
        if (score >= 80) return "avancé";
        if (score >= 50) return "intermédiaire";
        return "débutant";
      };

      const mockAnswers = {
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
          9: { value: getRandomScore(70, 95), score: 0 },
          10: { value: [1, 2], score: 0 },
          11: { value: [0, 2, 3], score: 0 }
        },
        acquisition: generateSectionScores(),
        activation: generateSectionScores(),
        retention: generateSectionScores(),
        revenus: generateSectionScores(),
        recommandation: generateSectionScores()
      };

      const newMockData = {
        first_name: "Marie",
        last_name: "Dupont",
        email: "marie.dupont@coworking.fr",
        coworking_name: "L'Espace Créatif",
        created_at: new Date().toISOString(),
        answers: mockAnswers,
        sections,
        global_score: globalScore,
        global_level: getLevel(globalScore),
        global_recommendation: "Score actualisé en temps réel. Les résultats varient pour démontrer différents scénarios.",
        acquisition_score: acquisitionScore,
        acquisition_level: getLevel(acquisitionScore),
        acquisition_recommendation: `Votre score d'acquisition est de ${acquisitionScore}%. ${
          acquisitionScore >= 80 
            ? "Excellent niveau, continuez sur cette lancée !" 
            : "Il y a encore de la marge de progression."
        }`,
        activation_score: activationScore,
        activation_level: getLevel(activationScore),
        activation_recommendation: `Votre score d'activation est de ${activationScore}%. ${
          activationScore >= 80 
            ? "Votre processus d'activation est très efficace." 
            : "Quelques ajustements pourraient améliorer vos résultats."
        }`,
        retention_score: retentionScore,
        retention_level: getLevel(retentionScore),
        retention_recommendation: `Votre score de rétention est de ${retentionScore}%. ${
          retentionScore >= 80 
            ? "Vos membres sont très fidèles !" 
            : "Il y a des opportunités d'amélioration."
        }`,
        revenus_score: revenusScore,
        revenus_level: getLevel(revenusScore),
        revenus_recommendation: `Votre score de revenus est de ${revenusScore}%. ${
          revenusScore >= 80 
            ? "Excellent modèle économique !" 
            : "Pensez à diversifier vos sources de revenus."
        }`,
        recommandation_score: recommandationScore,
        recommandation_level: getLevel(recommandationScore),
        recommandation_recommendation: `Votre score de recommandation est de ${recommandationScore}%. ${
          recommandationScore >= 80 
            ? "Vos membres sont d'excellents ambassadeurs !" 
            : "Encouragez davantage le bouche à oreille."
        }`
      };

      setMockData(newMockData);
    }, 3000); // Met à jour toutes les 3 secondes

    return () => clearInterval(interval);
  }, []);

  if (!mockData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Chargement de la preview...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white w-full">
      <ResultsAnalysis answers={mockData.answers} formData={mockData} />
    </div>
  );
};
