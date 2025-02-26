import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { actions } from "../../actions";
import { BackIcon } from "../../components/SVG/Icon";
import Field from "../../components/auth/Field";
import { QuizSetPageSkeleton } from "../../components/common/Skeleton";
import useAdminQuiz from "../../hooks/useAdminQuiz";
import useAxios from "../../hooks/useAxios";

const QuizSetPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const { api } = useAxios();
  const { state: adminQuizState, dispatch: adminQuizDispatch } = useAdminQuiz();

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const currentStatus = watch("status");

  // If id exists, fetch existing quiz data
  useEffect(() => {
    if (id) {
      const existingQuiz = adminQuizState?.quiz?.find((quiz) => quiz.id === id);
      if (existingQuiz) {
        setValue("title", existingQuiz.title.trim());
        setValue("description", existingQuiz.description.trim());
        setValue("status", existingQuiz.status.trim());
      }
    }

    // Cleanup function so that the field value would be reset
    return () => {
      setValue("title", "");
      setValue("description", "");
      setValue("status", "draft");
    };
  }, [adminQuizState?.quiz, id, setValue]);

  const onSubmit = async (formData) => {
    try {
      let response;

      const { title, description, status } = formData;

      if (id) {
        // Update existing quiz
        response = await api.patch(
          `${import.meta.env.VITE_API_URL}/admin/quizzes/${id}`,
          { title: title.trim(), status: status.trim() }
        );

        if (response.status === 200) {
          toast.success("Quiz updated successfully");
          navigate(`/admin/quiz-set-entry/${id}`);
        }
      } else {
        // Create new quiz
        response = await api.post(
          `${import.meta.env.VITE_API_URL}/admin/quizzes`,
          {
            title: title.trim(),
            description: description.trim(),
          }
        );

        if (response.status === 201) {
          adminQuizDispatch({
            type: actions.adminQuiz.QUIZ_TOPIC_SUBMITTED,
            data: {
              title: title.trim(),
              description: description.trim(),
              status: status.trim(),
            },
          });

          toast.success("Quiz topic submitted successfully");

          // getting id after creating question so that it can be used to navigate to the quiz set entry page

          const id = response.data.data.id;

          navigate(`/admin/quiz-set-entry/${id}`);
        }
      }
    } catch (error) {
      console.error(error);

      toast.error(error?.response?.data?.message);
    }
  };

  // delete quiz set

  const handleDelete = async (id) => {
    try {
      adminQuizDispatch({
        type: actions.adminQuiz.QUIZ_DELETED,
        id,
      });

      navigate("/admin/dashboard");

      const response = await api.delete(
        `${import.meta.env.VITE_API_URL}/admin/quizzes/${id}`
      );

      if (response.status === 200) {
        toast.success("Quiz deleted successfully");
      }
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to delete quiz");
    }
  };

  if (adminQuizState?.loading) {
    return <QuizSetPageSkeleton />;
  }

  return (
    <>
      <Helmet>
        <title>Quizzes | Quiz Set</title>
      </Helmet>
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

                {/* Only show status toggle for existing quizzes */}
                {id && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quiz Status
                    </label>
                    <div className="flex items-center space-x-4">
                      <div
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out cursor-pointer ${
                          currentStatus === "published"
                            ? "bg-green-500"
                            : "bg-gray-200"
                        }`}
                        onClick={() =>
                          setValue(
                            "status",
                            currentStatus === "published"
                              ? "draft"
                              : "published"
                          )
                        }
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out ${
                            currentStatus === "published"
                              ? "translate-x-6"
                              : "translate-x-1"
                          }`}
                        />
                        <input type="hidden" {...register("status")} />
                      </div>

                      <span className="text-sm font-medium text-gray-700">
                        {currentStatus === "published" ? (
                          <span className="text-green-600 flex items-center gap-1">
                            Published
                          </span>
                        ) : (
                          <span className="text-gray-500">Draft</span>
                        )}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      {currentStatus === "published"
                        ? "Quiz is visible to all users"
                        : "Quiz is only visible to administrators"}
                    </p>
                  </div>
                )}

                {showDeleteConfirm && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
                      <h3 className="text-lg font-semibold mb-4">
                        Confirm Delete
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Are you sure you want to delete this question? This
                        action cannot be undone.
                      </p>
                      <div className="flex justify-end space-x-4">
                        <button
                          onClick={() => setShowDeleteConfirm(false)}
                          className="px-4 py-2 text-gray-600 hover:text-gray-800"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleDelete(id)}
                          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-4">
                  {id && (
                    <button
                      type="button"
                      onClick={() => {
                        setShowDeleteConfirm(true);
                      }}
                      className="w-full block text-center bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Delete Quiz
                    </button>
                  )}
                  <button
                    type="submit"
                    className="w-full block text-center bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    {id ? "Update Quiz" : "Next"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};
export default QuizSetPage;
