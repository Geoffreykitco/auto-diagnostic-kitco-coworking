
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
    <div className="fixed top-0 left-0 w-full z-50 px-4 py-3 bg-white border-b">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">Progression du diagnostic</span>
          <span className="text-sm font-medium text-primary">{Math.round(value)}%</span>
        </div>
        <Progress 
          value={value} 
          className="h-1.5 transition-all" 
        />
      </div>
    </div>
  );
};
