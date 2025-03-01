
import { useState, useCallback, useEffect, useRef } from 'react';
import { sections } from '@/data/sections';
import { useToast } from '@/hooks/use-toast';
import { Answer, Question } from '@/components/diagnostic/question/types';
import { calculateSectionScore, getMaxSectionScore, ScoreLevel } from '@/utils/scoreCalculator';

type SectionType = 'informations' | 'acquisition' | 'activation' | 'retention' | 'revenus' | 'recommandation' | 'resultats';

interface UseDiagnosticStateProps {
  toast: ReturnType<typeof useToast>['toast'];
}

export const useDiagnosticState = ({ toast }: UseDiagnosticStateProps) => {
  const [progress, setProgress] = useState(0);
  const [started, setStarted] = useState(false);
  const [currentSection, setCurrentSection] = useState<SectionType>('informations');
  const [answers, setAnswers] = useState<Record<string, Record<number, Answer>>>({});
  const [sectionScores, setSectionScores] = useState<Record<string, { level: ScoreLevel; message: string; score: number }>>({});
  const sectionChangeTimeoutRef = useRef<number>();

  const calculateScore = (question: Question, value: string | number | number[] | null): number => {
    if (question.isInformative) return 0;
    
    if (question.type === 'text') {
      return 0;
    } else if (question.type === 'single') {
      if (typeof value === 'number') {
        return question.options[value]?.points || 0;
      }
      return 0;
    } else if (question.type === 'multiple') {
      if (Array.isArray(value)) {
        return value.reduce((total, optionIndex) => {
          return total + (question.options[optionIndex]?.points || 0);
        }, 0);
      }
      return 0;
    }
    return 0;
  };

  const calculateProgress = useCallback((newAnswers: Record<string, Record<number, Answer>>): number => {
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

  const updateSectionScores = useCallback((newAnswers: Record<string, Record<number, Answer>>): void => {
    const newSectionScores: Record<string, { level: ScoreLevel; message: string; score: number }> = {};
    
    Object.entries(newAnswers).forEach(([sectionKey, sectionAnswers]) => {
      if (sectionKey !== 'informations' && sectionKey !== 'resultats') {
        const section = sections[sectionKey as keyof typeof sections];
        const maxScore = getMaxSectionScore(section.questions);
        
        const formattedAnswers = Object.entries(sectionAnswers).reduce((acc, [key, value]) => {
          acc[Number(key)] = { value: value.value, score: value.score };
          return acc;
        }, {} as Record<number, Answer>);
        
        const sectionScore = calculateSectionScore(formattedAnswers, maxScore, sectionKey);
        newSectionScores[sectionKey] = sectionScore;
      }
    });

    setSectionScores(newSectionScores);
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

  const handleOptionSelect = useCallback((questionIndex: number, value: string | number | number[] | null, showToast: boolean = true) => {
    setAnswers(prev => {
      const question = sections[currentSection].questions[questionIndex];
      const score = calculateScore(question, value);
      
      const newAnswers = {
        ...prev,
        [currentSection]: {
          ...prev[currentSection],
          [questionIndex]: {
            value,
            score
          }
        }
      };
      
      const newProgress = calculateProgress(newAnswers);
      setProgress(newProgress);
      
      updateSectionScores(newAnswers);
      
      return newAnswers;
    });
    
    if (showToast) {
      const currentQuestion = sections[currentSection].questions[questionIndex];
      const questionText = currentQuestion.question.toLowerCase();
      const skipToastForQuestion = questionText.includes('ville') || 
                                 questionText.includes('remplissage') ||
                                 questionText.includes('pourcentage');
      
      if (!skipToastForQuestion) {
        toast({
          title: "Réponse enregistrée 🎉",
          variant: "default",
          duration: 1200,
        });
      }
    }
  }, [currentSection, calculateProgress, updateSectionScores, toast]);

  const scrollToTop = useCallback(() => {
    // Augmentation du délai avant de scroller pour s'assurer que le DOM est bien mis à jour
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
        left: 0
      });
    }, 50); // Un petit délai pour s'assurer que le navigateur est prêt à traiter le scroll
  }, []);

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
  }, [currentSection, answers, toast, scrollToTop]);

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
  }, [currentSection, scrollToTop]);

  useEffect(() => {
    return () => {
      if (sectionChangeTimeoutRef.current) {
        clearTimeout(sectionChangeTimeoutRef.current);
      }
    };
  }, []);

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
