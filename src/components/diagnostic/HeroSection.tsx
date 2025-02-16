
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
          className="relative px-8 py-3 bg-[#8B5CF6] text-white rounded-md font-medium overflow-hidden"
          whileHover={{ 
            scale: 1.05,
            backgroundColor: "#7c4deb",
          }}
          whileTap={{ scale: 0.98 }}
          transition={{
            duration: 0.2,
            ease: "easeInOut"
          }}
        >
          Commencer l'évaluation
        </motion.button>
      </motion.div>
    </div>
  </section>
);
