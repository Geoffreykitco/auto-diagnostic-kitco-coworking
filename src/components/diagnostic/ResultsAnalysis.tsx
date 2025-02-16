
import { motion } from 'framer-motion';
import { sections } from "@/data/sections";

interface ResultsAnalysisProps {
  answers: Record<string, Record<number, number>>;
}

export const ResultsAnalysis = ({ answers }: ResultsAnalysisProps) => {
  const calculateSectionScore = (sectionName: string) => {
    if (!answers[sectionName]) return 0;
    const sectionAnswers = answers[sectionName];
    const totalPoints = Object.values(sectionAnswers).reduce((sum: number, points: number) => sum + points, 0);
    const maxPoints = sections[sectionName].questions.reduce((sum, q) => {
      if (q.type === 'multiple') {
        return sum + q.options.reduce((optSum, opt) => optSum + opt.points, 0);
      }
      return sum + Math.max(...q.options.map(opt => opt.points), 0);
    }, 0);
    return maxPoints > 0 ? (totalPoints / maxPoints) * 100 : 0;
  };

  const getSectionAnalysis = (score: number) => {
    if (score >= 80) return "Excellent - Vos pratiques sont très bien établies";
    if (score >= 60) return "Bon - Vous avez de bonnes bases mais il y a place à l'amélioration";
    if (score >= 40) return "Moyen - Des améliorations significatives sont possibles";
    return "À améliorer - Cette section nécessite votre attention";
  };

  const sectionsToAnalyze = ['acquisition', 'activation', 'retention', 'revenus', 'recommandation'];

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-primary">Analyse des résultats</h2>
      {sectionsToAnalyze.map(sectionName => {
        const score = Math.round(calculateSectionScore(sectionName));
        return (
          <div key={sectionName} className="p-6 rounded-lg border border-gray-200 space-y-4">
            <h3 className="text-xl font-semibold capitalize">{sectionName}</h3>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full border-4 border-primary flex items-center justify-center">
                <span className="text-2xl font-bold">{score}%</span>
              </div>
              <div className="flex-1">
                <p className="text-gray-600">{getSectionAnalysis(score)}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
