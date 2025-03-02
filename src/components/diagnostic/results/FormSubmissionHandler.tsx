
import React from 'react';
import { useAuditForm, AuditFormData } from "@/hooks/use-audit-form";
import { useCtaFormSubmit } from "@/hooks/diagnostic/use-cta-form-submit";

interface FormSubmissionHandlerProps {
  globalScore: number;
  sectionScores: Record<string, number>;
  answers: Record<string, Record<number, {
    value: string | number | number[] | null;
    score: number;
  }>>;
  children: (props: {
    fullName: string;
    setFullName: (value: string) => void;
    coworkingName: string;
    setCoworkingName: (value: string) => void;
    email: string;
    setEmail: (value: string) => void;
    isSubmitting: boolean;
    handleFormSubmit: React.FormEventHandler<HTMLFormElement>;
  }) => React.ReactNode;
}

export const FormSubmissionHandler: React.FC<FormSubmissionHandlerProps> = ({
  globalScore,
  sectionScores,
  answers,
  children
}) => {
  // Use our centralized hook for form submission
  const { handleSubmit } = useCtaFormSubmit({
    globalScore,
    sectionScores,
    answers
  });

  // Use the audit form hook with our submission handler
  const formProps = useAuditForm({
    onSubmit: handleSubmit
  });

  return <>{children(formProps)}</>;
};
