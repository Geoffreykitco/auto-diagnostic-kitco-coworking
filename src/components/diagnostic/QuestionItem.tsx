
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

  const getButtonClasses = (option: Option, isSelected: boolean) => {
    const baseClasses = `
      relative w-full p-4 text-left rounded-lg transition-all duration-200 
      flex items-center justify-between gap-3
      text-sm md:text-base border
    `;
    
    if (isFirstQuestion) {
      return `${baseClasses} ${
        isSelected
          ? "bg-[#14281F]/50 border-[#14281F] text-white shadow-lg font-medium ring-2 ring-[#14281F] ring-offset-2"
          : "bg-white hover:bg-[#F8FAF9] text-gray-700 border-gray-100 hover:border-[#14281F]/20 hover:shadow-sm"
      }`;
    }
    
    return `${baseClasses} ${
      isSelected
        ? "border-primary bg-primary/5 text-primary shadow-sm font-medium"
        : "bg-white hover:bg-gray-50 text-gray-700 border-gray-100 hover:border-primary/20 hover:shadow-sm"
    }`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 * questionIndex }}
      className={`
        bg-white p-6 rounded-xl border shadow-sm
        ${isFirstQuestion ? 'border-[#14281F]/10' : 'border-gray-100'}
      `}
    >
      <div className="flex gap-2.5 items-start mb-6">
        <h3 className={`text-lg font-medium flex-grow
          ${isFirstQuestion ? 'text-[#14281F]' : 'text-gray-900'}
        `}>
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
            className="w-80 bg-white" 
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
              question.question.toLowerCase().includes("remplissage")
                ? "en %"
                : question.question.toLowerCase().includes("pourcentage")
                ? "Votre réponse (en %)"
                : "Votre réponse..."
            }
            className={`w-full transition-all duration-200 ${
              selectedValue 
                ? "border-primary text-primary font-medium shadow-sm" 
                : "text-gray-700 hover:border-primary/20"
            }`}
          />
        </div>
      ) : (
        <div className="space-y-2.5">
          {question.options.map((option, optionIndex) => {
            const isSelected = selectedValue === option.points;
            
            return (
              <motion.button
                key={optionIndex}
                onClick={() => onSelect(option.points)}
                className={getButtonClasses(option, isSelected)}
                whileHover={{ scale: 1.005 }}
                whileTap={{ scale: 0.995 }}
              >
                <span className="flex-1">{option.label}</span>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 400,
                      damping: 10
                    }}
                    className={`
                      rounded-full p-1
                      ${isFirstQuestion ? 'bg-white/20' : 'bg-primary'}
                    `}
                  >
                    <Check className={`h-4 w-4 ${isFirstQuestion ? 'text-white' : 'text-white'}`} />
                  </motion.div>
                )}
                {isSelected && (
                  <motion.div
                    className={`
                      absolute inset-0 rounded-lg
                      ${isFirstQuestion 
                        ? 'bg-gradient-to-r from-[#14281F]/5 to-[#14281F]/0' 
                        : 'bg-primary/5'
                      }
                    `}
                    layoutId={`selected-${questionIndex}`}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      )}
    </motion.div>
  );
};
