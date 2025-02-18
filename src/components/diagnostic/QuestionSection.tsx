import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect, useRef } from 'react';
import { DiagnosticBreadcrumb } from './DiagnosticBreadcrumb';
import { ResultsAnalysis } from './ResultsAnalysis';
import { QuestionItem } from './QuestionItem';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Input } from "@/components/ui/input"

interface Option {
  label: string;
  points: number;
}

interface Question {
  question: string;
  tooltip: string;
  type: 'single' | 'multiple' | 'text';
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
  answers?: Record<string, Record<number, number>>;
}

export const QuestionSection = ({ 
  section, 
  onOptionSelect,
  onPrevious,
  onNext,
  showPrevious = true,
  showNext = true,
  answers = {}
}: QuestionSectionProps) => {
  const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: number[] }>({});
  const [textValues, setTextValues] = useState<{ [key: number]: string }>({});
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const textTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    setSelectedOptions({});
    setTextValues({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [section.title]);

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
    
    toast({
      title: "Réponse enregistrée 🎉",
      variant: "default",
      duration: 1200,
    });
  };

  const handleTextChange = (questionIndex: number, value: string, question: string) => {
    let processedValue = value;
    
    if (question.toLowerCase().includes("point mort mensuel")) {
      const numericValue = value.replace(/[^0-9.,]/g, '');
      const normalizedValue = numericValue.replace(',', '.');
      
      if (normalizedValue !== '') {
        const number = parseFloat(normalizedValue);
        if (!isNaN(number)) {
          processedValue = `${number.toLocaleString('fr-FR')} €`;
        } else {
          processedValue = value;
        }
      }
    }

    setTextValues(prev => ({ ...prev, [questionIndex]: processedValue }));
    
    if (textTimeoutRef.current) {
      clearTimeout(textTimeoutRef.current);
    }

    textTimeoutRef.current = setTimeout(() => {
      onOptionSelect(questionIndex, 0);
      toast({
        title: "Réponse enregistrée 🎉",
        variant: "default",
        duration: 1200,
      });
    }, 200);
  };

  const getSteps = () => {
    const steps = [
      { id: 'informations', label: 'Informations' },
      { id: 'acquisition', label: 'Acquisition' },
      { id: 'activation', label: 'Activation' },
      { id: 'retention', label: 'Rétention' },
      { id: 'revenus', label: 'Revenue' },
      { id: 'recommandation', label: 'Referal' },
      { id: 'results', label: "Résultats" }
    ];

    const cleanTitle = section.title.replace(/^Partie \d+ : /, '').toLowerCase();
    
    const currentStep = steps.find(step => 
      cleanTitle.includes(step.id.toLowerCase())
    );

    return { steps, currentStep };
  };

  const handleNext = () => {
    const unansweredQuestions = section.questions.reduce((count, question, index) => {
      if (question.type === 'text') {
        return !textValues[index] ? count + 1 : count;
      }
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

  const { steps, currentStep } = getSteps();

  const sectionVariants = {
    initial: { 
      opacity: 0, 
      y: 50,
      scale: 0.95
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0,
      y: -50,
      scale: 0.95,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-6 md:py-12 relative">
      <DiagnosticBreadcrumb steps={steps} currentStep={currentStep} />
      
      <motion.div
        key={section.title}
        variants={sectionVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="space-y-6 md:space-y-8"
      >
        <div className="space-y-3 md:space-y-4">
          <motion.h2 
            className="text-2xl md:text-4xl font-bold text-primary tracking-tight"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {section.title}
          </motion.h2>
          <motion.p 
            className="text-base md:text-lg text-gray-600 leading-relaxed"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {section.description}
          </motion.p>
        </div>

        {section.title.toLowerCase().includes('résultats') ? (
          <ResultsAnalysis answers={answers} />
        ) : (
          <div className="space-y-6">
            {section.questions.map((q, questionIndex) => (
              <QuestionItem
                key={questionIndex}
                question={q}
                questionIndex={questionIndex}
                selectedOptions={selectedOptions}
                textValues={textValues}
                onOptionSelect={handleOptionSelect}
                onTextChange={handleTextChange}
              />
            ))}
          </div>
        )}

        <motion.div 
          className="flex justify-between items-center pt-6 md:pt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {showPrevious && (
            <button
              onClick={onPrevious}
              className="flex items-center gap-1 md:gap-2 px-3 py-2 md:px-4 md:py-2 text-primary hover:bg-primary/5 rounded-lg transition-colors text-sm md:text-base font-medium"
            >
              <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
              Précédent
            </button>
          )}
          {showNext && (
            <button
              onClick={handleNext}
              className="flex items-center gap-1 md:gap-2 px-3 py-2 md:px-4 md:py-2 text-white bg-[#132720] hover:bg-[#132720]/90 rounded-lg transition-colors ml-auto text-sm md:text-base font-medium"
            >
              Suivant
              <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
            </button>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};
