
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
  const data = [{
    subject: 'Acquisition',
    A: score,
    fullMark: 100
  }, {
    subject: 'Activation',
    A: score,
    fullMark: 100
  }, {
    subject: 'Rétention',
    A: score,
    fullMark: 100
  }, {
    subject: 'Revenus',
    A: score,
    fullMark: 100
  }, {
    subject: 'Recommandation',
    A: score,
    fullMark: 100
  }];
  
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.5
  }} className="bg-white rounded-lg p-6 border border-gray-200 shadow-lg">
    <div className="grid md:grid-cols-2 gap-6">
      {/* Score Global - Colonne de gauche */}
      <div className="space-y-4">
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
          <div className="text-gray-600 text-left text-sm whitespace-pre-line">
            {getGlobalMessage(score)}
          </div>
        </div>
      </div>

      {/* Graphique Radar - Colonne de droite */}
      <div className="flex flex-col">
        <h3 className="text-lg font-semibold mb-2">Répartition des scores par dimension</h3>
        <div className="flex-1 min-h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
              <PolarGrid stroke="#e5e7eb" strokeWidth={0.5} gridType="circle" />
              <PolarAngleAxis dataKey="subject" tick={{
                fill: '#374151',
                fontSize: 13,
                fontWeight: 500
              }} stroke="#9CA3AF" tickLine={false} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{
                fill: '#6B7280',
                fontSize: 11
              }} stroke="#E5E7EB" tickCount={10} />
              <Radar name="Score" dataKey="A" stroke={score >= 80 ? "#16A34A" : score >= 50 ? "#CA8A04" : "#DC2626"} fill={score >= 80 ? "#16A34A" : score >= 50 ? "#CA8A04" : "#DC2626"} fillOpacity={0.2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  </motion.div>;
};
