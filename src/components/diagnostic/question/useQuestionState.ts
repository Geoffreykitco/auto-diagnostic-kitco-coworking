
import { useState, useEffect } from "react";
import { Question } from "./types";

export const useQuestionState = (question: Question, selectedValue?: number) => {
  const [selectedPoints, setSelectedPoints] = useState<number[]>([]);

  useEffect(() => {
    if (selectedValue === undefined) {
      setSelectedPoints([]);
      return;
    }

    if (question.type === 'multiple') {
      // On décode la valeur binaire pour trouver les points sélectionnés
      const selected = question.options
        .filter(opt => (selectedValue & (1 << opt.points)) !== 0)
        .map(opt => opt.points);
      setSelectedPoints(selected);
    } else {
      // Pour les choix uniques, on utilise directement la valeur
      setSelectedPoints(selectedValue > 0 ? [selectedValue] : []);
    }
  }, [selectedValue, question]);

  const handleOptionSelect = (points: number, onSelect: (points: number) => void) => {
    if (question.type === 'multiple') {
      const isSelected = selectedPoints.includes(points);
      const newPoints = isSelected 
        ? selectedPoints.filter(p => p !== points)
        : [...selectedPoints, points];
      
      // Calcul de la valeur binaire finale
      const binaryValue = newPoints.reduce((acc, point) => acc | (1 << point), 0);
      setSelectedPoints(newPoints);
      onSelect(binaryValue);
    } else {
      // Pour les choix uniques, on gère la sélection/désélection
      const isSelected = selectedPoints.includes(points);
      const newPoints = isSelected ? [] : [points];
      setSelectedPoints(newPoints);
      onSelect(isSelected ? 0 : points);
    }

    console.log('Option selection:', {
      type: question.type,
      points,
      currentSelection: selectedPoints,
      isSelected: selectedPoints.includes(points)
    });
  };

  const isOptionSelected = (points: number): boolean => {
    return selectedPoints.includes(points);
  };

  return {
    selectedPoints,
    handleOptionSelect,
    isOptionSelected,
  };
};
