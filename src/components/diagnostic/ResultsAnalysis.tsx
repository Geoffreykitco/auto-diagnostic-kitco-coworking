
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { DiagnosticBreadcrumb } from "./DiagnosticBreadcrumb";
import { AuditForm } from "./sections/AuditForm";
import { Award, ChartBar, Users, Zap, Heart, CircleDollarSign, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { sections } from "@/data/sections";
import { 
  calculateSectionScore, 
  getMaxSectionScore,
  calculateGlobalScore,
  getGlobalMessage,
  ScoreLevel
} from "@/utils/scoreCalculator";
import { Progress } from "@/components/ui/progress";

interface ResultsAnalysisProps {
  answers: Record<string, Record<number, number>>;
}

export const ResultsAnalysis = ({
  answers
}: ResultsAnalysisProps) => {
  const { toast } = useToast();
  const [globalScore, setGlobalScore] = useState<number>(0);

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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    calculateResults();
  }, [answers]);

  const calculateResults = () => {
    const sectionScores: Record<string, number> = {};
    
    Object.entries(answers).forEach(([section, sectionAnswers]) => {
      if (section !== 'informations') {
        const currentSection = sections[section as keyof typeof sections];
        if (currentSection) {
          const formattedAnswers = Object.entries(sectionAnswers).reduce((acc, [key, value]) => {
            acc[Number(key)] = { value, score: 0 };
            return acc;
          }, {} as Record<number, { value: number; score: number }>);

          const maxScore = getMaxSectionScore(currentSection.questions);
          const sectionScore = calculateSectionScore(formattedAnswers, maxScore);
          sectionScores[section] = sectionScore.score;
        }
      }
    });

    const calculatedGlobalScore = calculateGlobalScore(sectionScores);
    setGlobalScore(calculatedGlobalScore);
    return { sectionScores };
  };

  const getSectionIcon = (section: string) => {
    switch (section) {
      case 'acquisition':
        return <Users className="w-5 h-5" />;
      case 'activation':
        return <Zap className="w-5 h-5" />;
      case 'retention':
        return <Heart className="w-5 h-5" />;
      case 'revenus':
        return <CircleDollarSign className="w-5 h-5" />;
      case 'recommandation':
        return <Share2 className="w-5 h-5" />;
      default:
        return <ChartBar className="w-5 h-5" />;
    }
  };

  const getLevelColor = (score: number): string => {
    if (score >= 80) return "text-green-600";
    if (score >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const getProgressColor = (score: number): string => {
    if (score >= 80) return "bg-green-500";
    if (score >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  const renderSectionCard = (section: string, sectionAnswers: Record<number, number>) => {
    const currentSection = sections[section as keyof typeof sections];
    if (!currentSection) return null;

    const formattedAnswers = Object.entries(sectionAnswers).reduce((acc, [key, value]) => {
      acc[Number(key)] = { value, score: 0 };
      return acc;
    }, {} as Record<number, { value: number; score: number }>);

    const maxScore = getMaxSectionScore(currentSection.questions);
    const sectionScore = calculateSectionScore(formattedAnswers, maxScore);

    return (
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg p-6 border border-gray-200 h-full shadow-sm hover:shadow-md transition-shadow duration-200"
      >
        <div className="flex items-center gap-3 mb-4">
          {getSectionIcon(section)}
          <h4 className="text-lg font-semibold">
            {section === 'revenus' ? 'Revenus' : section.charAt(0).toUpperCase() + section.slice(1)} - {
              section === 'acquisition' ? "Attirer de nouveaux coworkers" :
              section === 'activation' ? "Transformer les visiteurs en membres" :
              section === 'retention' ? "Fidéliser ses membres sur le long terme" :
              section === 'revenus' ? "Optimiser la rentabilité du coworking" :
              "Clients à ambassadeurs"
            }
          </h4>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center text-sm mb-2">
            <span className="text-gray-600">Score</span>
            <span className={`font-medium ${getLevelColor(sectionScore.score)}`}>
              {sectionScore.score}%
            </span>
          </div>
          <Progress 
            value={sectionScore.score} 
            className="h-2"
            indicatorClassName={getProgressColor(sectionScore.score)}
          />
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-sm">Niveau : </span>
            <span className={`font-medium ${getLevelColor(sectionScore.score)}`}>
              {sectionScore.level.charAt(0).toUpperCase() + sectionScore.level.slice(1)}
            </span>
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
          className="bg-white rounded-lg p-8 border border-gray-200 shadow-lg"
        >
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Award className="w-8 h-8 text-primary" />
              <div>
                <h2 className="text-2xl font-bold">Score Global</h2>
                <p className="text-gray-600">Progression du diagnostic de votre espace</p>
              </div>
              <span className={`ml-auto text-3xl font-bold ${getLevelColor(globalScore)}`}>
                {globalScore}%
              </span>
            </div>

            <Progress 
              value={globalScore} 
              className="h-3"
              indicatorClassName={getProgressColor(globalScore)}
            />

            <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
              <div className="text-sm">
                Niveau : <span className={`font-medium ${getLevelColor(globalScore)}`}>
                  {globalScore >= 80 ? "Avancé" : globalScore >= 50 ? "Intermédiaire" : "Débutant"}
                </span>
              </div>
              <p className="text-gray-600">{getGlobalMessage(globalScore)}</p>
            </div>
          </div>
        </motion.div>

        {/* Section Scores */}
        <div className="grid md:grid-cols-2 gap-6">
          {answers.acquisition && renderSectionCard('acquisition', answers.acquisition)}
          {answers.activation && renderSectionCard('activation', answers.activation)}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {answers.retention && renderSectionCard('retention', answers.retention)}
          {answers.revenus && renderSectionCard('revenus', answers.revenus)}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {answers.recommandation && renderSectionCard('recommandation', answers.recommandation)}
          
          {/* CTA Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#0B1A17] text-white rounded-lg p-6 shadow-lg"
          >
            <div className="flex items-center space-x-2 mb-4">
              <Award className="h-6 w-6" />
              <h3 className="font-medium">Recevoir mon audit et passer à l'action</h3>
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
