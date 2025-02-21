
import { useState } from "react";
import { QuestionSection } from "@/components/diagnostic/QuestionSection";
import { sections } from "@/data/sections";
import { Answer } from "@/components/diagnostic/question/types";

export const DiagnosticPage = () => {
  const [currentSection] = useState("informations");
  const [answers, setAnswers] = useState<Record<number, Answer>>({});

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
    // À implémenter pour la navigation entre sections
    console.log("Previous clicked");
  };

  const handleNext = () => {
    // À implémenter pour la navigation entre sections
    console.log("Next clicked");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <QuestionSection
        section={sections[currentSection]}
        onOptionSelect={handleOptionSelect}
        onPrevious={handlePrevious}
        onNext={handleNext}
        showPrevious={false} // Première section, pas de retour possible
        showNext={true}
        answers={answers}
      />
    </div>
  );
};
