
import { motion } from "framer-motion";
import { Info } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";

interface Option {
  label: string;
  points: number;
}

interface Question {
  question: string;
  tooltip: string;
  type: 'single' | 'multiple' | 'text';
  options: Option[];
}

interface QuestionItemProps {
  question: Question;
  questionIndex: number;
  selectedOptions: { [key: number]: number[] };
  textValues: { [key: number]: string };
  onOptionSelect: (questionIndex: number, optionIndex: number, points: number, type: 'single' | 'multiple') => void;
  onTextChange: (questionIndex: number, value: string, question: string) => void;
}

export const QuestionItem = ({
  question,
  questionIndex,
  selectedOptions,
  textValues,
  onOptionSelect,
  onTextChange,
}: QuestionItemProps) => {
  const isMobile = useIsMobile();

  const isSelected = (optionIndex: number) => {
    return selectedOptions[questionIndex]?.includes(optionIndex);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    if (question.question.toLowerCase().includes("pourcentage") || 
        question.question.toLowerCase().includes("remplissage")) {
      // Enlever tous les caractères non numériques sauf le point
      const numericValue = value.replace(/[^0-9]/g, '');
      
      // Convertir en nombre et s'assurer qu'il est entre 0 et 100
      let number = parseInt(numericValue);
      if (isNaN(number)) number = 0;
      if (number > 100) number = 100;
      
      // Formater avec le symbole %
      value = number ? `${number}%` : '';
    }

    onTextChange(questionIndex, value, question.question);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 * questionIndex }}
      className="bg-white p-6 rounded-lg border border-gray-200 text-left"
    >
      <div className="flex gap-2 items-start mb-4">
        <h3 className="text-lg font-medium text-gray-900 flex-grow">
          {question.question}
        </h3>
        <HoverCard>
          <HoverCardTrigger asChild>
            <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
              <Info className="h-5 w-5 text-gray-500" />
              <span className="sr-only">Plus d'informations</span>
            </button>
          </HoverCardTrigger>
          <HoverCardContent 
            className="w-80" 
            align={isMobile ? "center" : "end"}
            side={isMobile ? "bottom" : "right"}
          >
            <p className="text-sm text-gray-600">{question.tooltip}</p>
          </HoverCardContent>
        </HoverCard>
      </div>

      {question.type === 'text' ? (
        <Input
          type="text"
          value={textValues[questionIndex] || ''}
          onChange={handleTextChange}
          placeholder="Votre réponse..."
          className="w-full"
        />
      ) : (
        <div className="space-y-2">
          {question.options.map((option, optionIndex) => (
            <button
              key={optionIndex}
              onClick={() => onOptionSelect(questionIndex, optionIndex, option.points, question.type)}
              className={`w-full p-3 text-left rounded-lg transition-all text-sm md:text-base
                ${
                  isSelected(optionIndex)
                    ? "bg-primary text-white"
                    : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                }
              `}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
};
