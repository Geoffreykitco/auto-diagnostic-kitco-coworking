
import { getScoreColor, getNiveau } from "../utils/scoring";

interface ScoreCardProps {
  title: string;
  score: number;
  message: string;
}

export const ScoreCard = ({ title, score, message }: ScoreCardProps) => (
  <div className="bg-white rounded-lg p-6 shadow border border-gray-200">
    <h3 className="text-xl font-semibold mb-4">{title}</h3>
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600">Score</span>
        <span className="text-red-600 font-semibold text-lg">{score}%</span>
      </div>
      <div className="h-2 w-full bg-gray-100 rounded-full">
        <div 
          className={`h-full rounded-full ${getScoreColor(score)}`}
          style={{ width: `${score}%` }}
        />
      </div>
      <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
        <div className="flex gap-2 items-center">
          <span className="text-sm text-gray-600">Niveau :</span>
          <span className="text-red-600 font-medium">{getNiveau(score)}</span>
        </div>
        <p className="text-gray-600 text-sm">{message}</p>
      </div>
    </div>
  </div>
);
