
import { useState, useCallback } from 'react';
import { sections } from '@/data/sections';
import { UseToast } from '@/hooks/use-toast';

interface UseDiagnosticStateProps {
  toast: UseToast['toast'];
}

export const useDiagnosticState = ({ toast }: UseDiagnosticStateProps) => {
  const [progress, setProgress] = useState(0);
  const [started, setStarted] = useState(false);
  const [currentSection, setCurrentSection] = useState('informations');
  const [answers, setAnswers] = useState<Record<string, Record<number, number>>>({});

  const calculateProgress = useCallback((newAnswers: Record<string, Record<number, number>>) => {
    const totalQuestions = Object.values(sections).reduce((sum, section) => sum + section.questions.length, 0);
    const answeredQuestions = Object.values(newAnswers).reduce((sum, sectionAnswers) => {
      return sum + Object.keys(sectionAnswers).length;
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

  const handleOptionSelect = useCallback((questionIndex: number, points: number) => {
    setAnswers(prev => {
      const newAnswers = {
        ...prev,
        [currentSection]: {
          ...prev[currentSection],
          [questionIndex]: points
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
    const sectionOrder = ['informations', 'acquisition', 'activation', 'retention', 'revenus', 'recommandation', 'resultats'];
    const currentIndex = sectionOrder.indexOf(currentSection);
    if (currentIndex > 0) {
      setCurrentSection(sectionOrder[currentIndex - 1]);
    }
  }, [currentSection]);

  const handleNext = useCallback(() => {
    const sectionOrder = ['informations', 'acquisition', 'activation', 'retention', 'revenus', 'recommandation', 'resultats'];
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
