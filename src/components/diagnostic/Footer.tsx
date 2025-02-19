
import { motion } from 'framer-motion';
import { IMAGES } from '@/utils/constants';
import { useState } from 'react';

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
          className="text-center"
        >
          {!imgError ? (
            <img 
              src={IMAGES.LOGO.FOOTER}
              alt="KITCO - Des coworkings bien pensés" 
              className="max-h-24 w-auto mx-auto"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="bg-gray-100 p-4 rounded-lg inline-block">
              <span className="text-xl font-semibold text-gray-700">KITCO - Des coworkings bien pensés</span>
            </div>
          )}
        </motion.div>
      </div>
    </motion.footer>
  );
};
