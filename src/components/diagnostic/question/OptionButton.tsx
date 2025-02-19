
import { Check } from "lucide-react";
import { motion } from "framer-motion";

interface OptionButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export const OptionButton = ({ label, isSelected, onClick }: OptionButtonProps) => {
  return (
    <motion.button
      onClick={onClick}
      className={
        isSelected
          ? "relative w-full p-4 text-left rounded-lg transition-all duration-200 flex items-center justify-between gap-3 text-sm md:text-base border bg-white border-2 border-[#12271F] text-gray-900 shadow-sm font-medium"
          : "relative w-full p-4 text-left rounded-lg transition-all duration-200 flex items-center justify-between gap-3 text-sm md:text-base border bg-gray-50/80 hover:bg-gray-50 text-gray-700 border-gray-100 hover:border-[#12271F]/20 hover:shadow-sm"
      }
      whileHover={{ scale: 1.005 }}
      whileTap={{ scale: 0.995 }}
    >
      <span className="flex-1">{label}</span>
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 400,
            damping: 10
          }}
          className="rounded-full p-1 bg-[#12271F]"
        >
          <Check className="h-4 w-4 text-white" />
        </motion.div>
      )}
    </motion.button>
  );
};
