
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Answer, Question } from '@/components/diagnostic/question/types';
import { sections } from '@/data/sections';

export const useDiagnosticAnswers = (toast: ReturnType<typeof useToast>['toast']) => {
  const [answers, setAnswers] = useState<Record<string, Record<number, Answer>>>({});

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

  const handleOptionSelect = useCallback((
    currentSection: string,
    questionIndex: number, 
    value: string | number | number[] | null, 
    showToast: boolean = true,
    onProgressUpdate: (progress: number) => void,
    onScoreUpdate: (answers: Record<string, Record<number, Answer>>) => void
  ) => {
    setAnswers(prev => {
      const question = sections[currentSection as keyof typeof sections].questions[questionIndex];
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
      onProgressUpdate(newProgress);
      
      onScoreUpdate(newAnswers);
      
      return newAnswers;
    });
    
    if (showToast) {
      const currentQuestion = sections[currentSection as keyof typeof sections].questions[questionIndex];
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
  }, [calculateProgress, toast]);

  return {
    answers,
    setAnswers,
    handleOptionSelect,
    calculateProgress
  };
};
