import { motion } from 'framer-motion';
import { Info } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

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
  onTextChange
}: QuestionItemProps) => {
  const isOptionSelected = (questionIndex: number, optionIndex: number) => {
    return selectedOptions[questionIndex]?.includes(optionIndex) || false;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: questionIndex * 0.1 + 0.4 }}
      className={`glass-morphism rounded-lg p-6 space-y-4 ${
        ((question.type === 'text' && !textValues[questionIndex]) ||
         (question.type !== 'text' && (!selectedOptions[questionIndex] || selectedOptions[questionIndex].length === 0)))
          ? 'border-2 border-red-200'
          : ''
      }`}
    >
      <div className="flex items-start gap-2">
        <h3 className="text-xl font-semibold text-primary flex-grow">{question.question}</h3>
        <HoverCard openDelay={200}>
          <HoverCardTrigger asChild>
            <button className="text-gray-400 hover:text-primary transition-colors duration-200">
              <Info className="h-5 w-5" />
            </button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80 p-4 text-sm text-gray-700 bg-white">
            <p>{question.tooltip}</p>
          </HoverCardContent>
        </HoverCard>
      </div>
      <div className="space-y-3">
        {question.type === 'text' ? (
          <div className="w-full text-left p-4 rounded border transition-all duration-200 border-gray-200 hover:border-primary focus-within:border-primary focus-within:bg-primary/5">
            <Input
              type={question.question.toLowerCase().includes("point mort mensuel") ? "text" : "text"}
              value={textValues[questionIndex] || ''}
              onChange={(e) => onTextChange(questionIndex, e.target.value, question.question)}
              placeholder={question.question.toLowerCase().includes("point mort mensuel") ? "Montant en €..." : "Votre réponse..."}
              className="w-full border-0 p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
            />
          </div>
        ) : (
          question.options.map((option, optionIndex) => (
            <motion.button
              key={optionIndex}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: optionIndex * 0.05 + questionIndex * 0.1 + 0.5 }}
              onClick={() => {
                if (question.type === 'single' || question.type === 'multiple') {
                  onOptionSelect(questionIndex, optionIndex, option.points, question.type);
                }
              }}
              className={`w-full text-left p-4 rounded border transition-all duration-200 flex items-center gap-3 ${
                isOptionSelected(questionIndex, optionIndex)
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 hover:border-primary hover:bg-primary/5'
              }`}
            >
              <div className={`h-5 w-5 rounded border-2 flex items-center justify-center ${
                isOptionSelected(questionIndex, optionIndex)
                  ? 'border-primary'
                  : 'border-gray-300'
              }`}>
                {isOptionSelected(questionIndex, optionIndex) && (
                  <div className="h-3 w-3 rounded bg-primary" />
                )}
              </div>
              {option.label}
            </motion.button>
          ))
        )}
      </div>
    </motion.div>
  );
};
