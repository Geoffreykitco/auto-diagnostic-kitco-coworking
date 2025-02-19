
import { motion } from 'framer-motion';
import { IMAGES } from '@/utils/constants';

export const Footer = () => {
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
          />
        </motion.div>
      </div>
    </motion.footer>
  );
};
