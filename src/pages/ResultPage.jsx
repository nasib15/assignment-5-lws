import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { actions } from "../actions";
import CircularProgressbar from "../assets/icons/circular-progressbar.svg";
import LogoWhite from "../assets/logo-white.svg";
import Question from "../components/result/Question";
import useAxios from "../hooks/useAxios";
import useQuiz from "../hooks/useQuiz";
import useResult from "../hooks/useResult";
import calculateScore from "../utils/calculateResult";

const ResultPage = () => {
  const { id } = useParams();
  const { api } = useAxios();
  const { state, dispatch } = useResult();

  const { state: quizState, dispatch: quizDispatch } = useQuiz();
  const questions = quizState?.quiz?.data?.questions;

  useEffect(() => {
    try {
      const fetchResult = async () => {
        dispatch({ type: actions.result.DATA_FETCHING });

        const response = await api.get(
          `${import.meta.env.VITE_API_URL}/quizzes/${id}/attempts`
        );

        if (response.status === 200) {
          dispatch({
            type: actions.result.DATA_FETCHED,
            data: response?.data?.data,
          });
        }
      };

      fetchResult();
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message);
    }
  }, [api, dispatch, id]);

  // fetch quiz data
  useEffect(() => {
    quizDispatch({ type: actions.quiz.DATA_FETCHING });

    const fetchQuiz = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_API_URL}/quizzes/${id}`
        );

        if (response.status === 200) {
          quizDispatch({
            type: actions.quiz.DATA_FETCHED,
            data: response.data,
          });
        }
      } catch (error) {
        console.error(error);

        toast.error(error.response?.data?.message || "Failed to fetch quiz");
      }
    };

    fetchQuiz();
  }, [api, id, quizDispatch]);

  // Add loading state
  if (state?.loading) {
    return <div>Loading...</div>;
  }

  if (quizState?.loading) {
    return <div>Loading...</div>;
  }

  // Check if attempts exist before accessing
  const attempt = state?.data?.attempts?.[0];

  if (!attempt) {
    return <div>Loading.....</div>;
  }

  const { score, correct, wrong, total } = calculateScore(
    attempt.submitted_answers,
    attempt.correct_answers
  );

  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="flex min-h-screen overflow-hidden">
        <Link to="/">
          <img src={LogoWhite} className="max-h-11 fixed left-6 top-6 z-50" />
        </Link>
        <div className="max-h-screen overflow-hidden hidden lg:flex lg:w-1/2 bg-primary flex-col justify-center p-12 relative">
          <div>
            <div className="text-white">
              <div>
                <h2 className="text-4xl font-bold mb-2">
                  {state?.data?.quiz?.title}
                </h2>
                <p>{state?.data?.quiz?.description}</p>
              </div>

              <div className="my-6 flex items-center  ">
                <div className="w-1/2">
                  <div className="flex gap-6 my-6">
                    <div>
                      <p className="font-semibold text-2xl my-0">{total}</p>
                      <p className="text-gray-300">Questions</p>
                    </div>

                    <div>
                      <p className="font-semibold text-2xl my-0">{correct}</p>
                      <p className="text-gray-300">Correct</p>
                    </div>

                    <div>
                      <p className="font-semibold text-2xl my-0">{wrong}</p>
                      <p className="text-gray-300">Wrong</p>
                    </div>
                  </div>

                  <Link
                    to="/leaderboard"
                    className=" bg-secondary py-3 rounded-md hover:bg-secondary/90 transition-colors text-lg font-medium underline text-white"
                  >
                    View Leaderboard
                  </Link>
                </div>

                <div className="w-1/2 bg-primary/80 rounded-md border border-white/20 flex items-center p-4">
                  <div className="flex-1">
                    <p className="text-2xl font-bold">
                      {score}/{state?.data?.quiz?.total_marks}
                    </p>
                    <p>Your Mark</p>
                  </div>
                  <div>
                    <img src={CircularProgressbar} className="h-20" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-h-screen md:w-1/2 flex items-center justify-center h-full p-8">
          <div className="h-[calc(100vh-50px)] overflow-y-scroll ">
            <div className="px-4">
              {questions?.map((question, index) => (
                <Question key={question.id} question={question} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ResultPage;
