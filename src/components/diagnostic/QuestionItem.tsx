
import { motion } from "framer-motion";
import { Info, Check } from "lucide-react";
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

  const isFirstQuestion = question.question === "Depuis combien de temps votre espace de coworking est-il ouvert ?";

  const getButtonClasses = (option: Option) => {
    const baseClasses = "relative w-full p-4 text-left rounded-lg transition-all duration-200 ease-in-out text-sm md:text-base border";
    
    if (isFirstQuestion) {
      return `${baseClasses} group ${
        selectedValue === option.points
          ? "bg-[#14281F] border-[#14281F] text-white shadow-sm font-medium"
          : "bg-white hover:bg-[#F8FAF9] text-gray-700 border-gray-100 hover:border-[#14281F]/20"
      }`;
    }
    
    return `${baseClasses} ${
      selectedValue === option.points
        ? "border-[#132720] text-[#132720] bg-white font-medium"
        : "bg-gray-50 hover:bg-gray-100 text-gray-700 border-transparent"
    }`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 * questionIndex }}
      className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-left"
    >
      <div className="flex gap-2 items-start mb-6">
        <h3 className="text-lg font-medium text-gray-900 flex-grow">
          {question.question}
        </h3>
        <HoverCard>
          <HoverCardTrigger asChild>
            <button className="p-1.5 hover:bg-gray-50 rounded-full transition-colors">
              <Info className="h-[18px] w-[18px] text-gray-400" />
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
            className={`w-full transition-all duration-200 ${
              selectedValue 
                ? "border-[#132720] text-[#132720] font-medium shadow-sm" 
                : "text-gray-700 hover:border-[#14281F]/20"
            }`}
          />
        </div>
      ) : (
        <div className="space-y-2.5">
          {question.options.map((option, optionIndex) => (
            <motion.button
              key={optionIndex}
              onClick={() => onSelect(option.points)}
              className={getButtonClasses(option)}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-between">
                <span>{option.label}</span>
                {selectedValue === option.points && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", duration: 0.5 }}
                  >
                    <Check className={`h-5 w-5 ${isFirstQuestion ? 'text-white' : 'text-[#14281F]'}`} />
                  </motion.div>
                )}
              </div>
              {isFirstQuestion && selectedValue === option.points && (
                <motion.div
                  className="absolute inset-0 bg-[#14281F]/5 rounded-lg"
                  layoutId="selectedBackground"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      )}
    </motion.div>
  );
};
