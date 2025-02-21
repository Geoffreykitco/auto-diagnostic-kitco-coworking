
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
    <div className="w-full bg-white rounded-xl p-6 md:p-8 shadow-lg">
      <div className="text-center space-y-4 mb-8">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
          Passez à l'action !
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Transformez ces insights en résultats concrets. Commençons dès maintenant à optimiser la performance de votre espace.
        </p>
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
        className="mt-8 relative w-full"
      >
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
              <div className="flex md:flex-col items-start md:items-center gap-4 md:gap-2">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white border-2 border-primary shadow-md">
                  <span className="text-primary font-bold">
                    {(index + 1).toString().padStart(2, '0')}
                  </span>
                </div>
                <div className="md:text-center">
                  <h4 className="font-semibold text-gray-900 mb-1">{step.title}</h4>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="mt-12 text-center">
        <Button
          onClick={() => navigate('/')}
          className="bg-primary hover:bg-primary-hover text-white font-semibold px-8 py-3 rounded-lg shadow-md transition-all duration-200"
        >
          Commencer maintenant
        </Button>
      </div>
    </div>
  );
};
