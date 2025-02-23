
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileForm } from "../form/MobileForm";
import { DesktopForm } from "../form/DesktopForm";
import { FormEventHandler } from "react";

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

export const MainContent = ({ open, setOpen, formProps }: MainContentProps) => {
  const isMobile = useIsMobile();

  return (
    <div className={`${isMobile ? 'w-full max-w-full overflow-x-hidden' : 'max-w-5xl'} mx-auto px-4 py-8`}>
      <div className="text-center space-y-2">
        <h2 className="font-semibold text-gray-900 text-xl">
          {isMobile ? "Augmentez le taux de remplissage de votre coworking" : "Envie d'augmenter le taux de remplissage de votre coworking ?"}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto md:text-base text-sm">
          Vous avez maintenant une vision claire de la performance de votre espace de coworking.
        </p>

        <div>
          <button 
            onClick={() => setOpen(true)}
            className="mt-2 bg-[#0B1A17] text-white px-6 py-2.5 rounded-lg text-sm md:text-base hover:bg-[#132721] hover:scale-[1.02] transform transition-colors duration-200"
          >
            Recevoir mon audit et mon plan d'action
          </button>

          {open && (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent 
                className={`${
                  isMobile 
                    ? 'w-full h-[100dvh] max-w-full m-0 rounded-none border-0' 
                    : 'max-w-4xl rounded-2xl'
                } p-0 bg-white overflow-hidden`}
                onPointerDownOutside={(e) => e.preventDefault()}
                onFocusOutside={(e) => e.preventDefault()}
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

          <p className="font-medium mt-1 text-gray-500 text-xs">
            Nous garantissons la confidentialité de vos données.
          </p>
        </div>
      </div>
    </div>
  );
};

