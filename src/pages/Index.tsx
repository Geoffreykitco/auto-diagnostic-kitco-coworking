
import { Link, useNavigate } from "react-router-dom";
import { HeroSection } from "@/components/diagnostic/HeroSection";
import { HowItWorks } from "@/components/diagnostic/HowItWorks";

export default function Index() {
  const navigate = useNavigate();
  
  const handleStart = () => {
    navigate('/results-preview');
  };

  return (
    <div className="container mx-auto px-4">
      {/* Lien temporaire pour la preview */}
      <div className="fixed top-4 right-4 z-50">
        <Link 
          to="/results-preview" 
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
        >
          Voir la page résultats
        </Link>
      </div>

      <HeroSection onStart={handleStart} />
      <HowItWorks />
    </div>
  );
}
