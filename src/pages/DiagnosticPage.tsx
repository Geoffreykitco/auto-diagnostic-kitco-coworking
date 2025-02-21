
import { useState } from "react";
import { QuestionSection } from "@/components/diagnostic/QuestionSection";
import { sections } from "@/data/sections";
import { Answer } from "@/components/diagnostic/question/types";

export const DiagnosticPage = () => {
  const [currentSection, setCurrentSection] = useState("informations");
  const [answers, setAnswers] = useState<Record<number, Answer>>({});

  const sectionOrder = [
    "informations",
    "acquisition",
    "activation",
    "retention",
    "revenus",
    "recommandation",
    "resultats"
  ];

  const handleOptionSelect = (questionIndex: number, value: string | number | number[] | null) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: {
        value,
        score: 0 // Le score sera calculé plus tard
      }
    }));
  };

  const handlePrevious = () => {
    const currentIndex = sectionOrder.indexOf(currentSection);
    if (currentIndex > 0) {
      setCurrentSection(sectionOrder[currentIndex - 1]);
      // Scroll to top for better UX
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    const currentIndex = sectionOrder.indexOf(currentSection);
    if (currentIndex < sectionOrder.length - 1) {
      setCurrentSection(sectionOrder[currentIndex + 1]);
      // Scroll to top for better UX
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const showPrevious = sectionOrder.indexOf(currentSection) > 0;
  const showNext = sectionOrder.indexOf(currentSection) < sectionOrder.length - 1;

  return (
    <div className="container mx-auto px-4 py-8">
      <QuestionSection
        section={sections[currentSection]}
        onOptionSelect={handleOptionSelect}
        onPrevious={handlePrevious}
        onNext={handleNext}
        showPrevious={showPrevious}
        showNext={showNext}
        answers={answers}
      />
    </div>
  );
};
