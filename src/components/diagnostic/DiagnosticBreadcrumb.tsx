
import { motion } from 'framer-motion';
import { useIsMobile } from "@/hooks/use-mobile";
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

const formatLabel = (label: string) => {
  // Si le label contient un tiret, ne prendre que la partie avant le tiret
  if (label.includes('-')) {
    return label.split('-')[0].trim();
  }
  return label;
};

export const DiagnosticBreadcrumb = ({ steps, currentStep }: DiagnosticBreadcrumbProps) => {
  const isMobile = useIsMobile();
  
  if (!currentStep) return null;

  if (isMobile) {
    return (
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Breadcrumb>
          <BreadcrumbList className="flex-wrap">
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="text-sm">
                {currentStep.id === 'informations' ? 'Démarrage' : 'Retour'}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-bold text-primary text-sm">
                {currentStep.label === "Referal" ? "Recommandation" : currentStep.label}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </motion.div>
    );
  }

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
            <BreadcrumbLink href="/">Démarrage</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {steps.map((step, index) => (
            <BreadcrumbItem key={step.id}>
              {step.id === currentStep.id ? (
                <BreadcrumbPage className="font-bold text-lg text-primary">
                  {formatLabel(step.label)}
                </BreadcrumbPage>
              ) : (
                <>
                  <BreadcrumbLink 
                    className="text-gray-500"
                    href="#"
                  >
                    {formatLabel(step.label)}
                  </BreadcrumbLink>
                </>
              )}
              {index < steps.length - 1 && <BreadcrumbSeparator />}
            </BreadcrumbItem>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </motion.div>
  );
};
