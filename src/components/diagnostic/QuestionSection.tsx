
import { motion } from 'framer-motion';

interface Option {
  label: string;
  points: number;
}

interface Question {
  question: string;
  tooltip: string;
  options: Option[];
}

interface Section {
  title: string;
  questions: Question[];
}

interface QuestionSectionProps {
  section: Section;
  onOptionSelect: (questionIndex: number, points: number) => void;
}

export const QuestionSection = ({ section, onOptionSelect }: QuestionSectionProps) => (
  <div className="container mx-auto max-w-4xl px-4 py-12">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <h2 className="text-3xl font-bold text-primary mb-8">
        {section.title}
      </h2>
      {section.questions.map((q, questionIndex) => (
        <motion.div
          key={questionIndex}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: questionIndex * 0.2 }}
          className="glass-morphism rounded-lg p-6 space-y-4"
        >
          <div className="flex items-start gap-2">
            <h3 className="text-xl font-semibold text-primary">{q.question}</h3>
            <button 
              className="text-gray-400 hover:text-primary"
              title={q.tooltip}
            >
              (i)
            </button>
          </div>
          <div className="space-y-3">
            {q.options.map((option, optionIndex) => (
              <button
                key={optionIndex}
                onClick={() => onOptionSelect(questionIndex, option.points)}
                className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-primary hover:bg-primary/5 transition-all duration-200"
              >
                {option.label}
              </button>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  </div>
);
