
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
      // Pour les choix multiples, on identifie chaque option sélectionnée
      const selectedOptions = question.options.filter(option => 
        (selectedValue & (1 << option.points)) !== 0
      );
      setSelectedPoints(selectedOptions.map(opt => opt.points));
    } else {
      // Pour les choix uniques, on utilise directement la valeur
      setSelectedPoints(selectedValue > 0 ? [selectedValue] : []);
    }
  }, [selectedValue, question]);

  const handleOptionSelect = (points: number, onSelect: (points: number) => void) => {
    let newSelectedPoints: number[];

    if (question.type === 'multiple') {
      // Pour les choix multiples, on bascule la sélection individuelle
      if (selectedPoints.includes(points)) {
        newSelectedPoints = selectedPoints.filter(p => p !== points);
      } else {
        newSelectedPoints = [...selectedPoints, points];
      }

      // On calcule la valeur binaire en utilisant des positions de bits
      const binaryValue = newSelectedPoints.reduce((sum, point) => sum | (1 << point), 0);
      onSelect(binaryValue);
    } else {
      // Pour les choix uniques, on gère la sélection/désélection
      newSelectedPoints = selectedPoints[0] === points ? [] : [points];
      onSelect(newSelectedPoints[0] || 0);
    }

    // On met à jour l'état local
    setSelectedPoints(newSelectedPoints);

    console.log('Selection updated:', {
      type: question.type,
      selectedPoints: newSelectedPoints,
      binaryValue: question.type === 'multiple' 
        ? newSelectedPoints.reduce((sum, point) => sum | (1 << point), 0)
        : newSelectedPoints[0] || 0
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
