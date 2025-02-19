
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { ProgressBar } from "@/components/diagnostic/ProgressBar";
import { HeroSection } from "@/components/diagnostic/HeroSection";
import { HowItWorks } from "@/components/diagnostic/HowItWorks";
import { QuestionSection } from "@/components/diagnostic/QuestionSection";
import { Footer } from "@/components/diagnostic/Footer";
import { sections } from "@/data/sections";
import { ResultsAnalysis } from '@/components/diagnostic/ResultsAnalysis';
import { useDiagnosticState } from '@/hooks/use-diagnostic-state';

const sectionOrder = [
  'informations',
  'acquisition',
  'activation',
  'retention',
  'revenus',
  'recommandation',
  'resultats'
] as const;

const Index = () => {
  const { toast } = useToast();
  const {
    progress,
    started,
    currentSection,
    answers,
    handleStart,
    handleOptionSelect,
    handlePrevious,
    handleNext
  } = useDiagnosticState({ toast });

  const currentSectionIndex = sectionOrder.indexOf(currentSection);
  const isFirstSection = currentSectionIndex === 0;
  const isLastSection = currentSectionIndex === sectionOrder.length - 1;

  return (
    <div className="min-h-screen flex flex-col">
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
            answers={answers[currentSection] || {}}
          />
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Index;
