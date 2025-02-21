
import { motion } from "framer-motion";
import { DiagnosticBreadcrumb } from "./DiagnosticBreadcrumb";
import { QuestionItem } from "./QuestionItem";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { Section } from "@/data/sections";
import { Answer } from "./question/types";
import { resultatsSection } from "@/data/sections/resultats";

interface QuestionSectionProps {
  section: Section;
  onOptionSelect: (questionIndex: number, value: string | number | number[] | null) => void;
  onPrevious: () => void;
  onNext: () => void;
  showPrevious: boolean;
  showNext: boolean;
  answers: Record<number, Answer>;
}

const getScoreLevel = (score: number) => {
  if (score >= 80) return "advanced";
  if (score >= 50) return "intermediate";
  return "beginner";
};

const calculateSectionScore = (answers: Record<number, Answer>): number => {
  const totalPoints = Object.values(answers).reduce((sum, answer) => sum + answer.score, 0);
  const maxPoints = Object.values(answers).length * 10; // Assuming max 10 points per question
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
    { id: 'informations', label: 'Informations' },
    { id: 'acquisition', label: 'Acquisition - Attirer les coworkers' },
    { id: 'activation', label: 'Activation - Transformer les visiteurs en membres' },
    { id: 'retention', label: 'Rétention - Fidéliser vos membres' },
    { id: 'revenus', label: 'Revenus - Générer et optimiser les revenus' },
    { id: 'recommandation', label: 'Recommandation - Développer le bouche à oreille' },
    { id: 'resultats', label: 'Résultat diagnostique' }
  ];

  const currentStep = steps.find(step => section.title.includes(step.label.split('-')[0].trim()));

  const renderScoreCard = (sectionId: string, sectionAnswers: Record<number, Answer>) => {
    const score = calculateSectionScore(sectionAnswers);
    const level = getScoreLevel(score);
    const recommendation = resultatsSection.recommendations.sections[sectionId][level];
    
    return (
      <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
        <h3 className="text-xl font-semibold mb-2">{steps.find(s => s.id === sectionId)?.label}</h3>
        <div className="flex items-center gap-4 mb-4">
          <div className="text-3xl font-bold">{score}%</div>
          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full ${
                score >= 80 ? 'bg-green-500' : 
                score >= 50 ? 'bg-yellow-500' : 
                'bg-red-500'
              }`} 
              style={{ width: `${score}%` }} 
            />
          </div>
        </div>
        <p className="text-gray-600">{recommendation}</p>
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
        className="max-w-4xl mx-auto text-left"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{section.title}</h1>
        <p className="text-gray-600 mb-8">{section.description}</p>

        {section.isResultSection ? (
          <div className="space-y-8">
            <div className="bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden aspect-video mb-8">
              <iframe 
                src={(section as typeof resultatsSection).videoUrl}
                frameBorder="0"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            <div className="space-y-6">
              {['acquisition', 'activation', 'retention', 'revenus', 'recommandation'].map(sectionId => (
                <div key={sectionId}>
                  {answers[sectionId] && renderScoreCard(sectionId, answers[sectionId])}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {section.questions.map((question, index) => (
              <QuestionItem
                key={index}
                question={question}
                questionIndex={index}
                onSelect={(value) => onOptionSelect(index, value)}
                selectedValue={answers[index]?.value}
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
