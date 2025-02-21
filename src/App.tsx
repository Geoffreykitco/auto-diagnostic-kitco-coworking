
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route 
            path="/diagnostic/acquisition" 
            element={
              <QuestionSection 
                section={acquisitionSection}
                onOptionSelect={() => {}}
                onPrevious={() => {}}
                onNext={() => {}}
                showPrevious={false}
                showNext={true}
                answers={{}}
              />
            } 
          />
          <Route 
            path="/diagnostic/activation" 
            element={
              <QuestionSection 
                section={activationSection}
                onOptionSelect={() => {}}
                onPrevious={() => {}}
                onNext={() => {}}
                showPrevious={true}
                showNext={true}
                answers={{}}
              />
            }
          />
          <Route 
            path="/diagnostic/retention" 
            element={
              <QuestionSection 
                section={retentionSection}
                onOptionSelect={() => {}}
                onPrevious={() => {}}
                onNext={() => {}}
                showPrevious={true}
                showNext={true}
                answers={{}}
              />
            }
          />
          <Route 
            path="/diagnostic/revenus" 
            element={
              <QuestionSection 
                section={revenusSection}
                onOptionSelect={() => {}}
                onPrevious={() => {}}
                onNext={() => {}}
                showPrevious={true}
                showNext={true}
                answers={{}}
              />
            }
          />
          <Route 
            path="/diagnostic/recommandation" 
            element={
              <QuestionSection 
                section={recommandationSection}
                onOptionSelect={() => {}}
                onPrevious={() => {}}
                onNext={() => {}}
                showPrevious={true}
                showNext={true}
                answers={{}}
              />
            }
          />
          <Route 
            path="/diagnostic/resultats" 
            element={
              <QuestionSection 
                section={resultatsSection}
                onOptionSelect={() => {}}
                onPrevious={() => {}}
                onNext={() => {}}
                showPrevious={true}
                showNext={false}
                answers={{}}
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
