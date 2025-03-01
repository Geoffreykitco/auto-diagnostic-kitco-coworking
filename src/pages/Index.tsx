
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
    sectionScores,
    handleStart,
    handleOptionSelect,
    handlePrevious,
    handleNext
  } = useDiagnosticState({ toast });

  const currentSectionIndex = sectionOrder.indexOf(currentSection);
  const isFirstSection = currentSectionIndex === 0;
  const isLastSection = currentSectionIndex === sectionOrder.length - 1;

  const formattedAnswers = Object.entries(answers).reduce((acc, [section, sectionAnswers]) => {
    acc[section] = Object.entries(sectionAnswers).reduce((innerAcc, [questionIndex, answer]) => {
      innerAcc[Number(questionIndex)] = {
        value: answer.value,
        score: answer.score
      };
      return innerAcc;
    }, {} as Record<number, { value: string | number | number[] | null; score: number }>);
    return acc;
  }, {} as Record<string, Record<number, { value: string | number | number[] | null; score: number }>>);

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
            <ResultsAnalysis answers={formattedAnswers} />
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
