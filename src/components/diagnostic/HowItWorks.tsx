
import { motion } from 'framer-motion';
import { Target, Award, Lightbulb } from 'lucide-react';

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
          En 3 étapes
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: <Target className="w-6 h-6 text-primary" />,
              title: "Répondez",
              description: "5 minutes pour évaluer votre espace"
            },
            {
              icon: <Award className="w-6 h-6 text-primary" />,
              title: "Découvrez",
              description: "Votre score de performance"
            },
            {
              icon: <Lightbulb className="w-6 h-6 text-primary" />,
              title: "Progressez",
              description: "Actions concrètes à mettre en place"
            }
          ].map((step, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center text-center">
              {step.icon}
              <h3 className="font-semibold text-lg mt-3 mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </main>
);
