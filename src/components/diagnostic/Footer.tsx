import { motion } from 'framer-motion';
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin } from 'lucide-react';
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="w-[200px] h-[80px] relative">
              <img src="/lovable-uploads/1165c716-f19c-40b7-b8bc-6ce7bde6fa37.png" alt="KITCO" className="w-full h-full object-contain" />
            </div>
            
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Contactez-nous</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-white/70">
                <Mail className="w-4 h-4" />
                <a href="mailto:geoffrey@kitco-coworking.fr" className="hover:text-white transition-colors">
                  geoffrey@kitco-coworking.fr
                </a>
              </li>
              <li className="flex items-center space-x-3 text-white/70">
                <Phone className="w-4 h-4" />
                <a href="tel:+33789877479" className="hover:text-white transition-colors">
                  +33 7 89 87 74 79
                </a>
              </li>
              <li className="flex items-center space-x-3 text-white/70">
                <MapPin className="w-4 h-4" />
                <span>75008 Paris, France</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Liens rapides</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Tarifs
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Réserver une visite
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-white/10" />

        {/* Bottom Section */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between text-sm text-white/60">
          <p className="text-slate-50">&copy; {currentYear} KITCO. Tous droits réservés.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a>
          </div>
        </div>
      </div>
    </motion.footer>;
};