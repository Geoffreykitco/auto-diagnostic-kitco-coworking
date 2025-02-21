
import { motion } from 'framer-motion';

export const AuditHeader = () => {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-lg">
      <div className="text-center space-y-4">
        <h2 className="text-xl md:text-2xl font-semibold">
          Augmentez le taux de remplissage de votre espace de coworking
        </h2>
        <div className="space-y-3">
          <p className="text-gray-600 text-sm md:text-base">
            Vous avez maintenant une vision claire de la performance de votre espace de coworking. 
            Mais comment transformer ces signaux en un plan d'action concret ?
          </p>
          <p className="text-gray-600 text-sm md:text-base">
            Ne laissez pas ces opportunités inexplorées. Passez à l'action dès maintenant !
          </p>
        </div>
      </div>
    </div>
  );
};
