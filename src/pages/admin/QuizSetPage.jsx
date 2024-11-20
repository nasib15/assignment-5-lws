import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { actions } from "../../actions";
import { BackIcon } from "../../components/SVG/Icon";
import Field from "../../components/auth/Field";
import useAdminQuiz from "../../hooks/useAdminQuiz";
import useAxios from "../../hooks/useAxios";

const QuizSetPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();
  const { api } = useAxios();
  const { dispatch } = useAdminQuiz();

  const onSubmit = async (formData) => {
    try {
      const response = await api.post(
        `${import.meta.env.VITE_API_URL}/admin/quizzes`,
        formData
      );

      if (response.status === 201) {
        dispatch({
          type: actions.adminQuiz.QUIZ_TOPIC_SUBMITTED,
          data: formData,
        });

        toast.success("Quiz topic submitted successfully");

        navigate("/admin/quiz-set-entry");
      }
    } catch (error) {
      console.error(error);

      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="bg-[#F5F3FF] min-h-screen flex">
      <main className="md:flex-grow px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <Link
              to="/admin/dashboard"
              className="inline-flex items-center text-sm text-gray-600 mb-6 hover:text-buzzr-purple"
            >
              <BackIcon />
              Back to home
            </Link>

            <h2 className="text-3xl font-bold mb-6">
              Give your quiz title and description
            </h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <Field
                  label="Quiz title"
                  htmlFor="quiz-title"
                  error={errors.title}
                >
                  <input
                    type="text"
                    id="quiz-title"
                    name="quiz-title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-buzzr-purple focus:border-buzzr-purple"
                    placeholder="Quiz"
                    {...register("title", { required: "Title is required" })}
                  />
                </Field>
              </div>

              <div className="mb-6">
                <Field
                  label="Description (Optional)"
                  htmlFor="quiz-description"
                  error={errors.description}
                >
                  <textarea
                    id="quiz-description"
                    name="quiz-description"
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-buzzr-purple focus:border-buzzr-purple"
                    placeholder="Description"
                    {...register("description", {
                      required: "Description is required",
                    })}
                  />
                </Field>
              </div>

              <button className="w-full block text-center bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                Next
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};
export default QuizSetPage;
