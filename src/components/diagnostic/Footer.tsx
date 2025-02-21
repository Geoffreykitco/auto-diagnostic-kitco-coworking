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
        

        <Separator className="bg-white/10 mb-6" />

        {/* Copyright */}
        <div className="text-center text-sm text-white/60">
          <p className="text-gray-600">Outil de diagnostic développé par la société Kitco</p>
          <p className="mt-2">&copy; {currentYear} KITCO. Tous droits réservés.</p>
        </div>
      </div>
    </motion.footer>;
};