
import { useState, useCallback } from 'react';
import { sections } from '@/data/sections';
import { useToast } from '@/hooks/use-toast';
import { Answer } from '@/components/diagnostic/question/types';

type SectionType = 'informations' | 'acquisition' | 'activation' | 'retention' | 'revenus' | 'recommandation' | 'resultats';

interface UseDiagnosticStateProps {
  toast: ReturnType<typeof useToast>['toast'];
}

export const useDiagnosticState = ({ toast }: UseDiagnosticStateProps) => {
  const [progress, setProgress] = useState(0);
  const [started, setStarted] = useState(false);
  const [currentSection, setCurrentSection] = useState<SectionType>('informations');
  const [answers, setAnswers] = useState<Record<string, Record<number, Answer>>>({});

  const calculateProgress = useCallback((newAnswers: Record<string, Record<number, Answer>>) => {
    const totalQuestions = Object.values(sections).reduce((sum, section) => 
      sum + section.questions.filter(q => !q.isInformative).length, 0);
    
    const answeredQuestions = Object.entries(newAnswers).reduce((sum, [sectionKey, sectionAnswers]) => {
      const section = sections[sectionKey as keyof typeof sections];
      return sum + Object.entries(sectionAnswers).filter(([questionIndex]) => 
        !section.questions[parseInt(questionIndex)].isInformative
      ).length;
    }, 0);
    
    return (answeredQuestions / totalQuestions) * 100;
  }, []);

  const handleStart = useCallback(() => {
    toast({
      title: "Bienvenue dans l'auto-diagnostic 👋",
      description: "Commençons l'évaluation de votre espace de coworking.",
      duration: 4000,
    });
    setProgress(0);
    setStarted(true);
  }, [toast]);

  const handleOptionSelect = useCallback((questionIndex: number, value: string | number | number[] | null) => {
    setAnswers(prev => {
      const question = sections[currentSection].questions[questionIndex];
      const newAnswers = {
        ...prev,
        [currentSection]: {
          ...prev[currentSection],
          [questionIndex]: {
            value,
            // On ne définit pas de score pour les questions informatives
            ...(question.isInformative ? {} : { score: 0 }) // Le score sera calculé plus tard
          }
        }
      };
      
      const newProgress = calculateProgress(newAnswers);
      setProgress(newProgress);
      
      return newAnswers;
    });
    
    toast({
      title: "Réponse enregistrée 🎉",
      variant: "default",
      duration: 1200,
    });
  }, [currentSection, calculateProgress, toast]);

  const handlePrevious = useCallback(() => {
    const sectionOrder: SectionType[] = ['informations', 'acquisition', 'activation', 'retention', 'revenus', 'recommandation', 'resultats'];
    const currentIndex = sectionOrder.indexOf(currentSection);
    if (currentIndex > 0) {
      setCurrentSection(sectionOrder[currentIndex - 1]);
    }
  }, [currentSection]);

  const handleNext = useCallback(() => {
    const sectionOrder: SectionType[] = ['informations', 'acquisition', 'activation', 'retention', 'revenus', 'recommandation', 'resultats'];
    const currentIndex = sectionOrder.indexOf(currentSection);
    
    if (currentIndex < sectionOrder.length - 1) {
      const currentSectionQuestions = sections[currentSection].questions;
      const currentSectionAnswers = answers[currentSection] || {};
      
      if (Object.keys(currentSectionAnswers).length < currentSectionQuestions.length) {
        toast({
          title: "⚠️ Action requise",
          description: "Veuillez répondre à toutes les questions avant de continuer.",
          variant: "destructive",
          duration: 3000,
        });
        return;
      }
      
      setCurrentSection(sectionOrder[currentIndex + 1]);
    }
  }, [currentSection, answers, toast]);

  return {
    progress,
    started,
    currentSection,
    answers,
    handleStart,
    handleOptionSelect,
    handlePrevious,
    handleNext
  };
};
