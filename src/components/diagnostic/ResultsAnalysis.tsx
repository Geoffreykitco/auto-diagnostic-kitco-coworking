
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { DiagnosticBreadcrumb } from "./DiagnosticBreadcrumb";
import { AuditForm } from "./sections/AuditForm";
import { Award, ChartBar, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";
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

  const calculateResults = () => {
    const sectionScores: Record<string, number> = {};
    
    Object.entries(answers).forEach(([section, sectionAnswers]) => {
      if (section !== 'informations') {
        const formattedAnswers = Object.entries(sectionAnswers).reduce((acc, [key, value]) => {
          acc[Number(key)] = { value: value, score: value };
          return acc;
        }, {} as Record<number, { value: number; score: number }>);

        const maxScore = Object.keys(sectionAnswers).length * 3;
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

  const renderSectionCard = (section: string, sectionAnswers: Record<number, number>) => {
    const formattedAnswers = Object.entries(sectionAnswers).reduce((acc, [key, value]) => {
      acc[Number(key)] = { value: value, score: value };
      return acc;
    }, {} as Record<number, { value: number; score: number }>);

    const maxScore = Object.keys(sectionAnswers).length * 3;
    const sectionScore = calculateSectionScore(formattedAnswers, maxScore);

    return (
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-gray-50 rounded-lg p-6 border border-gray-200 h-full"
      >
        <div className="flex items-start gap-3">
          <ChartBar className="h-5 w-5 text-primary mt-1" />
          <div>
            <h4 className="text-lg font-semibold capitalize mb-2">
              {section}
            </h4>
            <div className="flex items-center gap-3 mb-2">
              <div className="text-xl font-bold text-primary">
                {sectionScore.score}%
              </div>
              <div className="text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">
                Niveau: {sectionScore.level}
              </div>
            </div>
            <p className="text-sm text-gray-600">{sectionScore.message}</p>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="space-y-8 container mx-auto px-4">
      <div className="mt-16 mb-8">
        <DiagnosticBreadcrumb steps={steps} currentStep={currentStep} />
      </div>
      
      <div className="space-y-8">
        {/* Résultat Global */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <div className="flex items-center gap-6">
            <div className="relative">
              <Award className="h-16 w-16 text-primary" />
              <div className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                {globalScore}%
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-primary mb-3">
                Résultat de votre diagnostic
              </h2>
              <p className="text-lg text-gray-700">
                {getGlobalMessage(globalScore)}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Acquisition & Activation */}
        <div className="grid md:grid-cols-2 gap-6">
          {answers.acquisition && renderSectionCard('acquisition', answers.acquisition)}
          {answers.activation && renderSectionCard('activation', answers.activation)}
        </div>

        {/* Rétention & Revenus */}
        <div className="grid md:grid-cols-2 gap-6">
          {answers.retention && renderSectionCard('retention', answers.retention)}
          {answers.revenus && renderSectionCard('revenus', answers.revenus)}
        </div>

        {/* Recommandation & CTA */}
        <div className="grid md:grid-cols-2 gap-6">
          {answers.recommandation && renderSectionCard('recommandation', answers.recommandation)}
          
          {/* CTA Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl shadow-lg p-6"
          >
            <div className="flex justify-start mb-4">
              <ArrowUp className="h-10 w-10 text-primary" />
            </div>

            <h3 className="text-2xl font-bold text-primary mb-4">
              Augmentez votre taux de remplissage
            </h3>

            <p className="text-gray-700 mb-6">
              Découvrez comment optimiser chaque aspect de votre espace de coworking.
            </p>

            <div>
              <h4 className="text-lg font-semibold mb-4">
                Recevez votre audit détaillé
              </h4>
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
          </motion.div>
        </div>
      </div>
    </div>
  );
};
