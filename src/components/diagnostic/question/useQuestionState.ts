
import { useState, useEffect, useCallback } from "react";
import { Question } from "./types";

export const useQuestionState = (question: Question, selectedValue?: number) => {
  const [selectedPoints, setSelectedPoints] = useState<number[]>([]);

  // Fonction utilitaire pour décoder la valeur binaire
  const decodeBinaryValue = useCallback((value: number) => {
    return question.options
      .filter(opt => (value & (1 << opt.points)) !== 0)
      .map(opt => opt.points);
  }, [question.options]);

  // Fonction utilitaire pour encoder la valeur binaire
  const encodeBinaryValue = useCallback((points: number[]) => {
    return points.reduce((acc, point) => acc | (1 << point), 0);
  }, []);

  // Synchronisation de l'état avec la valeur externe
  useEffect(() => {
    if (selectedValue === undefined) {
      setSelectedPoints([]);
      return;
    }

    if (question.type === 'multiple') {
      const decoded = decodeBinaryValue(selectedValue);
      setSelectedPoints(decoded);
    } else {
      setSelectedPoints(selectedValue > 0 ? [selectedValue] : []);
    }
  }, [selectedValue, question.type, decodeBinaryValue]);

  const handleOptionSelect = useCallback((points: number, onSelect: (points: number) => void) => {
    if (question.type === 'multiple') {
      setSelectedPoints(prevPoints => {
        const isSelected = prevPoints.includes(points);
        const newPoints = isSelected 
          ? prevPoints.filter(p => p !== points)
          : [...prevPoints, points];
        
        const binaryValue = encodeBinaryValue(newPoints);
        onSelect(binaryValue);
        return newPoints;
      });
    } else {
      setSelectedPoints(prevPoints => {
        const isSelected = prevPoints.includes(points);
        const newPoints = isSelected ? [] : [points];
        onSelect(isSelected ? 0 : points);
        return newPoints;
      });
    }

    console.log('Option selection:', {
      type: question.type,
      points,
      currentSelection: selectedPoints,
      isSelected: selectedPoints.includes(points)
    });
  }, [question.type, selectedPoints, encodeBinaryValue]);

  const isOptionSelected = useCallback((points: number): boolean => {
    return selectedPoints.includes(points);
  }, [selectedPoints]);

  return {
    selectedPoints,
    handleOptionSelect,
    isOptionSelected,
  };
};
