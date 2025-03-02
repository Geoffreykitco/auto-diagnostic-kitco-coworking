
import { useState, useCallback } from 'react';
import { Answer } from '@/components/diagnostic/question/types';
import { calculateSectionScore, getMaxSectionScore, ScoreLevel } from '@/utils/scoreCalculator';
import { sections } from '@/data/sections';

export const useScoreCalculation = () => {
  const [sectionScores, setSectionScores] = useState<Record<string, { level: ScoreLevel; message: string; score: number }>>({});

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

  return {
    sectionScores,
    updateSectionScores
  };
};
