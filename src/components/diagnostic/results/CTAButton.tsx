import React from 'react';
import { Button } from "@/components/ui/button";
interface CTAButtonProps {
  onClick: () => void;
}
export const CTAButton: React.FC<CTAButtonProps> = ({
  onClick
}) => {
  return <div className="flex justify-center my-3 w-full">
      <Button onClick={onClick} variant="audit" className="w-full max-w-md text-sm sm:text-base rounded-md py-3 sm:py-[15px] md:py-[20px] text-center px-[12px] mx-0 my-0">Recevoir l'intégralité de mon audit</Button>
    </div>;
};