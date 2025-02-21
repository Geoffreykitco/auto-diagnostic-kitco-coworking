
import { useNavigate } from "react-router-dom";
import { HeroSection } from "@/components/diagnostic/HeroSection";
import { HowItWorks } from "@/components/diagnostic/HowItWorks";

export default function Index() {
  const navigate = useNavigate();
  
  const handleStart = () => {
    navigate('/diagnostic');
  };

  return (
    <div className="container mx-auto px-4">
      <HeroSection onStart={handleStart} />
      <HowItWorks />
    </div>
  );
}
