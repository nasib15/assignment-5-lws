export const saveQuizProgress = (quizId, data) => {
  localStorage.setItem(`quiz_progress_${quizId}`, JSON.stringify(data));
};

export const loadQuizProgress = (quizId) => {
  const progress = localStorage.getItem(`quiz_progress_${quizId}`);
  return progress ? JSON.parse(progress) : null;
};

export const clearQuizProgress = (quizId) => {
  localStorage.removeItem(`quiz_progress_${quizId}`);
};
