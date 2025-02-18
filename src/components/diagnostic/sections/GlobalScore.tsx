
import { motion } from 'framer-motion';

interface GlobalScoreProps {
  score: number;
  level: string;
  analysis: string;
}

export const GlobalScore = ({ score, level, analysis }: GlobalScoreProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
    >
      <h2 className="text-2xl font-bold text-primary mb-4">Score Global : {Math.round(score)}%</h2>
      <div className="text-lg text-gray-700 mb-2">Niveau : <span className="font-semibold">{level}</span></div>
      <p className="text-gray-600">{analysis}</p>
    </motion.div>
  );
};
