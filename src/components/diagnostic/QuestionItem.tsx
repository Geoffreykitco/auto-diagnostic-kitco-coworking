
import { motion } from "framer-motion";
import { Info, Check } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect, useState } from "react";

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
  const [selectedPoints, setSelectedPoints] = useState<number[]>([]);

  // Synchroniser selectedPoints avec selectedValue
  useEffect(() => {
    if (selectedValue !== undefined) {
      if (question.type === 'multiple') {
        // Pour les questions à choix multiple, décomposer selectedValue en points individuels
        const points: number[] = [];
        let remainingValue = selectedValue;
        
        // Trier les options par points décroissants pour une décomposition correcte
        const sortedOptions = [...question.options].sort((a, b) => b.points - a.points);
        
        sortedOptions.forEach(option => {
          while (remainingValue >= option.points) {
            points.push(option.points);
            remainingValue -= option.points;
          }
        });
        setSelectedPoints(points);
      } else {
        // Pour les questions à choix unique, on ne garde que la valeur sélectionnée
        setSelectedPoints(selectedValue > 0 ? [selectedValue] : []);
      }
    } else {
      setSelectedPoints([]);
    }
  }, [selectedValue, question]);

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

  const handleOptionSelect = (points: number) => {
    let newPoints: number[];
    
    if (question.type === 'multiple') {
      // Pour les questions à choix multiple
      if (selectedPoints.includes(points)) {
        // Si déjà sélectionné, on retire
        newPoints = selectedPoints.filter(p => p !== points);
      } else {
        // Sinon on ajoute
        newPoints = [...selectedPoints, points];
      }
    } else {
      // Pour les questions à choix unique
      if (selectedPoints.length === 1 && selectedPoints[0] === points) {
        // Si on clique sur la réponse déjà sélectionnée, on la désélectionne
        newPoints = [];
      } else {
        // Sinon on remplace la sélection précédente par la nouvelle
        newPoints = [points];
      }
    }
    
    // Calculer le total des points et mettre à jour
    const totalPoints = newPoints.reduce((sum, p) => sum + p, 0);
    setSelectedPoints(newPoints);
    onSelect(totalPoints);

    console.log('Selection updated:', {
      type: question.type,
      selectedPoints: newPoints,
      totalPoints
    });
  };

  const isOptionSelected = (points: number) => {
    // Pour les questions à choix unique ET multiple, on vérifie simplement
    // si les points font partie des points sélectionnés
    return selectedPoints.includes(points);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 * questionIndex }}
      className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm"
    >
      <div className="flex gap-2.5 items-start mb-6">
        <h3 className="text-lg font-medium flex-grow text-gray-900">
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
          <input
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
            className="w-full p-4 text-left rounded-lg transition-all duration-200 text-sm md:text-base border bg-gray-50/80 hover:bg-gray-50 text-gray-700 border-gray-100 hover:border-[#12271F]/20 hover:shadow-sm"
          />
        </div>
      ) : (
        <div className="space-y-2.5">
          {question.options.map((option, optionIndex) => (
            <motion.button
              key={optionIndex}
              onClick={() => handleOptionSelect(option.points)}
              className={
                isOptionSelected(option.points)
                  ? "relative w-full p-4 text-left rounded-lg transition-all duration-200 flex items-center justify-between gap-3 text-sm md:text-base border bg-white border-2 border-[#12271F] text-gray-900 shadow-sm font-medium"
                  : "relative w-full p-4 text-left rounded-lg transition-all duration-200 flex items-center justify-between gap-3 text-sm md:text-base border bg-gray-50/80 hover:bg-gray-50 text-gray-700 border-gray-100 hover:border-[#12271F]/20 hover:shadow-sm"
              }
              whileHover={{ scale: 1.005 }}
              whileTap={{ scale: 0.995 }}
            >
              <span className="flex-1">{option.label}</span>
              {isOptionSelected(option.points) && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 400,
                    damping: 10
                  }}
                  className="rounded-full p-1 bg-[#12271F]"
                >
                  <Check className="h-4 w-4 text-white" />
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>
      )}
    </motion.div>
  );
};
