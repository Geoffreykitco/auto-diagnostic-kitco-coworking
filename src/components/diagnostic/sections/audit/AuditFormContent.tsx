
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
  onSubmit: (e: React.FormEvent) => Promise<void>;
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
      className="space-y-4 flex-1 flex flex-col"
      aria-label="Formulaire de demande d'audit"
    >
      <div className="flex-1 space-y-4" role="group" aria-label="Informations personnelles">
        <div>
          <label 
            htmlFor="fullName" 
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Prénom et nom
          </label>
          <Input
            id="fullName"
            name="fullName"
            type="text"
            value={fullName}
            onChange={(e) => onFullNameChange(e.target.value)}
            className="text-sm md:text-base"
            required
            disabled={isSubmitting}
            aria-label="Prénom et nom"
            aria-required="true"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label 
            htmlFor="coworkingName" 
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nom du coworking
          </label>
          <Input
            id="coworkingName"
            name="coworkingName"
            type="text"
            value={coworkingName}
            onChange={(e) => onCoworkingNameChange(e.target.value)}
            className="text-sm md:text-base"
            required
            disabled={isSubmitting}
            aria-label="Nom du coworking"
            aria-required="true"
            placeholder="MonCoworking"
          />
        </div>

        <div>
          <label 
            htmlFor="email" 
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            className="text-sm md:text-base"
            required
            disabled={isSubmitting}
            aria-label="Adresse email"
            aria-required="true"
            placeholder="john@moncoworking.com"
          />
        </div>
      </div>

      <motion.button
        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
        transition={{ duration: 0.2 }}
        type="submit"
        className="w-full bg-[#0B1A17] hover:bg-[#132721] text-white font-semibold py-2.5 md:py-3 px-6 md:px-8 rounded-lg shadow-md transition-all duration-200 text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed mt-4"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
      >
        {isSubmitting ? "Envoi en cours..." : "Finaliser"}
      </motion.button>
    </form>
  );
};
