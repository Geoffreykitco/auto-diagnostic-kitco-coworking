
import { motion } from "framer-motion";
import { Footer } from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white flex flex-col"
    >
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </motion.div>
  );
};
