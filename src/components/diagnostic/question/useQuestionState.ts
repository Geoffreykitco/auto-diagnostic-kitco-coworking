
import { useState, useEffect } from "react";
import { Question } from "./types";

export const useQuestionState = (question: Question, selectedValue?: number) => {
  const [selectedPoints, setSelectedPoints] = useState<number[]>([]);

  // Synchronise l'état local avec la valeur sélectionnée reçue du parent
  useEffect(() => {
    if (selectedValue === undefined) {
      setSelectedPoints([]);
      return;
    }

    if (question.type === 'multiple') {
      // Pour les choix multiples, on décode la valeur binaire
      const selectedOptions = question.options.filter(option => 
        (selectedValue & option.points) === option.points
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
      // Pour les choix multiples, on ajoute ou retire le point sélectionné
      if (selectedPoints.includes(points)) {
        newSelectedPoints = selectedPoints.filter(p => p !== points);
      } else {
        newSelectedPoints = [...selectedPoints, points];
      }
    } else {
      // Pour les choix uniques, on remplace ou retire la sélection
      if (selectedPoints[0] === points) {
        newSelectedPoints = [];
      } else {
        newSelectedPoints = [points];
      }
    }

    // On met à jour l'état local
    setSelectedPoints(newSelectedPoints);

    // On calcule et envoie la valeur au parent
    if (question.type === 'multiple') {
      // Pour les choix multiples, on additionne les points
      const totalPoints = newSelectedPoints.reduce((sum, p) => sum + p, 0);
      onSelect(totalPoints);
    } else {
      // Pour les choix uniques, on prend le premier point ou 0
      onSelect(newSelectedPoints[0] || 0);
    }

    console.log('Selection updated:', {
      type: question.type,
      selectedPoints: newSelectedPoints,
      totalValue: newSelectedPoints.reduce((sum, p) => sum + p, 0)
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
