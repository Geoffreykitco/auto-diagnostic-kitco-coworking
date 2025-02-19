
import { useState, useEffect } from "react";
import { Question } from "./types";

export const useQuestionState = (question: Question, selectedValue?: number) => {
  const [selectedPoints, setSelectedPoints] = useState<number[]>([]);

  useEffect(() => {
    if (selectedValue !== undefined) {
      if (question.type === 'multiple') {
        const points: number[] = [];
        let remainingValue = selectedValue;
        const sortedOptions = [...question.options].sort((a, b) => b.points - a.points);
        
        sortedOptions.forEach(option => {
          while (remainingValue >= option.points) {
            points.push(option.points);
            remainingValue -= option.points;
          }
        });
        setSelectedPoints(points);
      } else {
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
