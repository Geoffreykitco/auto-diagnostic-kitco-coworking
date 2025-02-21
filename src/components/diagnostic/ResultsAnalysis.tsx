
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { DiagnosticBreadcrumb } from "./DiagnosticBreadcrumb";
import { AuditForm } from "./sections/AuditForm";
import { 
  calculateSectionScore, 
  getMaxSectionScore,
  calculateGlobalScore,
  getGlobalMessage,
  ScoreLevel
} from "@/utils/scoreCalculator";

interface ResultsAnalysisProps {
  answers: Record<string, Record<number, number>>;
}

export const ResultsAnalysis = ({
  answers
}: ResultsAnalysisProps) => {
  const { toast } = useToast();
  const [globalScore, setGlobalScore] = useState<number>(0);

  // Calculer les scores pour chaque section
  const calculateResults = () => {
    const sectionScores: Record<string, number> = {};
    
    Object.entries(answers).forEach(([section, sectionAnswers]) => {
      if (section !== 'informations') {
        const formattedAnswers = Object.entries(sectionAnswers).reduce((acc, [key, value]) => {
          acc[Number(key)] = { value: value, score: value };
          return acc;
        }, {} as Record<number, { value: number; score: number }>);

        const maxScore = Object.keys(sectionAnswers).length * 3; // Supposant un score max de 3 par question
        const sectionScore = calculateSectionScore(formattedAnswers, maxScore);
        sectionScores[section] = sectionScore.score;
      }
    });

    const calculatedGlobalScore = calculateGlobalScore(sectionScores);
    setGlobalScore(calculatedGlobalScore);
    return { sectionScores };
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    calculateResults();
  }, [answers]);

  const steps = [
    { id: 'informations', label: 'Informations' },
    { id: 'acquisition', label: 'Acquisition - Attirer les coworkers' },
    { id: 'activation', label: 'Activation - Transformer les visiteurs en membres' },
    { id: 'retention', label: 'Rétention - Fidéliser vos membres' },
    { id: 'revenus', label: 'Revenus - Générer et optimiser les revenus' },
    { id: 'recommandation', label: 'Recommandation - Développer le bouche à oreille' },
    { id: 'resultats', label: 'Résultats' }
  ];

  const currentStep = steps[steps.length - 1];

  return (
    <div className="space-y-8">
      <div className="mt-16 mb-8">
        <DiagnosticBreadcrumb steps={steps} currentStep={currentStep} />
      </div>
      
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">
            Résultats de votre diagnostic
          </h2>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Score Global: {globalScore}%</h3>
            <p className="text-gray-700">
              {getGlobalMessage(globalScore)}
            </p>
          </div>

          <div className="grid gap-6">
            {Object.entries(answers).map(([section, sectionAnswers]) => {
              if (section === 'informations') return null;

              const formattedAnswers = Object.entries(sectionAnswers).reduce((acc, [key, value]) => {
                acc[Number(key)] = { value: value, score: value };
                return acc;
              }, {} as Record<number, { value: number; score: number }>);

              const maxScore = Object.keys(sectionAnswers).length * 3;
              const sectionScore = calculateSectionScore(formattedAnswers, maxScore);

              return (
                <div key={section} className="border rounded-lg p-4">
                  <h4 className="text-lg font-semibold mb-2 capitalize">
                    {section}
                  </h4>
                  <div className="flex items-center gap-4 mb-2">
                    <div className="text-xl font-bold">
                      {sectionScore.score}%
                    </div>
                    <div className="text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">
                      Niveau: {sectionScore.level}
                    </div>
                  </div>
                  <p className="text-gray-600">{sectionScore.message}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-6">
            Recevez votre audit détaillé par email
          </h3>
          <AuditForm onSubmit={async (formData) => {
            try {
              const diagnosticData = {
                created_at: new Date().toISOString(),
                first_name: formData.firstName,
                last_name: formData.lastName,
                coworking_name: formData.coworkingName,
                email: formData.email,
                global_score: globalScore
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
          }} />
        </div>
      </div>
    </div>
  );
};
