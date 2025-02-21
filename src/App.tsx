
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Layout } from "@/components/layout/Layout";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/diagnostic/acquisition" element={<div>Acquisition Section</div>} />
          <Route path="/diagnostic/activation" element={<div>Activation Section</div>} />
          <Route path="/diagnostic/retention" element={<div>Retention Section</div>} />
          <Route path="/diagnostic/revenus" element={<div>Revenus Section</div>} />
          <Route path="/diagnostic/recommandation" element={<div>Recommandation Section</div>} />
          <Route path="/diagnostic/resultats" element={<div>Résultats</div>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
      <Toaster />
    </BrowserRouter>
  );
}
