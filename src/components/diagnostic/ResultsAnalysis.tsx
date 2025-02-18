
import { useEffect } from "react";
import { sections } from "@/data/sections";
import { useToast } from "@/hooks/use-toast";
import { GlobalScore } from "./sections/GlobalScore";
import { SectionScore } from "./sections/SectionScore";
import { AuditForm } from "./sections/AuditForm";
import { calculateSectionScore, getGlobalAnalysis, getSectionAnalysis, getSectionLevel } from "@/utils/diagnosticUtils";

interface ResultsAnalysisProps {
  answers: Record<string, Record<number, number>>;
}

export const ResultsAnalysis = ({
  answers
}: ResultsAnalysisProps) => {
  const { toast } = useToast();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const sectionsToAnalyze = ['acquisition', 'activation', 'retention', 'revenus', 'recommandation'];
  const sectionWeights = {
    acquisition: 0.25,
    activation: 0.25,
    retention: 0.20,
    revenus: 0.15,
    recommandation: 0.15
  };

  const globalScore = sectionsToAnalyze.reduce((sum, section) => {
    const sectionScore = calculateSectionScore(answers[section], section);
    return sum + (sectionScore * sectionWeights[section as keyof typeof sectionWeights]);
  }, 0);

  const saveToBaserow = async (formData: {
    firstName: string;
    lastName: string;
    coworkingName: string;
    email: string;
    photo: File | null;
  }) => {
    try {
      const diagnosticData = {
        global_score: Math.round(globalScore),
        global_level: getSectionLevel(globalScore),
        global_analysis: getGlobalAnalysis(globalScore),
        sections: sectionsToAnalyze.map(sectionName => ({
          name: sections[sectionName].title,
          score: Math.round(calculateSectionScore(answers[sectionName], sectionName)),
          level: getSectionLevel(calculateSectionScore(answers[sectionName], sectionName)),
          analysis: getSectionAnalysis(sectionName, calculateSectionScore(answers[sectionName], sectionName))
        })),
        created_at: new Date().toISOString(),
        first_name: formData.firstName,
        last_name: formData.lastName,
        coworking_name: formData.coworkingName,
        email: formData.email
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
        throw new Error('Failed to save diagnostic results');
      }

      toast({
        title: "Audit envoyé !",
        description: "Vous recevrez votre audit par email dans quelques instants.",
        duration: 3000,
      });

      console.log('Diagnostic results saved successfully');
    } catch (error) {
      console.error('Error saving diagnostic results:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi de l'audit.",
        duration: 3000,
      });
    }
  };

  return (
    <div className="space-y-8">
      <GlobalScore 
        score={globalScore}
        level={getSectionLevel(globalScore)}
        analysis={getGlobalAnalysis(globalScore)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sectionsToAnalyze.map((sectionName, index) => {
          const score = Math.round(calculateSectionScore(answers[sectionName], sectionName));
          if (index === sectionsToAnalyze.length - 1) {
            return (
              <>
                <SectionScore
                  key={sectionName}
                  title={sections[sectionName].title}
                  score={score}
                  level={getSectionLevel(score)}
                  analysis={getSectionAnalysis(sectionName, score)}
                  index={index}
                />
                <AuditForm onSubmit={saveToBaserow} />
              </>
            );
          }
          return (
            <SectionScore
              key={sectionName}
              title={sections[sectionName].title}
              score={score}
              level={getSectionLevel(score)}
              analysis={getSectionAnalysis(sectionName, score)}
              index={index}
            />
          );
        })}
      </div>
    </div>
  );
};
