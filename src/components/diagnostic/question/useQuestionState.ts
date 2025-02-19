
import { useState, useEffect } from "react";
import { Question } from "./types";

export const useQuestionState = (question: Question, selectedValue?: number) => {
  const [selectedPoints, setSelectedPoints] = useState<number[]>([]);

  useEffect(() => {
    if (selectedValue !== undefined) {
      if (question.type === 'multiple') {
        const points: number[] = [];
        let remainingValue = selectedValue;
        
        // Protection contre les valeurs négatives
        if (remainingValue < 0) remainingValue = 0;
        
        const sortedOptions = [...question.options].sort((a, b) => b.points - a.points);
        
        for (const option of sortedOptions) {
          // Protection contre les points négatifs ou nuls
          if (option.points <= 0) continue;
          
          // Utilisation d'une boucle while avec protection contre les boucles infinies
          let iterations = 0;
          const maxIterations = 1000; // Protection contre les boucles infinies
          
          while (remainingValue >= option.points && iterations < maxIterations) {
            points.push(option.points);
            remainingValue -= option.points;
            iterations++;
          }
        }
        
        setSelectedPoints(points);
      } else {
        // Pour les questions à choix unique
        setSelectedPoints(selectedValue > 0 ? [selectedValue] : []);
      }
    } else {
      setSelectedPoints([]);
    }
  }, [selectedValue, question]);

  const handleOptionSelect = (points: number, onSelect: (points: number) => void) => {
    let newPoints: number[];
    
    if (question.type === 'multiple') {
      if (selectedPoints.includes(points)) {
        newPoints = selectedPoints.filter(p => p !== points);
      } else {
        newPoints = [...selectedPoints, points];
      }
    } else {
      if (selectedPoints.length === 1 && selectedPoints[0] === points) {
        newPoints = [];
      } else {
        newPoints = [points];
      }
    }
    
    const totalPoints = newPoints.reduce((sum, p) => sum + p, 0);
    setSelectedPoints(newPoints);
    onSelect(totalPoints);

    console.log('Selection updated:', {
      type: question.type,
      selectedPoints: newPoints,
      totalPoints
    });
  };

  const isOptionSelected = (points: number) => {
    return selectedPoints.includes(points);
  };

  return {
    selectedPoints,
    handleOptionSelect,
    isOptionSelected,
  };
};
