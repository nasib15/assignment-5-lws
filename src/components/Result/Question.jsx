import { useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { actions } from "../../actions";
import useAdminQuiz from "../../hooks/useAdminQuiz";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import getAnswerStyle from "../../utils/getAnswerStyle";
import { CheckIcon, CrossIcon } from "../SVG/Icon";
import { QuestionSkeleton } from "../common/Skeleton";

const Question = ({ question, index, userResultData = {}, onEdit }) => {
  const { auth } = useAuth();
  const { api } = useAxios();
  const { state, dispatch } = useAdminQuiz();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const location = useLocation();
  const isAdminRoute = location.pathname.includes("/admin");
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

  const handleDelete = async () => {
    try {
      const response = await api.delete(
        `${import.meta.env.VITE_API_URL}/admin/questions/${question.id}`
      );

      if (response.status === 200) {
        const updatedQuizResponse = await api.get(
          `${import.meta.env.VITE_API_URL}/admin/quizzes`
        );

        if (updatedQuizResponse.status === 200) {
          dispatch({
            type: actions.adminQuiz.DATA_FETCHED,
            data: updatedQuizResponse.data,
          });
          toast.success("Question deleted successfully");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to delete question");
    }
    setShowDeleteConfirm(false);
  };

  if (state?.loading) {
    return <QuestionSkeleton />;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="text-primary mr-2">Question {index + 1}.</span>
          {question?.question}
        </h3>

        <div className="space-y-3">
          {question?.options.map((option, idx) => (
            <div
              key={idx}
              className={getAnswerStyle(option, selectedAnswer, correctAnswer)}
            >
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  name={`question-${question?.id}`}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                  disabled
                  checked={
                    option === selectedAnswer || option === correctAnswer
                  }
                />
                <span className="font-medium">{option}</span>
              </div>

              <div className="flex items-center">
                {option === correctAnswer && (
                  <span className="flex items-center text-green-600">
                    <CheckIcon className="w-5 h-5 mr-1" />
                    {option === selectedAnswer
                      ? "Correct Answer"
                      : "Right Answer"}
                  </span>
                )}
                {option === selectedAnswer && option !== correctAnswer && (
                  <span className="flex items-center text-red-600">
                    <CrossIcon className="w-5 h-5 mr-1" />
                    Your Answer
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* only for admins */}
      {isAdmin && isAdminRoute && (
        <div className="flex space-x-4 bg-gray-50 px-6 py-3 border-t">
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="text-red-600 hover:text-red-800 font-medium"
          >
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

      {/* Delete confirmation dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this question? This action cannot
              be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Question;
