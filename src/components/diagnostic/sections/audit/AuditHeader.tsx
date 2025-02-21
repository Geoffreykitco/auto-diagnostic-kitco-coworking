
import { motion } from 'framer-motion';
import { CTACard } from '../../results/CTACard';

interface AuditHeaderProps {
  globalScore: number;
}

export const AuditHeader = ({ globalScore }: AuditHeaderProps) => {
  return (
    <div className="text-center space-y-4">
      <h2 className="text-xl md:text-2xl font-semibold">
        Augmentez le taux de remplissage de votre espace de coworking
      </h2>
      <div className="space-y-3">
        <p className="text-gray-600 text-sm md:text-base">
          Vous avez maintenant une vision claire de la performance de votre espace de coworking. 
          Mais comment transformer ces signaux en un plan d'action concret ?
        </p>
        <CTACard globalScore={globalScore} />
      </div>
    </div>
  );
};
