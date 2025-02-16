
import { motion } from 'framer-motion';
export const HowItWorks = () => <main className="container mx-auto max-w-4xl px-4 py-12">
    <div className="glass-morphism rounded-lg p-8">
      <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      delay: 0.3
    }} className="space-y-6">
        <h2 className="text-2xl font-semibold text-primary mb-8">
          Comment ça marche?
        </h2>
        <div className="relative">
          {/* Ligne horizontale de la timeline */}
          <div className="absolute left-0 right-0 top-8 h-0.5 bg-primary/20"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{
            title: "Répondez aux questions",
            description: "Pour comprendre en détail votre contexte business"
          }, {
            title: "Obtenez votre score",
            description: "Recevez un diagnostique de performance de votre coworking."
          }, {
            title: "Plan d'action",
            description: "Des recommandations personnalisées pour progresser"
          }].map((step, index) => <motion.div key={index} initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: index * 0.2
          }} className="relative pt-12">
                {/* Point de la timeline */}
                <div className="absolute left-1/2 top-0 w-2.5 h-2.5 rounded-full bg-primary transform -translate-x-1/2">
                  <div className="absolute w-5 h-5 rounded-full bg-primary/20 -m-1.25"></div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <span className="text-sm font-medium text-primary/60 mb-1 block">
                    Étape {index + 1}
                  </span>
                  <h3 className="font-semibold mb-2 text-base">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              </motion.div>)}
          </div>
        </div>
      </motion.div>
    </div>
  </main>;
