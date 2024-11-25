import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { actions } from "../../actions";
import Field from "../../components/auth/Field";
import { QuizSetEntrySkeleton } from "../../components/common/Skeleton";
import QuizSetFallback from "../../components/quiz-set/QuizSetFallback";
import Question from "../../components/result/Question";
import { ArrowIcon } from "../../components/SVG/Icon";
import useAdminQuiz from "../../hooks/useAdminQuiz";
import useAxios from "../../hooks/useAxios";

const QuizSetEntry = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [quizId, setQuizId] = useState(null);

  const { id } = useParams();
  const { api } = useAxios();

  const { state: adminQuizState, dispatch } = useAdminQuiz();

  const thisQuestion = adminQuizState?.quiz?.find(
    (question) => question.id === id
  );

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm();

  // edit the question

  const handleEditQuestion = (question) => {
    setIsEditing(true);
    setQuizId(question.id);

    setValue("quizTitle", question.question);

    question.options.forEach((option, index) => {
      setValue(`optionText${index + 1}`, option);

      // 1,2,3,4 for the correct answer
      if (option === question.correctAnswer) {
        setValue("correctAnswer", (index + 1).toString());
      }
    });
  };

  // submitting question

  const onSubmit = async (formData) => {
    // creating array for options

    const options = [];
    for (let i = 1; i <= 4; i++) {
      options.push(formData[`optionText${i}`]);
    }

    // final question data for the api post request
    const questionData = {
      question: formData.quizTitle,
      options,
      correctAnswer: formData[`optionText${formData.correctAnswer}`],
    };

    // api call to create the question
    try {
      let response;

      if (isEditing) {
        // Update existing question
        response = await api.patch(
          `${import.meta.env.VITE_API_URL}/admin/questions/${quizId}`,
          questionData
        );
        toast.success("Question updated successfully");
      } else {
        // Create new question
        response = await api.post(
          `${import.meta.env.VITE_API_URL}/admin/quizzes/${id}/questions`,
          questionData
        );
        toast.success("Question created successfully");
      }

      if (response.status === 200 || response.status === 201) {
        // Fetch updated quiz data
        const updatedQuizResponse = await api.get(
          `${import.meta.env.VITE_API_URL}/admin/quizzes`
        );

        if (updatedQuizResponse.status === 200) {
          dispatch({
            type: actions.adminQuiz.DATA_FETCHED,
            data: updatedQuizResponse.data,
          });
        }

        // Reset form and editing state
        setIsEditing(false);
        setQuizId(null);
        reset();
      }
    } catch (error) {
      console.error(error);

      toast.error(error.response.data.message);
    }
  };

  // fetching quiz data for filtering the questions to retain the data after refreshing the page

  useEffect(() => {
    dispatch({ type: actions.adminQuiz.DATA_FETCHING });

    const fetchQuiz = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_API_URL}/admin/quizzes`
        );

        if (response.status === 200) {
          dispatch({
            type: actions.adminQuiz.DATA_FETCHED,
            data: response.data,
          });
        }
      } catch (error) {
        console.error(error);

        toast.error(error.response?.data?.message);
      }
    };

    fetchQuiz();
  }, [api, dispatch]);

  if (adminQuizState?.loading) {
    return <QuizSetEntrySkeleton />;
  }

  return (
    <>
      <Helmet>
        <title>Quizzes | Quiz Set Entry</title>
      </Helmet>
      <div className="bg-[#F5F3FF] min-h-screen flex flex-1">
        <main className="md:flex-grow px-4 sm:px-6 lg:px-8 py-8">
          <div>
            <nav className="text-sm mb-4" aria-label="Breadcrumb">
              <ol className="list-none p-0 inline-flex">
                <li className="flex items-center">
                  <Link
                    to="/admin/dashboard"
                    className="text-gray-600 hover:text-buzzr-purple"
                  >
                    Home
                  </Link>
                  <ArrowIcon />
                </li>
                <li>
                  <Link
                    to={`/admin/quiz-set/${id}`}
                    className="text-gray-600 hover:text-buzzr-purple"
                    aria-current="page"
                  >
                    Quiz set
                  </Link>
                </li>
              </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-8 lg:gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-4">
                  {thisQuestion?.title}
                </h2>
                <div className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-4">
                  Total number of questions : {thisQuestion?.Questions?.length}
                </div>
                <p className="text-gray-600 mb-4">
                  {thisQuestion?.description}
                </p>

                {/* quiz form */}
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                  <h2 className="text-xl font-bold text-foreground">
                    {isEditing ? "Update Quiz" : "Create Quiz"}
                  </h2>

                  <div>
                    <Field
                      label="Question Title"
                      htmlFor="quizTitle"
                      error={errors.quizTitle}
                    >
                      <input
                        type="text"
                        id="quizTitle"
                        name="quizTitle"
                        className="w-full mt-2 p-2 border border-input rounded-md bg-background text-foreground"
                        placeholder="Enter quiz title"
                        {...register("quizTitle", {
                          required: "Quiz title is required",
                        })}
                      />
                    </Field>
                  </div>

                  <p className="text-sm text-gray-600 mt-4">Add Options</p>

                  <div id="optionsContainer" className="space-y-2 mt-4">
                    {/* options */}

                    <div className="flex items-center space-x-2 px-4 py-1 rounded-md group focus-within:ring focus-within:ring-primary/80 bg-white">
                      <input
                        type="radio"
                        id="option1"
                        value="1"
                        className="text-primary focus:ring-0 w-4 h-4"
                        {...register("correctAnswer", {
                          required: "Please select a correct answer",
                        })}
                      />
                      <input
                        type="text"
                        id="optionText1"
                        name="optionText1"
                        className="w-full p-2 bg-transparent rounded-md text-foreground outline-none focus:ring-0"
                        placeholder="Option 1"
                        {...register("optionText1", {
                          required: "Option text is required",
                        })}
                      />
                    </div>
                    <p className="text-sm text-red-500">
                      {errors.optionText1?.message}
                    </p>

                    <div className="flex items-center space-x-2 px-4 py-1 rounded-md group focus-within:ring focus-within:ring-primary/80 bg-white">
                      <input
                        type="radio"
                        id="option2"
                        value="2"
                        className="text-primary focus:ring-0 w-4 h-4"
                        {...register("correctAnswer", {
                          required: "Please select a correct answer",
                        })}
                      />
                      <input
                        type="text"
                        id="optionText2"
                        name="optionText2"
                        className="w-full p-2 bg-transparent rounded-md text-foreground outline-none focus:ring-0"
                        placeholder="Option 2"
                        {...register("optionText2", {
                          required: "Option text is required",
                        })}
                      />
                    </div>
                    <p className="text-sm text-red-500">
                      {errors.optionText2?.message}
                    </p>

                    <div className="flex items-center space-x-2 px-4 py-1 rounded-md group focus-within:ring focus-within:ring-primary/80 bg-white">
                      <input
                        type="radio"
                        id="option3"
                        value="3"
                        className="text-primary focus:ring-0 w-4 h-4"
                        {...register("correctAnswer", {
                          required: "Please select a correct answer",
                        })}
                      />
                      <input
                        type="text"
                        id="optionText3"
                        name="optionText3"
                        className="w-full p-2 bg-transparent rounded-md text-foreground outline-none focus:ring-0"
                        placeholder="Option 3"
                        {...register("optionText3", {
                          required: "Option text is required",
                        })}
                      />
                    </div>
                    <p className="text-sm text-red-500">
                      {errors.optionText3?.message}
                    </p>
                    <div className="flex items-center space-x-2 px-4 py-1 rounded-md group focus-within:ring focus-within:ring-primary/80 bg-white">
                      <input
                        type="radio"
                        id="option4"
                        value="4"
                        className="text-primary focus:ring-0 w-4 h-4"
                        {...register("correctAnswer", {
                          required: "Please select a correct answer",
                        })}
                      />
                      <input
                        type="text"
                        id="optionText4"
                        name="optionText4"
                        className="w-full p-2 bg-transparent rounded-md text-foreground outline-none focus:ring-0"
                        placeholder="Option 4"
                        {...register("optionText4", {
                          required: "Option text is required",
                        })}
                      />
                    </div>

                    <p className="text-sm text-red-500">
                      {errors.optionText4?.message}
                    </p>
                  </div>

                  <p className="text-sm text-red-500">
                    {errors.correctAnswer?.message}
                  </p>

                  <button className="w-full bg-primary text-white text-primary-foreground p-2 rounded-md hover:bg-primary/90 transition-colors">
                    {isEditing ? "Update Quiz" : "Save Quiz"}
                  </button>
                </form>
              </div>

              {/* questions */}
              <div className="px-4">
                {!thisQuestion?.Questions?.length ? (
                  <QuizSetFallback />
                ) : (
                  thisQuestion?.Questions?.map((question, index) => (
                    <Question
                      key={question.id}
                      index={index}
                      question={question}
                      onEdit={handleEditQuestion}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};
export default QuizSetEntry;
