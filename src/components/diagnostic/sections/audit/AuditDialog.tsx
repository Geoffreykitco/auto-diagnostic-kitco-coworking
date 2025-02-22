
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { useState } from "react";
import { AuditFormContent } from "./AuditFormContent";

interface AuditDialogProps {
  fullName: string;
  coworkingName: string;
  email: string;
  isSubmitting: boolean;
  onFullNameChange: (value: string) => void;
  onCoworkingNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => Promise<boolean>;
  onOpenChange: (open: boolean) => void;
  open: boolean;
}

export const AuditDialog = ({
  fullName,
  coworkingName,
  email,
  isSubmitting,
  onFullNameChange,
  onCoworkingNameChange,
  onEmailChange,
  onSubmit,
  onOpenChange,
  open
}: AuditDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className="w-full bg-[#0B1A17] hover:bg-[#132721] text-white font-semibold py-3 md:py-4 px-6 md:px-8 rounded-lg shadow-md transition-all duration-200 text-sm md:text-base"
        >
          Recevez votre audit et découvrez votre feuille de route personnalisée
        </motion.button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[900px] p-0 gap-0">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 p-6 md:p-8">
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-[#0B1A17] mb-2">
                Optimisez le taux de remplissage de votre coworking
              </h3>
              <p className="text-gray-600 text-base">
                Vous avez maintenant une vision claire de la performance de votre espace de coworking.
              </p>
            </div>

            <AuditFormContent
              fullName={fullName}
              coworkingName={coworkingName}
              email={email}
              isSubmitting={isSubmitting}
              onFullNameChange={onFullNameChange}
              onCoworkingNameChange={onCoworkingNameChange}
              onEmailChange={onEmailChange}
              onSubmit={onSubmit}
            />
          </div>

          <div className="w-full md:w-1/2 h-full md:min-h-[600px]">
            <img
              src="/lovable-uploads/c6f25897-c1f1-44a7-b3cc-49493e48f1b1.png"
              alt="Personnes travaillant dans un espace de coworking"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
