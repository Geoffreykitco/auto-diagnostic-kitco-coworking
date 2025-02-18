
import { motion } from 'framer-motion';

interface SectionScoreProps {
  title: string;
  score: number;
  level: string;
  analysis: string;
  index: number;
}

export const SectionScore = ({ title, score, level, analysis, index }: SectionScoreProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.1 }}
      className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
    >
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Score</span>
          <span className="font-bold text-primary">{score}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
          <div 
            className="bg-primary rounded-full h-2 transition-all duration-1000 ease-out"
            style={{ width: `${score}%` }}
          />
        </div>
        <div className="text-md text-gray-700 mt-2">
          Niveau : <span className="font-semibold">{level}</span>
        </div>
        <p className="text-sm text-gray-600 mt-2">{analysis}</p>
      </div>
    </motion.div>
  );
};
