
import { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

interface AuditFormProps {
  onSubmit: (formData: {
    firstName: string;
    lastName: string;
    coworkingName: string;
    email: string;
  }) => void;
}

export const AuditForm = ({ onSubmit }: AuditFormProps) => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [fullName, setFullName] = useState('');
  const [coworkingName, setCoworkingName] = useState('');
  const [email, setEmail] = useState('');
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer une adresse email valide.",
        duration: 3000,
      });
      return;
    }

    const [firstName = "", lastName = ""] = fullName.split(" ");

    if (!fullName || !coworkingName || !email) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs.",
        duration: 3000,
      });
      return;
    }

    onSubmit({
      firstName,
      lastName,
      coworkingName,
      email
    });
    setOpen(false);

    toast({
      title: "Merci !",
      description: "Votre demande a été envoyée avec succès.",
      duration: 3000,
    });
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-white rounded-lg p-4 md:p-8 space-y-6 shadow-lg max-w-2xl mx-auto"
      >
        <div className="text-center space-y-4">
          <h2 className="text-xl md:text-2xl font-semibold">
            Augmentez le taux de remplissage de votre espace de coworking
          </h2>
          <div className="space-y-3">
            <p className="text-gray-600 text-sm md:text-base">
              Vous avez maintenant une vision claire de la performance de votre espace de coworking. Mais comment transformer ces signaux en un plan d'action concret ?
            </p>
            <p className="text-gray-600 text-sm md:text-base">
              Ne laissez pas ces opportunités inexplorées. Passez à l'action dès maintenant !
            </p>
          </div>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-3 md:py-4 px-6 md:px-8 rounded-lg shadow-md transition-all duration-200 text-sm md:text-base"
            >
              Recevez votre audit et découvrez votre feuille de route personnalisée
            </motion.button>
          </DialogTrigger>
          <DialogContent className={`${isMobile ? 'h-screen w-screen !m-0 !p-0 !inset-0 !translate-x-0 !translate-y-0 !max-w-none !w-full' : 'sm:max-w-[900px]'}`}>
            <div className="flex flex-col md:flex-row w-full h-full">
              {!isMobile && (
                <div className="w-full md:w-1/2">
                  <img
                    src="/lovable-uploads/22e7f2d0-f84d-4adc-a5cb-21d985f09ac0.png"
                    alt="Coworking space"
                    className="w-full h-full object-cover rounded-l-lg"
                  />
                </div>
              )}
              <div className={`w-full md:w-1/2 p-4 md:p-6 ${isMobile ? 'h-full overflow-y-auto' : ''}`}>
                <div className="mb-6">
                  <h3 className="text-lg md:text-xl font-semibold text-primary mb-2">
                    Optimisez le taux de remplissage de votre coworking
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base">
                    Vous avez maintenant une vision claire de la performance de votre espace de coworking.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                      Prénom et nom
                    </label>
                    <Input
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="text-sm md:text-base"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="coworkingName" className="block text-sm font-medium text-gray-700 mb-1">
                      Nom du coworking
                    </label>
                    <Input
                      id="coworkingName"
                      value={coworkingName}
                      onChange={(e) => setCoworkingName(e.target.value)}
                      className="text-sm md:text-base"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                      className="text-sm md:text-base"
                      required
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-2.5 md:py-3 px-6 md:px-8 rounded-lg shadow-md transition-all duration-200 text-sm md:text-base"
                  >
                    Recevoir mon audit
                  </motion.button>
                </form>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>
    </AnimatePresence>
  );
};
