
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import { ResultsAnalysis } from "./components/diagnostic/ResultsAnalysis";
import "./App.css";

export default function App() {
  // Données simulées pour les réponses
  const mockAnswers = {
    acquisition: { 0: 5, 1: 3, 2: 4 },
    activation: { 0: 4, 1: 4, 2: 3 },
    retention: { 0: 3, 1: 5, 2: 4 },
    revenus: { 0: 4, 1: 3, 2: 5 },
    recommandation: { 0: 5, 1: 4, 2: 3 },
    informations: { 0: 0, 1: 0, 2: 0 }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen bg-background">
            <ResultsAnalysis answers={mockAnswers} />
          </div>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
