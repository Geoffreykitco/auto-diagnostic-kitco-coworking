
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Question } from '@/components/diagnostic/question/types';
import { ScoreLevel } from '@/utils/scoreCalculator';

interface UseAnswerManagementProps {
  calculateScore: (question: Question, value: string | number | number[] | null) => number;
  calculateProgress: (newAnswers: Record<string, Record<number, { value: string | number | number[] | null; score: number }>>) => number;
  updateSectionScores: (newAnswers: Record<string, Record<number, { value: string | number | number[] | null; score: number }>>) => Record<string, { level: string; message: string; score: number }>;
  currentSection: string;
  toast: ReturnType<typeof useToast>['toast'];
  setProgress: (progress: number) => void;
  setSectionScores: (scores: Record<string, { level: ScoreLevel; message: string; score: number }>) => void;
}

export const useAnswerManagement = ({
  calculateScore,
  calculateProgress,
  updateSectionScores,
  currentSection,
  toast,
  setProgress,
  setSectionScores
}: UseAnswerManagementProps) => {
  const [answers, setAnswers] = useState<Record<string, Record<number, { value: string | number | number[] | null; score: number }>>>({});

  const handleOptionSelect = useCallback((questionIndex: number, value: string | number | number[] | null, showToast: boolean = true) => {
    setAnswers(prev => {
      // Importing sections inside the callback to avoid dependency issues
      const { sections } = require('@/data/sections');
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
      
      const newSectionScores = updateSectionScores(newAnswers);
      setSectionScores(newSectionScores as Record<string, { level: ScoreLevel; message: string; score: number }>);
      
      return newAnswers;
    });
    
    if (showToast) {
      // Importing sections inside the callback to avoid dependency issues
      const { sections } = require('@/data/sections');
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
  }, [currentSection, calculateScore, calculateProgress, updateSectionScores, setProgress, setSectionScores, toast]);

  return {
    answers,
    handleOptionSelect
  };
};
