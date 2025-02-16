
import { motion } from 'framer-motion';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface Step {
  id: string;
  label: string;
}

interface DiagnosticBreadcrumbProps {
  steps: Step[];
  currentStep: Step | undefined;
}

export const DiagnosticBreadcrumb = ({ steps, currentStep }: DiagnosticBreadcrumbProps) => {
  if (!currentStep) return null;

  // Créer un tableau complet des étapes incluant les informations
  const allSteps = [
    { id: 'informations', label: 'Informations' },
    ...steps
  ];

  return (
    <motion.div 
      className="mb-8"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Breadcrumb>
        <BreadcrumbList className="flex-wrap">
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Diagnostic</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {allSteps.map((step, index) => (
            <BreadcrumbItem key={step.id}>
              {step.id === currentStep.id ? (
                <BreadcrumbPage className="font-bold text-lg text-primary">
                  {step.label === "Referal" ? "Recommandation" : step.label}
                </BreadcrumbPage>
              ) : (
                <>
                  <BreadcrumbLink 
                    className="text-gray-500"
                    href="#"
                  >
                    {step.label === "Referal" ? "Recommandation" : step.label}
                  </BreadcrumbLink>
                </>
              )}
              {index < allSteps.length - 1 && <BreadcrumbSeparator />}
            </BreadcrumbItem>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </motion.div>
  );
};
