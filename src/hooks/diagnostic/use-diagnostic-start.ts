
import { useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface UseDiagnosticStartProps {
  setProgress: (progress: number) => void;
  setStarted: (started: boolean) => void;
  toast: ReturnType<typeof useToast>['toast'];
}

export const useDiagnosticStart = ({ setProgress, setStarted, toast }: UseDiagnosticStartProps) => {
  const handleStart = useCallback(() => {
    toast({
      title: "Bienvenue dans l'auto-diagnostic 👋",
      description: "Commençons l'évaluation de votre espace de coworking.",
      duration: 4000,
    });
    setProgress(0);
    setStarted(true);
  }, [toast, setProgress, setStarted]);

  return {
    handleStart
  };
};
