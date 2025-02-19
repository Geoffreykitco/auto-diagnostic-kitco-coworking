
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

  if (isMobile) {
    return (
      <motion.div
        className="mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <span className="text-sm text-gray-500">
                {currentStep.id === 'informations' ? 'Démarrage' : 'Étape précédente'}
              </span>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-gray-400 mx-2">❯</BreadcrumbSeparator>
            <BreadcrumbItem>
              <span className="text-sm font-semibold text-[#132720]">
                {currentStep.label}
              </span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="mb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Breadcrumb>
        <BreadcrumbList className="flex items-center flex-wrap gap-2">
          {steps.map((step, index) => (
            <BreadcrumbItem key={step.id}>
              {index > 0 && (
                <BreadcrumbSeparator className="text-gray-400 mx-2">❯</BreadcrumbSeparator>
              )}
              {step.id === currentStep.id ? (
                <BreadcrumbPage className="font-semibold text-[#132720]">
                  {index === 0 ? 'Démarrage' : step.label}
                </BreadcrumbPage>
              ) : (
                <span className="text-gray-500">
                  {index === 0 ? 'Démarrage' : step.label}
                </span>
              )}
            </BreadcrumbItem>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </motion.div>
  );
};
