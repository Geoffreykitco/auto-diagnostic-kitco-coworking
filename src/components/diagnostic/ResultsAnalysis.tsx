
import { useEffect, useState } from "react";
import { DiagnosticBreadcrumb } from "./DiagnosticBreadcrumb";
import { motion } from "framer-motion";
import { sections } from "@/data/sections";
import { 
  calculateSectionScore, 
  getMaxSectionScore,
  calculateGlobalScore,
  getGlobalMessage,
} from "@/utils/scoreCalculator";
import { GlobalScoreCard } from "./results/GlobalScoreCard";
import { SectionCard } from "./results/SectionCard";
import { CTACard } from "./results/CTACard";
import { Footer } from "./Footer";

interface ResultsAnalysisProps {
  answers: Record<string, Record<number, number>>;
}

export const ResultsAnalysis = ({
  answers
}: ResultsAnalysisProps) => {
  const [globalScore, setGlobalScore] = useState<number>(0);
  const [sectionScores, setSectionScores] = useState<Record<string, number>>({});

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
    const results = calculateResults();
    setSectionScores(results.sectionScores);
  }, [answers]);

  const calculateResults = () => {
    const sectionScores: Record<string, number> = {};
    
    Object.entries(answers).forEach(([section, sectionAnswers]) => {
      if (section !== 'informations') {
        const currentSection = sections[section as keyof typeof sections];
        if (currentSection) {
          const formattedAnswers = Object.entries(sectionAnswers).reduce((acc, [key, value]) => {
            acc[Number(key)] = { value, score: value };
            return acc;
          }, {} as Record<number, { value: number; score: number }>);

          const maxScore = getMaxSectionScore(currentSection.questions);
          const sectionScore = calculateSectionScore(formattedAnswers, maxScore, section);
          sectionScores[section] = sectionScore.score;
        }
      }
    });

    const calculatedGlobalScore = calculateGlobalScore(sectionScores);
    setGlobalScore(calculatedGlobalScore);
    return { sectionScores };
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
      acc[Number(key)] = { value, score: value };
      return acc;
    }, {} as Record<number, { value: number; score: number }>);

    const maxScore = getMaxSectionScore(currentSection.questions);
    const sectionScore = calculateSectionScore(formattedAnswers, maxScore, section);

    return (
      <SectionCard
        section={section}
        score={sectionScore.score}
        level={sectionScore.level}
        message={sectionScore.message}
        getLevelColor={getLevelColor}
        getProgressColor={getProgressColor}
      />
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="max-w-5xl mx-auto px-4 flex-grow">
        <div className="mt-16 mb-8">
          <DiagnosticBreadcrumb steps={steps} currentStep={currentStep} />
        </div>
        
        <div className="space-y-8">
          <GlobalScoreCard
            score={globalScore}
            getLevelColor={getLevelColor}
            getProgressColor={getProgressColor}
            getGlobalMessage={getGlobalMessage}
            answers={answers}
          />

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
            <div className="aspect-video rounded-lg overflow-hidden">
              <iframe
                src="https://www.loom.com/embed/0d1b47c4a5cf430da88b8932a83d88fa?sid=a8bb8032-40ab-498f-9a88-c9393477eca5"
                frameBorder="0"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section en pleine largeur */}
      <div className="w-full mt-12">
        <CTACard globalScore={globalScore} />
      </div>

      <Footer />
    </div>
  );
};
