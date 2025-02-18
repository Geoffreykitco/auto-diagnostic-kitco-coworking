
import { useState } from "react";
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface AuditFormProps {
  onSubmit: (formData: {
    firstName: string;
    lastName: string;
    coworkingName: string;
    email: string;
    photo: File | null;
  }) => void;
}

export const AuditForm = ({ onSubmit }: AuditFormProps) => {
  const { toast } = useToast();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [coworkingName, setCoworkingName] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>('/lovable-uploads/cbde0978-24fa-4f75-acd5-e089d860be33.png');

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !coworkingName || !email) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs.",
        duration: 3000,
      });
      return;
    }
    onSubmit({ firstName, lastName, coworkingName, email, photo });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
    >
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-primary mb-2">Optimisez le taux de remplissage de votre coworking</h3>
        <p className="text-gray-600">
          Vous avez maintenant une vision claire de la performance de votre espace de coworking.
        </p>
      </div>

      <div className="flex flex-col items-center mt-8">
        <Dialog>
          <DialogTrigger asChild>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-md font-semibold shadow-[0_4px_12px_rgba(19,39,32,0.2)] hover:shadow-[0_8px_16px_rgba(19,39,32,0.3)] transition-all duration-300"
            >
              🔽 Recevoir mon audit et passer à l'action
            </motion.button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[1000px] overflow-hidden rounded-xl">
            <div className="flex flex-col md:flex-row w-full h-[600px]">
              <div className="w-full md:w-1/2 h-full">
                <img 
                  src={photoPreview} 
                  alt="Personnes collaborant dans un espace de coworking" 
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="w-full md:w-1/2 p-6 overflow-y-auto bg-white">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      Prénom
                    </label>
                    <Input
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Votre prénom"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Nom
                    </label>
                    <Input
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Votre nom"
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
                      placeholder="Nom de votre espace"
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
                      placeholder="votre@email.com"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-all duration-200 mt-4"
                  >
                    Envoyer
                  </motion.button>
                </form>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </motion.div>
  );
};
