
export const getScoreColor = (score: number): string => {
  if (score >= 80) return "bg-green-500";
  if (score >= 50) return "bg-yellow-500";
  return "bg-red-500";
};

export const getNiveau = (score: number): string => {
  if (score >= 80) return "Avancé";
  if (score >= 50) return "Intermédiaire";
  return "Débutant";
};

export const calculateSectionScore = (answers: Record<number, { score: number }>): number => {
  const totalPoints = Object.values(answers).reduce((sum, answer) => sum + answer.score, 0);
  const maxPoints = Object.values(answers).length * 100;
  return Math.round((totalPoints / maxPoints) * 100);
};
