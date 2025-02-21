
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const CTACard = () => {
  const navigate = useNavigate();
  
  const steps = [
    {
      title: "Diagnostic & Insights",
      description: "J'analyse mes performances"
    },
    {
      title: "Planification",
      description: "Je structure mon plan d'action"
    },
    {
      title: "Mise en œuvre",
      description: "J'active les leviers de croissance"
    },
    {
      title: "Optimisation continue",
      description: "Je pérennise et scale mon coworking"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="w-full bg-white rounded-xl p-6 md:p-8 shadow-lg">
        <div className="text-center space-y-4">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
            Passez à l'action !
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Transformez ces insights en résultats concrets. Commençons dès maintenant à optimiser la performance de votre espace.
          </p>
        </div>

        <div className="mt-8 text-center">
          <Button
            onClick={() => navigate('/')}
            className="bg-primary hover:bg-primary-hover text-white font-semibold px-8 py-3 rounded-lg shadow-md transition-all duration-200"
          >
            Commencer maintenant
          </Button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 0.5,
          delay: 0.2
        }}
        className="w-full bg-white/50 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-lg"
      >
        <h4 className="text-xl md:text-2xl font-semibold text-gray-900 text-center mb-8">
          Notre méthodologie
        </h4>
        
        <div className="relative">
          <div className="absolute top-[45%] left-0 right-0 h-0.5 bg-gradient-to-r from-primary/5 via-primary to-primary/5 hidden md:block"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 1) }}
                className="relative"
              >
                <div className="flex md:flex-col items-start md:items-center gap-4 md:gap-4">
                  <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-primary text-white shadow-lg transform transition-transform hover:scale-105">
                    <span className="font-bold text-lg">
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                  </div>
                  <div className="md:text-center space-y-2">
                    <h5 className="font-semibold text-primary">{step.title}</h5>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
