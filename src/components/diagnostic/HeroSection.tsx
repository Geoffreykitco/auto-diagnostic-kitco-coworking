
import { motion } from 'framer-motion';

interface HeroSectionProps {
  onStart: () => void;
}

export const HeroSection = ({ onStart }: HeroSectionProps) => (
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
        <motion.button
          onClick={onStart}
          className="px-8 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 rounded-md font-medium"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 8
          }}
        >
          Commencer l'évaluation
        </motion.button>
      </motion.div>
    </div>
  </section>
);
