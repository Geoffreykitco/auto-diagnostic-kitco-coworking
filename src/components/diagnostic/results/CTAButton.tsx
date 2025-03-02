
import React from 'react';
import { Button } from "@/components/ui/button";

interface CTAButtonProps {
  onClick: () => void;
}

export const CTAButton: React.FC<CTAButtonProps> = ({ onClick }) => {
  return (
    <div className="text-left my-3 flex justify-center">
      <Button 
        onClick={onClick} 
        variant="audit" 
        className="max-w-xs md:max-w-md text-sm md:text-base rounded-md px-4 py-3 md:px-[20px] md:py-[20px]"
      >
        Recevoir l'intégralité de mon audit en PDF
      </Button>
    </div>
  );
};
