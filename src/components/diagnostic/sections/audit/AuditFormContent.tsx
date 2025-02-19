
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
    <form onSubmit={onSubmit} className="space-y-4 flex-1 flex flex-col">
      <div className="flex-1 space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
            Prénom et nom
          </label>
          <Input
            id="fullName"
            value={fullName}
            onChange={(e) => onFullNameChange(e.target.value)}
            className="text-sm md:text-base"
            required
            disabled={isSubmitting}
            aria-label="Prénom et nom"
          />
        </div>
        <div>
          <label htmlFor="coworkingName" className="block text-sm font-medium text-gray-700 mb-1">
            Nom du coworking
          </label>
          <Input
            id="coworkingName"
            value={coworkingName}
            onChange={(e) => onCoworkingNameChange(e.target.value)}
            className="text-sm md:text-base"
            required
            disabled={isSubmitting}
            aria-label="Nom du coworking"
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
            onChange={(e) => onEmailChange(e.target.value)}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            className="text-sm md:text-base"
            required
            disabled={isSubmitting}
            aria-label="Adresse email"
          />
        </div>
      </div>
      <motion.button
        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
        type="submit"
        className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-2.5 md:py-3 px-6 md:px-8 rounded-lg shadow-md transition-all duration-200 text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed mt-4"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Envoi en cours..." : "Recevoir mon audit"}
      </motion.button>
    </form>
  );
};
