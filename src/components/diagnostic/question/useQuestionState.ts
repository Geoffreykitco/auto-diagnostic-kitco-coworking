
import { useState, useEffect } from "react";
import { Question } from "./types";

export const useQuestionState = (question: Question, selectedValue?: number) => {
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);

  useEffect(() => {
    if (selectedValue === undefined) {
      setSelectedIndices([]);
      return;
    }

    // Pour les questions single et text, on cherche l'option avec les points correspondants
    const index = question.options.findIndex(opt => opt.points === selectedValue);
    setSelectedIndices(index !== -1 ? [index] : []);
  }, [selectedValue, question.options]);

  const handleOptionSelect = (points: number, onSelect: (points: number) => void) => {
    const index = question.options.findIndex(opt => opt.points === points);
    const isSelected = selectedIndices.includes(index);

    if (question.type === 'multiple') {
      // Pour les questions multiples, on ajoute ou retire l'index
      const newIndices = isSelected
        ? selectedIndices.filter(i => i !== index)
        : [...selectedIndices, index];
      
      // On calcule le total des points en additionnant les points de chaque option sélectionnée
      const totalPoints = newIndices.reduce((sum, idx) => 
        sum + question.options[idx].points, 0);
      
      setSelectedIndices(newIndices);
      onSelect(totalPoints);
    } else {
      // Pour les questions single, on remplace la sélection
      if (isSelected) {
        // Si on clique sur une option déjà sélectionnée, on la désélectionne
        setSelectedIndices([]);
        onSelect(0);
      } else {
        // Sinon on sélectionne la nouvelle option
        setSelectedIndices([index]);
        onSelect(points);
      }
    }

    console.log('Option selection:', {
      type: question.type,
      index,
      points,
      currentSelection: selectedIndices,
      isSelected,
      newTotal: isSelected ? (question.type === 'multiple' ? selectedIndices.reduce((sum, idx) => sum + question.options[idx].points, 0) - points : 0) : points
    });
  };

  const isOptionSelected = (points: number): boolean => {
    const index = question.options.findIndex(opt => opt.points === points);
    return selectedIndices.includes(index);
  };

  return {
    selectedPoints: selectedIndices,
    handleOptionSelect,
    isOptionSelected,
  };
};
