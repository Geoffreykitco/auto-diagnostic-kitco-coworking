import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import { calculateSectionScore, getMaxSectionScore } from "@/utils/scoreCalculator";
import { sections } from "@/data/sections";

interface GlobalScoreCardProps {
  score: number;
  getLevelColor: (score: number) => string;
  getProgressColor: (score: number) => string;
  getGlobalMessage: (score: number) => string;
  answers: Record<string, Record<number, {
    value: any;
    score: number;
  }>>;
}

export const GlobalScoreCard = ({
  score,
  getLevelColor,
  getProgressColor,
  getGlobalMessage,
  answers
}: GlobalScoreCardProps) => {
  const getSectionScore = (sectionKey: string) => {
    if (!answers[sectionKey]) return 0;
    const section = sections[sectionKey];
    if (!section) return 0;
    const maxScore = getMaxSectionScore(section.questions);
    const sectionScore = calculateSectionScore(answers[sectionKey], maxScore, sectionKey);
    return sectionScore.score;
  };

  const data = [{
    subject: 'Acquisition',
    A: getSectionScore('acquisition'),
    fullMark: 100
  }, {
    subject: 'Activation',
    A: getSectionScore('activation'),
    fullMark: 100
  }, {
    subject: 'Rétention',
    A: getSectionScore('retention'),
    fullMark: 100
  }, {
    subject: 'Revenus',
    A: getSectionScore('revenus'),
    fullMark: 100
  }, {
    subject: 'Recommandation',
    A: getSectionScore('recommandation'),
    fullMark: 100
  }];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }} 
      className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200 shadow-lg w-full overflow-hidden"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2 sm:gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-left text-black">Score Global</h2>
            </div>
            <span className={`ml-auto text-2xl sm:text-3xl font-bold ${getLevelColor(score)}`}>
              {score}%
            </span>
          </div>

          <Progress value={score} className="h-2 sm:h-3" indicatorClassName={getProgressColor(score)} />

          <div className="space-y-2 bg-gray-50 p-3 sm:p-4 rounded-lg">
            <div className="text-sm text-left">
              Niveau : <span className={`font-medium ${getLevelColor(score)}`}>
                {score >= 80 ? "Avancé" : score >= 50 ? "Intermédiaire" : "Débutant"}
              </span>
            </div>
            <div className="text-gray-600 text-left text-xs sm:text-sm whitespace-pre-line prose prose-sm">
              {getGlobalMessage(score)}
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <h3 className="text-base sm:text-lg font-semibold mb-2">Répartition des scores par partie (Graphique radar)</h3>
          <div className="flex-1 min-h-[300px] sm:min-h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
                <PolarGrid stroke="#e5e7eb" strokeWidth={0.5} />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={{
                    fill: '#374151',
                    fontSize: 11,
                    fontWeight: 500
                  }} 
                  stroke="#9CA3AF" 
                  tickLine={false} 
                  style={{
                    textAnchor: 'middle'
                  }} 
                  dy={6} 
                />
                <PolarRadiusAxis 
                  angle={30} 
                  domain={[0, 100]} 
                  tick={{
                    fill: '#6B7280',
                    fontSize: 10
                  }} 
                  stroke="#E5E7EB" 
                  tickCount={5} 
                />
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
        </div>
      </div>
    </motion.div>
  );
};
