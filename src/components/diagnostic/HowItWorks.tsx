
import { motion } from 'framer-motion';

export const HowItWorks = () => (
  <main className="container mx-auto max-w-4xl px-4 py-12">
    <div className="glass-morphism rounded-lg p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="space-y-6"
      >
        <h2 className="text-2xl font-semibold text-primary mb-4">
          Comment ça marche?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Répondez aux questions",
              description: "Une série de questions pour évaluer votre espace"
            },
            {
              title: "Obtenez votre score",
              description: "Recevez une évaluation détaillée de votre performance"
            },
            {
              title: "Plan d'action",
              description: "Des recommandations personnalisées pour progresser"
            }
          ].map((step, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </main>
);
