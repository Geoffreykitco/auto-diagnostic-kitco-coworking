
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { ProgressBar } from "@/components/diagnostic/ProgressBar";
import { HeroSection } from "@/components/diagnostic/HeroSection";
import { HowItWorks } from "@/components/diagnostic/HowItWorks";
import { QuestionSection } from "@/components/diagnostic/QuestionSection";
import { sections } from "@/data/sections";
import { ResultsAnalysis } from '@/components/diagnostic/ResultsAnalysis';
import { useDiagnosticState } from '@/hooks/use-diagnostic-state';

type SectionType = 'informations' | 'acquisition' | 'activation' | 'retention' | 'revenus' | 'recommandation' | 'resultats';

const sectionOrder: SectionType[] = [
  'informations',
  'acquisition',
  'activation',
  'retention',
  'revenus',
  'recommandation',
  'resultats'
];

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

  const convertedAnswers: Record<string, Record<number, number>> = {};
  Object.entries(answers).forEach(([section, sectionAnswers]) => {
    convertedAnswers[section] = {};
    Object.entries(sectionAnswers).forEach(([questionIndex, answer]) => {
      if (answer.score !== undefined) {
        convertedAnswers[section][Number(questionIndex)] = answer.score;
      }
    });
  });

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <ProgressBar progress={progress} />
      
      <div className="flex-grow">
        {!started ? (
          <div className="animate-fade-in">
            <HeroSection onStart={handleStart} />
            <HowItWorks />
          </div>
        ) : currentSection === 'resultats' ? (
          <div className="container mx-auto px-4 py-8 animate-fade-in">
            <ResultsAnalysis answers={convertedAnswers} />
          </div>
        ) : (
          <div className="animate-fade-in">
            <QuestionSection 
              section={sections[currentSection]}
              onOptionSelect={handleOptionSelect}
              onPrevious={handlePrevious}
              onNext={handleNext}
              showPrevious={!isFirstSection}
              showNext={!isLastSection}
              answers={answers[currentSection] || {}}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
