
import { motion } from "framer-motion";
import { QuestionTitle } from "./question/QuestionTitle";
import { TextInput } from "./question/TextInput";
import { OptionButton } from "./question/OptionButton";
import type { QuestionItemProps } from "./question/types";

export const QuestionItem = ({
  question,
  questionIndex,
  onSelect,
  selectedValue,
}: QuestionItemProps) => {
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (question.question.toLowerCase().includes("pourcentage") || 
        question.question.toLowerCase().includes("remplissage")) {
      // Pour les champs numériques (pourcentages)
      const numericValue = value.replace(/[^0-9]/g, '');
      let number = parseInt(numericValue);
      if (isNaN(number)) number = 0;
      if (number > 100) number = 100;
      onSelect(number);
    } else {
      // Pour les champs texte
      onSelect(0); // On garde 0 comme valeur par défaut pour maintenir la compatibilité
    }
  };

  const handleOptionSelect = (points: number) => {
    if (question.type === 'multiple') {
      // Pour les questions à choix multiples, on peut sélectionner/désélectionner
      onSelect(points);
    } else {
      // Pour les questions à choix unique, on sélectionne/désélectionne
      onSelect(selectedValue === points ? 0 : points);
    }
  };

  const isOptionSelected = (points: number): boolean => {
    if (question.type === 'multiple') {
      // Pour les choix multiples, vérifie si l'option est dans la sélection
      return (selectedValue & points) === points;
    } else {
      // Pour les choix uniques, vérifie si c'est l'option sélectionnée
      return selectedValue === points;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 * questionIndex }}
      className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm"
    >
      <QuestionTitle 
        question={question.question} 
        tooltip={question.tooltip} 
      />

      {question.type === 'text' ? (
        <TextInput
          value={selectedValue?.toString() || ''}
          onChange={handleTextChange}
          placeholder={
            question.question.toLowerCase().includes("remplissage")
              ? "en %"
              : question.question.toLowerCase().includes("pourcentage")
              ? "Votre réponse (en %)"
              : "Votre réponse..."
          }
        />
      ) : (
        <div className="space-y-2.5">
          {question.options.map((option, optionIndex) => (
            <OptionButton
              key={optionIndex}
              label={option.label}
              isSelected={isOptionSelected(option.points)}
              onClick={() => handleOptionSelect(option.points)}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};
