
import { motion } from 'framer-motion';
import { Separator } from "@/components/ui/separator";
import { Clock } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return <motion.footer initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} transition={{
    duration: 0.5
  }} className="w-full bg-primary text-white mt-20">
      <div className="container mx-auto py-8 px-6">
        {/* Trust Indicators */}
        <div className="flex flex-col items-center text-center space-y-3 mb-8">
          <Clock className="w-8 h-8 text-white/90" />
          <h3 className="font-medium text-lg">Diagnostic Rapide</h3>
          <p className="text-white/70 text-sm">
            Obtenez une analyse détaillée en moins de 10 minutes
          </p>
        </div>

        <Separator className="bg-white/10 mb-6" />

        {/* Copyright */}
        <div className="text-center text-sm text-white/60">
          <p>Outil de diagnostic développé par la société Kitco</p>
          <p className="mt-2">&copy; {currentYear} KITCO. Tous droits réservés.</p>
        </div>
      </div>
    </motion.footer>;
};
