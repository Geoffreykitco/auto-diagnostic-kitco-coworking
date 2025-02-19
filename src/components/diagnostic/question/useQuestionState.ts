
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
      const selected = [];
      for (let i = 0; i < 32; i++) {
        if ((selectedValue & (1 << i)) !== 0) {
          selected.push(i);
        }
      }
      setSelectedPoints(selected);
    } else {
      // Pour les questions à choix unique, on utilise directement la valeur
      setSelectedPoints(selectedValue > 0 ? [selectedValue] : []);
    }
  }, [selectedValue, question.type]);

  const handleOptionSelect = (points: number, onSelect: (points: number) => void) => {
    if (question.type === 'multiple') {
      // Gestion des choix multiples
      const isSelected = selectedPoints.includes(points);
      let newPoints;
      
      if (isSelected) {
        // Désélection d'une option
        newPoints = selectedPoints.filter(p => p !== points);
      } else {
        // Ajout d'une nouvelle option
        newPoints = [...selectedPoints, points];
      }
      
      // Calcul de la valeur binaire pour stocker les sélections multiples
      const binaryValue = newPoints.reduce((acc, point) => acc | (1 << point), 0);
      setSelectedPoints(newPoints);
      onSelect(binaryValue);
    } else {
      // Gestion des choix uniques
      const isSelected = selectedPoints.includes(points);
      
      if (isSelected) {
        // Désélection de l'option
        setSelectedPoints([]);
        onSelect(0);
      } else {
        // Sélection d'une nouvelle option (remplace l'ancienne s'il y en avait une)
        setSelectedPoints([points]);
        onSelect(points);
      }
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
