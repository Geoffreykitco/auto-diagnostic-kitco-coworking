
import { motion } from 'framer-motion';
import { sections } from "@/data/sections";

interface ResultsAnalysisProps {
  answers: Record<string, Record<number, number>>;
}

export const ResultsAnalysis = ({
  answers
}: ResultsAnalysisProps) => {
  const calculateSectionScore = (sectionName: string) => {
    if (!answers[sectionName] || !sections[sectionName]) return 0;
    const sectionAnswers = answers[sectionName];
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
    const totalPoints = Object.values(sectionAnswers).reduce((sum: number, points: number) => sum + points, 0);
    return maxPoints > 0 ? totalPoints / maxPoints * 100 : 0;
  };

  const getSectionLevel = (score: number) => {
    if (score >= 80) return "Avancé ⚡️";
    if (score >= 50) return "Intermédiaire 😬";
    return "Débutant ❌";
  };

  const getSectionAnalysis = (section: string, score: number) => {
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

  const sectionsToAnalyze = ['acquisition', 'activation', 'retention', 'revenus', 'recommandation'];
  const sectionWeights = {
    acquisition: 0.25,
    activation: 0.25,
    retention: 0.20,
    revenus: 0.15,
    recommandation: 0.15
  };

  const globalScore = sectionsToAnalyze.reduce((sum, section) => {
    const sectionScore = calculateSectionScore(section);
    return sum + (sectionScore * sectionWeights[section as keyof typeof sectionWeights]);
  }, 0);

  const getGlobalAnalysis = (score: number) => {
    if (score >= 80) {
      return "Votre coworking est performant et bien optimisé ! Vous avez une stratégie claire et structurée qui fonctionne. Continuez à affiner vos actions et explorez de nouvelles opportunités pour aller encore plus loin.";
    }
    if (score >= 50) {
      return "Bon niveau, mais plusieurs axes d'amélioration restent possibles. Vous avez déjà des bases solides, mais certains aspects nécessitent plus d'optimisation. Concentrez-vous sur vos faiblesses pour progresser vers un modèle plus performant.";
    }
    return "Votre coworking présente des marges de progression importantes. Des actions structurées sont nécessaires pour améliorer votre acquisition, fidélisation et monétisation. Mettez en place un plan d'action clair pour corriger vos points faibles et garantir une croissance durable.";
  };

  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
      >
        <h2 className="text-2xl font-bold text-primary mb-4">Score Global : {Math.round(globalScore)}%</h2>
        <div className="text-lg text-gray-700 mb-2">Niveau : <span className="font-semibold">{getSectionLevel(globalScore)}</span></div>
        <p className="text-gray-600">{getGlobalAnalysis(globalScore)}</p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        {sectionsToAnalyze.map((sectionName, index) => {
          const score = Math.round(calculateSectionScore(sectionName));
          return (
            <motion.div 
              key={sectionName}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
            >
              <h3 className="text-xl font-semibold mb-4">{sections[sectionName].title}</h3>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Score</span>
                  <span className="font-bold text-primary">{score}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div 
                    className="bg-primary rounded-full h-2 transition-all duration-1000 ease-out"
                    style={{ width: `${score}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {getSectionAnalysis(sectionName, score)}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
      >
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-primary mb-2">Notre Accompagnement</h3>
          <p className="text-gray-600">Votre espace de coworking recèle un potentiel inexploité. Notre analyse révèle de vraies opportunités de croissance.</p>
        </div>

        <div className="flex flex-col items-center mt-6">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-all duration-200"
            onClick={() => window.location.href = "https://calendar.app.google/o7Hs96ieaHG2AudD9"}
          >
            Échanger avec Geoffrey
          </motion.button>
          <p className="text-gray-600 mt-3 text-sm">
            30 minutes pour définir votre plan d'action
          </p>
        </div>
      </motion.div>
    </div>
  );
};
