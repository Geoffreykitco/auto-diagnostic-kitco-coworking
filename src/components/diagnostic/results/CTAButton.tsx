
import React from 'react';
import { Button } from "@/components/ui/button";

interface CTAButtonProps {
  onClick: () => void;
}

export const CTAButton: React.FC<CTAButtonProps> = ({ onClick }) => {
  return (
    <div className="flex justify-center my-3">
      <Button 
        onClick={onClick} 
        variant="audit" 
        className="w-full sm:w-auto text-sm sm:text-base rounded-md px-3 sm:px-[15px] md:px-[20px] py-3 sm:py-[15px] md:py-[20px]"
      >
        Recevoir l'intégralité de mon audit en PDF
      </Button>
    </div>
  );
};
