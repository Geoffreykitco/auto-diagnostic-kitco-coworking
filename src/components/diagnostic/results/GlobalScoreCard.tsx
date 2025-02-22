
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

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

  const data = [
    { subject: 'Acquisition', A: score, fullMark: 100 },
    { subject: 'Activation', A: score, fullMark: 100 },
    { subject: 'Rétention', A: score, fullMark: 100 },
    { subject: 'Revenus', A: score, fullMark: 100 },
    { subject: 'Recommandation', A: score, fullMark: 100 },
  ];

  return <motion.div 
    initial={{
      opacity: 0,
      y: 20
    }} 
    animate={{
      opacity: 1,
      y: 0
    }} 
    transition={{
      duration: 0.5
    }} 
    className="bg-white rounded-lg p-8 border border-gray-200 shadow-lg"
  >
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

      <div className="h-[300px] w-full mt-6">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid stroke="#e5e7eb" />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fill: '#6B7280', fontSize: 12 }}
            />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar
              name="Score"
              dataKey="A"
              stroke={score >= 80 ? "#16A34A" : score >= 50 ? "#CA8A04" : "#DC2626"}
              fill={score >= 80 ? "#16A34A" : score >= 50 ? "#CA8A04" : "#DC2626"}
              fillOpacity={0.2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
        <div className="text-sm">
          Niveau : <span className={`font-medium ${getLevelColor(score)}`}>
            {score >= 80 ? "Avancé" : score >= 50 ? "Intermédiaire" : "Débutant"}
          </span>
        </div>
        <p className="text-gray-600 text-left">{getGlobalMessage(score)}</p>
      </div>
    </div>
  </motion.div>;
};
