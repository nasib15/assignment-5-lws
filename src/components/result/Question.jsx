import { useState } from "react";
import { toast } from "react-toastify";
import { actions } from "../../actions";
import useAdminQuiz from "../../hooks/useAdminQuiz";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { CheckIcon, CrossIcon } from "../SVG/Icon";

const Question = ({ question, index, userResultData = {}, onEdit }) => {
  const { auth } = useAuth();
  const { api } = useAxios();
  const { dispatch } = useAdminQuiz();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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

  const handleDelete = async () => {
    try {
      const response = await api.delete(
        `${import.meta.env.VITE_API_URL}/admin/questions/${question.id}`
      );

      if (response.status === 200) {
        // Fetch updated quiz data after deletion
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

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this question? This action cannot
              be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* admins can delete and edit question */}
      {isAdmin && (
        <div className="flex space-x-4 bg-primary/10 px-6 py-2">
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
    </div>
  );
};

export default Question;
