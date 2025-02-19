
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
      const numericValue = value.replace(/[^0-9]/g, '');
      
      let number = parseInt(numericValue);
      if (isNaN(number)) number = 0;
      if (number > 100) number = 100;
      
      value = number ? `${number}%` : '';
    }

    onTextChange(questionIndex, value, question.question);
  };

  const handleOptionClick = (optionIndex: number, points: number) => {
    if (question.type === 'single' || question.type === 'multiple') {
      onOptionSelect(questionIndex, optionIndex, points, question.type);
    }
  };

  const getPlaceholder = () => {
    if (question.question.toLowerCase().includes("pourcentage") || 
        question.question.toLowerCase().includes("remplissage")) {
      return "Votre réponse (en %)";
    }
    return "Votre réponse...";
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
        <div className="w-full">
          <input
            type="text"
            value={textValues[questionIndex] || ''}
            onChange={handleTextChange}
            placeholder={getPlaceholder()}
            className={`w-full p-3 rounded-lg transition-all text-sm md:text-base ${
              textValues[questionIndex] 
                ? "border border-[#132720] text-[#132720] bg-white font-medium" 
                : "bg-gray-50 hover:bg-gray-100 text-gray-700 border border-transparent"
            }`}
          />
        </div>
      ) : (
        <div className="space-y-2">
          {question.options.map((option, optionIndex) => (
            <button
              key={optionIndex}
              onClick={() => handleOptionClick(optionIndex, option.points)}
              className={`w-full p-3 text-left rounded-lg transition-all text-sm md:text-base
                ${
                  isSelected(optionIndex)
                    ? "border border-[#132720] text-[#132720] bg-white font-medium"
                    : "bg-gray-50 hover:bg-gray-100 text-gray-700 border border-transparent"
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
