
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
      // Pour les questions à choix multiples, on décode la valeur binaire
      const selected = question.options
        .map((opt, index) => ({ index, points: opt.points }))
        .filter(({ index }) => (selectedValue & (1 << index)) !== 0)
        .map(({ index }) => index);
      setSelectedPoints(selected);
    } else {
      // Pour les questions à choix unique, on trouve l'index de l'option sélectionnée
      const selectedIndex = question.options.findIndex(opt => opt.points === selectedValue);
      setSelectedPoints(selectedIndex !== -1 ? [selectedIndex] : []);
    }
  }, [selectedValue, question.options]);

  const handleOptionSelect = (points: number, onSelect: (points: number) => void) => {
    // Trouver l'index de l'option dans le tableau des options
    const optionIndex = question.options.findIndex(opt => opt.points === points);
    
    if (question.type === 'multiple') {
      const isSelected = selectedPoints.includes(optionIndex);
      const newPoints = isSelected
        ? selectedPoints.filter(p => p !== optionIndex)
        : [...selectedPoints, optionIndex];
      
      // Calcul de la valeur binaire basée sur les index plutôt que les points
      const binaryValue = newPoints.reduce((acc, index) => acc | (1 << index), 0);
      setSelectedPoints(newPoints);
      onSelect(binaryValue);
    } else {
      const isSelected = selectedPoints.includes(optionIndex);
      if (isSelected) {
        setSelectedPoints([]);
        onSelect(0);
      } else {
        setSelectedPoints([optionIndex]);
        onSelect(points);
      }
    }

    console.log('Option selection:', {
      type: question.type,
      optionIndex,
      points,
      currentSelection: selectedPoints,
      isSelected: selectedPoints.includes(optionIndex)
    });
  };

  const isOptionSelected = (points: number): boolean => {
    const optionIndex = question.options.findIndex(opt => opt.points === points);
    return selectedPoints.includes(optionIndex);
  };

  return {
    selectedPoints,
    handleOptionSelect,
    isOptionSelected,
  };
};
