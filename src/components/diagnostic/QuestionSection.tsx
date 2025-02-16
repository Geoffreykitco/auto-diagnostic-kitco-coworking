import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect, useRef } from 'react';
import { DiagnosticBreadcrumb } from './DiagnosticBreadcrumb';
import { ResultsAnalysis } from './ResultsAnalysis';
import { QuestionItem } from './QuestionItem';

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
  const textTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [section.title]);

  const getSteps = () => {
    const steps = [
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
      description: "Passons à la question suivante.",
      className: "animate-slide-in-right duration-200"
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
        description: "Passons à la question suivante.",
        className: "animate-slide-in-right duration-200"
      });
    }, 1000);
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
    <div className="container mx-auto max-w-4xl px-4 py-12 relative">
      <motion.img
        src="/lovable-uploads/6037e9f3-0144-4e48-a6df-84d8a4df9090.png"
        alt="Logo"
        className="absolute -top-8 right-4 w-16 h-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      />

      <DiagnosticBreadcrumb steps={steps} currentStep={currentStep} />
      
      <motion.div
        key={section.title}
        variants={sectionVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="space-y-8"
      >
        <div className="space-y-4">
          <motion.h2 
            className="text-3xl font-bold text-primary"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {section.title}
          </motion.h2>
          <motion.p 
            className="text-gray-600 text-lg"
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
          section.questions.map((q, questionIndex) => (
            <QuestionItem
              key={questionIndex}
              question={q}
              questionIndex={questionIndex}
              selectedOptions={selectedOptions}
              textValues={textValues}
              onOptionSelect={handleOptionSelect}
              onTextChange={handleTextChange}
            />
          ))
        )}

        <motion.div 
          className="flex justify-between items-center pt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
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
        </motion.div>
      </motion.div>
    </div>
  );
};
