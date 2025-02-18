
import { useState } from 'react';
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import { ProgressBar } from "@/components/diagnostic/ProgressBar";
import { HeroSection } from "@/components/diagnostic/HeroSection";
import { HowItWorks } from "@/components/diagnostic/HowItWorks";
import { QuestionSection } from "@/components/diagnostic/QuestionSection";
import { Footer } from "@/components/diagnostic/Footer";
import { sections } from "@/data/sections";
import { ResultsAnalysis } from '@/components/diagnostic/ResultsAnalysis';

const sectionOrder = [
  'informations',
  'acquisition',
  'activation',
  'retention',
  'revenus',
  'recommandation',
  'resultats'
];

const Index = () => {
  const [progress, setProgress] = useState(0);
  const [started, setStarted] = useState(true); // Modifié pour commencer directement
  const [currentSection, setCurrentSection] = useState('resultats'); // Modifié pour aller directement aux résultats
  const [answers, setAnswers] = useState<Record<string, Record<number, number>>>({
    acquisition: { 0: 8, 1: 7, 2: 10, 3: 7, 4: 5 },
    activation: { 0: 10, 1: 5, 2: 5, 3: 7, 4: 5 },
    retention: { 0: 5, 1: 5, 2: 10, 3: 5, 4: 5 },
    revenus: { 0: 15, 1: 10, 2: 10, 3: 10, 4: 5 },
    recommandation: { 0: 10, 1: 5, 2: 5, 3: 5, 4: 5 }
  });
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const currentSectionIndex = sectionOrder.indexOf(currentSection);
  const isFirstSection = currentSectionIndex === 0;
  const isLastSection = currentSectionIndex === sectionOrder.length - 1;

  const handleStart = () => {
    if (!isMobile) {
      toast({
        title: "Bienvenue dans l'auto-diagnostic 👋",
        description: "Commençons l'évaluation de votre espace de coworking.",
        duration: 1500,
      });
    }
    setProgress(0);
    setStarted(true);
  };

  const calculateProgress = (newAnswers: Record<string, Record<number, number>>) => {
    const totalQuestions = Object.values(sections).reduce((sum, section) => sum + section.questions.length, 0);
    const answeredQuestions = Object.values(newAnswers).reduce((sum, sectionAnswers) => {
      return sum + Object.keys(sectionAnswers).length;
    }, 0);
    return (answeredQuestions / totalQuestions) * 100;
  };

  const handleOptionSelect = (questionIndex: number, points: number) => {
    setAnswers(prev => {
      const newAnswers = {
        ...prev,
        [currentSection]: {
          ...prev[currentSection],
          [questionIndex]: points
        }
      };
      
      const newProgress = calculateProgress(newAnswers);
      setProgress(newProgress);
      
      return newAnswers;
    });
    
    if (!isMobile) {
      toast({
        title: "Réponse enregistrée 🎉",
        variant: "default",
        duration: 1200,
      });
    }
  };

  const handlePrevious = () => {
    if (!isFirstSection) {
      setCurrentSection(sectionOrder[currentSectionIndex - 1]);
    }
  };

  const handleNext = () => {
    if (!isLastSection) {
      setCurrentSection(sectionOrder[currentSectionIndex + 1]);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <ProgressBar progress={progress} />
      
      <div className="flex-grow">
        {!started ? (
          <>
            <HeroSection onStart={handleStart} />
            <HowItWorks />
          </>
        ) : currentSection === 'resultats' ? (
          <div className="container mx-auto px-4 py-8">
            <ResultsAnalysis answers={answers} />
          </div>
        ) : (
          <QuestionSection 
            section={sections[currentSection]}
            onOptionSelect={handleOptionSelect}
            onPrevious={handlePrevious}
            onNext={handleNext}
            showPrevious={!isFirstSection}
            showNext={!isLastSection}
            answers={answers}
          />
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Index;
