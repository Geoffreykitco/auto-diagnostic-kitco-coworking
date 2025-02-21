
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

  return (
    <div className="space-y-12">
      <div className="mt-16 mb-8">
        <DiagnosticBreadcrumb steps={steps} currentStep={currentStep} />
      </div>
      
      <div className="max-w-4xl mx-auto px-4">
        {/* Section Résultat Global */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-xl p-8 mb-12"
        >
          <div className="flex justify-center mb-8">
            <div className="relative">
              <Award className="h-20 w-20 text-primary" />
              <div className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                {globalScore}%
              </div>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-6">
            Résultat de votre diagnostic
          </h2>
          
          <p className="text-xl text-center text-gray-700 max-w-2xl mx-auto mb-8">
            {getGlobalMessage(globalScore)}
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(answers).map(([section, sectionAnswers]) => {
              if (section === 'informations') return null;

              const formattedAnswers = Object.entries(sectionAnswers).reduce((acc, [key, value]) => {
                acc[Number(key)] = { value: value, score: value };
                return acc;
              }, {} as Record<number, { value: number; score: number }>);

              const maxScore = Object.keys(sectionAnswers).length * 3;
              const sectionScore = calculateSectionScore(formattedAnswers, maxScore);

              return (
                <motion.div 
                  key={section}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="bg-gray-50 rounded-lg p-4 border border-gray-200"
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
            })}
          </div>
        </motion.div>

        {/* Section Augmentation du taux de remplissage */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl shadow-lg p-8"
        >
          <div className="flex justify-center mb-6">
            <ArrowUp className="h-12 w-12 text-primary" />
          </div>

          <h3 className="text-2xl md:text-3xl font-bold text-center text-primary mb-6">
            Augmentez le taux de remplissage de votre espace
          </h3>

          <p className="text-center text-gray-700 mb-8 max-w-2xl mx-auto">
            Découvrez comment optimiser chaque aspect de votre espace de coworking pour atteindre un taux de remplissage optimal.
          </p>

          <div className="mb-8">
            <h4 className="text-xl font-semibold mb-6 text-center">
              Recevez votre audit détaillé par email
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
  );
};
