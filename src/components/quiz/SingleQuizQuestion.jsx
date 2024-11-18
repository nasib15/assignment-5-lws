import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { actions } from "../../actions";
import useAxios from "../../hooks/useAxios";
import useQuiz from "../../hooks/useQuiz";

const SingleQuizQuestion = ({
  currentQuestionIndex,
  setCurrentQuestionIndex,
}) => {
  const { state, dispatch } = useQuiz();
  const { api } = useAxios();
  const [randomizedOptions, setRandomizedOptions] = useState([]);
  const navigate = useNavigate();

  const questions = state?.quiz?.data?.questions || [];
  const questionID = questions[currentQuestionIndex]?.id;
  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions?.length - 1;

  const shuffleOptions = (options) => {
    return [...options].sort(() => Math.random() - 0.5);
  };

  // keep object of answers so that answers can be submitted later
  const handleAnswerSelect = (answer) => {
    dispatch({
      type: actions.quiz.ANSWER_SELECTED,
      data: { [questionID]: answer },
    });
  };

  //   To navigate to the next question and shuffle the options
  const handleNext = () => {
    if (currentQuestionIndex < questions?.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setRandomizedOptions(
        shuffleOptions(questions[currentQuestionIndex + 1]?.options || [])
      );

      const selectedAnswer = state.answers[questionID];
      dispatch({
        type: actions.quiz.ANSWER_SELECTED,
        data: { [questionID]: selectedAnswer },
      });
    }
  };

  //   To navigate to the previous question and shuffle the options
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setRandomizedOptions(
        shuffleOptions(questions[currentQuestionIndex - 1]?.options || [])
      );

      const selectedAnswer = state.answers[questionID];
      dispatch({
        type: actions.quiz.ANSWER_SELECTED,
        data: { [questionID]: selectedAnswer },
      });
    }
  };

  //   To submit the quiz
  const handleSubmit = async () => {
    try {
      const response = await api.post(
        `/quizzes/${state?.quiz?.data?.id}/attempt`,
        { answers: state.answers }
      );

      //   navigate(`/result/${state?.quiz?.data?.id}`);
      if (response.status === 200) {
        dispatch({ type: actions.quiz.ANSWER_SUBMITTED, data: state.answers });
        navigate(`/result/${response?.data?.data?.quiz?.id}`);
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: actions.quiz.ANSWER_SUBMITTING_ERROR,
        error: error.response?.data?.message || "Failed to submit quiz",
      });

      toast.error(state?.error || "Failed to submit quiz");
    }
  };

  //   To initiate the questions options for the first time as well as set dependencies so that useEffect can trigger
  useEffect(() => {
    if (currentQuestion?.options) {
      setRandomizedOptions(shuffleOptions(currentQuestion.options));
    }
  }, [currentQuestion?.options]);

  if (!currentQuestion) return null;

  return (
    <div className="lg:col-span-2 bg-white rounded-md p-6">
      <div className="mb-8">
        <p className="text-sm text-gray-500 mb-2">
          Question {currentQuestionIndex + 1} of {questions?.length}
        </p>
        <h3 className="text-2xl font-bold mb-6">{currentQuestion?.question}</h3>

        <div className="space-y-4">
          {randomizedOptions.map((option, index) => (
            <label
              key={index}
              className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:border-primary transition-colors ${
                state?.answers[questionID] === option
                  ? "border-primary bg-primary/5"
                  : "border-gray-200"
              }`}
            >
              <input
                type="radio"
                name="answer"
                value={option}
                checked={state?.answers[questionID] === option}
                onChange={() => handleAnswerSelect(option)}
                className="text-primary focus:ring-primary"
              />
              <span className="text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className={`px-6 py-2 rounded-md ${
            currentQuestionIndex === 0
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-primary text-white hover:bg-primary/90"
          }`}
        >
          Previous
        </button>

        {isLastQuestion ? (
          <button
            onClick={handleSubmit}
            disabled={!state?.answers[questionID]}
            className="px-6 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            Submit Quiz
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={!state?.answers[questionID]}
            className="px-6 py-2 rounded-md bg-primary text-white hover:bg-primary/90 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            Next Question
          </button>
        )}
      </div>
    </div>
  );
};

export default SingleQuizQuestion;
