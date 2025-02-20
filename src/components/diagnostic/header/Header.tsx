
import { IMAGES } from '@/utils/constants';
import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';

export const Header = () => {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center mb-8 px-4"
    >
      <div className="w-[280px] md:w-[400px] h-[100px] md:h-[140px] relative">
        {!imgError ? (
          <img 
            src={IMAGES.LOGO.HEADER}
            alt="KITCO - Des coworkings bien pensés" 
            className="w-full h-full object-contain"
            loading="eager"
            onError={() => {
              console.error('Image loading error:', IMAGES.LOGO.HEADER);
              setImgError(true);
              toast({
                title: "Note",
                description: "Un problème est survenu lors du chargement du logo",
                variant: "default"
              });
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-white/90 rounded-lg border-2 border-primary/20">
            <span className="text-xl md:text-2xl font-bold text-primary">KITCO</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};
