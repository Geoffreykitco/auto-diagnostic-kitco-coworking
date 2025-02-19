
import { Info } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useIsMobile } from "@/hooks/use-mobile";

interface QuestionTitleProps {
  question: string;
  tooltip: string;
}

export const QuestionTitle = ({ question, tooltip }: QuestionTitleProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="flex gap-2.5 items-start mb-6">
      <h3 className="text-lg font-medium flex-grow text-gray-900">
        {question}
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
          <p className="text-sm text-gray-600">{tooltip}</p>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};
