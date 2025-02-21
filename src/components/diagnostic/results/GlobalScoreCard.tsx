import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
interface GlobalScoreCardProps {
  score: number;
  getLevelColor: (score: number) => string;
  getProgressColor: (score: number) => string;
  getGlobalMessage: (score: number) => string;
}
export const GlobalScoreCard = ({
  score,
  getLevelColor,
  getProgressColor,
  getGlobalMessage
}: GlobalScoreCardProps) => {
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.5
  }} className="bg-white rounded-lg p-4 border border-gray-200 shadow-lg">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-full">
            <h2 className="font-bold text-left text-2xl">Score Global</h2>
            
          </div>
          <span className={`shrink-0 text-3xl font-bold ${getLevelColor(score)}`}>
            {score}%
          </span>
        </div>

        <Progress value={score} className="h-3" indicatorClassName={getProgressColor(score)} />

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm">Niveau :</span>
            <span className={`font-medium ${getLevelColor(score)}`}>
              {score >= 80 ? "Avancé" : score >= 50 ? "Intermédiaire" : "Débutant"}
            </span>
          </div>
          <p className="text-gray-600 text-left font-thin text-xl">{getGlobalMessage(score)}</p>
        </div>
      </div>
    </motion.div>;
};