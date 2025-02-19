
import { motion } from 'framer-motion';
import { IMAGES } from '@/utils/constants';
import { useState } from 'react';

interface HeroSectionProps {
  onStart: () => void;
}

export const HeroSection = ({ onStart }: HeroSectionProps) => {
  const [imgError, setImgError] = useState(false);

  return (
    <section className="hero-pattern relative py-20 px-4 overflow-hidden">
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-white/50 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
      
      <div className="container mx-auto max-w-4xl relative">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8 px-4"
        >
          <div className="text-center">
            {!imgError ? (
              <img 
                src={IMAGES.LOGO.HEADER}
                alt="KITCO" 
                className="max-h-[136px] w-auto mx-auto"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="bg-primary text-white p-6 rounded-lg inline-block">
                <span className="text-2xl font-bold">KITCO</span>
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center relative z-10"
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-primary mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Auto-diagnostic de votre espace de coworking
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-gray-600 mb-8"
          >
            Évaluez l'efficacité de votre espace selon la méthodologie AARRR
          </motion.p>
          
          <motion.button
            onClick={onStart}
            className="bg-white/95 px-8 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 rounded-md font-semibold shadow-[0_4px_12px_rgba(19,39,32,0.2)] hover:shadow-[0_8px_16px_rgba(19,39,32,0.3)]"
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
};
