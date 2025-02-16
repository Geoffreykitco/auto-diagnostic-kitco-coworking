
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
    <div className="fixed top-0 left-0 w-full z-50 bg-white border-b">
      <div className="max-w-3xl mx-auto px-4 py-2">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-sm text-gray-600">Progression du diagnostic</span>
          <span className="text-sm text-primary">{Math.round(value)}%</span>
        </div>
        <Progress 
          value={value} 
          className="h-1 transition-all" 
        />
      </div>
    </div>
  );
};
