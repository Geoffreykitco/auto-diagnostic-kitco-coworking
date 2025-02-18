import { useState } from "react";
import { motion } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
interface AuditFormProps {
  onSubmit: (formData: {
    firstName: string;
    lastName: string;
    coworkingName: string;
    email: string;
    photo: File | null;
  }) => void;
}
export const AuditForm = ({
  onSubmit
}: AuditFormProps) => {
  const {
    toast
  } = useToast();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [coworkingName, setCoworkingName] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [open, setOpen] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !coworkingName || !email) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs.",
        duration: 3000
      });
      return;
    }
    onSubmit({
      firstName,
      lastName,
      coworkingName,
      email,
      photo
    });
    setOpen(false);
  };
  return <div className="bg-white rounded-lg p-8 space-y-6 shadow-lg max-w-2xl mx-auto">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-semibold">Augmentez le taux de remplissage de votre espace de coworking</h2>
        <p className="text-gray-600">Vous avez maintenant une vision claire de la performance de votre espace de coworking et ses axes d'amélioration/dévellopement.</p>
        <p className="text-gray-600">
          Ne laissez pas ces opportunités inexplorées. Passez à l'action dès maintenant !
        </p>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <motion.button whileHover={{
          scale: 1.02
        }} whileTap={{
          scale: 0.98
        }} className="w-full bg-[#15231f] hover:bg-[#1d2d29] text-white font-semibold py-4 px-8 rounded-lg shadow-md transition-all duration-200">
            Recevez votre audit et découvrez votre feuille de route personnalisée
          </motion.button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[900px] p-0 gap-0">
          <div className="flex flex-col md:flex-row w-full">
            <div className="w-full md:w-1/2 h-[300px] md:h-auto">
              <img src="/lovable-uploads/22e7f2d0-f84d-4adc-a5cb-21d985f09ac0.png" alt="Coworking space" className="w-full h-full object-cover rounded-l-lg" />
            </div>
            <div className="w-full md:w-1/2 p-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-primary">Optimisez le taux de remplissage de votre coworking</h3>
                <p className="text-gray-600">
                  Vous avez maintenant une vision claire de la performance de votre espace de coworking.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                      Prénom & Nom
                    </label>
                    <div className="flex gap-2">
                      <Input id="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Prénom" />
                      <Input id="lastName" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Nom" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="coworkingName" className="block text-sm font-medium text-gray-700 mb-1">
                      Nom du coworking
                    </label>
                    <Input id="coworkingName" value={coworkingName} onChange={e => setCoworkingName(e.target.value)} placeholder="Nom de votre espace" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="votre@email.com" />
                  </div>
                </div>
                <motion.button whileHover={{
                scale: 1.02
              }} whileTap={{
                scale: 0.98
              }} type="submit" className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-all duration-200">
                  Recevoir mon audit
                </motion.button>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>;
};