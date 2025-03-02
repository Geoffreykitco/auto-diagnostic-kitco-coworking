
import { useState, useCallback, useRef, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Answer } from '@/components/diagnostic/question/types';
import { sections } from '@/data/sections';

type SectionType = 'informations' | 'acquisition' | 'activation' | 'retention' | 'revenus' | 'recommandation' | 'resultats';

export const useSectionNavigation = (toast: ReturnType<typeof useToast>['toast']) => {
  const [currentSection, setCurrentSection] = useState<SectionType>('informations');
  const sectionChangeTimeoutRef = useRef<number>();

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
      left: 0
    });
  }, []);

  const handleNext = useCallback((answers: Record<string, Record<number, Answer>>) => {
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

      if (sectionChangeTimeoutRef.current) {
        clearTimeout(sectionChangeTimeoutRef.current);
      }

      setCurrentSection(sectionOrder[currentIndex + 1]);
      
      requestAnimationFrame(() => {
        sectionChangeTimeoutRef.current = window.setTimeout(() => {
          scrollToTop();
        }, 150);
      });
    }
  }, [currentSection, toast, scrollToTop]);

  const handlePrevious = useCallback(() => {
    const sectionOrder: SectionType[] = ['informations', 'acquisition', 'activation', 'retention', 'revenus', 'recommandation', 'resultats'];
    const currentIndex = sectionOrder.indexOf(currentSection);
    if (currentIndex > 0) {
      if (sectionChangeTimeoutRef.current) {
        clearTimeout(sectionChangeTimeoutRef.current);
      }

      setCurrentSection(sectionOrder[currentIndex - 1]);
      
      requestAnimationFrame(() => {
        sectionChangeTimeoutRef.current = window.setTimeout(() => {
          scrollToTop();
        }, 150);
      });
    }
  }, [currentSection, scrollToTop]);

  useEffect(() => {
    return () => {
      if (sectionChangeTimeoutRef.current) {
        clearTimeout(sectionChangeTimeoutRef.current);
      }
    };
  }, []);

  return {
    currentSection,
    setCurrentSection,
    handleNext,
    handlePrevious
  };
};
