
import { getScoreColor, getNiveau } from "../utils/scoring";

interface ScoreCardProps {
  title: string;
  score: number;
  message: string;
  isGlobal?: boolean;
}

export const ScoreCard = ({ title, score, message, isGlobal = false }: ScoreCardProps) => (
  <div className={`bg-white rounded-lg ${isGlobal ? 'p-8' : 'p-6'} shadow border border-gray-200`}>
    <h3 className={`${isGlobal ? 'text-2xl' : 'text-xl'} font-bold mb-4`}>{title}</h3>
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600">Score</span>
        <span className="text-red-600 font-semibold text-lg">{score}%</span>
      </div>
      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
        <div 
          className={`h-full ${getScoreColor(score)}`}
          style={{ width: `${score}%`, transition: 'width 0.5s ease-out' }}
        />
      </div>
      <div className="space-y-2">
        <div className="flex gap-2 items-center">
          <span className="text-sm text-gray-600">Niveau :</span>
          <span className="text-red-600 font-medium">{getNiveau(score)}</span>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed">{message}</p>
      </div>
    </div>
  </div>
);
