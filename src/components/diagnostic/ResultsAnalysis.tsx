
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { DiagnosticBreadcrumb } from "./DiagnosticBreadcrumb";
import { AuditForm } from "./sections/AuditForm";

interface ResultsAnalysisProps {
  answers: Record<string, Record<number, number>>;
}

export const ResultsAnalysis = ({
  answers
}: ResultsAnalysisProps) => {
  const { toast } = useToast();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const steps = [
    { id: 'informations', label: 'Informations' },
    { id: 'acquisition', label: 'Acquisition - Attirer les coworkers' },
    { id: 'activation', label: 'Activation - Transformer les visiteurs en membres' },
    { id: 'retention', label: 'Rétention - Fidéliser vos membres' },
    { id: 'revenus', label: 'Revenus - Générer et optimiser les revenus' },
    { id: 'recommandation', label: 'Recommandation - Développer le bouche à oreille' },
    { id: 'resultats', label: 'Formulaire de contact' }
  ];

  const currentStep = steps[steps.length - 1];

  const saveToBaserow = async (formData: {
    firstName: string;
    lastName: string;
    coworkingName: string;
    email: string;
    photo: File | null;
  }) => {
    try {
      const diagnosticData = {
        created_at: new Date().toISOString(),
        first_name: formData.firstName,
        last_name: formData.lastName,
        coworking_name: formData.coworkingName,
        email: formData.email
      };

      const response = await fetch('https://api.baserow.io/api/database/rows/table/451692/', {
        method: 'POST',
        headers: {
          'Authorization': 'Token 185511',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(diagnosticData)
      });

      if (!response.ok) {
        throw new Error('Failed to save form results');
      }

      toast({
        title: "Formulaire envoyé !",
        description: "Vous recevrez une réponse par email dans les plus brefs délais.",
        duration: 3000,
      });

      console.log('Form results saved successfully');
    } catch (error) {
      console.error('Error saving form results:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi du formulaire.",
        duration: 3000,
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="mt-16 mb-8">
        <DiagnosticBreadcrumb steps={steps} currentStep={currentStep} />
      </div>
      
      <div className="max-w-2xl mx-auto">
        <AuditForm onSubmit={saveToBaserow} />
      </div>
    </div>
  );
};
