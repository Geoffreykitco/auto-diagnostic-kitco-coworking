
import { motion } from 'framer-motion';
import { Separator } from "@/components/ui/separator";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full mt-20"
    >
      <div className="container mx-auto py-8 px-6">
        <Separator className="mb-6" />

        {/* Copyright */}
        <div className="text-center text-sm text-gray-600">
          <p>Outil de diagnostic développé par la société Kitco</p>
          <p className="mt-2">&copy; {currentYear} KITCO. Tous droits réservés.</p>
        </div>
      </div>
    </motion.footer>
  );
};
