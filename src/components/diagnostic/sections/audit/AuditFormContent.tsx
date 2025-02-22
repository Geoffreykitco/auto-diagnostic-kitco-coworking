
import { motion } from 'framer-motion';
import { Input } from "@/components/ui/input";

interface AuditFormContentProps {
  fullName: string;
  coworkingName: string;
  email: string;
  isSubmitting: boolean;
  onFullNameChange: (value: string) => void;
  onCoworkingNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => Promise<boolean>;
}

export const AuditFormContent = ({
  fullName,
  coworkingName,
  email,
  isSubmitting,
  onFullNameChange,
  onCoworkingNameChange,
  onEmailChange,
  onSubmit
}: AuditFormContentProps) => {
  return (
    <form 
      onSubmit={onSubmit} 
      className="flex flex-col flex-1 gap-6"
      aria-label="Formulaire de demande d'audit"
    >
      <div role="group" aria-label="Informations personnelles">
        <div>
          <label 
            htmlFor="fullName" 
            className="block text-base font-medium text-gray-700 mb-2"
          >
            Prénom et nom
          </label>
          <Input
            id="fullName"
            name="fullName"
            type="text"
            value={fullName}
            onChange={(e) => onFullNameChange(e.target.value)}
            className="text-base h-12 rounded-xl"
            required
            disabled={isSubmitting}
            aria-label="Prénom et nom"
            aria-required="true"
            placeholder="Pour faire connaissance :)"
          />
        </div>

        <div className="mt-6">
          <label 
            htmlFor="coworkingName" 
            className="block text-base font-medium text-gray-700 mb-2"
          >
            Nom du coworking
          </label>
          <Input
            id="coworkingName"
            name="coworkingName"
            type="text"
            value={coworkingName}
            onChange={(e) => onCoworkingNameChange(e.target.value)}
            className="text-base h-12 rounded-xl"
            required
            disabled={isSubmitting}
            aria-label="Nom du coworking"
            aria-required="true"
            placeholder="Pour en savoir plus sur votre espace"
          />
        </div>

        <div className="mt-6">
          <label 
            htmlFor="email" 
            className="block text-base font-medium text-gray-700 mb-2"
          >
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            className="text-base h-12 rounded-xl"
            required
            disabled={isSubmitting}
            aria-label="Adresse email"
            aria-required="true"
            placeholder="Pour vous envoyer le rapport"
          />
        </div>
      </div>

      <motion.button
        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
        transition={{ duration: 0.2 }}
        type="submit"
        className="w-full bg-[#0B1A17] hover:bg-[#132721] text-white font-semibold py-4 rounded-xl shadow-sm transition-all duration-200 text-base disabled:opacity-50 disabled:cursor-not-allowed mt-4"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
      >
        {isSubmitting ? "Envoi en cours..." : "Finaliser"}
      </motion.button>
    </form>
  );
};
