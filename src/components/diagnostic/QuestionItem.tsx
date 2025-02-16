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

  const getInputType = (question: string) => {
    const lowerQuestion = question.toLowerCase();
    if (lowerQuestion.includes("coworkers peut accueillir") || 
        lowerQuestion.includes("pourcentage moyen") ||
        lowerQuestion.includes("point mort mensuel")) {
      return "number";
    }
    return "text";
  };

  const formatValue = (value: string, question: string) => {
    const lowerQuestion = question.toLowerCase();
    
    // Pour le nombre de coworkers
    if (lowerQuestion.includes("coworkers peut accueillir")) {
      return value.replace(/[^0-9]/g, '');
    }
    
    // Pour le pourcentage
    if (lowerQuestion.includes("pourcentage moyen")) {
      let num = value.replace(/[^0-9]/g, '');
      num = num === '' ? '' : Math.min(parseInt(num), 100).toString();
      return num === '' ? '' : `${num}%`;
    }
    
    // Pour le point mort mensuel
    if (lowerQuestion.includes("point mort mensuel")) {
      const numericValue = value.replace(/[^0-9]/g, '');
      return numericValue === '' ? '' : `${parseInt(numericValue).toLocaleString('fr-FR')} €`;
    }
    
    return value;
  };

  const getPlaceholder = (question: string) => {
    const lowerQuestion = question.toLowerCase();
    if (lowerQuestion.includes("coworkers peut accueillir")) {
      return "Nombre de coworkers...";
    }
    if (lowerQuestion.includes("pourcentage moyen")) {
      return "Montant en %";
    }
    if (lowerQuestion.includes("point mort mensuel")) {
      return "Montant en €...";
    }
    return "Votre réponse...";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: questionIndex * 0.1 + 0.4 }}
      className={`glass-morphism rounded-lg p-4 md:p-6 space-y-3 md:space-y-4 ${
        ((question.type === 'text' && !textValues[questionIndex]) ||
         (question.type !== 'text' && (!selectedOptions[questionIndex] || selectedOptions[questionIndex].length === 0)))
          ? 'border-2 border-red-200'
          : ''
      }`}
    >
      <div className="flex items-start gap-2">
        <h3 className="text-base md:text-xl font-semibold text-primary flex-grow leading-tight">
          {question.question}
        </h3>
        <HoverCard openDelay={200}>
          <HoverCardTrigger asChild>
            <button className="text-gray-400 hover:text-primary transition-colors duration-200">
              <Info className="h-4 w-4 md:h-5 md:w-5" />
            </button>
          </HoverCardTrigger>
          <HoverCardContent className="w-72 md:w-80 p-3 md:p-4 text-sm leading-relaxed text-gray-600 bg-white">
            <p>{question.tooltip}</p>
          </HoverCardContent>
        </HoverCard>
      </div>
      <div className="space-y-2 md:space-y-3">
        {question.type === 'text' ? (
          <div className="w-full text-left p-3 md:p-4 rounded border transition-all duration-200 border-gray-200 hover:border-primary focus-within:border-primary focus-within:bg-primary/5">
            <Input
              inputMode={getInputType(question.question) === "number" ? "numeric" : "text"}
              pattern={getInputType(question.question) === "number" ? "[0-9]*" : undefined}
              value={textValues[questionIndex] || ''}
              onChange={(e) => {
                const formattedValue = formatValue(e.target.value, question.question);
                onTextChange(questionIndex, formattedValue, question.question);
              }}
              placeholder={getPlaceholder(question.question)}
              className="w-full border-0 p-0 h-auto text-sm md:text-base focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent placeholder:text-gray-400"
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
              className={`w-full text-left p-3 md:p-4 rounded border transition-all duration-200 flex items-center gap-3 ${
                isOptionSelected(questionIndex, optionIndex)
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 hover:border-primary hover:bg-primary/5'
              }`}
            >
              <div className={`h-4 w-4 md:h-5 md:w-5 rounded border-2 flex items-center justify-center ${
                isOptionSelected(questionIndex, optionIndex)
                  ? 'border-primary'
                  : 'border-gray-300'
              }`}>
                {isOptionSelected(questionIndex, optionIndex) && (
                  <div className="h-2 w-2 md:h-3 md:w-3 rounded bg-primary" />
                )}
              </div>
              <div className="flex-grow">
                <span className="text-sm md:text-base text-gray-700 font-medium">{option.label}</span>
                {option.label === "Autres (préciser)" && isOptionSelected(questionIndex, optionIndex) && (
                  <Input
                    type="text"
                    value={textValues[questionIndex] || ''}
                    onChange={(e) => onTextChange(questionIndex, e.target.value, question.question)}
                    placeholder="Précisez..."
                    className="mt-2 w-full border border-gray-200 p-2 rounded bg-white text-sm md:text-base focus:border-primary focus-visible:ring-0 focus-visible:ring-offset-0 hover:border-primary placeholder:text-gray-400"
                    onClick={(e) => e.stopPropagation()}
                  />
                )}
              </div>
            </motion.button>
          ))
        )}
      </div>
    </motion.div>
  );
};
