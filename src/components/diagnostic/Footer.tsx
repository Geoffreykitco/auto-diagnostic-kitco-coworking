
import { motion } from 'framer-motion';
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const isMobile = useIsMobile();

  return <motion.footer initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} transition={{
    duration: 0.5
  }} className={`w-full ${isMobile ? 'mt-4' : 'mt-8'}`}>
      <div className={`container mx-auto px-6 ${isMobile ? 'py-4' : 'py-[24px]'}`}>
        <Separator className={`${isMobile ? 'mb-4' : 'mb-6'} opacity-20`} />
        <div className="text-center text-sm text-gray-600 space-y-2">
          <p className="text-xs">Outil de diagnostic développé par la société Kitco</p>
          <p className="text-sm">&copy; {currentYear} KITCO. Tous droits réservés.</p>
        </div>
      </div>
    </motion.footer>;
};
