import { CheckIcon, CrossIcon } from "../SVG/Icon";

const Question = ({ question, index, attempt }) => {
  // find correct answer
  const correctAnswer = attempt?.correct_answers?.find(
    (answer) => answer?.question_id === question?.id
  )?.answer;

  // find selected answer
  const selectedAnswer = attempt?.submitted_answers?.find(
    (answer) => answer?.question_id === question?.id
  )?.answer;

  // get color style based on the selected answer and correct answer
  const getAnswerStyle = (option) => {
    if (option === correctAnswer) {
      return "bg-green-100 flex justify-between items-center";
    }
    if (option === selectedAnswer && option !== correctAnswer) {
      return "bg-red-100 flex justify-between items-center";
    }
    return "flex items-center";
  };

  return (
    <div className="rounded-lg overflow-hidden shadow-sm mb-4">
      <div className="bg-white p-6 !pb-2">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {index + 1}. {question?.question}
          </h3>
        </div>
        <div className="space-y-2">
          {question?.options.map((option, idx) => (
            <label
              key={idx}
              className={`space-x-3 p-2 rounded ${getAnswerStyle(option)}`}
            >
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  name={`question-${question?.id}`}
                  className="form-radio text-buzzr-purple"
                  disabled
                  checked={option === selectedAnswer}
                />
                <span>{option}</span>
              </div>
              {option === correctAnswer && <CheckIcon />}
              {option === selectedAnswer && option !== correctAnswer && (
                <CrossIcon />
              )}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Question;
