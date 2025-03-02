import React from 'react';
import { Button } from "@/components/ui/button";
interface CTAButtonProps {
  onClick: () => void;
}
export const CTAButton: React.FC<CTAButtonProps> = ({
  onClick
}) => {
  return <div className="flex justify-center my-3 w-full">
      <Button onClick={onClick} variant="audit" className="w-full max-w-md text-sm sm:text-base rounded-md py-3 sm:py-[15px] md:py-[20px] my-0 px-0 mx-[10px] text-center">
        Recevoir l'intégralité de mon audit en PDF
      </Button>
    </div>;
};