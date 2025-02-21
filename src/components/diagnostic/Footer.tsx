
import { motion } from 'framer-motion';
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin, Heart, ShieldCheck, Clock } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return <motion.footer initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} transition={{
    duration: 0.5
  }} className="w-full bg-primary text-white mt-20">
      <div className="container mx-auto py-12 px-6">
        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="flex flex-col items-center text-center space-y-3">
            <ShieldCheck className="w-8 h-8 text-white/90" />
            <h3 className="font-medium text-lg">Sécurisé & Confidentiel</h3>
            <p className="text-white/70 text-sm">
              Vos données sont traitées de manière confidentielle et sécurisée
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center space-y-3">
            <Clock className="w-8 h-8 text-white/90" />
            <h3 className="font-medium text-lg">Diagnostic Rapide</h3>
            <p className="text-white/70 text-sm">
              Obtenez une analyse détaillée en moins de 10 minutes
            </p>
          </div>

          <div className="flex flex-col items-center text-center space-y-3">
            <Heart className="w-8 h-8 text-white/90" />
            <h3 className="font-medium text-lg">Support Personnalisé</h3>
            <p className="text-white/70 text-sm">
              Un accompagnement sur-mesure pour améliorer votre espace
            </p>
          </div>
        </div>

        <Separator className="bg-white/10 mb-8" />

        {/* Contact and Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-6 mb-6 md:mb-0">
            <a href="mailto:geoffrey@kitco-coworking.fr" 
               className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors">
              <Mail className="w-4 h-4" />
              <span>Contact</span>
            </a>
            <a href="tel:+33789877479" 
               className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors">
              <Phone className="w-4 h-4" />
              <span>Support</span>
            </a>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-white/60">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-400 fill-current" />
            <span>in Paris</span>
          </div>
        </div>
      </div>
    </motion.footer>;
};
