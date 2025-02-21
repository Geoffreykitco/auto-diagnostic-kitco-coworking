import { motion } from 'framer-motion';
import { CardStack } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { AuditHeader } from "./AuditHeader";

export const AuditFormContent = () => {
  return (
    <div className="max-w-3xl mx-auto px-4">
      <div className="space-y-8">
        <div className="bg-white rounded-lg p-6">
          <div className="text-center space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold">
              Augmentez le taux de remplissage de votre espace de coworking
            </h2>
            <div className="space-y-3">
              <p className="text-gray-600 text-sm md:text-base">
                Vous avez maintenant une vision claire de la performance de votre espace de coworking. 
                Mais comment transformer ces signaux en un plan d'action concret ?
              </p>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold">Evaluez votre espace de coworking</h3>
            <p className="text-gray-500">
              Répondez aux questions suivantes pour obtenir une analyse personnalisée de votre espace.
            </p>
          </div>

          <CardStack>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p>Question 1</p>
                <p className="text-gray-500">0%</p>
              </div>
              <Progress value={0} />
            </div>
          </CardStack>
        </div>
      </div>
    </div>
  );
};
