
import { useState } from "react";

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

  const validate = () => {
    if (!validateEmail(email)) {
      throw new Error("Veuillez entrer une adresse email valide.");
    }

    const nameValidation = validateName(fullName);
    if (!nameValidation.isValid) {
      throw new Error("Veuillez entrer un nom valide.");
    }

    if (!fullName || !coworkingName || !email) {
      throw new Error("Veuillez remplir tous les champs.");
    }

    return nameValidation;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      const nameValidation = validate();
      
      await onSubmit({
        firstName: nameValidation.firstName,
        lastName: nameValidation.lastName,
        coworkingName,
        email
      });
      
      resetForm();
      return true;
    } catch (error) {
      throw error;
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
