import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { actions } from "../actions";
import Avatar from "../assets/profile.png";
import { QuestionSkeleton } from "../components/common/Skeleton";
import SingleQuizQuestion from "../components/quiz/SingleQuizQuestion";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import useQuiz from "../hooks/useQuiz";

const QuizPage = () => {
  // user info
  const { auth } = useAuth();
  const { user } = auth;

  // quiz id
  const { id } = useParams();
  const { state, dispatch } = useQuiz();

  // axios interceptor api
  const { api } = useAxios();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // fetch quiz data
  useEffect(() => {
    dispatch({ type: actions.quiz.DATA_FETCHING });

    const fetchQuiz = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_API_URL}/quizzes/${id}`
        );

        if (response.status === 200) {
          dispatch({ type: actions.quiz.DATA_FETCHED, data: response.data });
        }
      } catch (error) {
        console.error(error);

        toast.error(error.response?.data?.message || "Failed to fetch quiz");
      }
    };

    fetchQuiz();
  }, [api, dispatch, id]);

  if (state?.loading) {
    return (
      <div className="container mx-auto min-h-[calc(100vh-12rem)] flex flex-col">
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1 animate-pulse bg-gray-200 rounded-lg h-64"></div>
          <div className="lg:col-span-2">
            <QuestionSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Quizzes | Quiz</title>
      </Helmet>
      <main className="flex-1">
        <div className="container mx-auto min-h-[calc(100vh-12rem)] flex flex-col">
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-1 bg-white rounded-md p-6 flex flex-col">
              <div>
                <h2 className="text-4xl font-bold mb-4">
                  {state?.quiz?.data?.title}
                </h2>
                <p className="text-gray-600 mb-4">
                  {state?.quiz?.data?.description}
                </p>

                <div className="flex flex-col">
                  <div className="w-fit bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-2">
                    Total number of questions :{" "}
                    {state?.quiz?.data?.questions?.length}
                  </div>

                  <div className="w-fit bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-2">
                    Participation : {currentQuestionIndex + 1}
                  </div>

                  <div className="w-fit bg-gray-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-2">
                    Remaining :{" "}
                    {state?.quiz?.data?.questions?.length -
                      (currentQuestionIndex + 1)}
                  </div>
                </div>
              </div>

              <div className="mt-auto flex items-center">
                <img
                  src={Avatar}
                  alt={user?.full_name}
                  className="w-10 h-10 rounded-full mr-3 object-cover"
                />
                <span className="text-black font-semibold">
                  {user?.full_name}
                </span>
              </div>
            </div>

            <SingleQuizQuestion
              currentQuestionIndex={currentQuestionIndex}
              setCurrentQuestionIndex={setCurrentQuestionIndex}
            />
          </div>
        </div>
      </main>
    </>
  );
};
export default QuizPage;
