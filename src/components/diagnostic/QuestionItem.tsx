
import { motion } from "framer-motion";
import { QuestionTitle } from "./question/QuestionTitle";
import { TextInput } from "./question/TextInput";
import { OptionButton } from "./question/OptionButton";
import { useQuestionState } from "./question/useQuestionState";
import type { QuestionItemProps } from "./question/types";

export const QuestionItem = ({
  question,
  questionIndex,
  onSelect,
  selectedValue,
}: QuestionItemProps) => {
  const { handleOptionSelect, isOptionSelected } = useQuestionState(question, selectedValue);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    if (question.question.toLowerCase().includes("pourcentage") || 
        question.question.toLowerCase().includes("remplissage")) {
      const numericValue = value.replace(/[^0-9]/g, '');
      
      let number = parseInt(numericValue);
      if (isNaN(number)) number = 0;
      if (number > 100) number = 100;
      
      onSelect(number);
    } else {
      onSelect(0);
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
              onClick={() => handleOptionSelect(option.points, onSelect)}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};
