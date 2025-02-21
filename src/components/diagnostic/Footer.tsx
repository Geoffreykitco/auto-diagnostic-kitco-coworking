
import { motion } from 'framer-motion';
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin, Linkedin, Twitter } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <motion.footer 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="w-full bg-gradient-to-b from-primary/90 to-primary text-white mt-20"
    >
      {/* Top Wave SVG */}
      <div className="w-full overflow-hidden -translate-y-1">
        <svg
          viewBox="0 0 1440 120"
          className="w-full h-[120px] fill-white"
          preserveAspectRatio="none"
        >
          <path
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          />
        </svg>
      </div>

      <div className="container mx-auto py-12 px-6">
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12"
        >
          {/* Logo & Description */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="w-[180px] h-[60px] relative">
              <img 
                src="/lovable-uploads/b8466204-25a3-422d-a085-87c9ba8b9a8b.png"
                alt="KITCO"
                className="w-full h-full object-contain brightness-200"
              />
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              Nous créons des espaces de coworking où chaque détail est pensé pour favoriser 
              la productivité et le bien-être de votre équipe.
            </p>
          </motion.div>

          {/* Services rapides */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-xl font-semibold">Services rapides</h3>
            <ul className="space-y-3">
              <li className="text-white/80 hover:text-white transition-colors">
                <a href="#" className="hover:underline">Réserver une visite</a>
              </li>
              <li className="text-white/80 hover:text-white transition-colors">
                <a href="#" className="hover:underline">Tarifs & Options</a>
              </li>
              <li className="text-white/80 hover:text-white transition-colors">
                <a href="#" className="hover:underline">FAQ</a>
              </li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-xl font-semibold">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 text-white/80">
                <Mail size={18} />
                <a href="mailto:geoffrey@kitco-coworking.fr" className="hover:text-white transition-colors">
                  geoffrey@kitco-coworking.fr
                </a>
              </li>
              <li className="flex items-center space-x-3 text-white/80">
                <Phone size={18} />
                <a href="tel:+33789877479" className="hover:text-white transition-colors">
                  +33 7 89 87 74 79
                </a>
              </li>
              <li className="flex items-center space-x-3 text-white/80">
                <MapPin size={18} />
                <span>75008 Paris, France</span>
              </li>
            </ul>
          </motion.div>

          {/* Réseaux sociaux */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-xl font-semibold">Suivez-nous</h3>
            <div className="flex space-x-4">
              <a 
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </motion.div>
        </motion.div>

        <Separator className="my-8 bg-white/10" />

        {/* Bottom Section */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col md:flex-row items-center justify-between text-sm text-white/60"
        >
          <p>&copy; {currentYear} KITCO. Tous droits réservés.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};
