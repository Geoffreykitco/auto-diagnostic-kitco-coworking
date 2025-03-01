
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileForm } from "../form/MobileForm";
import { DesktopForm } from "../form/DesktopForm";
import { FormEventHandler } from "react";
import { Button } from "@/components/ui/button";

interface MainContentProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  formProps: {
    fullName: string;
    setFullName: (value: string) => void;
    coworkingName: string;
    setCoworkingName: (value: string) => void;
    email: string;
    setEmail: (value: string) => void;
    isSubmitting: boolean;
    handleFormSubmit: FormEventHandler<HTMLFormElement>;
  };
}

export const MainContent = ({
  open,
  setOpen,
  formProps
}: MainContentProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="w-full mx-auto px-3 sm:px-4 py-3 sm:py-4 max-w-full sm:max-w-5xl overflow-x-hidden">
      <div className="text-center space-y-1 sm:space-y-1.5">
        <h2 className="text-base sm:text-lg md:text-xl font-bold text-black py-0 text-center">
          {isMobile ? "Augmentez le taux de remplissage de votre coworking" : "1er service pensé pour booster les performances d'un espace de coworking"}
        </h2>
        <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base font-medium text-gray-600">
          Kitco par le fondateur de l'espace de coworking au19 qui dispose d'un taux de remplissage moyen de 83% grâce à cette méthode de travail.
        </p>

        <div className="mt-2 sm:mt-3">
          <a href="https://calendar.app.google/9xhMZ7tDMArPJzFt5" target="_blank" rel="noopener noreferrer">
            <Button variant="audit" className="w-full sm:w-auto text-sm sm:text-base rounded-md my-2 px-3 sm:px-[15px] md:px-[20px] py-3 sm:py-[15px] md:py-[20px]">
              Prendre RDV avec Geoffrey
            </Button>
          </a>

          {open && (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent 
                className={`${isMobile ? 'w-full h-[100dvh] max-w-full m-0 rounded-none border-0' : 'max-w-4xl rounded-2xl'} p-0 bg-white overflow-hidden`} 
                onPointerDownOutside={e => e.preventDefault()} 
                onFocusOutside={e => e.preventDefault()}
              >
                <DialogHeader className="sr-only">
                  <DialogTitle>Formulaire de contact</DialogTitle>
                  <DialogDescription>
                    Remplissez ce formulaire pour recevoir votre audit personnalisé
                  </DialogDescription>
                </DialogHeader>
                {isMobile ? <MobileForm {...formProps} /> : <DesktopForm {...formProps} />}
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </div>
  );
};
