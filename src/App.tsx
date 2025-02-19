
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
      <Toaster />
    </BrowserRouter>
  );
}
