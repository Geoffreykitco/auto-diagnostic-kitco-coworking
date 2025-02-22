import { motion } from "framer-motion";
import { Award } from "lucide-react";
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
  }} className="bg-white rounded-lg p-8 border border-gray-200 shadow-lg">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          
          <div>
            <h2 className="text-2xl font-bold text-left">Score Global</h2>
            <p className="text-gray-600">Progression du diagnostic de votre espace</p>
          </div>
          <span className={`ml-auto text-3xl font-bold ${getLevelColor(score)}`}>
            {score}%
          </span>
        </div>

        <Progress value={score} className="h-3" indicatorClassName={getProgressColor(score)} />

        <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
          <div className="text-sm">
            Niveau : <span className={`font-medium ${getLevelColor(score)}`}>
              {score >= 80 ? "Avancé" : score >= 50 ? "Intermédiaire" : "Débutant"}
            </span>
          </div>
          <p className="text-gray-600">{getGlobalMessage(score)}</p>
        </div>
      </div>
    </motion.div>;
};