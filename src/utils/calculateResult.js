const calculateResult = (submittedAnswers, correctAnswers) => {
  let score = 0;
  let correct = 0;
  let wrong = 0;

  // Compare each submitted answer with correct answer
  submittedAnswers.forEach((submittedAnswer) => {
    // Find matching correct answer
    const correctAnswer = correctAnswers.find(
      (answer) => answer.question_id === submittedAnswer.question_id
    );

    if (correctAnswer && submittedAnswer.answer === correctAnswer.answer) {
      score += correctAnswer.marks;
      correct++;
    } else {
      wrong++;
    }
  });

  return {
    score,
    correct,
    wrong,
    total: submittedAnswers.length,
  };
};

export default calculateResult;
