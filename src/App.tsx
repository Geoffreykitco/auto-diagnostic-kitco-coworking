
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Layout } from "@/components/layout/Layout";
import { QuestionSection } from "@/components/diagnostic/QuestionSection";
import { acquisitionSection } from "@/data/sections/acquisition";
import { activationSection } from "@/data/sections/activation";
import { retentionSection } from "@/data/sections/retention";
import { revenusSection } from "@/data/sections/revenus";
import { recommandationSection } from "@/data/sections/recommandation";
import { resultatsSection } from "@/data/sections/resultats";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import "./App.css";

const DiagnosticRoute = ({ 
  section, 
  showPrevious, 
  showNext, 
  previousPath, 
  nextPath 
}: { 
  section: any, 
  showPrevious: boolean, 
  showNext: boolean,
  previousPath: string,
  nextPath: string
}) => {
  const navigate = useNavigate();

  const handlePrevious = () => {
    navigate(previousPath);
  };

  const handleNext = () => {
    navigate(nextPath);
  };

  return (
    <QuestionSection 
      section={section}
      onOptionSelect={() => {}}
      onPrevious={handlePrevious}
      onNext={handleNext}
      showPrevious={showPrevious}
      showNext={showNext}
      answers={{}}
    />
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route 
            path="/diagnostic/acquisition" 
            element={
              <DiagnosticRoute 
                section={acquisitionSection}
                showPrevious={false}
                showNext={true}
                previousPath="/"
                nextPath="/diagnostic/activation"
              />
            } 
          />
          <Route 
            path="/diagnostic/activation" 
            element={
              <DiagnosticRoute 
                section={activationSection}
                showPrevious={true}
                showNext={true}
                previousPath="/diagnostic/acquisition"
                nextPath="/diagnostic/retention"
              />
            }
          />
          <Route 
            path="/diagnostic/retention" 
            element={
              <DiagnosticRoute 
                section={retentionSection}
                showPrevious={true}
                showNext={true}
                previousPath="/diagnostic/activation"
                nextPath="/diagnostic/revenus"
              />
            }
          />
          <Route 
            path="/diagnostic/revenus" 
            element={
              <DiagnosticRoute 
                section={revenusSection}
                showPrevious={true}
                showNext={true}
                previousPath="/diagnostic/retention"
                nextPath="/diagnostic/recommandation"
              />
            }
          />
          <Route 
            path="/diagnostic/recommandation" 
            element={
              <DiagnosticRoute 
                section={recommandationSection}
                showPrevious={true}
                showNext={true}
                previousPath="/diagnostic/revenus"
                nextPath="/diagnostic/resultats"
              />
            }
          />
          <Route 
            path="/diagnostic/resultats" 
            element={
              <DiagnosticRoute 
                section={resultatsSection}
                showPrevious={true}
                showNext={false}
                previousPath="/diagnostic/recommandation"
                nextPath=""
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
      <Toaster />
    </BrowserRouter>
  );
}
