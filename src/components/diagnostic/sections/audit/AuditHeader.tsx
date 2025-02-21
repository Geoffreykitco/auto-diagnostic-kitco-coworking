
import { motion } from 'framer-motion';

export const AuditHeader = () => {
  return (
    <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg p-6 border border-primary/20 shadow-lg h-full">
      <div className="space-y-6">
        <div>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold mb-2 text-left text-primary"
          >
            Augmentez le taux de remplissage de votre espace de coworking
          </motion.h3>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-primary/10">
          <p className="text-gray-600 text-left leading-relaxed text-base">
            Vous avez maintenant une vision claire de la performance de votre espace de coworking. 
            Mais comment transformer ces signaux en un plan d'action concret ?
          </p>
        </div>
      </div>
    </div>
  );
};
