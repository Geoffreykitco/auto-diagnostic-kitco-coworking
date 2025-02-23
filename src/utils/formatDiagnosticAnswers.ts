
export const formatAnswersForSubmission = (answers: Record<string, Record<number, { value: string | number | number[] | null; score: number }>>) => {
  const formattedAnswers: Record<string, any> = {};

  // Pour l'instant, on ne formate pas les réponses pour se concentrer sur les scores
  return formattedAnswers;
};
