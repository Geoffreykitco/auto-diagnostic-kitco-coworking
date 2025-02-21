
import { motion } from 'framer-motion';

export const AuditHeader = () => {
  return (
    <div className="text-left space-y-4">
      <h3 className="text-2xl font-bold">
        Augmentez le taux de remplissage de votre espace de coworking
      </h3>
      <div className="space-y-3">
        <p className="text-gray-600 text-sm md:text-base">
          Vous avez maintenant une vision claire de la performance de votre espace de coworking. 
          Mais comment transformer ces signaux en un plan d'action concret ?
        </p>
      </div>
    </div>
  );
};
