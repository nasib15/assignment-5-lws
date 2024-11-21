import useAuth from "../../hooks/useAuth";
import { CheckIcon, CrossIcon } from "../SVG/Icon";

const Question = ({ question, index, userResultData = {}, onEdit }) => {
  const { auth } = useAuth();

  const isAdmin = auth?.user?.role === "admin";

  // find correct answer
  const correctAnswer =
    userResultData?.correct_answers?.find(
      (answer) => answer?.question_id === question?.id
    )?.answer || question?.correctAnswer;

  // find selected answer
  const selectedAnswer = userResultData?.submitted_answers?.find(
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
                  checked={
                    option === selectedAnswer || option === correctAnswer
                  }
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

      {/* admins can delete and edit question */}
      {isAdmin && (
        <div className="flex space-x-4 bg-primary/10 px-6 py-2">
          <button className="text-red-600 hover:text-red-800 font-medium">
            Delete
          </button>
          <button
            onClick={() => onEdit(question)}
            className="text-primary hover:text-primary/80 font-medium"
          >
            Edit Question
          </button>
        </div>
      )}
    </div>
  );
};
export default Question;
