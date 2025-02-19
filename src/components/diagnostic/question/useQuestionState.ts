
import { useState, useEffect } from "react";
import { Question } from "./types";

export const useQuestionState = (question: Question, selectedValue?: number) => {
  const [selectedPoints, setSelectedPoints] = useState<number[]>([]);

  useEffect(() => {
    if (selectedValue !== undefined) {
      if (question.type === 'multiple') {
        // Pour les questions à choix multiples, on permet la sélection de plusieurs options
        const selectedOptions = question.options.filter(option => 
          (selectedValue & option.points) === option.points
        );
        setSelectedPoints(selectedOptions.map(opt => opt.points));
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
      // Pour les choix multiples, on bascule la sélection
      if (selectedPoints.includes(points)) {
        newPoints = selectedPoints.filter(p => p !== points);
      } else {
        newPoints = [...selectedPoints, points];
      }
      
      // Calcul de la valeur binaire pour stocker les sélections multiples
      const binaryValue = newPoints.reduce((sum, p) => sum + p, 0);
      onSelect(binaryValue);
    } else {
      // Pour les choix uniques, on remplace la sélection
      newPoints = selectedPoints[0] === points ? [] : [points];
      onSelect(newPoints[0] || 0);
    }
    
    setSelectedPoints(newPoints);

    console.log('Selection updated:', {
      type: question.type,
      selectedPoints: newPoints,
      totalPoints: newPoints.reduce((sum, p) => sum + p, 0)
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
