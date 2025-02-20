
import { motion } from 'framer-motion';
import { IMAGES } from '@/utils/constants';
import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

export const Footer = () => {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    console.log("Current footer image path:", IMAGES.LOGO.FOOTER);
  }, []);

  return (
    <motion.footer 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-auto py-8 px-4 bg-white/80"
    >
      <div className="container mx-auto max-w-4xl flex flex-col items-center justify-center pt-4">
        <motion.div 
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-[280px] md:w-[400px] h-[100px] md:h-[140px] relative"
        >
          {!imgError ? (
            <img 
              src={IMAGES.LOGO.FOOTER}
              alt="KITCO - Des coworkings bien pensés" 
              className="w-full h-full object-contain"
              loading="eager"
              onError={(e) => {
                console.error('Image loading error detailed:', {
                  src: (e.target as HTMLImageElement).src,
                  currentPath: IMAGES.LOGO.FOOTER,
                  timestamp: new Date().toISOString()
                });
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
        </motion.div>
      </div>
    </motion.footer>
  );
};
