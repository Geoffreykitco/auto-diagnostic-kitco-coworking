
import { motion } from 'framer-motion';
import { sections } from "@/data/sections";

interface ResultsAnalysisProps {
  answers: Record<string, Record<number, number>>;
}

export const ResultsAnalysis = ({ answers }: ResultsAnalysisProps) => {
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
    
    return maxPoints > 0 ? (totalPoints / maxPoints) * 100 : 0;
  };

  const getSectionLevel = (score: number) => {
    if (score >= 80) return "Avancé ⚡️";
    if (score >= 50) return "Intermédiaire 😬";
    return "Débutant ❌";
  };

  const getSectionAnalysis = (score: number) => {
    if (score >= 80) {
      return "Excellent niveau. Continuez d'optimiser vos processus pour maintenir cette performance.";
    }
    if (score >= 50) {
      return "Bon niveau avec un potentiel d'amélioration. Concentrez-vous sur l'optimisation de vos points faibles.";
    }
    return "Des améliorations significatives sont possibles. Établissez un plan d'action prioritaire.";
  };

  const sectionsToAnalyze = ['acquisition', 'activation', 'retention', 'revenus', 'recommandation'];
  const globalScore = sectionsToAnalyze.reduce((sum, section) => sum + calculateSectionScore(section), 0) / sectionsToAnalyze.length;

  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
      >
        <h2 className="text-2xl font-bold text-primary mb-4">Score Global : {Math.round(globalScore)}%</h2>
        <div className="text-lg text-gray-700 mb-4">Niveau : <span className="font-semibold">{getSectionLevel(globalScore)}</span></div>
        <div className="space-y-4 text-gray-600">
          <p className="font-semibold">Vous connaissez maintenant vos axes d'amélioration !</p>
          <p>Votre espace de coworking a du potentiel et ce diagnostic vous a permis d'identifier les leviers à activer pour optimiser votre acquisition, fidélisation et rentabilité.</p>
          <p className="font-medium">Ne laissez pas ces opportunités inexploitées !</p>
          <p>Prenez rendez-vous avec moi dès maintenant et mettons en place les actions concrètes pour faire évoluer votre coworking.</p>
        </div>
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
              <h3 className="text-xl font-semibold capitalize mb-4">{sections[sectionName].title}</h3>
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
                  {getSectionAnalysis(score)}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col items-center space-y-4 mt-8"
      >
        <p className="text-lg text-gray-700">Envie de trouver des solutions pour avancer ?</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-primary hover:bg-primary-hover text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-colors duration-200"
          onClick={() => window.location.href = "mailto:geoffrey@example.com"}
        >
          Échanger avec Geoffrey
        </motion.button>
      </motion.div>
    </div>
  );
};
