
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
      // On utilise toujours l'index car les points peuvent être à 0
      const selected = [];
      for (let i = 0; i < question.options.length; i++) {
        if ((selectedValue & (1 << i)) !== 0) {
          selected.push(i);
        }
      }
      setSelectedPoints(selected);
    } else {
      // Pour les questions à choix unique, on cherche l'index correspondant
      // Si tous les points sont à 0, on utilise directement selectedValue comme index
      if (question.options.every(opt => opt.points === 0)) {
        setSelectedPoints(selectedValue > 0 ? [selectedValue - 1] : []);
      } else {
        const selectedIndex = question.options.findIndex(opt => opt.points === selectedValue);
        setSelectedPoints(selectedIndex !== -1 ? [selectedIndex] : []);
      }
    }
  }, [selectedValue, question.options]);

  const handleOptionSelect = (points: number, onSelect: (points: number) => void) => {
    const optionIndex = question.options.findIndex(opt => opt.points === points);
    const isDiscoverySection = question.options.every(opt => opt.points === 0);
    
    if (question.type === 'multiple') {
      const isSelected = selectedPoints.includes(optionIndex);
      const newPoints = isSelected
        ? selectedPoints.filter(p => p !== optionIndex)
        : [...selectedPoints, optionIndex];
      
      // Calcul de la valeur binaire basée sur les index
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
        // Pour les sections de découverte, on utilise l'index + 1 comme valeur
        // Pour les autres sections, on utilise les points définis
        onSelect(isDiscoverySection ? optionIndex + 1 : points);
      }
    }

    console.log('Option selection:', {
      type: question.type,
      optionIndex,
      points,
      isDiscoverySection,
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
