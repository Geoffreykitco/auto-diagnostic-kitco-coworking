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
  return <div className={`${isMobile ? 'w-full max-w-full overflow-x-hidden' : 'max-w-5xl'} mx-auto px-4 py-4`}>
      <div className="text-center space-y-1.5">
        <h2 className="text-xl font-bold text-black py-0 md:text-lg text-center">
          {isMobile ? "Augmentez le taux de remplissage de votre coworking" : "1er service pensé pour booster les performances d'un espace de coworking"}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-xs md:text-sm">Kitco par le fondateur de l'esapce de coworking au19 qui dispose d'un taux de remplissage moyen de 83% grâce à cette méthode de travail.</p>

        <div>
          <Button onClick={() => setOpen(true)} variant="audit" className="mt-2 md:text-base text-lg rounded-md my-[10px] px-[20px] py-[20px]">Recevoir l'intégralité de mon audit en PDF</Button>

          {open && <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent className={`${isMobile ? 'w-full h-[100dvh] max-w-full m-0 rounded-none border-0' : 'max-w-4xl rounded-2xl'} p-0 bg-white overflow-hidden`} onPointerDownOutside={e => e.preventDefault()} onFocusOutside={e => e.preventDefault()}>
                <DialogHeader className="sr-only">
                  <DialogTitle>Formulaire de contact</DialogTitle>
                  <DialogDescription>
                    Remplissez ce formulaire pour recevoir votre audit personnalisé
                  </DialogDescription>
                </DialogHeader>
                {isMobile ? <MobileForm {...formProps} /> : <DesktopForm {...formProps} />}
              </DialogContent>
            </Dialog>}

          
        </div>
      </div>
    </div>;
};