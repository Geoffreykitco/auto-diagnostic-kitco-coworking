
import { motion } from 'framer-motion';
import { Separator } from "@/components/ui/separator";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-primary/80 text-white backdrop-blur-sm rounded-t-xl"
    >
      <div className="container mx-auto py-8 px-[20px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo Section */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className="text-2xl md:text-3xl font-bold"
            >
              KITCO
            </motion.div>
            <p className="text-white/80 text-sm text-center md:text-left">
              Des coworkings bien pensés pour votre entreprise
            </p>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col items-center md:items-start space-y-2">
            <h3 className="text-white font-semibold text-lg mb-1">Contact</h3>
            <div className="space-y-1 text-center md:text-left">
              <p className="text-white/80">geoffrey@kitco-coworking.fr</p>
              <p className="text-white/80">+33 7 89 87 74 79</p>
            </div>
          </div>

          {/* Address Section */}
          <div className="flex flex-col items-center md:items-start space-y-2">
            <h3 className="text-white font-semibold text-lg mb-1">Adresse</h3>
            <div className="space-y-1 text-center md:text-left">
              <p className="text-white/80">123 Avenue des Champs-Élysées</p>
              <p className="text-white/80">75008 Paris, France</p>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-white/20" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-white/80">
          <p>&copy; {currentYear} KITCO. Tous droits réservés.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            
          </div>
        </div>
      </div>
    </motion.footer>
  );
};
