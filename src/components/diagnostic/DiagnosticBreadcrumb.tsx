
import { motion } from 'framer-motion';
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
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
  const isMobile = useIsMobile();

  if (!currentStep || !steps?.length) return null;

  const getShortLabel = (label: string) => {
    return label.split(' - ')[0];
  };

  if (isMobile) {
    return (
      <motion.div
        className="w-full px-4 py-2 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <span className="text-sm text-muted-foreground">
                {currentStep.id === 'informations' ? 'Démarrage' : 'Étape précédente'}
              </span>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="mx-2">❯</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-sm font-medium">
                {getShortLabel(currentStep.label)}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="w-full px-4 py-2 mb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Breadcrumb>
        <BreadcrumbList className="flex items-center gap-2">
          {steps.map((step, index) => (
            <BreadcrumbItem key={step.id}>
              {index > 0 && <BreadcrumbSeparator className="mx-2">❯</BreadcrumbSeparator>}
              {step.id === currentStep.id ? (
                <BreadcrumbPage className="font-medium">
                  {index === 0 ? 'Démarrage' : getShortLabel(step.label)}
                </BreadcrumbPage>
              ) : (
                <span className="text-muted-foreground">
                  {index === 0 ? 'Démarrage' : getShortLabel(step.label)}
                </span>
              )}
            </BreadcrumbItem>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </motion.div>
  );
};
