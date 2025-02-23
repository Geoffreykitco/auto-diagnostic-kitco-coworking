
export const formatAnswersForSubmission = (answers: Record<string, Record<number, { value: string | number | number[] | null; score: number }>>) => {
  const formattedAnswers: Record<string, any> = {};

  // Formatage des réponses par section
  Object.entries(answers).forEach(([sectionKey, sectionAnswers]) => {
    if (sectionKey === 'informations') {
      // Pour la section informations, on utilise le préfixe info_
      Object.entries(sectionAnswers).forEach(([questionIndex, answer]) => {
        const value = Array.isArray(answer.value) 
          ? answer.value.join(', ') // Si c'est un tableau, on le joint avec des virgules
          : answer.value?.toString() || ''; // Sinon on convertit en string
        formattedAnswers[`info_${questionIndex}`] = value;
      });
    } else {
      // Pour toutes les autres sections (acquisition, activation, resultats, etc.)
      const prefix = sectionKey.substring(0, 3) + '_';
      Object.entries(sectionAnswers).forEach(([questionIndex, answer]) => {
        const value = Array.isArray(answer.value) 
          ? answer.value.join(', ') // Si c'est un tableau, on le joint avec des virgules
          : answer.value?.toString() || ''; // Sinon on convertit en string
        formattedAnswers[`${prefix}${questionIndex}`] = value;
      });
    }
  });

  return formattedAnswers;
};
