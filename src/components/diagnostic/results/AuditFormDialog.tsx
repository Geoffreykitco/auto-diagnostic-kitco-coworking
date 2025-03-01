
import React from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileForm } from "./form/MobileForm";
import { DesktopForm } from "./form/DesktopForm";

interface AuditFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formProps: {
    fullName: string;
    setFullName: (value: string) => void;
    coworkingName: string;
    setCoworkingName: (value: string) => void;
    email: string;
    setEmail: (value: string) => void;
    isSubmitting: boolean;
    handleFormSubmit: React.FormEventHandler<HTMLFormElement>;
  };
}

export const AuditFormDialog: React.FC<AuditFormDialogProps> = ({ 
  open, 
  onOpenChange,
  formProps 
}) => {
  const isMobile = useIsMobile();
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
  );
};
