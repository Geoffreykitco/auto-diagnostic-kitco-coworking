
import { motion } from "framer-motion";
import { DiagnosticBreadcrumb } from "./DiagnosticBreadcrumb";
import { QuestionItem } from "./QuestionItem";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { Section } from "@/data/sections";
import { Answer } from "./question/types";

interface QuestionSectionProps {
  section: Section;
  onOptionSelect: (questionIndex: number, value: string | number | number[] | null) => void;
  onPrevious: () => void;
  onNext: () => void;
  showPrevious: boolean;
  showNext: boolean;
  answers: Record<number, Answer>;
}

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
          <div className="bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden aspect-video mb-8">
            <iframe 
              src={(section as typeof resultatsSection).videoUrl}
              frameBorder="0"
              allowFullScreen
              className="w-full h-full"
            />
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
