
import { FormEventHandler, useState } from "react";

export interface AuditFormData {
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

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      const names = fullName.trim().split(/\s+/).filter(Boolean);
      
      await onSubmit({
        firstName: names[0] || '',
        lastName: names.slice(1).join(' ') || '',
        coworkingName,
        email
      });
      
      resetForm();
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
    handleFormSubmit,
    resetForm
  };
};
