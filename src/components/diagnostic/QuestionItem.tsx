
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
  onSelect: (points: number) => void;
  selectedValue?: number;
}

export const QuestionItem = ({
  question,
  questionIndex,
  onSelect,
  selectedValue,
}: QuestionItemProps) => {
  const isMobile = useIsMobile();

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

  // Style spécial pour la première question
  const isFirstQuestion = question.question === "Depuis combien de temps votre espace de coworking est-il ouvert ?";

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
          <Input
            type="text"
            value={selectedValue?.toString() || ''}
            onChange={handleTextChange}
            placeholder={
              question.question.toLowerCase().includes("pourcentage") || 
              question.question.toLowerCase().includes("remplissage")
                ? "Votre réponse (en %)"
                : "Votre réponse..."
            }
            className={`w-full ${
              selectedValue 
                ? "border-[#132720] text-[#132720] font-medium" 
                : "text-gray-700"
            }`}
          />
        </div>
      ) : (
        <div className="space-y-2">
          {question.options.map((option, optionIndex) => (
            <button
              key={optionIndex}
              onClick={() => onSelect(option.points)}
              className={`w-full p-4 text-left rounded-lg transition-all text-sm md:text-base border
                ${isFirstQuestion ? (
                  selectedValue === option.points
                    ? "bg-white border-[#14281F] text-[#14281F] hover:bg-white hover:border-[#14281F] hover:text-[#14281F] font-medium"
                    : "bg-gray-50 hover:bg-white hover:border-[#14281F] hover:text-[#14281F] text-gray-700 border-transparent"
                ) : (
                  selectedValue === option.points
                    ? "border border-[#132720] text-[#132720] bg-white font-medium"
                    : "bg-gray-50 hover:bg-gray-100 text-gray-700 border border-transparent"
                )}
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
