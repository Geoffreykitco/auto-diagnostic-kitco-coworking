
import { motion } from 'framer-motion';
import { Info, ChevronLeft, ChevronRight } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from 'react';

interface Option {
  label: string;
  points: number;
}

interface Question {
  question: string;
  tooltip: string;
  type: 'single' | 'multiple';
  options: Option[];
}

interface Section {
  title: string;
  description: string;
  questions: Question[];
}

interface QuestionSectionProps {
  section: Section;
  onOptionSelect: (questionIndex: number, points: number) => void;
  onPrevious?: () => void;
  onNext?: () => void;
  showPrevious?: boolean;
  showNext?: boolean;
}

export const QuestionSection = ({ 
  section, 
  onOptionSelect,
  onPrevious,
  onNext,
  showPrevious = true,
  showNext = true 
}: QuestionSectionProps) => {
  const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: number[] }>({});
  const { toast } = useToast();

  const handleOptionSelect = (questionIndex: number, optionIndex: number, points: number, type: 'single' | 'multiple') => {
    setSelectedOptions(prev => {
      const newSelected = { ...prev };
      if (type === 'single') {
        newSelected[questionIndex] = [optionIndex];
        onOptionSelect(questionIndex, points);
      } else {
        const currentSelection = prev[questionIndex] || [];
        if (currentSelection.includes(optionIndex)) {
          newSelected[questionIndex] = currentSelection.filter(i => i !== optionIndex);
        } else {
          newSelected[questionIndex] = [...currentSelection, optionIndex];
        }
        const totalPoints = section.questions[questionIndex].options
          .filter((_, idx) => newSelected[questionIndex].includes(idx))
          .reduce((sum, option) => sum + option.points, 0);
        onOptionSelect(questionIndex, totalPoints);
      }
      return newSelected;
    });
  };

  const isOptionSelected = (questionIndex: number, optionIndex: number) => {
    return selectedOptions[questionIndex]?.includes(optionIndex) || false;
  };

  const handleNext = () => {
    const unansweredQuestions = section.questions.reduce((count, _, index) => {
      return !selectedOptions[index] || selectedOptions[index].length === 0 ? count + 1 : count;
    }, 0);

    if (unansweredQuestions > 0) {
      toast({
        title: "Questions sans réponse",
        description: `Veuillez répondre à toutes les questions avant de continuer.`,
        variant: "destructive",
      });
      return;
    }

    onNext?.();
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-primary">
            {section.title}
          </h2>
          <p className="text-gray-600 text-lg">
            {section.description}
          </p>
        </div>
        
        {section.questions.map((q, questionIndex) => (
          <motion.div
            key={questionIndex}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: questionIndex * 0.2 }}
            className={`glass-morphism rounded-lg p-6 space-y-4 ${
              !selectedOptions[questionIndex] || selectedOptions[questionIndex].length === 0
                ? 'border-2 border-red-200'
                : ''
            }`}
          >
            <div className="flex items-start gap-2">
              <h3 className="text-xl font-semibold text-primary">{q.question}</h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="text-gray-400 hover:text-primary">
                      <Info className="h-5 w-5" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{q.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="space-y-3">
              {q.options.map((option, optionIndex) => (
                <button
                  key={optionIndex}
                  onClick={() => handleOptionSelect(questionIndex, optionIndex, option.points, q.type)}
                  className={`w-full text-left p-4 rounded-lg border transition-all duration-200 flex items-center gap-3 ${
                    isOptionSelected(questionIndex, optionIndex)
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-primary hover:bg-primary/5'
                  }`}
                >
                  {q.type === 'multiple' ? (
                    <Checkbox 
                      checked={isOptionSelected(questionIndex, optionIndex)}
                      className="h-5 w-5"
                    />
                  ) : (
                    <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                      isOptionSelected(questionIndex, optionIndex)
                        ? 'border-primary'
                        : 'border-gray-300'
                    }`}>
                      {isOptionSelected(questionIndex, optionIndex) && (
                        <div className="h-3 w-3 rounded-full bg-primary" />
                      )}
                    </div>
                  )}
                  {option.label}
                </button>
              ))}
            </div>
          </motion.div>
        ))}

        <div className="flex justify-between items-center pt-8">
          {showPrevious && (
            <button
              onClick={onPrevious}
              className="flex items-center gap-2 px-4 py-2 text-primary hover:bg-primary/5 rounded-lg transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
              Précédent
            </button>
          )}
          {showNext && (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-4 py-2 text-primary hover:bg-primary/5 rounded-lg transition-colors ml-auto"
            >
              Suivant
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};
