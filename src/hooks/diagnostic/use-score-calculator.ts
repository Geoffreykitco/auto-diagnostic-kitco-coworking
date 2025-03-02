
import { useCallback } from 'react';
import { Question } from '@/components/diagnostic/question/types';
import { calculateSectionScore, getMaxSectionScore } from '@/utils/scoreCalculator';
import { sections } from '@/data/sections';

export const useScoreCalculator = () => {
  const calculateScore = useCallback((question: Question, value: string | number | number[] | null): number => {
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
  }, []);

  const calculateProgress = useCallback((newAnswers: Record<string, Record<number, { value: string | number | number[] | null; score: number }>>): number => {
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

  const updateSectionScores = useCallback((newAnswers: Record<string, Record<number, { value: string | number | number[] | null; score: number }>>): Record<string, { level: string; message: string; score: number }> => {
    const newSectionScores: Record<string, { level: string; message: string; score: number }> = {};
    
    Object.entries(newAnswers).forEach(([sectionKey, sectionAnswers]) => {
      if (sectionKey !== 'informations' && sectionKey !== 'resultats') {
        const section = sections[sectionKey as keyof typeof sections];
        const maxScore = getMaxSectionScore(section.questions);
        
        const formattedAnswers = Object.entries(sectionAnswers).reduce((acc, [key, value]) => {
          acc[Number(key)] = { value: value.value, score: value.score };
          return acc;
        }, {} as Record<number, { value: string | number | number[] | null; score: number }>);
        
        const sectionScore = calculateSectionScore(formattedAnswers, maxScore, sectionKey);
        newSectionScores[sectionKey] = sectionScore;
      }
    });

    return newSectionScores;
  }, []);

  return {
    calculateScore,
    calculateProgress,
    updateSectionScores
  };
};
