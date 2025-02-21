
import { motion } from 'framer-motion';
import { useIsMobile } from "@/hooks/use-mobile";

export const HowItWorks = () => {
  const isMobile = useIsMobile();
  
  return (
    <main className="container mx-auto max-w-4xl px-4 md:py-12 py-[80px]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl md:text-[2.5rem] leading-tight text-gray-900">
          Les amateurs attendent les coworkers, <span className="story-link text-primary">les experts les attirent et les fidélisent</span>.
        </h2>
      </motion.div>

      <div className="glass-morphism rounded-lg p-6 md:p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-4 md:space-y-6"
        >
          <h2 className="text-xl md:text-2xl font-semibold text-primary mb-4 md:mb-8">
            Comment ça marche?
          </h2>
          
          <div className="relative">
            {/* Ligne horizontale de la timeline visible uniquement sur desktop */}
            <div className="hidden md:block absolute left-0 right-0 top-16 h-0.5 bg-gradient-to-r from-primary/5 via-primary/20 to-primary/5"></div>
            
            {/* Ligne verticale de la timeline visible uniquement sur mobile */}
            <div className="md:hidden absolute left-[28px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/5 via-primary/20 to-primary/5"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
              {[
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
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 + 0.5 }}
                  className="relative md:pt-12"
                >
                  {/* Étape numérotée */}
                  <div className={`absolute ${isMobile ? 'left-7 -translate-x-1/2' : 'left-1/2 -translate-x-1/2 top-0'}`}>
                    <div className="relative">
                      <div className="flex items-center justify-center w-[48px] h-[48px] bg-primary text-white rounded-xl shadow-lg">
                        <span className="text-lg font-bold">
                          {(index + 1).toString().padStart(2, '0')}
                        </span>
                      </div>
                      {/* Ligne de connexion entre les étapes (visible uniquement en desktop) */}
                      {index < 3 && (
                        <div className="hidden md:block absolute top-1/2 left-full w-full h-[2px] bg-primary/20"></div>
                      )}
                    </div>
                  </div>
                  
                  {/* Contenu de l'étape */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`glass-morphism p-4 md:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${isMobile ? 'ml-16' : 'mt-8'}`}
                  >
                    <h3 className="font-semibold mb-2 text-sm md:text-base text-gray-900">{step.title}</h3>
                    <p className="text-gray-600 text-xs md:text-sm italic">{step.description}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
};
