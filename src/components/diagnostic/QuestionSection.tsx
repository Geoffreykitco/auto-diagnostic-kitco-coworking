
import { motion } from 'framer-motion';
import { Info, ChevronLeft, ChevronRight } from 'lucide-react';
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
  options: Option[];
}

interface Section {
  title: string;
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
  // Garder trace des questions déjà répondues
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);

  const handleOptionSelect = (questionIndex: number, points: number) => {
    if (!answeredQuestions.includes(questionIndex)) {
      setAnsweredQuestions([...answeredQuestions, questionIndex]);
      onOptionSelect(questionIndex, points);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <h2 className="text-3xl font-bold text-primary mb-8">
          {section.title}
        </h2>
        
        {section.questions.map((q, questionIndex) => (
          <motion.div
            key={questionIndex}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: questionIndex * 0.2 }}
            className="glass-morphism rounded-lg p-6 space-y-4"
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
                  onClick={() => handleOptionSelect(questionIndex, option.points)}
                  disabled={answeredQuestions.includes(questionIndex)}
                  className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                    answeredQuestions.includes(questionIndex)
                      ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60'
                      : 'border-gray-200 hover:border-primary hover:bg-primary/5'
                  }`}
                >
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
              onClick={onNext}
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
