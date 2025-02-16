
interface ProgressBarProps {
  progress: number;
}

export const ProgressBar = ({ progress }: ProgressBarProps) => (
  <div className="fixed top-0 left-0 w-full h-1 bg-gray-100 z-50">
    <div 
      className="h-full bg-primary transition-all duration-500 ease-out"
      style={{ width: `${progress}%` }}
    />
  </div>
);
