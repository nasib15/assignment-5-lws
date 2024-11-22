const getAnswerStyle = (option, selectedAnswer, correctAnswer) => {
  const baseStyle =
    "flex justify-between items-center p-4 rounded-lg border transition-all";

  if (option === selectedAnswer && option === correctAnswer) {
    return `${baseStyle} bg-green-100 border-green-200 text-green-700`;
  }
  if (option === selectedAnswer && option !== correctAnswer) {
    return `${baseStyle} bg-red-100 border-red-200 text-red-700`;
  }
  return `${baseStyle} border-gray-200 hover:border-gray-300`;
};

export default getAnswerStyle;
