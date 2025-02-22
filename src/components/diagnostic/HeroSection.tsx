
import { motion } from 'framer-motion';
interface HeroSectionProps {
  onStart: () => void;
}
export const HeroSection = ({
  onStart
}: HeroSectionProps) => {
  return <section className="hero-pattern relative min-h-[80vh] flex items-center justify-center py-16 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-transparent" />
      
      <div className="container mx-auto max-w-4xl relative">
        <div className="flex flex-col items-center space-y-12">
          <div className="w-[250px] md:w-[320px]">
            <img 
              src="/lovable-uploads/0719f9d2-282c-4729-ad17-b0baa338ef95.png" 
              alt="KITCO - Des coworkings bien pensés" 
              className="w-full h-auto"
            />
          </div>

          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-8">
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
    </section>;
};
