
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { ProgressBar } from "@/components/diagnostic/ProgressBar";
import { HeroSection } from "@/components/diagnostic/HeroSection";
import { HowItWorks } from "@/components/diagnostic/HowItWorks";
import { QuestionSection } from "@/components/diagnostic/QuestionSection";
import { Footer } from "@/components/diagnostic/Footer";
import { sections } from "@/data/sections";

const sectionOrder = ['acquisition', 'activation', 'retention', 'revenus', 'recommandation'];

const Index = () => {
  const [progress, setProgress] = useState(0);
  const [started, setStarted] = useState(false);
  const [currentSection, setCurrentSection] = useState('acquisition');
  const { toast } = useToast();

  const currentSectionIndex = sectionOrder.indexOf(currentSection);
  const isFirstSection = currentSectionIndex === 0;
  const isLastSection = currentSectionIndex === sectionOrder.length - 1;

  const handleStart = () => {
    toast({
      title: "Bienvenue dans l'auto-diagnostic!",
      description: "Commençons l'évaluation de votre espace de coworking.",
    });
    setProgress(20);
    setStarted(true);
  };

  const handleOptionSelect = (questionIndex: number, points: number) => {
    setProgress(prev => Math.min(prev + 20, 100));
    toast({
      title: "Réponse enregistrée",
      description: "Passons à la question suivante.",
    });
  };

  const handlePrevious = () => {
    if (!isFirstSection) {
      setCurrentSection(sectionOrder[currentSectionIndex - 1]);
      setProgress(prev => Math.max(prev - 20, 0));
    }
  };

  const handleNext = () => {
    if (!isLastSection) {
      setCurrentSection(sectionOrder[currentSectionIndex + 1]);
      setProgress(prev => Math.min(prev + 20, 100));
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
          />
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Index;
