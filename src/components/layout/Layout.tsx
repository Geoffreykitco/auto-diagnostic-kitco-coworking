
import { motion } from "framer-motion";
import { Footer } from "../diagnostic/Footer";
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const isMobile = useIsMobile();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white flex flex-col"
    >
      <main className={`flex-grow ${isMobile ? 'w-full max-w-full overflow-x-hidden' : ''}`}>
        {children}
      </main>
      <Footer />
    </motion.div>
  );
};
