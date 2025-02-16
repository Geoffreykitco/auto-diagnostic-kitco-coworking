
import { useState } from 'react';
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import { ProgressBar } from "@/components/diagnostic/ProgressBar";
import { HeroSection } from "@/components/diagnostic/HeroSection";
import { HowItWorks } from "@/components/diagnostic/HowItWorks";
import { QuestionSection } from "@/components/diagnostic/QuestionSection";
import { Footer } from "@/components/diagnostic/Footer";
import { sections } from "@/data/sections";

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
  const [started, setStarted] = useState(false);
  const [currentSection, setCurrentSection] = useState('informations');
  const [answers, setAnswers] = useState<Record<string, Record<number, number>>>({});
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
