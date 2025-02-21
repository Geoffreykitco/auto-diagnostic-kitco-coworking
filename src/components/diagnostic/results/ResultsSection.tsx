
import { Button } from "@/components/ui/button";
import { Answer } from "../question/types";
import { ScoreCard } from "./ScoreCard";
import { calculateSectionScore } from "../utils/scoring";
import { resultatsSection } from "@/data/sections/resultats";
import { calculateGlobalScore, getGlobalMessage } from "@/utils/scoreCalculator";

interface ResultsSectionProps {
  answers: Record<string, Record<number, Answer>>;
  steps: Array<{ id: string; label: string; }>;
}

export const ResultsSection = ({ answers, steps }: ResultsSectionProps) => {
  const sectionScores: Record<string, number> = {};
  Object.entries(answers).forEach(([sectionKey, sectionAnswers]) => {
    if (sectionKey !== 'informations' && sectionKey !== 'resultats') {
      sectionScores[sectionKey] = calculateSectionScore(sectionAnswers);
    }
  });

  const globalScore = calculateGlobalScore(sectionScores);
  const globalMessage = getGlobalMessage(globalScore);

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden aspect-video mb-8">
        <iframe 
          src="https://www.loom.com/embed/0d1b47c4a5cf430da88b8932a83d88fa"
          frameBorder="0"
          allowFullScreen
          className="w-full h-full"
        />
      </div>

      <ScoreCard title="Score Global" score={globalScore} message={globalMessage} />

      <div className="grid md:grid-cols-2 gap-6">
        {Object.entries(sectionScores).map(([sectionKey, score]) => {
          const sectionTitle = steps.find(s => s.id === sectionKey)?.label || '';
          const message = resultatsSection.recommendations.sections[sectionKey][score >= 80 ? 'advanced' : score >= 50 ? 'intermediate' : 'beginner'];
          
          return (
            <div key={sectionKey}>
              <ScoreCard
                title={sectionTitle}
                score={score}
                message={message}
              />
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-lg p-8 border border-gray-200 shadow text-center space-y-4">
        <h2 className="text-2xl font-bold">Envie d'augmenter le taux de remplissage de votre coworking ?</h2>
        <p className="text-gray-600">
          Vous avez maintenant une vision claire de la performance de votre espace de coworking. 
          Transformez ces insights en résultats concrets.
        </p>
        <Button
          className="bg-primary hover:bg-primary-hover text-white px-8 py-6 rounded-md text-lg"
          onClick={() => {/* Ajoutez ici la logique pour rediriger vers le formulaire d'audit */}}
        >
          Recevoir mon audit et mon plan d'action
        </Button>
        <p className="text-sm text-gray-500 italic">Réponse garantie sous 24h ouvrées</p>
      </div>

      <div className="text-center text-sm text-gray-500 space-y-2">
        <p>Outil de diagnostic développé par la société Kitco</p>
        <p>© 2025 KITCO. Tous droits réservés.</p>
      </div>
    </div>
  );
};
