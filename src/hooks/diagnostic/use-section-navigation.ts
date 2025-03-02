
import { useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { sections } from '@/data/sections';

type SectionType = 'informations' | 'acquisition' | 'activation' | 'retention' | 'revenus' | 'recommandation' | 'resultats';

interface UseSectionNavigationProps {
  currentSection: SectionType;
  setCurrentSection: (section: SectionType) => void;
  answers: Record<string, Record<number, { value: string | number | number[] | null; score: number }>>;
  scrollToTop: () => void;
  sectionChangeTimeoutRef: React.MutableRefObject<number | undefined>;
  toast: ReturnType<typeof useToast>['toast'];
}

export const useSectionNavigation = ({
  currentSection,
  setCurrentSection,
  answers,
  scrollToTop,
  sectionChangeTimeoutRef,
  toast
}: UseSectionNavigationProps) => {
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

      if (sectionChangeTimeoutRef.current) {
        clearTimeout(sectionChangeTimeoutRef.current);
      }

      // Changement de section d'abord
      setCurrentSection(sectionOrder[currentIndex + 1]);
      
      // Utilisation d'un délai plus long pour s'assurer que la transition de page est complète
      sectionChangeTimeoutRef.current = window.setTimeout(() => {
        scrollToTop();
      }, 300); // Augmentation du délai pour donner plus de temps à la page pour se mettre à jour
    }
  }, [currentSection, answers, toast, scrollToTop, sectionChangeTimeoutRef, setCurrentSection]);

  const handlePrevious = useCallback(() => {
    const sectionOrder: SectionType[] = ['informations', 'acquisition', 'activation', 'retention', 'revenus', 'recommandation', 'resultats'];
    const currentIndex = sectionOrder.indexOf(currentSection);
    if (currentIndex > 0) {
      if (sectionChangeTimeoutRef.current) {
        clearTimeout(sectionChangeTimeoutRef.current);
      }

      // Changement de section d'abord
      setCurrentSection(sectionOrder[currentIndex - 1]);
      
      // Utilisation d'un délai plus long pour s'assurer que la transition de page est complète
      sectionChangeTimeoutRef.current = window.setTimeout(() => {
        scrollToTop();
      }, 300); // Augmentation du délai pour donner plus de temps à la page pour se mettre à jour
    }
  }, [currentSection, scrollToTop, sectionChangeTimeoutRef, setCurrentSection]);

  return {
    handleNext,
    handlePrevious
  };
};
