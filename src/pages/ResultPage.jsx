import { useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { actions } from "../actions";
import LogoWhite from "../assets/logo-white.svg";
import Question from "../components/result/Question";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import useQuiz from "../hooks/useQuiz";
import useResult from "../hooks/useResult";
import calculateResult from "../utils/calculateResult";

const ResultPage = () => {
  const { auth } = useAuth();
  const { id } = useParams();
  const { api } = useAxios();
  const { state: resultState, dispatch: resultDispatch } = useResult();

  const { state: quizState, dispatch: quizDispatch } = useQuiz();
  const questions = quizState?.quiz?.data?.questions;

  // Quiz data fetching for calculation of the final marks
  useEffect(() => {
    try {
      const fetchResult = async () => {
        resultDispatch({ type: actions.result.DATA_FETCHING });

        const response = await api.get(
          `${import.meta.env.VITE_API_URL}/quizzes/${id}/attempts`
        );

        if (response.status === 200) {
          resultDispatch({
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
  }, [api, resultDispatch, id]);

  // fetch quiz questions and answers
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
  if (resultState?.loading) {
    return <div>Loading...</div>;
  }

  if (quizState?.loading) {
    return <div>Loading...</div>;
  }

  // User attempt
  const userResultData = resultState?.data?.attempts?.find(
    (attempt) => attempt?.user?.id === auth?.user?.id
  );

  if (!userResultData) {
    return <div>Loading.....</div>;
  }

  const { score, correct, wrong, total } = calculateResult(
    userResultData.submitted_answers,
    userResultData.correct_answers
  );

  return (
    <>
      <Helmet>
        <title>Quizzes | Result</title>
      </Helmet>
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
                    {resultState?.data?.quiz?.title}
                  </h2>
                  <p>{resultState?.data?.quiz?.description}</p>
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
                      to={`/leaderboard/${id}`}
                      className=" bg-secondary py-3 rounded-md hover:bg-secondary/90 transition-colors text-lg font-medium underline text-white"
                    >
                      View Leaderboard
                    </Link>
                  </div>

                  <div className="w-1/2 bg-primary/80 rounded-md border border-white/20 flex items-center p-4">
                    <div className="flex-1">
                      <p className="text-2xl font-bold">
                        {score}/{resultState?.data?.quiz?.total_marks}
                      </p>
                      <p>Your Mark</p>
                    </div>
                    <div className="w-20 h-20">
                      <CircularProgressbar
                        value={
                          (score / resultState?.data?.quiz?.total_marks) * 100
                        }
                        text={`${Math.round(
                          (score / resultState?.data?.quiz?.total_marks) * 100
                        )}%`}
                        styles={buildStyles({
                          pathColor: "#ffffff",
                          textColor: "#ffffff",
                          trailColor: "rgba(255,255,255,0.2)",

                          textSize: "24px",

                          pathTransitionDuration: 0.5,
                        })}
                      />
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
                  <Question
                    key={question.id}
                    question={question}
                    index={index}
                    userResultData={userResultData}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ResultPage;
