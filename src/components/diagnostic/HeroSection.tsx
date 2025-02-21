
import { motion } from 'framer-motion';

interface HeroSectionProps {
  onStart: () => void;
}

export const HeroSection = ({ onStart }: HeroSectionProps) => {
  return (
    <section className="hero-pattern relative py-20 px-4 overflow-hidden">
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-white/50 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
      
      <div className="container mx-auto max-w-4xl relative">
        <div className="flex flex-col items-center mb-8 px-4 space-y-2">
          <div className="w-[289px] md:w-[408px]">
            <img 
              src="/lovable-uploads/0719f9d2-282c-4729-ad17-b0baa338ef95.png" 
              alt="KITCO - Des coworkings bien pensés" 
              className="w-full h-auto"
            />
          </div>
        </div>

        <div className="text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Auto-diagnostic de votre espace de coworking
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Évaluez l'efficacité de votre espace selon la méthodologie AARRR
          </p>
          
          <button
            onClick={onStart}
            className="bg-white/95 px-8 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 rounded-md font-semibold shadow-[0_4px_12px_rgba(19,39,32,0.2)] hover:shadow-[0_8px_16px_rgba(19,39,32,0.3)]"
          >
            Commencer l'évaluation
          </button>
        </div>
      </div>
    </section>
  );
};
