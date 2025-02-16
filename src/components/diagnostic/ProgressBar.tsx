
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

interface ProgressBarProps {
  progress: number;
}

export const ProgressBar = ({ progress }: ProgressBarProps) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => setValue(progress), 100);
    return () => clearTimeout(timeout);
  }, [progress]);

  return (
    <div className="fixed top-0 left-0 w-full z-50 px-4 py-2 bg-white/80 backdrop-blur-sm border-b">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4">
          <Progress 
            value={value} 
            className="h-2 transition-all" 
          />
          <span className="text-sm font-medium text-primary w-14">
            {Math.round(value)}%
          </span>
        </div>
        <div className="mt-1 text-xs text-gray-500">
          Progression du diagnostic
        </div>
      </div>
    </div>
  );
};
