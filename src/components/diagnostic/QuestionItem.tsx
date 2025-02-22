
import { motion } from "framer-motion";
import { QuestionTitle } from "./question/QuestionTitle";
import { TextInput } from "./question/TextInput";
import { OptionButton } from "./question/OptionButton";
import type { QuestionItemProps } from "./question/types";
import { useState } from "react";

export const QuestionItem = ({
  question,
  questionIndex,
  onSelect,
  selectedValue,
}: QuestionItemProps) => {
  const [localValue, setLocalValue] = useState(selectedValue?.toString() || '');

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (question.question.toLowerCase().includes("pourcentage") || 
        question.question.toLowerCase().includes("remplissage")) {
      const numericValue = value.replace(/[^0-9]/g, '');
      let number = parseInt(numericValue);
      if (isNaN(number)) number = 0;
      if (number > 100) number = 100;
      setLocalValue(number ? `${number}%` : '');
      onSelect(number, false);
    } else if (question.question.toLowerCase().includes("ville")) {
      // On ne garde que les lettres, espaces, tirets et apostrophes
      const sanitizedValue = value.replace(/[^a-zA-ZÀ-ÿ\s'-]/g, '');
      setLocalValue(sanitizedValue);
      onSelect(sanitizedValue, false);
    } else {
      setLocalValue(value);
      onSelect(value);
    }
  };

  const handleOptionSelect = (optionIndex: number) => {
    if (question.type === 'multiple') {
      const newSelection = typeof selectedValue === 'object' ? [...selectedValue] : [];
      const index = newSelection.indexOf(optionIndex);
      if (index === -1) {
        newSelection.push(optionIndex);
      } else {
        newSelection.splice(index, 1);
      }
      onSelect(newSelection);
    } else {
      onSelect(selectedValue === optionIndex ? null : optionIndex);
    }
  };

  const isOptionSelected = (optionIndex: number): boolean => {
    if (question.type === 'multiple') {
      return Array.isArray(selectedValue) && selectedValue.includes(optionIndex);
    } else {
      return selectedValue === optionIndex;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 * questionIndex }}
      className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
    >
      <QuestionTitle 
        question={question.question} 
        tooltip={question.tooltip} 
      />

      {question.type === 'text' ? (
        <TextInput
          value={localValue}
          onChange={handleTextChange}
          placeholder={
            question.question.toLowerCase().includes("remplissage")
              ? "Votre réponse (en %)"
              : question.question.toLowerCase().includes("pourcentage")
              ? "Votre réponse (en %)"
              : "Votre réponse..."
          }
          type={question.question.toLowerCase().includes("ville") ? "text" : undefined}
        />
      ) : (
        <div className="space-y-2.5">
          {question.options.map((option, optionIndex) => (
            <OptionButton
              key={optionIndex}
              label={option.label}
              isSelected={isOptionSelected(optionIndex)}
              onClick={() => handleOptionSelect(optionIndex)}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};
