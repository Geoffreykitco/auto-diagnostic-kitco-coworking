
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface AuditFormData {
  firstName: string;
  lastName: string;
  coworkingName: string;
  email: string;
}

interface UseAuditFormProps {
  onSubmit: (data: AuditFormData) => Promise<void>;
}

export const useAuditForm = ({ onSubmit }: UseAuditFormProps) => {
  const { toast } = useToast();
  const [fullName, setFullName] = useState('');
  const [coworkingName, setCoworkingName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setFullName('');
    setCoworkingName('');
    setEmail('');
  };

  const validateName = (name: string) => {
    const trimmedName = name.trim();
    const names = trimmedName.split(/\s+/).filter(Boolean);
    
    if (names.length < 1) {
      return { isValid: false, firstName: '', lastName: '' };
    }
    
    return {
      isValid: true,
      firstName: names[0],
      lastName: names.slice(1).join(' ') || ''
    };
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer une adresse email valide.",
        duration: 3000,
      });
      return;
    }

    const nameValidation = validateName(fullName);
    if (!nameValidation.isValid) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer un nom valide.",
        duration: 3000,
      });
      return;
    }

    if (!fullName || !coworkingName || !email) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs.",
        duration: 3000,
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onSubmit({
        firstName: nameValidation.firstName,
        lastName: nameValidation.lastName,
        coworkingName,
        email
      });
      
      toast({
        title: "Merci !",
        description: "Votre demande a été envoyée avec succès.",
        duration: 3000,
      });
      
      resetForm();
      return true;
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi du formulaire.",
        duration: 3000,
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    fullName,
    setFullName,
    coworkingName,
    setCoworkingName,
    email,
    setEmail,
    isSubmitting,
    handleSubmit,
    resetForm
  };
};
