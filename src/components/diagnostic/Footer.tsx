
import { motion } from 'framer-motion';
import { IMAGES } from '@/utils/constants';
import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';

export const Footer = () => {
  const [imgError, setImgError] = useState(false);

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
          className="h-24 mb-4 relative"
        >
          <img 
            src={IMAGES.LOGO.FOOTER}
            alt="KITCO - Des coworkings bien pensés" 
            className="h-full w-auto object-contain"
            loading="eager"
            onError={() => {
              console.error('Image loading error:', IMAGES.LOGO.FOOTER);
              toast({
                title: "Erreur de chargement",
                description: "L'image du footer n'a pas pu être chargée",
                variant: "destructive"
              });
              setImgError(true);
            }}
            style={{ display: imgError ? 'none' : 'block' }}
          />
          {imgError && (
            <div className="h-full flex items-center justify-center bg-gray-100 rounded-md px-4">
              <span className="text-gray-500">KITCO - Des coworkings bien pensés</span>
            </div>
          )}
        </motion.div>
      </div>
    </motion.footer>
  );
};
