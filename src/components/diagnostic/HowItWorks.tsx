
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
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
              {[
                {
                  title: "Répondez aux questions",
                  description: "Pour BIEN comprendre le contexte business de votre coworking."
                },
                {
                  title: "Obtenez votre score",
                  description: "Recevez un diagnostic de performance de votre coworking."
                },
                {
                  title: "Plan d'action",
                  description: "Des recommandations personnalisées pour progresser."
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 + 0.5 }}
                  className="relative md:pt-12"
                >
                  {/* Carré avec numéro */}
                  <div className={`absolute ${isMobile ? 'left-7 -translate-x-1/2' : 'left-1/2 -translate-x-1/2 top-0'}`}>
                    <div className="flex items-center justify-center w-[40px] h-[40px] bg-primary/20 rounded-lg shadow-md">
                      <span className="text-primary text-xl font-bold">
                        {index + 1}
                      </span>
                    </div>
                  </div>
                  
                  {/* Contenu de l'étape */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`glass-morphism p-4 md:p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ${isMobile ? 'ml-16' : 'mt-8'}`}
                  >
                    <span className="text-xs md:text-sm font-medium text-primary/60 mb-1 block">
                      Étape {index + 1}
                    </span>
                    <h3 className="font-semibold mb-1 md:mb-2 text-sm md:text-base">{step.title}</h3>
                    <p className="text-gray-600 text-xs md:text-sm">{step.description}</p>
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
