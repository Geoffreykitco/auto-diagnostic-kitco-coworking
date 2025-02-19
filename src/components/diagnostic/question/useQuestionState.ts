
import { useState, useEffect } from "react";
import { Question } from "./types";

export const useQuestionState = (question: Question, selectedValue?: number) => {
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);

  useEffect(() => {
    if (selectedValue === undefined) {
      setSelectedIndices([]);
      return;
    }

    if (question.type === 'multiple') {
      const selected = [];
      for (let i = 0; i < question.options.length; i++) {
        if ((selectedValue & (1 << i)) !== 0) {
          selected.push(i);
        }
      }
      setSelectedIndices(selected);
    } else {
      // Pour les questions single et text, on cherche l'option avec les points correspondants
      const index = question.options.findIndex(opt => opt.points === selectedValue);
      setSelectedIndices(index !== -1 ? [index] : []);
    }
  }, [selectedValue, question.options]);

  const handleOptionSelect = (points: number, onSelect: (points: number) => void) => {
    const index = question.options.findIndex(opt => opt.points === points);

    if (question.type === 'multiple') {
      const isSelected = selectedIndices.includes(index);
      const newIndices = isSelected
        ? selectedIndices.filter(i => i !== index)
        : [...selectedIndices, index];
      
      // Pour le type multiple, on accumule les points de toutes les options sélectionnées
      const totalPoints = newIndices.reduce((sum, idx) => 
        sum + question.options[idx].points, 0);
      
      setSelectedIndices(newIndices);
      onSelect(totalPoints);
    } else {
      const isSelected = selectedIndices.includes(index);
      if (isSelected) {
        setSelectedIndices([]);
        onSelect(0);
      } else {
        setSelectedIndices([index]);
        onSelect(points);
      }
    }

    console.log('Option selection:', {
      type: question.type,
      index,
      points,
      currentSelection: selectedIndices,
      isSelected: selectedIndices.includes(index)
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
