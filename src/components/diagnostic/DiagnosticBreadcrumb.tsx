
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

const formatLabel = (label: string) => {
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
              <span className="text-sm text-gray-500">
                {currentStep.id === 'informations' ? 'Démarrage' : 'Étape précédente'}
              </span>
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

  // Créer un tableau combiné de tous les éléments (items + séparateurs)
  const breadcrumbItems = steps.reduce<React.ReactNode[]>((acc, step, index) => {
    if (index === 0) {
      acc.push(
        <BreadcrumbItem key="start">
          <span className="text-gray-500">Démarrage</span>
        </BreadcrumbItem>
      );
      acc.push(
        <BreadcrumbSeparator key="sep-start" className="text-gray-400">
          ❯
        </BreadcrumbSeparator>
      );
    }

    acc.push(
      <BreadcrumbItem key={`item-${step.id}`}>
        {step.id === currentStep.id ? (
          <BreadcrumbPage className="font-bold text-[#132720]">
            {formatLabel(step.label)}
          </BreadcrumbPage>
        ) : (
          <span className="text-gray-500">
            {formatLabel(step.label)}
          </span>
        )}
      </BreadcrumbItem>
    );

    if (index < steps.length - 1) {
      acc.push(
        <BreadcrumbSeparator key={`sep-${step.id}`} className="text-gray-400">
          ❯
        </BreadcrumbSeparator>
      );
    }

    return acc;
  }, []);

  return (
    <motion.div 
      className="mb-8"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Breadcrumb>
        <BreadcrumbList className="flex-wrap items-center gap-4">
          {breadcrumbItems}
        </BreadcrumbList>
      </Breadcrumb>
    </motion.div>
  );
};
