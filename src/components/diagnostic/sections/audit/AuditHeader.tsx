
import { motion } from 'framer-motion';

export const AuditHeader = () => {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-lg h-full">
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-bold mb-2 text-left">
            Augmentez le taux de remplissage de votre espace de coworking
          </h3>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-gray-600 text-left leading-relaxed text-base">
            Vous avez maintenant une vision claire de la performance de votre espace de coworking. 
            Mais comment transformer ces signaux en un plan d'action concret ?
          </p>
        </div>
      </div>
    </div>
  );
};
