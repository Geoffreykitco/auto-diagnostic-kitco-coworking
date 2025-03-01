
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Answer } from '@/components/diagnostic/question/types';
import { ScoreLevel } from '@/utils/scoreCalculator';
import { useScrollUtils } from './diagnostic/use-scroll-utils';
import { useScoreCalculator } from './diagnostic/use-score-calculator';
import { useSectionNavigation } from './diagnostic/use-section-navigation';
import { useAnswerManagement } from './diagnostic/use-answer-management';
import { useDiagnosticStart } from './diagnostic/use-diagnostic-start';

type SectionType = 'informations' | 'acquisition' | 'activation' | 'retention' | 'revenus' | 'recommandation' | 'resultats';

interface UseDiagnosticStateProps {
  toast: ReturnType<typeof useToast>['toast'];
}

export const useDiagnosticState = ({ toast }: UseDiagnosticStateProps) => {
  const [progress, setProgress] = useState(0);
  const [started, setStarted] = useState(false);
  const [currentSection, setCurrentSection] = useState<SectionType>('informations');
  const [sectionScores, setSectionScores] = useState<Record<string, { level: ScoreLevel; message: string; score: number }>>({});

  // Initialisation des hooks utilitaires
  const { scrollToTop, sectionChangeTimeoutRef, cleanupScrollTimeouts } = useScrollUtils();
  const { calculateScore, calculateProgress, updateSectionScores } = useScoreCalculator();
  const { handleStart } = useDiagnosticStart({ setProgress, setStarted, toast });
  
  // Gestion des réponses
  const { answers, handleOptionSelect } = useAnswerManagement({
    calculateScore,
    calculateProgress,
    updateSectionScores,
    currentSection,
    toast,
    setProgress,
    setSectionScores
  });

  // Navigation entre les sections
  const { handleNext, handlePrevious } = useSectionNavigation({
    currentSection,
    setCurrentSection,
    answers,
    scrollToTop,
    sectionChangeTimeoutRef,
    toast
  });

  // Nettoyage des timeouts lors du démontage du composant
  useEffect(() => {
    return () => {
      cleanupScrollTimeouts();
    };
  }, [cleanupScrollTimeouts]);

  return {
    progress,
    started,
    currentSection,
    answers,
    sectionScores,
    handleStart,
    handleOptionSelect,
    handlePrevious,
    handleNext
  };
};
