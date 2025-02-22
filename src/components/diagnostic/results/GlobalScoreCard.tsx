
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

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
  getGlobalMessage,
}: GlobalScoreCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-md p-6 relative"
    >
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0">
          <div className="relative inline-flex items-center justify-center">
            <svg className="w-32 h-32">
              <circle
                className="text-gray-200"
                strokeWidth="10"
                stroke="currentColor"
                fill="transparent"
                r="56"
                cx="64"
                cy="64"
              />
              <circle
                className={cn(getProgressColor(score))}
                strokeWidth="10"
                strokeDasharray={360}
                strokeDashoffset={360 - (360 * score) / 100}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="56"
                cx="64"
                cy="64"
                style={{
                  transformOrigin: "50% 50%",
                  transform: "rotate(-90deg)",
                  transition: "stroke-dashoffset 0.5s ease",
                }}
              />
            </svg>
            <span
              className={cn(
                "absolute text-2xl font-semibold",
                getLevelColor(score)
              )}
            >
              {score}%
            </span>
          </div>
        </div>

        <div className="flex-grow space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Score global de votre espace de coworking
          </h2>
          <div
            className="text-gray-600 whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: getGlobalMessage(score) }}
          />
        </div>
      </div>
    </motion.div>
  );
};
