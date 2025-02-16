
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

  const steps = [
    { label: "Informations", threshold: 14 },
    { label: "Acquisition", threshold: 28 },
    { label: "Activation", threshold: 42 },
    { label: "Rétention", threshold: 56 },
    { label: "Revenue", threshold: 70 },
    { label: "Recommandation", threshold: 84 },
    { label: "Résultats", threshold: 100 }
  ];

  const getCurrentStep = () => {
    return steps.find(step => value <= step.threshold)?.label || "Résultats";
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 px-4 py-2 bg-white/80 backdrop-blur-sm border-b">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <Progress 
              value={value} 
              className="h-2 transition-all" 
            />
            <div className="flex justify-between mt-1">
              {steps.map((step, index) => (
                <div 
                  key={step.label}
                  className={`text-[10px] ${value >= step.threshold ? 'text-primary font-medium' : 'text-gray-400'}`}
                  style={{ 
                    width: index === 0 || index === steps.length - 1 ? '20px' : 'auto',
                    textAlign: index === 0 ? 'left' : index === steps.length - 1 ? 'right' : 'center'
                  }}
                >
                  {step.label.substring(0, 3)}
                </div>
              ))}
            </div>
          </div>
          <span className="text-sm font-medium text-primary w-14">
            {Math.round(value)}%
          </span>
        </div>
        <div className="mt-1 text-xs text-gray-500">
          Étape actuelle : {getCurrentStep()}
        </div>
      </div>
    </div>
  );
};
