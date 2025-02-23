
export const formatAnswersForSubmission = (answers: Record<string, Record<number, { value: string | number | number[] | null; score: number }>>) => {
  const formattedAnswers: Record<string, any> = {};

  // Formatage des réponses par section
  Object.entries(answers).forEach(([sectionKey, sectionAnswers]) => {
    if (sectionKey === 'informations') {
      Object.entries(sectionAnswers).forEach(([questionIndex, answer]) => {
        const prefix = 'info_';
        formattedAnswers[`${prefix}${questionIndex}`] = answer.value?.toString() || '';
      });
    } else {
      // Pour les autres sections (acquisition, activation, etc.)
      const prefix = sectionKey.substring(0, 3) + '_';
      Object.entries(sectionAnswers).forEach(([questionIndex, answer]) => {
        formattedAnswers[`${prefix}${questionIndex}`] = answer.value?.toString() || '';
      });
    }
  });

  return formattedAnswers;
};
