import { motion } from 'framer-motion';
import { Info, ChevronLeft, ChevronRight } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useState, useEffect } from 'react';

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
  const [textValues, setTextValues] = useState<{ [key: number]: string }>({});
  const { toast } = useToast();

  useEffect(() => {
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
    onOptionSelect(questionIndex, 0);
  };

  const isOptionSelected = (questionIndex: number, optionIndex: number) => {
    return selectedOptions[questionIndex]?.includes(optionIndex) || false;
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

  const getSteps = () => {
    const steps = [
      { id: 'acquisition', label: 'Acquisition' },
      { id: 'activation', label: 'Activation' },
      { id: 'retention', label: 'Rétention' },
      { id: 'revenus', label: 'Revenue' },
      { id: 'recommandation', label: 'Referal' },
      { id: 'results', label: "C'est terminé" }
    ];

    const currentStep = steps.find(step => 
      section.title.toLowerCase().includes(step.id)
    );

    return { steps, currentStep };
  };

  const { steps, currentStep } = getSteps();

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

      {currentStep && (
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Breadcrumb>
            <BreadcrumbList className="flex-wrap">
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Diagnostic</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              {steps.map((step, index) => (
                <BreadcrumbItem key={step.id}>
                  {step.id === currentStep.id ? (
                    <BreadcrumbPage className="font-bold text-lg text-primary">
                      {step.label}
                    </BreadcrumbPage>
                  ) : (
                    <>
                      <BreadcrumbLink 
                        className="text-gray-500"
                        href="#"
                      >
                        {step.label}
                      </BreadcrumbLink>
                    </>
                  )}
                  {index < steps.length - 1 && <BreadcrumbSeparator />}
                </BreadcrumbItem>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </motion.div>
      )}
      
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
        
        {section.questions.map((q, questionIndex) => (
          <motion.div
            key={questionIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: questionIndex * 0.1 + 0.4 }}
            className={`glass-morphism rounded-lg p-6 space-y-4 ${
              ((q.type === 'text' && !textValues[questionIndex]) ||
               (q.type !== 'text' && (!selectedOptions[questionIndex] || selectedOptions[questionIndex].length === 0)))
                ? 'border-2 border-red-200'
                : ''
            }`}
          >
            <div className="flex items-start gap-2">
              <h3 className="text-xl font-semibold text-primary flex-grow">{q.question}</h3>
              <HoverCard openDelay={200}>
                <HoverCardTrigger asChild>
                  <button className="text-gray-400 hover:text-primary transition-colors duration-200">
                    <Info className="h-5 w-5" />
                  </button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80 p-4 text-sm text-gray-700 bg-white">
                  <p>{q.tooltip}</p>
                </HoverCardContent>
              </HoverCard>
            </div>
            <div className="space-y-3">
              {q.type === 'text' ? (
                <Input
                  type={q.question.toLowerCase().includes("point mort mensuel") ? "text" : "text"}
                  value={textValues[questionIndex] || ''}
                  onChange={(e) => handleTextChange(questionIndex, e.target.value, q.question)}
                  placeholder={q.question.toLowerCase().includes("point mort mensuel") ? "Montant en €..." : "Votre réponse..."}
                  className="w-full"
                />
              ) : (
                q.options.map((option, optionIndex) => (
                  <motion.button
                    key={optionIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: optionIndex * 0.05 + questionIndex * 0.1 + 0.5 }}
                    onClick={() => {
                      if (q.type === 'single' || q.type === 'multiple') {
                        handleOptionSelect(questionIndex, optionIndex, option.points, q.type);
                      }
                    }}
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
                  </motion.button>
                ))
              )}
            </div>
          </motion.div>
        ))}

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
