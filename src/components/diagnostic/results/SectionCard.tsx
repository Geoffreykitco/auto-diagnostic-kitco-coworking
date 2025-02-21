
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { ScoreLevel } from "@/utils/scoreCalculator";

interface SectionCardProps {
  section: string;
  score: number;
  level: ScoreLevel;
  message: string;
  getLevelColor: (score: number) => string;
  getProgressColor: (score: number) => string;
}

const getSectionTitle = (section: string) => {
  switch (section) {
    case 'acquisition':
      return "Attirer de nouveaux coworkers";
    case 'activation':
      return "Transformer les visiteurs en membres";
    case 'retention':
      return "Fidéliser ses membres sur le long terme";
    case 'revenus':
      return "Optimiser la rentabilité du coworking";
    default:
      return "Clients à ambassadeurs";
  }
};

export const SectionCard = ({
  section,
  score,
  level,
  message,
  getLevelColor,
  getProgressColor,
}: SectionCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg p-6 border border-gray-200 h-full shadow-sm hover:shadow-md transition-shadow duration-200 text-left"
    >
      <div className="mb-4">
        <h4 className="text-lg font-semibold">
          {section === 'revenus' ? 'Revenus' : section.charAt(0).toUpperCase() + section.slice(1)} - {getSectionTitle(section)}
        </h4>
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center text-sm mb-2">
          <span className="text-gray-600">Score</span>
          <span className={`font-medium ${getLevelColor(score)}`}>
            {score}%
          </span>
        </div>
        <Progress 
          value={score} 
          className="h-2"
          indicatorClassName={getProgressColor(score)}
        />
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-sm">Niveau : </span>
          <span className={`font-medium ${getLevelColor(score)}`}>
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </span>
        </div>
        <p className="text-sm text-gray-600">{message}</p>
      </div>
    </motion.div>
  );
};
