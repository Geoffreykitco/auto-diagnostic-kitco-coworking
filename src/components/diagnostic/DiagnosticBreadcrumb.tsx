
import { motion } from 'framer-motion';
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
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

// Composant pour le séparateur avec une clé unique
const BreadcrumbDivider = ({ stepId }: { stepId: string }) => (
  <BreadcrumbSeparator 
    key={`separator-${stepId}`} 
    className="text-gray-400 select-none"
    aria-hidden="true"
  >
    ❯
  </BreadcrumbSeparator>
);

// Composant pour le texte du breadcrumb
const BreadcrumbText = ({ 
  isActive, 
  children 
}: { 
  isActive: boolean;
  children: React.ReactNode;
}) => {
  const className = cn(
    "transition-colors duration-200",
    isActive ? "font-bold text-[#132720]" : "text-gray-500 hover:text-gray-700"
  );

  return isActive ? (
    <BreadcrumbPage className={className}>
      {children}
    </BreadcrumbPage>
  ) : (
    <span className={className}>
      {children}
    </span>
  );
};

export const DiagnosticBreadcrumb = ({ steps, currentStep }: DiagnosticBreadcrumbProps) => {
  const isMobile = useIsMobile();

  // Protection contre les valeurs undefined
  if (!currentStep || !steps?.length) {
    console.warn('DiagnosticBreadcrumb: Missing required props');
    return null;
  }

  // Version mobile
  if (isMobile) {
    const previousLabel = currentStep.id === 'informations' ? 'Démarrage' : 'Étape précédente';
    const currentLabel = currentStep.label === "Referal" ? "Recommandation" : currentStep.label;

    return (
      <motion.nav
        className="mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        aria-label="Fil d'ariane"
      >
        <Breadcrumb>
          <BreadcrumbList className="flex-wrap items-center gap-2">
            <BreadcrumbItem>
              <span className="text-sm text-gray-500">
                {previousLabel}
              </span>
            </BreadcrumbItem>
            <BreadcrumbDivider stepId="mobile" />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-bold text-primary text-sm">
                {currentLabel}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </motion.nav>
    );
  }

  // Version desktop
  return (
    <motion.nav
      className="mb-8"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      aria-label="Fil d'ariane"
    >
      <Breadcrumb>
        <BreadcrumbList className="flex-wrap items-center gap-2 md:gap-4">
          {steps.map((step, index) => (
            <BreadcrumbItem key={`item-${step.id}`}>
              {/* First item doesn't need a separator */}
              {index > 0 && <BreadcrumbDivider stepId={step.id} />}
              <BreadcrumbText isActive={step.id === currentStep.id}>
                {index === 0 ? 'Démarrage' : step.label.split('-')[0].trim()}
              </BreadcrumbText>
            </BreadcrumbItem>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </motion.nav>
  );
};
