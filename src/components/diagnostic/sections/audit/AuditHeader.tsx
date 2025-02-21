
import { motion } from 'framer-motion';

interface AuditHeaderProps {
  globalScore: number;
}

export const AuditHeader = ({ globalScore }: AuditHeaderProps) => {
  return (
    <div className="bg-[#EEEFEE] rounded-lg p-6 border border-primary/20 shadow-lg h-full">
      <motion.h3 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold mb-4 text-primary"
      >
        Augmentez le taux de remplissage de votre espace de coworking
      </motion.h3>
    </div>
  );
};
