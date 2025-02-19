
import { useState, useEffect } from "react";
import { Question } from "./types";

export const useQuestionState = (question: Question, selectedValue?: number) => {
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const isDiscoverySection = question.options.every(opt => opt.points === 0);

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
      if (isDiscoverySection) {
        // Pour les sections de découverte, la valeur est directement l'index + 1
        setSelectedIndices(selectedValue > 0 ? [selectedValue - 1] : []);
      } else {
        // Pour les autres sections, on cherche l'option avec les points correspondants
        const index = question.options.findIndex(opt => opt.points === selectedValue);
        setSelectedIndices(index !== -1 ? [index] : []);
      }
    }
  }, [selectedValue, question.options, isDiscoverySection]);

  const handleOptionSelect = (points: number, onSelect: (points: number) => void) => {
    let index: number;
    
    if (isDiscoverySection) {
      // Dans une section de découverte, on utilise directement l'index de l'option
      index = question.options.findIndex((_, i) => i === points);
    } else {
      // Dans les autres sections, on cherche l'option avec les points correspondants
      index = question.options.findIndex(opt => opt.points === points);
    }

    if (question.type === 'multiple') {
      const isSelected = selectedIndices.includes(index);
      const newIndices = isSelected
        ? selectedIndices.filter(i => i !== index)
        : [...selectedIndices, index];
      
      const binaryValue = newIndices.reduce((acc, idx) => acc | (1 << idx), 0);
      setSelectedIndices(newIndices);
      onSelect(binaryValue);
    } else {
      const isSelected = selectedIndices.includes(index);
      if (isSelected) {
        setSelectedIndices([]);
        onSelect(0);
      } else {
        setSelectedIndices([index]);
        onSelect(isDiscoverySection ? index + 1 : points);
      }
    }

    console.log('Option selection:', {
      type: question.type,
      index,
      points,
      isDiscoverySection,
      currentSelection: selectedIndices,
      isSelected: selectedIndices.includes(index)
    });
  };

  const isOptionSelected = (points: number): boolean => {
    if (isDiscoverySection) {
      const index = question.options.findIndex((_, i) => i === points);
      return selectedIndices.includes(index);
    } else {
      const index = question.options.findIndex(opt => opt.points === points);
      return selectedIndices.includes(index);
    }
  };

  return {
    selectedPoints: selectedIndices,
    handleOptionSelect,
    isOptionSelected,
  };
};
