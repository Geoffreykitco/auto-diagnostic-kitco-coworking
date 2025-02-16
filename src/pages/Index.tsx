
import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { motion } from 'framer-motion';

const Index = () => {
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const handleStart = () => {
    toast({
      title: "Bienvenue dans l'auto-diagnostic!",
      description: "Commençons l'évaluation de votre espace de coworking.",
    });
    setProgress(20);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-100">
        <div 
          className="h-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Hero Section */}
      <section className="hero-pattern py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Auto-diagnostic de votre espace de coworking
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Évaluez l'efficacité de votre espace selon la méthodologie AARRR
            </p>
            <button
              onClick={handleStart}
              className="px-8 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 rounded-md font-medium"
            >
              Commencer l'évaluation
            </button>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
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
    </div>
  );
};

export default Index;
