
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Layout } from "@/components/layout/Layout";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import { QuestionSection } from "@/components/diagnostic/QuestionSection";
import { sections } from "@/data/sections";
import { useDiagnosticState } from "@/hooks/use-diagnostic-state";
import { useToast } from "@/hooks/use-toast";
import "./App.css";

export default function App() {
  const { toast } = useToast();
  const diagnostic = useDiagnosticState({ toast });

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route
            path="/diagnostic"
            element={
              <QuestionSection
                section={sections[diagnostic.currentSection]}
                onOptionSelect={diagnostic.handleOptionSelect}
                onPrevious={diagnostic.handlePrevious}
                onNext={diagnostic.handleNext}
                showPrevious={diagnostic.currentSection !== 'informations'}
                showNext={true}
                answers={diagnostic.answers[diagnostic.currentSection] || {}}
              />
            }
          />
          <Route path="/results-preview" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
      <Toaster />
    </BrowserRouter>
  );
}
