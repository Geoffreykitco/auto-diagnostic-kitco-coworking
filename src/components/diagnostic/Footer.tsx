import { motion } from 'framer-motion';
import { IMAGES } from '@/utils/constants';
import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { Separator } from "@/components/ui/separator";
export const Footer = () => {
  const [imgError, setImgError] = useState(false);
  useEffect(() => {
    console.log("Current footer image path:", IMAGES.LOGO.FOOTER);
  }, []);
  const currentYear = new Date().getFullYear();
  return <motion.footer initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.5
  }} className="w-full bg-[#1A1F2C] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo Section */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <motion.div initial={{
            scale: 0.95
          }} animate={{
            scale: 1
          }} transition={{
            duration: 0.3
          }} className="w-[200px] h-[70px] relative">
              {!imgError ? <img src={IMAGES.LOGO.FOOTER} alt="KITCO - Des coworkings bien pensés" className="w-full h-full object-contain brightness-0 invert" loading="eager" onError={e => {
              console.error('Image loading error:', {
                src: (e.target as HTMLImageElement).src,
                timestamp: new Date().toISOString()
              });
              setImgError(true);
              toast({
                title: "Note",
                description: "Un problème est survenu lors du chargement du logo",
                variant: "default"
              });
            }} /> : <div className="w-full h-full flex items-center justify-center">
                  <span className="text-xl md:text-2xl font-bold text-white">KITCO</span>
                </div>}
            </motion.div>
            <p className="text-gray-400 text-sm text-center md:text-left">
              Des coworkings bien pensés pour votre entreprise
            </p>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <h3 className="text-white font-semibold text-lg">Contact</h3>
            <div className="space-y-2 text-center md:text-left">
              <p className="text-gray-400">geoffrey@kitco-coworking.fr</p>
              <p className="text-gray-400">+33 7 89 87 74 79</p>
            </div>
          </div>

          {/* Address Section */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <h3 className="text-white font-semibold text-lg">Adresse</h3>
            <div className="space-y-2 text-center md:text-left">
              <p className="text-gray-400">123 Avenue des Champs-Élysées</p>
              <p className="text-gray-400">75008 Paris, France</p>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-700" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
          <p>&copy; {currentYear} KITCO. Tous droits réservés.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors duration-200">
              Mentions légales
            </a>
            <a href="#" className="hover:text-white transition-colors duration-200">
              Politique de confidentialité
            </a>
            <a href="#" className="hover:text-white transition-colors duration-200">
              CGU
            </a>
          </div>
        </div>
      </div>
    </motion.footer>;
};