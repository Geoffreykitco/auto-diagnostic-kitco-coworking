
import { motion } from "framer-motion";
import { DiagnosticBreadcrumb } from "./DiagnosticBreadcrumb";
import { QuestionItem } from "./QuestionItem";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { Section } from "@/data/sections";
import { Answer } from "./question/types";
import { resultatsSection } from "@/data/sections/resultats";
import { calculateGlobalScore, getGlobalMessage } from "@/utils/scoreCalculator";

interface QuestionSectionProps {
  section: Section;
  onOptionSelect: (questionIndex: number, value: string | number | number[] | null) => void;
  onPrevious: () => void;
  onNext: () => void;
  showPrevious: boolean;
  showNext: boolean;
  answers: Record<string, Record<number, Answer>>;
}

const getScoreColor = (score: number): string => {
  if (score >= 80) return "bg-green-500";
  if (score >= 50) return "bg-yellow-500";
  return "bg-red-500";
};

const getNiveau = (score: number): string => {
  if (score >= 80) return "Avancé";
  if (score >= 50) return "Intermédiaire";
  return "Débutant";
};

const calculateSectionScore = (answers: Record<number, Answer>): number => {
  const totalPoints = Object.values(answers).reduce((sum, answer) => sum + answer.score, 0);
  const maxPoints = Object.values(answers).length * 100; // Assuming max score per question is 100
  return Math.round((totalPoints / maxPoints) * 100);
};

export const QuestionSection = ({
  section,
  onOptionSelect,
  onPrevious,
  onNext,
  showPrevious,
  showNext,
  answers
}: QuestionSectionProps) => {
  const steps = [
    { id: 'informations', label: 'Démarrage' },
    { id: 'acquisition', label: 'Acquisition' },
    { id: 'activation', label: 'Activation' },
    { id: 'retention', label: 'Rétention' },
    { id: 'revenus', label: 'Revenus' },
    { id: 'recommandation', label: 'Recommandation' },
    { id: 'resultats', label: 'Résultats' }
  ];

  const currentStep = steps.find(step => section.title.includes(step.label.split('-')[0].trim()));

  const renderScoreCard = (title: string, score: number, message: string) => (
    <div className="bg-white rounded-lg p-6 shadow border border-gray-200">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Score</span>
          <span className="text-red-600 font-semibold text-lg">{score}%</span>
        </div>
        <div className="h-2 w-full bg-gray-100 rounded-full">
          <div 
            className={`h-full rounded-full ${getScoreColor(score)}`}
            style={{ width: `${score}%` }}
          />
        </div>
        <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
          <div className="flex gap-2 items-center">
            <span className="text-sm text-gray-600">Niveau :</span>
            <span className="text-red-600 font-medium">{getNiveau(score)}</span>
          </div>
          <p className="text-gray-600 text-sm">{message}</p>
        </div>
      </div>
    </div>
  );

  const renderResultsSection = () => {
    // Transformer les réponses en scores par section
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
        {/* Vidéo de présentation */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden aspect-video mb-8">
          <iframe 
            src="https://www.loom.com/embed/0d1b47c4a5cf430da88b8932a83d88fa"
            frameBorder="0"
            allowFullScreen
            className="w-full h-full"
          />
        </div>

        {/* Score Global */}
        {renderScoreCard("Score Global", globalScore, globalMessage)}

        {/* Scores par section */}
        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(sectionScores).map(([sectionKey, score]) => {
            const sectionTitle = steps.find(s => s.id === sectionKey)?.label || '';
            const message = resultatsSection.recommendations.sections[sectionKey][score >= 80 ? 'advanced' : score >= 50 ? 'intermediate' : 'beginner'];
            
            return (
              <div key={sectionKey}>
                {renderScoreCard(
                  sectionTitle,
                  score,
                  message
                )}
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
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

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 space-y-2">
          <p>Outil de diagnostic développé par la société Kitco</p>
          <p>© 2025 KITCO. Tous droits réservés.</p>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4">
      <div className="mt-16 mb-8">
        <DiagnosticBreadcrumb steps={steps} currentStep={currentStep} />
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{section.title}</h1>
        <p className="text-gray-600 mb-8">{section.description}</p>

        {section.isResultSection ? (
          renderResultsSection()
        ) : (
          <div className="space-y-8">
            {section.questions.map((question, index) => (
              <QuestionItem
                key={index}
                question={question}
                questionIndex={index}
                onSelect={(value) => onOptionSelect(index, value)}
                selectedValue={answers[currentSection]?.[index]?.value}
              />
            ))}
          </div>
        )}

        <div className="flex justify-between mt-12">
          {showPrevious ? (
            <Button
              variant="outline"
              onClick={onPrevious}
              className="flex items-center gap-2"
            >
              <ArrowLeftIcon size={16} />
              Précédent
            </Button>
          ) : (
            <div />
          )}
          
          {showNext && (
            <Button
              onClick={onNext}
              className="flex items-center gap-2 bg-primary hover:bg-primary-hover"
            >
              {section.isResultSection ? "Terminer" : "Suivant"}
              <ArrowRightIcon size={16} />
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
};
