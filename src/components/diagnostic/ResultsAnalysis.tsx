
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { DiagnosticBreadcrumb } from "./DiagnosticBreadcrumb";
import { AuditForm } from "./sections/AuditForm";
import { Award, ChartBar, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";
import { sections } from "@/data/sections";
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
          const currentSection = sections[section as keyof typeof sections];
          const question = currentSection.questions[Number(key)];
          
          let score = 0;
          if (question.type === 'single') {
            // Pour les questions à choix unique, prendre les points de l'option sélectionnée
            score = question.options[value]?.points || 0;
          } else if (question.type === 'multiple' && Array.isArray(value)) {
            // Pour les questions à choix multiple, additionner les points de toutes les options sélectionnées
            score = value.reduce((sum, optionIndex) => {
              return sum + (question.options[optionIndex]?.points || 0);
            }, 0);
          }

          acc[Number(key)] = { value: value, score: score };
          return acc;
        }, {} as Record<number, { value: number; score: number }>);

        const maxScore = Object.entries(sections[section as keyof typeof sections].questions).reduce((total, [_, question]) => {
          if (question.type === 'multiple') {
            // Pour les questions à choix multiple, le score maximum est la somme des points de toutes les options
            return total + question.options.reduce((sum, option) => sum + option.points, 0);
          } else {
            // Pour les questions à choix unique, le score maximum est le plus haut score possible
            return total + Math.max(...question.options.map(opt => opt.points));
          }
        }, 0);

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
      const currentSection = sections[section as keyof typeof sections];
      const question = currentSection.questions[Number(key)];
      
      let score = 0;
      if (question.type === 'single') {
        score = question.options[value]?.points || 0;
      } else if (question.type === 'multiple' && Array.isArray(value)) {
        score = value.reduce((sum, optionIndex) => {
          return sum + (question.options[optionIndex]?.points || 0);
        }, 0);
      }

      acc[Number(key)] = { value: value, score: score };
      return acc;
    }, {} as Record<number, { value: number; score: number }>);

    const maxScore = Object.entries(sections[section as keyof typeof sections].questions).reduce((total, [_, question]) => {
      if (question.type === 'multiple') {
        return total + question.options.reduce((sum, option) => sum + option.points, 0);
      } else {
        return total + Math.max(...question.options.map(opt => opt.points));
      }
    }, 0);

    const sectionScore = calculateSectionScore(formattedAnswers, maxScore);

    return (
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg p-6 border border-gray-200 h-full"
      >
        <h4 className="text-lg font-semibold mb-4">
          {section === 'revenus' ? 'Revenue' : section} - {
            section === 'acquisition' ? "Attirer de nouveaux coworkers" :
            section === 'activation' ? "Transformer les visiteurs en membres" :
            section === 'retention' ? "Fidéliser ses membres sur le long terme" :
            section === 'revenus' ? "Optimiser la rentabilité du coworking" :
            "Clients à ambassadeurs"
          }
        </h4>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm text-gray-600 mb-1">
            <span>Score</span>
            <span className="font-medium">{sectionScore.score}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${sectionScore.score}%` }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm">
            Niveau : <span className="font-medium">{sectionScore.level}</span> 😊
          </div>
          <p className="text-sm text-gray-600">{sectionScore.message}</p>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="space-y-8 container mx-auto px-4">
      <div className="mt-16 mb-8">
        <DiagnosticBreadcrumb steps={steps} currentStep={currentStep} />
      </div>
      
      <div className="space-y-8 max-w-5xl mx-auto">
        {/* Résultat Global */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg p-8 border border-gray-200"
        >
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                Progression du diagnostic
              </h2>
              <span className="text-xl font-bold">{globalScore}%</span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-primary h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${globalScore}%` }}
              />
            </div>

            <div className="space-y-2">
              <div className="text-sm">
                Niveau : <span className="font-medium">Intermédiaire</span> 😊
              </div>
              <p className="text-gray-600">{getGlobalMessage(globalScore)}</p>
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
            className="bg-[#0B1A17] text-white rounded-lg p-6"
          >
            <div className="flex items-center space-x-2 mb-4">
              <Award className="h-6 w-6" />
              <span className="font-medium">Recevoir mon audit et passer à l'action</span>
            </div>
            
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
          </motion.div>
        </div>
      </div>
    </div>
  );
};
