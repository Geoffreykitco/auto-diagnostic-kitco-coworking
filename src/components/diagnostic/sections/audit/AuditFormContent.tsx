
import { motion } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { AuditHeader } from "./AuditHeader";

export const AuditFormContent = () => {
  return (
    <div className="max-w-3xl mx-auto px-4">
      <div className="space-y-8">        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold">Evaluez votre espace de coworking</h3>
            <p className="text-gray-500">
              Répondez aux questions suivantes pour obtenir une analyse personnalisée de votre espace.
            </p>
          </div>

          <Card className="p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p>Question 1</p>
                <p className="text-gray-500">0%</p>
              </div>
              <Progress value={0} />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
