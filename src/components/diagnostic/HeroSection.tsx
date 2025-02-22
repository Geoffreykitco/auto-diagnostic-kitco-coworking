
import { motion } from 'framer-motion';
import { useIsMobile } from "@/hooks/use-mobile";

interface HeroSectionProps {
  onStart: () => void;
}

export const HeroSection = ({
  onStart
}: HeroSectionProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <section className="hero-pattern relative min-h-[80vh] flex items-center justify-center py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-transparent" />
        
        <div className="container mx-auto max-w-4xl relative">
          <div className="flex flex-col items-center space-y-12">
            <div className="w-[250px]">
              <img 
                src="/lovable-uploads/0719f9d2-282c-4729-ad17-b0baa338ef95.png" 
                alt="KITCO - Des coworkings bien pensés" 
                className="w-full h-auto"
              />
            </div>

            <div className="text-center max-w-2xl mx-auto">
              <h1 className="text-4xl font-bold text-primary mb-8">
                Auto-diagnostic de votre espace de coworking
              </h1>
              
              <button 
                onClick={onStart} 
                className="bg-white/95 px-8 py-4 border-2 border-primary text-primary rounded-md font-semibold shadow-[0_4px_12px_rgba(19,39,32,0.2)]"
              >
                Commencer l'évaluation
              </button>

              <p className="text-lg text-gray-600 mt-6">
                Évaluez l'efficacité de votre espace selon la méthodologie AARRR
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="hero-pattern relative min-h-[80vh] flex items-center justify-center py-16 px-4 overflow-hidden">
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-white/50 to-transparent" 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
      
      <div className="container mx-auto max-w-4xl relative">
        <motion.div 
          className="flex flex-col items-center space-y-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-[320px] transition-all duration-300">
            <img 
              src="/lovable-uploads/0719f9d2-282c-4729-ad17-b0baa338ef95.png" 
              alt="KITCO - Des coworkings bien pensés" 
              className="w-full h-auto"
            />
          </div>

          <div className="text-center max-w-2xl mx-auto">
            <motion.h1 
              className="text-5xl font-bold text-primary mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Auto-diagnostic de votre espace de coworking
            </motion.h1>
            
            <button 
              onClick={onStart} 
              className="bg-white/95 px-8 py-4 border-2 border-primary text-primary rounded-md font-semibold shadow-[0_4px_12px_rgba(19,39,32,0.2)] transition-all duration-300 hover:transform hover:scale-105 hover:shadow-[0_8px_16px_rgba(19,39,32,0.3)] hover:bg-primary hover:text-white"
            >
              Commencer l'évaluation
            </button>

            <motion.p 
              className="text-lg text-gray-600 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Évaluez l'efficacité de votre espace selon la méthodologie AARRR
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
