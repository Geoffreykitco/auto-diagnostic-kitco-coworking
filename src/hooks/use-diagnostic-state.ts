
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Answer } from '@/components/diagnostic/question/types';
import { useDiagnosticAnswers } from './diagnostic/use-diagnostic-answers';
import { useSectionNavigation } from './diagnostic/use-section-navigation';
import { useScoreCalculation } from './diagnostic/use-score-calculation';

interface UseDiagnosticStateProps {
  toast: ReturnType<typeof useToast>['toast'];
}

export const useDiagnosticState = ({ toast }: UseDiagnosticStateProps) => {
  const [progress, setProgress] = useState(0);
  const [started, setStarted] = useState(false);
  
  const { answers, handleOptionSelect } = useDiagnosticAnswers(toast);
  const { currentSection, handleNext, handlePrevious } = useSectionNavigation(toast);
  const { sectionScores, updateSectionScores } = useScoreCalculation();

  const handleStart = useCallback(() => {
    toast({
      title: "Bienvenue dans l'auto-diagnostic 👋",
      description: "Commençons l'évaluation de votre espace de coworking.",
      duration: 4000,
    });
    setProgress(0);
    setStarted(true);
  }, [toast]);

  const handleOptionSelectWrapper = useCallback((questionIndex: number, value: string | number | number[] | null, showToast: boolean = true) => {
    handleOptionSelect(
      currentSection, 
      questionIndex, 
      value, 
      showToast, 
      setProgress, 
      updateSectionScores
    );
  }, [currentSection, handleOptionSelect, updateSectionScores]);

  const handleNextWrapper = useCallback(() => {
    handleNext(answers);
  }, [handleNext, answers]);

  return {
    progress,
    started,
    currentSection,
    answers,
    sectionScores,
    handleStart,
    handleOptionSelect: handleOptionSelectWrapper,
    handlePrevious,
    handleNext: handleNextWrapper
  };
};
