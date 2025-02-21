
import { motion } from 'framer-motion';
import { CTACard } from '../../results/CTACard';

interface AuditHeaderProps {
  globalScore: number;
}

export const AuditHeader = ({ globalScore }: AuditHeaderProps) => {
  return (
    <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg p-6 border border-primary/20 shadow-lg h-full">
      <CTACard globalScore={globalScore} />
    </div>
  );
};
