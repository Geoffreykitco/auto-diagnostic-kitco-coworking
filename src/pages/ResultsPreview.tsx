
import { ResultsAnalysis } from "@/components/diagnostic/ResultsAnalysis";

const mockAnswers = {
  acquisition: {
    0: 4,
    1: 3,
    2: 2,
    3: 4,
    4: 3
  },
  activation: {
    0: 2,
    1: 3,
    2: 4,
    3: 3,
    4: 2
  },
  retention: {
    0: 4,
    1: 4,
    2: 3,
    3: 2,
    4: 3
  },
  revenus: {
    0: 3,
    1: 2,
    2: 4,
    3: 3,
    4: 2
  },
  recommandation: {
    0: 4,
    1: 3,
    2: 2,
    3: 4,
    4: 3
  }
};

export const ResultsPreview = () => {
  return <ResultsAnalysis answers={mockAnswers} />;
};
